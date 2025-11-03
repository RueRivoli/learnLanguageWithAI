<template>
  <div class="container mx-auto p-6 space-y-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Exemples d'Upload d'Images
      </h1>
      <p class="text-gray-600">
        Démonstration du système d'upload avec Supabase Storage
      </p>
    </div>

    <!-- Upload simple -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Upload Simple</h2>
      <UploadImageUpload
        :multiple="false"
        :max-size-m-b="10"
        bucket="images"
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
      />
    </section>

    <!-- Upload multiple -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Upload Multiple</h2>
      <UploadImageUpload
        :multiple="true"
        :max-size-m-b="5"
        bucket="images"
        :resize="true"
        :max-width="1200"
        :max-height="800"
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
      />
    </section>

    <!-- Upload d'avatar (privé) -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Upload d'Avatar (Privé)</h2>
      <UploadImageUpload
        :multiple="false"
        :max-size-m-b="2"
        bucket="avatars"
        :resize="true"
        :max-width="400"
        :max-height="400"
        :accepted-types="['image/png', 'image/jpeg', 'image/webp']"
        @upload-success="handleAvatarUpload"
        @upload-error="handleUploadError"
      />

      <!-- Affichage avatar actuel -->
      <div v-if="currentAvatar" class="mt-4">
        <h3 class="text-lg font-medium mb-2">Avatar actuel :</h3>
        <img
          :src="avatarUrl"
          alt="Avatar"
          class="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
        />
      </div>
    </section>

    <!-- Upload manuel avec prévisualisation -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Upload Manuel</h2>
      <UploadImageUpload
        ref="manualUpload"
        :multiple="true"
        :auto-upload="false"
        bucket="images"
        @files-selected="handleFilesSelected"
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
      />

      <div v-if="selectedFiles.length > 0" class="mt-4 space-x-2">
        <button
          @click="uploadManually"
          :disabled="isUploading"
          class="btn btn-primary"
        >
          {{ isUploading ? "Upload en cours..." : "Uploader les fichiers" }}
        </button>
        <button @click="clearManualUpload" class="btn btn-outline">
          Annuler
        </button>
      </div>
    </section>

    <!-- Galerie des images uploadées -->
    <section
      v-if="uploadedImages.length > 0"
      class="bg-white p-6 rounded-lg shadow"
    >
      <h2 class="text-xl font-semibold mb-4">Images Uploadées</h2>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div
          v-for="image in uploadedImages"
          :key="image.path"
          class="group relative"
        >
          <img
            :src="image.publicUrl"
            :alt="image.path"
            class="w-full h-24 object-cover rounded-lg border hover:shadow-md transition-shadow duration-200"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <div class="opacity-0 group-hover:opacity-100 space-x-2">
              <button
                @click="copyImageUrl(image.publicUrl)"
                class="btn btn-sm btn-circle btn-ghost text-white"
                title="Copier URL"
              >
                📋
              </button>
              <button
                @click="deleteImage(image.path)"
                class="btn btn-sm btn-circle btn-ghost text-white"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Messages -->
    <div v-if="message" class="fixed bottom-4 right-4 z-50">
      <div
        :class="{
          'alert-success': messageType === 'success',
          'alert-error': messageType === 'error',
          'alert-info': messageType === 'info',
        }"
        class="alert shadow-lg"
      >
        <span>{{ message }}</span>
        <button @click="clearMessage" class="btn btn-sm btn-ghost">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadResult } from "~/composables/useImageUpload";

// Composables
const { deleteImage: deleteStorageImage, getSignedUrl } = useImageUpload();

// État réactif
const uploadedImages = ref<UploadResult[]>([]);
const selectedFiles = ref<File[]>([]);
const isUploading = ref(false);
const message = ref("");
const messageType = ref<"success" | "error" | "info">("info");
const currentAvatar = ref<UploadResult | null>(null);
const avatarUrl = ref("");

// Références
const manualUpload = ref();

// Méthodes
const handleUploadSuccess = (results: UploadResult[]) => {
  uploadedImages.value.push(...results);
  showMessage(
    `${results.length} image(s) uploadée(s) avec succès !`,
    "success",
  );
};

const handleUploadError = (error: Error) => {
  showMessage(`Erreur d'upload: ${error.message}`, "error");
};

const handleAvatarUpload = async (results: UploadResult[]) => {
  currentAvatar.value = results[0];
  // Pour un bucket privé, on a besoin d'une URL signée
  try {
    avatarUrl.value = await getSignedUrl(results[0].path, "avatars");
    showMessage("Avatar mis à jour !", "success");
  } catch (error) {
    showMessage("Erreur lors de la récupération de l'avatar", "error");
  }
};

const handleFilesSelected = (files: File[]) => {
  selectedFiles.value = files;
};

const uploadManually = async () => {
  if (manualUpload.value) {
    isUploading.value = true;
    try {
      await manualUpload.value.uploadFiles();
    } finally {
      isUploading.value = false;
      selectedFiles.value = [];
    }
  }
};

const clearManualUpload = () => {
  if (manualUpload.value) {
    manualUpload.value.clearPreviews();
  }
  selectedFiles.value = [];
};

const copyImageUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    showMessage("URL copiée dans le presse-papiers !", "success");
  } catch (error) {
    showMessage("Erreur lors de la copie", "error");
  }
};

const deleteImage = async (path: string) => {
  try {
    await deleteStorageImage(path);
    uploadedImages.value = uploadedImages.value.filter(
      (img) => img.path !== path,
    );
    showMessage("Image supprimée !", "success");
  } catch (error) {
    showMessage("Erreur lors de la suppression", "error");
  }
};

const showMessage = (text: string, type: "success" | "error" | "info") => {
  message.value = text;
  messageType.value = type;

  // Auto-hide après 5 secondes
  setTimeout(() => {
    clearMessage();
  }, 5000);
};

const clearMessage = () => {
  message.value = "";
};

// Meta
definePageMeta({
  title: "Upload d'Images - Exemples",
  description:
    "Exemples d'utilisation du système d'upload d'images avec Supabase",
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
