<template>
  <div class="image-upload-container">
    <!-- Zone de drop -->
    <div
      ref="dropZone"
      class="drop-zone"
      :class="{
        'drop-zone--active': isDragOver,
        'drop-zone--error': hasError,
        'drop-zone--disabled': disabled || isUploading
      }"
      @drop="handleDrop"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @click="openFileDialog"
    >
      <!-- Input file caché -->
      <input
        ref="fileInput"
        type="file"
        :accept="acceptedTypes.join(',')"
        :multiple="multiple"
        :disabled="disabled || isUploading"
        class="hidden"
        @change="handleFileSelect"
      />

      <!-- Contenu de la zone de drop -->
      <div class="drop-zone__content">
        <div v-if="isUploading" class="upload-progress">
          <div class="loading-spinner"></div>
          <p class="text-sm text-gray-600">Upload en cours...</p>
        </div>

        <div v-else-if="hasError" class="error-state">
          <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500" />
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
          <button 
            @click.stop="clearError"
            class="btn btn-sm btn-outline btn-error mt-2"
          >
            Réessayer
          </button>
        </div>

        <div v-else class="upload-prompt">
          <Icon name="heroicons:cloud-arrow-up" class="w-12 h-12 text-gray-400" />
          <p class="text-lg font-medium text-gray-700">
            {{ multiple ? 'Glissez vos images ici' : 'Glissez votre image ici' }}
          </p>
          <p class="text-sm text-gray-500">
            ou cliquez pour sélectionner
          </p>
          <p class="text-xs text-gray-400 mt-2">
            {{ acceptedTypesText }} • Max {{ maxSizeMB }}MB
          </p>
        </div>
      </div>
    </div>

    <!-- Prévisualisation des images -->
    <div v-if="previewImages.length > 0" class="preview-container">
      <div class="preview-grid">
        <div
          v-for="(image, index) in previewImages"
          :key="index"
          class="preview-item"
        >
          <div class="preview-image-wrapper">
            <img
              :src="image.url"
              :alt="image.name"
              class="preview-image"
            />
            <button
              @click="removePreview(index)"
              class="preview-remove-btn"
              :disabled="isUploading"
            >
              <Icon name="heroicons:x-mark" class="w-4 h-4" />
            </button>
          </div>
          <p class="preview-name">{{ image.name }}</p>
        </div>
      </div>
    </div>

    <!-- Résultats d'upload -->
    <div v-if="uploadResults.length > 0" class="results-container">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Images uploadées :</h4>
      <div class="results-list">
        <div
          v-for="result in uploadResults"
          :key="result.path"
          class="result-item"
        >
          <img :src="result.publicUrl" :alt="result.path" class="result-thumbnail" />
          <div class="result-info">
            <p class="result-path">{{ result.path }}</p>
            <button
              @click="copyUrl(result.publicUrl)"
              class="btn btn-xs btn-outline"
            >
              Copier URL
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageUploadOptions, UploadResult } from '~/composables/useImageUpload'

interface Props {
  bucket?: string
  maxSizeMB?: number
  acceptedTypes?: string[]
  multiple?: boolean
  disabled?: boolean
  autoUpload?: boolean
  resize?: boolean
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

interface Emits {
  (e: 'upload-success', results: UploadResult[]): void
  (e: 'upload-error', error: Error): void
  (e: 'files-selected', files: File[]): void
}

const props = withDefaults(defineProps<Props>(), {
  bucket: 'images',
  maxSizeMB: 50,
  acceptedTypes: () => ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
  multiple: false,
  disabled: false,
  autoUpload: true,
  resize: false,
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.8
})

const emit = defineEmits<Emits>()

// Composables
const { uploadImage, uploadMultipleImages, resizeImage, validateFile } = useImageUpload()

// État réactif
const dropZone = ref<HTMLDivElement>()
const fileInput = ref<HTMLInputElement>()
const isDragOver = ref(false)
const isUploading = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const previewImages = ref<Array<{ url: string; name: string; file: File }>>([])
const uploadResults = ref<UploadResult[]>([])

// Propriétés calculées
const acceptedTypesText = computed(() => {
  return props.acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')
})

// Méthodes
const openFileDialog = () => {
  if (!props.disabled && !isUploading.value) {
    fileInput.value?.click()
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  processFiles(files)
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  if (props.disabled || isUploading.value) return
  
  const files = Array.from(event.dataTransfer?.files || [])
  processFiles(files)
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (!props.disabled && !isUploading.value) {
    isDragOver.value = true
  }
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  // Vérifier si on sort vraiment de la zone
  const rect = dropZone.value?.getBoundingClientRect()
  if (rect) {
    const x = event.clientX
    const y = event.clientY
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      isDragOver.value = false
    }
  }
}

const processFiles = async (files: File[]) => {
  try {
    clearError()
    
    // Valider les fichiers
    for (const file of files) {
      validateFile(file, {
        maxSize: props.maxSizeMB,
        allowedTypes: props.acceptedTypes
      })
    }

    // Créer les prévisualisations
    const previews = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file
    }))

    if (props.multiple) {
      previewImages.value.push(...previews)
    } else {
      previewImages.value = [previews[0]]
    }

    emit('files-selected', files)

    // Upload automatique si activé
    if (props.autoUpload) {
      await uploadFiles()
    }
  } catch (error) {
    showError(error as Error)
  }
}

