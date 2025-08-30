# Génération d'Images avec FLUX

Ce projet intègre la génération d'images IA via l'API Replicate et les modèles FLUX de Black Forest Labs.

## 🚀 Modèles disponibles

### FLUX-Schnell (Rapide)
- **Usage** : Génération d'images à partir de texte uniquement
- **Vitesse** : ~30-60 secondes
- **Coût** : ~0,003$ par image
- **Qualité** : Excellente pour la génération rapide

### FLUX-Kontext-Max (Modification)
- **Usage** : Modification d'images existantes avec prompt
- **Vitesse** : ~60-90 secondes  
- **Coût** : ~0,005$ par image
- **Qualité** : Très haute, idéal pour les modifications précises

## 📁 Structure des fichiers

```
server/api/replica/generate.post.ts     # API endpoint principal
composables/useImageGeneration.ts       # Composable Vue pour l'usage côté client
components/Learning/ImageGenerator.vue  # Composant réutilisable
pages/examples/image-generation.vue     # Page d'exemple complète
```

## 🔧 Configuration

### Variables d'environnement
Ajoutez dans votre `.env` :
```bash
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Installation
```bash
npm install replicate
```

## 💻 Usage

### 1. API Endpoint (`/api/replica/generate`)

**Génération simple :**
```javascript
const response = await $fetch('/api/replica/generate', {
  method: 'POST',
  body: {
    prompt: "A beautiful sunset over mountains, digital art style",
    aspect_ratio: "16:9",
    output_format: "webp"
  }
});
```

**Modification d'image :**
```javascript
const response = await $fetch('/api/replica/generate', {
  method: 'POST',
  body: {
    prompt: "Make the letters 3D, floating in space",
    input_image: "https://example.com/image.jpg",
    output_format: "webp"
  }
});
```

### 2. Composable `useImageGeneration()`

```vue
<script setup>
const { generateImage, generateQuickImage, isLoading, error } = useImageGeneration();

// Génération simple
const result = await generateQuickImage(
  "A colorful illustration of Turkish grammar", 
  "16:9"
);

// Génération avancée
const result = await generateImage({
  prompt: "Educational illustration showing Turkish verb conjugation",
  aspect_ratio: "1:1",
  output_format: "webp",
  guidance_scale: 4.0,
  num_inference_steps: 30
});
</script>
```

### 3. Composant `<ImageGenerator>`

```vue
<template>
  <ImageGenerator 
    :suggested-prompt="'Illustration for: ' + lessonTitle"
    :context="lessonTitle"
    @image-generated="onImageGenerated"
  />
</template>

<script setup>
const onImageGenerated = ({ url, prompt }) => {
  console.log('Image générée:', url);
  // Utiliser l'image dans votre leçon
};
</script>
```

## ⚙️ Options disponibles

### Formats d'image
- `webp` (recommandé) - Meilleure compression
- `jpg` - Compatible partout
- `png` - Avec transparence

### Ratios d'aspect
- `1:1` - Carré (Instagram, avatars)
- `16:9` - Paysage (bannières, présentations)  
- `9:16` - Portrait (stories, mobile)
- `4:3` - Standard (écrans classiques)

### Paramètres de qualité
- `guidance_scale` : 1-10 (3.5 par défaut)
  - Plus bas = plus créatif
  - Plus haut = plus fidèle au prompt
- `num_inference_steps` : 20-50 (28 par défaut)
  - Plus = meilleure qualité mais plus lent

## 💰 Coûts estimés

| Modèle | Coût par image | Temps moyen |
|--------|----------------|-------------|
| FLUX-Schnell | ~0,003$ | 30-60s |
| FLUX-Kontext-Max | ~0,005$ | 60-90s |

**Estimation mensuelle :**
- 100 images/mois : ~0,30-0,50$
- 500 images/mois : ~1,50-2,50$
- 1000 images/mois : ~3,00-5,00$

## 🎨 Conseils pour de bons prompts

### ✅ Bons exemples
```
"A colorful illustration showing Turkish students learning grammar, 
cartoon style, bright colors, educational setting"

"Modern flat design icon representing language learning, 
minimalist, blue and orange colors, clean lines"

"Turkish cultural scene with traditional elements, 
watercolor painting style, warm lighting"
```

### ❌ À éviter
```
"image"  # Trop vague
"photo realistic person"  # Problèmes de droits
"copyrighted character"  # Problèmes légaux
```

### 🔧 Modificateurs utiles
- **Style** : `cartoon style`, `flat design`, `watercolor`, `digital art`
- **Couleurs** : `vibrant colors`, `pastel tones`, `blue and white`
- **Éclairage** : `soft lighting`, `bright`, `warm tones`
- **Composition** : `clean composition`, `centered`, `simple background`

## 🔍 Débogage

### Erreurs communes

1. **Token manquant**
   ```
   Error: Missing REPLICATE_API_TOKEN
   ```
   → Vérifiez votre `.env`

2. **Prompt vide**
   ```
   Error: Missing prompt
   ```
   → Le champ `prompt` est requis

3. **Timeout**
   ```
   Error: Request timeout
   ```
   → Les images complexes prennent plus de temps

### Logs utiles
```javascript
// Dans server/api/replica/generate.post.ts
console.log('Generating with prompt:', body.prompt);
console.log('Model used:', result.model_used);
console.log('Generation time:', Date.now() - startTime);
```

## 🚀 Intégration dans votre app

Pour intégrer dans une page de création de leçon :

```vue
<template>
  <div class="lesson-creation">
    <!-- Votre contenu existant -->
    
    <div class="mt-8">
      <ImageGenerator 
        :suggested-prompt="generateSuggestedPrompt()"
        :context="lessonTitle"
        @image-generated="addImageToLesson"
      />
    </div>
  </div>
</template>

<script setup>
const lessonTitle = ref('');
const lessonImages = ref([]);

const generateSuggestedPrompt = () => {
  if (lessonTitle.value) {
    return `Educational illustration for "${lessonTitle.value}", colorful, engaging, Turkish language learning`;
  }
  return '';
};

const addImageToLesson = ({ url, prompt }) => {
  lessonImages.value.push({
    url,
    prompt,
    timestamp: new Date()
  });
};
</script>
```

## 📈 Monitoring et Analytics

Pour suivre l'usage :

```javascript
// Dans votre analytics
trackEvent('image_generation', {
  model_used: result.model_used,
  aspect_ratio: input.aspect_ratio,
  generation_time: generationTime,
  success: result.success
});
```

---

**Note :** Cette fonctionnalité utilise l'API Replicate. Consultez leurs [limites de taux](https://replicate.com/docs/reference/http#rate-limits) et [politique de prix](https://replicate.com/pricing) pour plus d'informations.
