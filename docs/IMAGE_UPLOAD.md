# 📸 Système d'Upload d'Images avec Supabase

Ce guide explique comment utiliser le système d'upload d'images intégré à votre application Nuxt avec Supabase Storage.

## 🚀 Configuration

### 1. Buckets Supabase

Deux buckets sont configurés dans `supabase/config.toml` :

- **`images`** : Bucket public pour les images générales
- **`avatars`** : Bucket privé pour les avatars utilisateurs

```toml
[storage.buckets.images]
public = true
file_size_limit = "50MiB"
allowed_mime_types = ["image/png", "image/jpeg", "image/webp", "image/gif"]

[storage.buckets.avatars]
public = false
file_size_limit = "10MiB"
allowed_mime_types = ["image/png", "image/jpeg", "image/webp"]
```

### 2. Variables d'environnement

Assurez-vous que vos variables Supabase sont configurées :

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SERVICE_SUPABASE_ANON_KEY=your-supabase-service-key
```

## 🛠️ Utilisation

### Composable `useImageUpload`

Le composable principal pour gérer les uploads :

```typescript
const { 
  uploadImage, 
  uploadMultipleImages, 
  getImageUrl, 
  getSignedUrl,
  deleteImage,
  resizeImage 
} = useImageUpload()
```

#### Upload simple

```typescript
const uploadSingle = async (file: File) => {
  try {
    const result = await uploadImage(file, {
      bucket: 'images',
      maxSize: 10, // 10MB
      allowedTypes: ['image/png', 'image/jpeg']
    })
    
    console.log('Image uploadée:', result.publicUrl)
  } catch (error) {
    console.error('Erreur:', error.message)
  }
}
```

#### Upload multiple

```typescript
const uploadMultiple = async (files: File[]) => {
  try {
    const results = await uploadMultipleImages(files, {
      bucket: 'images',
      maxSize: 5
    })
    
    console.log('Images uploadées:', results.map(r => r.publicUrl))
  } catch (error) {
    console.error('Erreur:', error.message)
  }
}
```

#### Upload avec redimensionnement

```typescript
const uploadWithResize = async (file: File) => {
  try {
    // Redimensionner avant upload
    const resizedFile = await resizeImage(file, 1200, 800, 0.8)
    
    const result = await uploadImage(resizedFile, {
      bucket: 'images'
    })
    
    console.log('Image redimensionnée et uploadée:', result.publicUrl)
  } catch (error) {
    console.error('Erreur:', error.message)
  }
}
```

### Composant `UploadImageUpload`

Composant Vue prêt à l'emploi avec interface drag & drop :

#### Usage basique

```vue
<template>
  <UploadImageUpload
    @upload-success="handleSuccess"
    @upload-error="handleError"
  />
</template>

<script setup>
const handleSuccess = (results) => {
  console.log('Upload réussi:', results)
}

const handleError = (error) => {
  console.error('Erreur upload:', error.message)
}
</script>
```

#### Upload multiple avec redimensionnement

```vue
<template>
  <UploadImageUpload
    :multiple="true"
    :resize="true"
    :max-width="1200"
    :max-height="800"
    :quality="0.8"
    bucket="images"
    @upload-success="handleSuccess"
  />
</template>
```

#### Upload d'avatar (bucket privé)

```vue
<template>
  <UploadImageUpload
    bucket="avatars"
    :multiple="false"
    :max-size-m-b="2"
    :resize="true"
    :max-width="400"
    :max-height="400"
    @upload-success="handleAvatarUpload"
  />
</template>

<script setup>
const { getSignedUrl } = useImageUpload()

const handleAvatarUpload = async (results) => {
  // Pour un bucket privé, récupérer une URL signée
  const signedUrl = await getSignedUrl(results[0].path, 'avatars')
  console.log('Avatar URL:', signedUrl)
}
</script>
```

### Props du composant

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `bucket` | string | 'images' | Nom du bucket Supabase |
| `maxSizeMB` | number | 50 | Taille max en MB |
| `acceptedTypes` | string[] | ['image/png', 'image/jpeg', 'image/webp', 'image/gif'] | Types MIME acceptés |
| `multiple` | boolean | false | Upload multiple |
| `disabled` | boolean | false | Désactiver l'upload |
| `autoUpload` | boolean | true | Upload automatique |
| `resize` | boolean | false | Redimensionnement auto |
| `maxWidth` | number | 1920 | Largeur max (si resize) |
| `maxHeight` | number | 1080 | Hauteur max (si resize) |
| `quality` | number | 0.8 | Qualité JPEG (si resize) |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `upload-success` | `UploadResult[]` | Upload réussi |
| `upload-error` | `Error` | Erreur d'upload |
| `files-selected` | `File[]` | Fichiers sélectionnés |

## 🔐 Gestion des permissions

### Buckets publics vs privés

- **Buckets publics** (`images`) : URLs directement accessibles
- **Buckets privés** (`avatars`) : Nécessitent des URLs signées

### Politiques RLS (Row Level Security)

Configurez les politiques dans Supabase Dashboard :

```sql
-- Permettre à tous les utilisateurs authentifiés d'uploader dans 'images'
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'images');

-- Permettre aux utilisateurs de voir leurs propres avatars
CREATE POLICY "Allow users to view own avatars" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 📱 Exemples complets

Consultez `/pages/examples/image-upload.vue` pour des exemples complets d'utilisation.

## 🎨 Personnalisation CSS

Le composant utilise des classes Tailwind CSS. Vous pouvez personnaliser l'apparence en surchargeant les classes :

```vue
<style>
.drop-zone {
  @apply border-purple-300 bg-purple-50;
}

.drop-zone--active {
  @apply border-purple-500 bg-purple-100;
}
</style>
```

## 🚨 Gestion d'erreurs

Les erreurs courantes et leurs solutions :

| Erreur | Cause | Solution |
|--------|-------|----------|
| "File too large" | Fichier > limite | Réduire taille ou augmenter limite |
| "Invalid file type" | Type non autorisé | Vérifier `acceptedTypes` |
| "Storage quota exceeded" | Quota Supabase dépassé | Nettoyer ancien fichiers |
| "Unauthorized" | Problème auth | Vérifier connexion utilisateur |

## 🔧 Commandes utiles

```bash
# Redémarrer Supabase local avec nouvelle config
supabase stop
supabase start

# Voir les buckets configurés
supabase storage ls

# Nettoyer un bucket
supabase storage rm --bucket images --recursive
```