const uploadFiles = async () => {
  try {
    isUploading.value = true
    clearError()

    let filesToUpload = previewImages.value.map(p => p.file)

    // Redimensionner si nécessaire
    if (props.resize) {
      filesToUpload = await Promise.all(
        filesToUpload.map(file => 
          resizeImage(file, props.maxWidth, props.maxHeight, props.quality)
        )
      )
    }

    // Options d'upload
    const uploadOptions: ImageUploadOptions = {
      bucket: props.bucket,
      maxSize: props.maxSizeMB,
      allowedTypes: props.acceptedTypes
    }

    // Upload
    const results = props.multiple 
      ? await uploadMultipleImages(filesToUpload, uploadOptions)
      : [await uploadImage(filesToUpload[0], uploadOptions)]

    uploadResults.value = results
    emit('upload-success', results)

    // Nettoyer les prévisualisations
    previewImages.value.forEach(preview => {
      URL.revokeObjectURL(preview.url)
    })
    previewImages.value = []

  } catch (error) {
    showError(error as Error)
  } finally {
    isUploading.value = false
  }
}

const removePreview = (index: number) => {
  const preview = previewImages.value[index]
  URL.revokeObjectURL(preview.url)
  previewImages.value.splice(index, 1)
}

const showError = (error: Error) => {
  hasError.value = true
  errorMessage.value = error.message
  emit('upload-error', error)
}

const clearError = () => {
  hasError.value = false
  errorMessage.value = ''
}

const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    // Vous pouvez ajouter une notification toast ici
  } catch (error) {
    console.error('Erreur copie URL:', error)
  }
}

// Méthodes exposées
defineExpose({
  uploadFiles,
  clearPreviews: () => {
    previewImages.value.forEach(preview => {
      URL.revokeObjectURL(preview.url)
    })
    previewImages.value = []
  },
  clearResults: () => {
    uploadResults.value = []
  }
})

// Nettoyage
onUnmounted(() => {
  previewImages.value.forEach(preview => {
    URL.revokeObjectURL(preview.url)
  })
})
</script>

<style scoped>
.image-upload-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.drop-zone {
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.drop-zone:hover {
  border-color: #9ca3af;
  background-color: #f9fafb;
}

.drop-zone--active {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.drop-zone--error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.drop-zone--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.drop-zone--disabled:hover {
  border-color: #d1d5db;
  background-color: transparent;
}

.drop-zone__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 4px solid #3b82f6;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.preview-container {
  margin-top: 1rem;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 640px) {
  .preview-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .preview-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.preview-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-image-wrapper {
  position: relative;
}

.preview-image-wrapper:hover {
  /* Group hover styles can be handled with CSS selectors */
}

.preview-image {
  width: 100%;
  height: 6rem;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.preview-remove-btn {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.preview-image-wrapper:hover .preview-remove-btn {
  opacity: 1;
}

.preview-remove-btn:hover {
  background-color: #dc2626;
}

.preview-name {
  font-size: 0.75rem;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.results-container {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f0fdf4;
  border-radius: 0.5rem;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
}

.result-thumbnail {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.25rem;
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-path {
  font-size: 0.875rem;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

