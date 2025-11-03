<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Génération d'Images avec FLUX
      </h1>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Générer une nouvelle image</h2>

        <form @submit.prevent="generateImage" class="space-y-4">
          <div>
            <label
              for="prompt"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Prompt de description
            </label>
            <textarea
              id="prompt"
              v-model="form.prompt"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Décrivez l'image que vous voulez générer..."
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                for="aspect_ratio"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Format
              </label>
              <select
                id="aspect_ratio"
                v-model="form.aspect_ratio"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1:1">Carré (1:1)</option>
                <option value="16:9">Paysage (16:9)</option>
                <option value="9:16">Portrait (9:16)</option>
                <option value="4:3">Standard (4:3)</option>
              </select>
            </div>

            <div>
              <label
                for="output_format"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Format de sortie
              </label>
              <select
                id="output_format"
                v-model="form.output_format"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="webp">WebP (recommandé)</option>
                <option value="jpg">JPEG</option>
                <option value="png">PNG</option>
              </select>
            </div>

            <div>
              <label
                for="guidance_scale"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Précision ({{ form.guidance_scale }})
              </label>
              <input
                id="guidance_scale"
                v-model="form.guidance_scale"
                type="range"
                min="1"
                max="10"
                step="0.5"
                class="w-full"
              />
            </div>
          </div>

          <div>
            <label
              for="input_image"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Image de base (optionnel - pour modification)
            </label>
            <input
              id="input_image"
              v-model="form.input_image"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://exemple.com/image.jpg"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Génération en cours...
            </span>
            <span v-else>Générer l'image</span>
          </button>
        </form>
      </div>

      <!-- Résultat -->
      <div v-if="result" class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Résultat</h2>

        <div v-if="result.success" class="space-y-4">
          <div class="flex justify-between items-center text-sm text-gray-600">
            <span>Modèle utilisé: {{ result.model_used }}</span>
            <a
              :href="result.image_url"
              target="_blank"
              class="text-blue-600 hover:text-blue-800"
            >
              Ouvrir dans un nouvel onglet
            </a>
          </div>

          <div class="border rounded-lg overflow-hidden">
            <img
              :src="result.image_url"
              :alt="form.prompt"
              class="w-full h-auto max-w-2xl mx-auto"
              @load="imageLoaded = true"
              @error="imageError = true"
            />
          </div>

          <div class="text-sm text-gray-600">
            <p><strong>Prompt utilisé:</strong> {{ lastPrompt }}</p>
          </div>
        </div>

        <div v-else class="text-red-600">
          <p><strong>Erreur:</strong> {{ result.error }}</p>
        </div>
      </div>

      <!-- Historique -->
      <div
        v-if="history.length > 0"
        class="mt-8 bg-white rounded-lg shadow-lg p-6"
      >
        <h2 class="text-xl font-semibold mb-4">Historique des générations</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(item, index) in history"
            :key="index"
            class="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              :src="item.image_url"
              :alt="item.prompt"
              class="w-full h-48 object-cover"
            />
            <div class="p-3">
              <p class="text-sm text-gray-600 truncate" :title="item.prompt">
                {{ item.prompt }}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                {{ item.model_used }} - {{ formatDate(item.timestamp) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuthToken } from "~/utils/auth/auth";

interface GenerateImageForm {
  prompt: string;
  aspect_ratio: string;
  output_format: string;
  guidance_scale: number;
  input_image?: string;
}

interface GenerateImageResult {
  success: boolean;
  image_url?: string;
  model_used?: string;
  error?: string;
}

interface HistoryItem extends GenerateImageResult {
  prompt: string;
  timestamp: Date;
}

const form = ref<GenerateImageForm>({
  prompt: "",
  aspect_ratio: "1:1",
  output_format: "webp",
  guidance_scale: 3.5,
  input_image: "",
});

const isLoading = ref(false);
const result = ref<GenerateImageResult | null>(null);
const lastPrompt = ref("");
const imageLoaded = ref(false);
const imageError = ref(false);
const history = ref<HistoryItem[]>([]);

const generateImage = async () => {
  if (!form.value.prompt.trim()) return;

  isLoading.value = true;
  result.value = null;
  imageLoaded.value = false;
  imageError.value = false;

  try {
    const requestBody: any = {
      prompt: form.value.prompt,
      aspect_ratio: form.value.aspect_ratio,
      output_format: form.value.output_format,
      guidance_scale: form.value.guidance_scale,
    };

    // Ajouter l'image d'entrée si elle est fournie
    if (form.value.input_image && form.value.input_image.trim()) {
      requestBody.input_image = form.value.input_image;
    }
    const headers = await getAuthToken();
    const response = await $fetch("/api/replica/generate", {
      headers,
      method: "POST",
      body: requestBody,
    });

    result.value = response;
    lastPrompt.value = form.value.prompt;

    // Ajouter à l'historique si succès
    if (response.success) {
      history.value.unshift({
        ...response,
        prompt: form.value.prompt,
        timestamp: new Date(),
      });

      // Limiter l'historique à 20 éléments
      if (history.value.length > 20) {
        history.value = history.value.slice(0, 20);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la génération:", error);
    result.value = {
      success: false,
      error: "Erreur de connexion au serveur",
    };
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Sauvegarder l'historique dans le localStorage
watch(
  history,
  (newHistory) => {
    if (process.client) {
      localStorage.setItem(
        "image-generation-history",
        JSON.stringify(newHistory),
      );
    }
  },
  { deep: true },
);

// Charger l'historique depuis le localStorage
onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem("image-generation-history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        history.value = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
      } catch (e) {
        console.error("Erreur lors du chargement de l'historique:", e);
      }
    }
  }
});

// Meta tags
useHead({
  title: "Génération d'Images avec FLUX",
  meta: [
    {
      name: "description",
      content:
        "Générez des images de haute qualité avec les modèles FLUX via Replicate",
    },
  ],
});
</script>
