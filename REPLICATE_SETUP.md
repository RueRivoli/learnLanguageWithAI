# 🚀 Configuration Replicate pour la génération d'images

## ✅ Ce qui a été implémenté

1. **API Endpoint** : `/api/replica/generate`
2. **Composable Vue** : `useImageGeneration()`  
3. **Composant réutilisable** : `<ImageGenerator>`
4. **Pages de test** : 
   - `/examples/image-generation` (complète)
   - `/examples/quick-image-test` (test rapide)

## 🔧 Configuration requise

### 1. Token Replicate API

1. Créez un compte sur [Replicate.com](https://replicate.com)
2. Allez dans [Account Settings > API Tokens](https://replicate.com/account/api-tokens)
3. Créez un nouveau token
4. Ajoutez-le dans votre `.env` :

```bash
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. Vérification de l'installation

Le package `replicate` est déjà installé. Si besoin :
```bash
npm install replicate
```

## 🧪 Test rapide

### Option 1 : Page de test simple
Visitez : `http://localhost:3000/examples/quick-image-test`

### Option 2 : Test API direct
```bash
curl -X POST http://localhost:3000/api/replica/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A colorful illustration of Turkish language learning",
    "aspect_ratio": "16:9",
    "output_format": "webp"
  }'
```

### Option 3 : Page complète
Visitez : `http://localhost:3000/examples/image-generation`

## 💰 Coûts

- **FLUX-Schnell** : ~0,003$ par image (30-60s)
- **FLUX-Kontext-Max** : ~0,005$ par image (60-90s)

**Budget test** : 1$ = ~300 images avec FLUX-Schnell

## 🎯 Utilisation dans votre app

### Dans une page Vue :
```vue
<template>
  <div>
    <!-- Votre contenu -->
    
    <ImageGenerator 
      :suggested-prompt="'Illustration for: ' + lessonTitle"
      :context="lessonTitle"
      @image-generated="onImageGenerated"
    />
  </div>
</template>

<script setup>
const lessonTitle = ref('Turkish Grammar Lesson');

const onImageGenerated = ({ url, prompt }) => {
  console.log('Image générée:', url);
  // Utiliser l'URL dans votre leçon
};
</script>
```

### Avec le composable :
```vue
<script setup>
const { generateQuickImage, isLoading } = useImageGeneration();

const generateLessonImage = async () => {
  const result = await generateQuickImage(
    "Educational illustration about Turkish verbs", 
    "16:9"
  );
  
  if (result.success) {
    console.log('Image URL:', result.image_url);
  }
};
</script>
```

## 🔍 Débogage

### Erreurs communes :

1. **"Missing REPLICATE_API_TOKEN"**
   → Vérifiez votre `.env`

2. **"Missing prompt"**  
   → Le champ `prompt` est requis dans la requête

3. **Timeout ou erreur réseau**
   → La génération peut prendre 30-90 secondes

### Logs utiles :
Regardez la console de votre serveur Nuxt pour les logs de génération.

## 📝 Prochaines étapes

1. **Testez** avec la page `/examples/quick-image-test`
2. **Intégrez** le composant `<ImageGenerator>` dans vos pages de création de leçons
3. **Personnalisez** les prompts selon votre contenu éducatif
4. **Optimisez** les coûts en choisissant les bons paramètres

## 🎨 Conseils pour de bons prompts

```javascript
// ✅ Bon
"Educational illustration showing Turkish grammar rules, 
colorful, clean design, cartoon style"

// ✅ Encore mieux  
"Vibrant illustration of Turkish students learning verb conjugation, 
modern flat design, blue and orange colors, educational setting"

// ❌ Éviter
"image" // Trop vague
"realistic photo of person" // Problèmes de droits
```

---

**Ready to test?** 🚀 Visitez `/examples/quick-image-test` pour commencer !
