#!/bin/bash

# Migration Supabase CLI: tookan_ai -> tookanai_prod
# Méthode recommandée avec db diff

set -e

echo "🚀 Migration Supabase CLI: tookan_ai -> tookanai_prod"
echo "=================================================="

# Étape 1: Se connecter au projet source
echo "📤 Étape 1: Connexion au projet source (tookan_ai)"
supabase link --project-ref dmwvccsjbfhzjyoajgyw

# Étape 2: Générer le diff et créer la migration
echo "🔍 Étape 2: Génération du diff de migration"
supabase db diff --linked --file migration_to_prod.sql

# Étape 3: Se connecter au projet de destination
echo "📥 Étape 3: Connexion au projet de destination (tookanai_prod)"
supabase link --project-ref fkggvollieqtmatgajcg

# Étape 4: Appliquer la migration
echo "✅ Étape 4: Application de la migration"
supabase db push --linked

echo "🎉 Migration terminée avec succès!"
echo "Votre base de données a été migrée de tookan_ai vers tookanai_prod"
