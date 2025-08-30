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
  @apply space-y-4;
}

.drop-zone {
  @apply border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-200 hover:border-gray-400 hover:bg-gray-50;
}

.drop-zone--active {
  @apply border-blue-500 bg-blue-50;
}

.drop-zone--error {
  @apply border-red-500 bg-red-50;
}

.drop-zone--disabled {
  @apply cursor-not-allowed opacity-60 hover:border-gray-300 hover:bg-transparent;
}

.drop-zone__content {
  @apply flex flex-col items-center justify-center space-y-2;
}

.loading-spinner {
  @apply w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin;
}

.preview-container {
  @apply mt-4;
}

.preview-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4;
}

.preview-item {
  @apply space-y-2;
}

.preview-image-wrapper {
  @apply relative group;
}

.preview-image {
  @apply w-full h-24 object-cover rounded-lg border;
}

.preview-remove-btn {
  @apply absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600;
}

.preview-name {
  @apply text-xs text-gray-600 truncate;
}

.results-container {
  @apply mt-4 p-4 bg-green-50 rounded-lg;
}

.results-list {
  @apply space-y-2;
}

.result-item {
  @apply flex items-center space-x-3 p-2 bg-white rounded border;
}

.result-thumbnail {
  @apply w-12 h-12 object-cover rounded;
}

.result-info {
  @apply flex-1 min-w-0;
}

.result-path {
  @apply text-sm text-gray-700 truncate;
}
</style>
