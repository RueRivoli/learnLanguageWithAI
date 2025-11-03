import type { SupabaseClient } from "@supabase/supabase-js";

export interface ImageUploadOptions {
  bucket?: string;
  maxSize?: number; // en MB
  allowedTypes?: string[];
  generateThumbnail?: boolean;
}

export interface UploadResult {
  path: string;
  publicUrl: string;
  fullPath: string;
}

export const useImageUpload = () => {
  const supabase = useSupabaseClient() as SupabaseClient;
  const user = useSupabaseUser();

  const defaultOptions: ImageUploadOptions = {
    bucket: "images",
    maxSize: 50, // 50MB
    allowedTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
    generateThumbnail: false,
  };

  /**
   * Valide le fichier avant l'upload
   */
  const validateFile = (file: File, options: ImageUploadOptions): boolean => {
    const opts = { ...defaultOptions, ...options };

    // Vérifier la taille
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > opts.maxSize!) {
      throw new Error(
        `Le fichier est trop volumineux. Taille maximum: ${opts.maxSize}MB`,
      );
    }

    // Vérifier le type MIME
    if (!opts.allowedTypes!.includes(file.type)) {
      throw new Error(
        `Type de fichier non autorisé. Types acceptés: ${opts.allowedTypes!.join(", ")}`,
      );
    }

    return true;
  };

  /**
   * Génère un nom de fichier unique
   */
  const generateFileName = (originalName: string, userId?: string): string => {
    const fileExt = originalName.split(".").pop()?.toLowerCase();
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const userPrefix = userId ? `${userId}_` : "";

    return `${userPrefix}${timestamp}_${random}.${fileExt}`;
  };

  /**
   * Upload une image vers Supabase Storage
   */
  const uploadImage = async (
    file: File,
    options: ImageUploadOptions = {},
  ): Promise<UploadResult> => {
    const opts = { ...defaultOptions, ...options };

    try {
      // Valider le fichier
      validateFile(file, opts);

      // Générer le nom de fichier
      const fileName = generateFileName(file.name, user.value?.id);
      const filePath = `${fileName}`;

      // Upload vers Supabase
      const { data, error } = await supabase.storage
        .from(opts.bucket!)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw new Error(`Erreur lors de l'upload: ${error.message}`);
      }

      // Obtenir l'URL publique
      const { data: urlData } = supabase.storage
        .from(opts.bucket!)
        .getPublicUrl(data.path);

      return {
        path: data.path,
        publicUrl: urlData.publicUrl,
        fullPath: data.fullPath,
      };
    } catch (error) {
      console.error("Erreur upload image:", error);
      throw error;
    }
  };

  /**
   * Obtient l'URL publique d'une image
   */
  const getImageUrl = (path: string, bucket: string = "images"): string => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    return data.publicUrl;
  };

  /**
   * Obtient une URL signée (pour les buckets privés)
   */
  const getSignedUrl = async (
    path: string,
    bucket: string = "avatars",
    expiresIn: number = 3600,
  ): Promise<string> => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      throw new Error(
        `Erreur lors de la création de l'URL signée: ${error.message}`,
      );
    }

    return data.signedUrl;
  };

  /**
   * Supprime une image
   */
  const deleteImage = async (
    path: string,
    bucket: string = "images",
  ): Promise<void> => {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      throw new Error(`Erreur lors de la suppression: ${error.message}`);
    }
  };

  /**
   * Upload multiple images
   */
  const uploadMultipleImages = async (
    files: File[],
    options: ImageUploadOptions = {},
  ): Promise<UploadResult[]> => {
    const results: UploadResult[] = [];

    for (const file of files) {
      try {
        const result = await uploadImage(file, options);
        results.push(result);
      } catch (error) {
        console.error(`Erreur upload ${file.name}:`, error);
        throw error;
      }
    }

    return results;
  };

  /**
   * Redimensionne une image avant l'upload (côté client)
   */
  const resizeImage = async (
    file: File,
    maxWidth: number = 1920,
    maxHeight: number = 1080,
    quality: number = 0.8,
  ): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();

      img.onload = () => {
        // Calculer les nouvelles dimensions
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob!], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          },
          file.type,
          quality,
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  return {
    uploadImage,
    uploadMultipleImages,
    getImageUrl,
    getSignedUrl,
    deleteImage,
    resizeImage,
    validateFile,
  };
};
