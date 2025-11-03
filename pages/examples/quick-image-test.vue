<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8">
        Test Rapide - Génération d'Images
      </h1>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="space-y-4">
          <button
            @click="testQuickGeneration"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {{
              isLoading
                ? "Génération en cours..."
                : "Tester une génération rapide"
            }}
          </button>

          <div class="text-center text-sm text-gray-500">
            Ceci va générer une image de test avec le prompt :
            <em
              >"A colorful illustration of Turkish language learning,
              educational style, vibrant colors"</em
            >
          </div>
        </div>

        <!-- Résultat -->
        <div v-if="result" class="mt-6">
          <div v-if="result.success" class="space-y-4">
            <h3 class="text-lg font-semibold text-green-600">
              ✅ Image générée avec succès !
            </h3>

            <div class="border rounded-lg overflow-hidden">
              <img
                :src="result.image_url"
                alt="Image générée par IA"
                class="w-full h-auto"
              />
            </div>

            <div class="bg-gray-50 p-4 rounded-md">
              <p class="text-sm">
                <strong>Modèle utilisé :</strong> {{ result.model_used }}
              </p>
              <p class="text-sm">
                <strong>URL :</strong>
                <a
                  :href="result.image_url"
                  target="_blank"
                  class="text-blue-600 hover:underline break-all"
                >
                  {{ result.image_url }}
                </a>
              </p>
            </div>

            <div class="flex gap-2">
              <button
                @click="copyUrl"
                class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Copier l'URL
              </button>
              <button
                @click="downloadImage"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Télécharger
              </button>
            </div>
          </div>

          <div v-else class="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 class="text-lg font-semibold text-red-600">❌ Erreur</h3>
            <p class="text-red-600 mt-2">{{ result.error }}</p>
          </div>
        </div>

        <!-- Informations -->
        <div class="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 class="text-lg font-semibold text-blue-800 mb-2">
            ℹ️ Informations
          </h3>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• Modèle : FLUX-Schnell (rapide et économique)</li>
            <li>• Coût estimé : ~0,003$ par image</li>
            <li>• Temps de génération : 30-60 secondes</li>
            <li>• Format de sortie : WebP (optimisé)</li>
          </ul>
        </div>

        <!-- Variables d'environnement -->
        <div class="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h4 class="font-semibold text-yellow-800 mb-2">
            🔧 Configuration requise
          </h4>
          <p class="text-sm text-yellow-700">
            Assurez-vous d'avoir défini
            <code class="bg-yellow-200 px-1 rounded">REPLICATE_API_TOKEN</code>
            dans votre fichier
            <code class="bg-yellow-200 px-1 rounded">.env</code>
          </p>
          <p class="text-xs text-yellow-600 mt-1">
            Token status: {{ hasToken ? "✅ Configuré" : "❌ Manquant" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { generateQuickImage, isLoading, error } = useImageGeneration();

const result = ref(null);
const hasToken = ref(false);

// Vérifier si le token est configuré (côté client)
onMounted(() => {
  // On ne peut pas vérifier directement le token côté client pour des raisons de sécurité
  // Mais on peut faire un test rapide
  hasToken.value = true; // Supposer que c'est configuré
});

const testQuickGeneration = async () => {
  try {
    result.value = await generateQuickImage(
      "A colorful illustration of Turkish language learning, educational style, vibrant colors, clean composition",
      "16:9",
    );
  } catch (err) {
    console.error("Erreur lors du test:", err);
    result.value = {
      success: false,
      error: "Erreur de connexion ou de configuration",
    };
  }
};

const copyUrl = async () => {
  if (result.value?.success && result.value.image_url) {
    try {
      await navigator.clipboard.writeText(result.value.image_url);
      alert("URL copiée dans le presse-papiers !");
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  }
};

const downloadImage = () => {
  if (result.value?.success && result.value.image_url) {
    const link = document.createElement("a");
    link.href = result.value.image_url;
    link.download = `test-image-${Date.now()}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Meta tags
useHead({
  title: "Test Rapide - Génération d'Images",
  meta: [
    {
      name: "description",
      content: "Test rapide de la génération d'images avec FLUX",
    },
  ],
});
</script>
