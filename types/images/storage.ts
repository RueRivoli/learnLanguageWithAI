export interface StorageBucket {
  id: string;
  name: string;
  public: boolean;
  file_size_limit?: number;
  allowed_mime_types?: string[];
  created_at: string;
  updated_at: string;
}

export interface StorageObject {
  id: string;
  name: string;
  bucket_id: string;
  owner?: string;
  created_at: string;
  updated_at: string;
  last_accessed_at?: string;
  metadata?: Record<string, any>;
}

export interface FileUploadOptions {
  cacheControl?: string;
  contentType?: string;
  duplex?: string;
  upsert?: boolean;
}

export interface SignedUrlOptions {
  expiresIn: number;
  transform?: {
    width?: number;
    height?: number;
    resize?: "cover" | "contain" | "fill";
    format?: "origin" | "auto" | "webp";
    quality?: number;
  };
}

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  resize?: "cover" | "contain" | "fill";
  format?: "origin" | "auto" | "webp";
  quality?: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface StorageError {
  message: string;
  statusCode?: string;
}

// Types pour les buckets spécifiques de l'application
export type AppBucket = "images" | "avatars" | "documents" | "videos";

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  lastModified: number;
}

export interface UploadedFile {
  id: string;
  path: string;
  publicUrl: string;
  bucket: AppBucket;
  metadata: ImageMetadata;
  uploadedAt: string;
  uploadedBy: string;
}

// Utilitaires pour les types MIME
export const MIME_TYPES = {
  IMAGE: {
    PNG: "image/png",
    JPEG: "image/jpeg",
    WEBP: "image/webp",
    GIF: "image/gif",
    SVG: "image/svg+xml",
  },
  DOCUMENT: {
    PDF: "application/pdf",
    DOC: "application/msword",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    XLS: "application/vnd.ms-excel",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  VIDEO: {
    MP4: "video/mp4",
    WEBM: "video/webm",
    OGG: "video/ogg",
  },
  AUDIO: {
    MP3: "audio/mpeg",
    WAV: "audio/wav",
    OGG: "audio/ogg",
  },
} as const;

export const IMAGE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
] as const;
export const DOCUMENT_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
] as const;
export const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg"] as const;

export type ImageExtension = (typeof IMAGE_EXTENSIONS)[number];
export type DocumentExtension = (typeof DOCUMENT_EXTENSIONS)[number];
export type VideoExtension = (typeof VIDEO_EXTENSIONS)[number];

// Helpers pour la validation
export const isImageFile = (mimeType: string): boolean => {
  return Object.values(MIME_TYPES.IMAGE).includes(mimeType as any);
};

export const isDocumentFile = (mimeType: string): boolean => {
  return Object.values(MIME_TYPES.DOCUMENT).includes(mimeType as any);
};

export const isVideoFile = (mimeType: string): boolean => {
  return Object.values(MIME_TYPES.VIDEO).includes(mimeType as any);
};

export const getFileExtension = (filename: string): string => {
  return filename.toLowerCase().substring(filename.lastIndexOf("."));
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
