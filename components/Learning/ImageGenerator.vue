<template>
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <div class="flex items-center gap-2 mb-4">
      <div class="p-2 bg-purple-100 rounded-lg">
        <svg
          class="w-5 h-5 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900">
        Générer une image illustrative
      </h3>
    </div>

    <form @submit.prevent="handleGenerate" class="space-y-4">
      <div>
        <label
          for="imagePrompt"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Description de l'image
        </label>
        <textarea
          id="imagePrompt"
          v-model="prompt"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          :placeholder="placeholderText"
          :disabled="isLoading"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label
            for="aspectRatio"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Format
          </label>
          <select
            id="aspectRatio"
            v-model="selectedAspectRatio"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            :disabled="isLoading"
          >
            <option value="1:1">Carré</option>
            <option value="16:9">Paysage</option>
            <option value="4:3">Standard</option>
          </select>
        </div>

        <div>
          <label
            for="quality"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Qualité
          </label>
          <select
            id="quality"
            v-model="selectedQuality"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            :disabled="isLoading"
          >
            <option value="fast">Rapide</option>
            <option value="balanced">Équilibré</option>
            <option value="high">Haute qualité</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        :disabled="!prompt.trim() || isLoading"
        class="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="isLoading" class="flex items-center justify-center">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Génération...
        </span>
        <span v-else> Générer l'image </span>
      </button>
    </form>

    <!-- Résultat -->
    <div v-if="result" class="mt-6">
      <div v-if="result.success && result.image_url" class="space-y-3">
        <div class="border rounded-lg overflow-hidden bg-gray-50">
          <img
            :src="result.image_url"
            :alt="lastPrompt"
            class="w-full h-auto"
            @load="
              $emit('imageGenerated', {
                url: result.image_url,
                prompt: lastPrompt,
              })
            "
          />
        </div>

        <div class="flex justify-between items-center text-sm text-gray-600">
          <span>{{ result.model_used }}</span>
          <div class="flex gap-2">
            <button
              @click="copyImageUrl"
              class="text-purple-600 hover:text-purple-800 font-medium"
            >
              Copier l'URL
            </button>
            <button
              @click="downloadImage"
              class="text-purple-600 hover:text-purple-800 font-medium"
            >
              Télécharger
            </button>
          </div>
        </div>
      </div>

      <div
        v-else-if="!result.success"
        class="p-4 bg-red-50 border border-red-200 rounded-md"
      >
        <p class="text-red-600 text-sm">
          <strong>Erreur :</strong> {{ result.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  suggestedPrompt?: string;
  context?: string; // Contexte de la leçon pour améliorer le prompt
}

interface Emits {
  (e: "imageGenerated", payload: { url: string; prompt: string }): void;
}

const props = withDefaults(defineProps<Props>(), {
  suggestedPrompt: "",
  context: "",
});

const emit = defineEmits<Emits>();

const { generateImage, isLoading, error } = useImageGeneration();

const prompt = ref(props.suggestedPrompt);
const selectedAspectRatio = ref<"1:1" | "16:9" | "4:3">("16:9");
const selectedQuality = ref<"fast" | "balanced" | "high">("balanced");
const result = ref(null);
const lastPrompt = ref("");

const placeholderText = computed(() => {
  if (props.context) {
    return `Ex: Une illustration pour "${props.context}" - une scène colorée et éducative...`;
  }
  return "Décrivez l'image que vous souhaitez générer...";
});

const qualitySettings = {
  fast: { guidance_scale: 2.5, num_inference_steps: 20 },
  balanced: { guidance_scale: 3.5, num_inference_steps: 28 },
  high: { guidance_scale: 4.5, num_inference_steps: 35 },
};

const handleGenerate = async () => {
  if (!prompt.value.trim()) return;

  const settings = qualitySettings[selectedQuality.value];

  // Améliorer le prompt avec le contexte si disponible
  let enhancedPrompt = prompt.value;
  if (
    props.context &&
    !prompt.value.toLowerCase().includes(props.context.toLowerCase())
  ) {
    enhancedPrompt = `${prompt.value}, related to ${props.context}, educational illustration style, vibrant colors, clean composition`;
  } else {
    enhancedPrompt = `${prompt.value}, educational illustration style, vibrant colors, clean composition`;
  }

  result.value = await generateImage({
    prompt: enhancedPrompt,
    aspect_ratio: selectedAspectRatio.value,
    output_format: "webp",
    ...settings,
  });

  lastPrompt.value = prompt.value;
};

const copyImageUrl = async () => {
  if (result.value?.success && result.value.image_url) {
    try {
      await navigator.clipboard.writeText(result.value.image_url);
      // Vous pourriez ajouter une notification de succès ici
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  }
};

const downloadImage = () => {
  if (result.value?.success && result.value.image_url) {
    const link = document.createElement("a");
    link.href = result.value.image_url;
    link.download = `generated-image-${Date.now()}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Mettre à jour le prompt quand la suggestion change
watch(
  () => props.suggestedPrompt,
  (newPrompt) => {
    if (newPrompt && !prompt.value) {
      prompt.value = newPrompt;
    }
  },
);
</script>
