#!/bin/bash

# Migration Supabase CLI: tookanAI -> tookanAI-prod
# Utilise pg_dump et psql directement (sans Docker)

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Informations des projets
SOURCE_PROJECT_ID="dmwvccsjbfhzjyoajgyw"
DEST_PROJECT_ID="fkggvollieqtmatgajcg"
SOURCE_HOST="db.dmwvccsjbfhzjyoajgyw.supabase.co"
DEST_HOST="db.fkggvollieqtmatgajcg.supabase.co"
DB_NAME="postgres"
DB_USER="postgres"

echo -e "${BLUE}🚀 Migration Supabase: tookanAI -> tookanAI-prod${NC}"
echo "=================================================="
echo -e "${YELLOW}Source:${NC} $SOURCE_HOST"
echo -e "${YELLOW}Destination:${NC} $DEST_HOST"
echo ""

# Fonction pour obtenir le mot de passe
get_password() {
    local project_name=$1
    echo -e "${YELLOW}Entrez le mot de passe pour $project_name:${NC}"
    read -s password
    echo $password
}

# Étape 1: Exporter depuis la base source
echo -e "${BLUE}📤 Étape 1: Export depuis tookanAI${NC}"
SOURCE_PASSWORD=$(get_password "tookanAI")

echo "Export du schéma et des données..."
PGPASSWORD=$SOURCE_PASSWORD pg_dump \
    -h $SOURCE_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    --no-owner \
    --no-privileges \
    --clean \
    --if-exists \
    -f migration_tookanAI_to_prod.sql

echo -e "${GREEN}✅ Export terminé: migration_tookanAI_to_prod.sql${NC}"

# Étape 2: Se connecter au projet de destination avec Supabase CLI
echo -e "${BLUE}🔗 Étape 2: Connexion au projet de destination${NC}"
supabase link --project-ref $DEST_PROJECT_ID

# Étape 3: Importer vers la base de destination
echo -e "${BLUE}📥 Étape 3: Import vers tookanAI-prod${NC}"
DEST_PASSWORD=$(get_password "tookanAI-prod")

echo "Import du schéma et des données..."
PGPASSWORD=$DEST_PASSWORD psql \
    -h $DEST_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    -f migration_tookanAI_to_prod.sql

echo -e "${GREEN}✅ Import terminé${NC}"

# Étape 4: Vérification
echo -e "${BLUE}🔍 Étape 4: Vérification de la migration${NC}"

# Compter les tables dans la source
echo "Comptage des tables dans la source..."
SOURCE_TABLES=$(PGPASSWORD=$SOURCE_PASSWORD psql \
    -h $SOURCE_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')

# Compter les tables dans la destination
echo "Comptage des tables dans la destination..."
DEST_TABLES=$(PGPASSWORD=$DEST_PASSWORD psql \
    -h $DEST_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')

echo ""
echo -e "${YELLOW}Résultats de la vérification:${NC}"
echo "Tables dans tookanAI (source): $SOURCE_TABLES"
echo "Tables dans tookanAI-prod (destination): $DEST_TABLES"

if [ "$SOURCE_TABLES" -eq "$DEST_TABLES" ]; then
    echo -e "${GREEN}✅ Migration réussie! Le nombre de tables correspond.${NC}"
else
    echo -e "${RED}❌ Problème détecté: Le nombre de tables ne correspond pas.${NC}"
    echo "Vérifiez les logs pour plus de détails."
fi

# Nettoyage
echo -e "${BLUE}🧹 Nettoyage des fichiers temporaires...${NC}"
rm -f migration_tookanAI_to_prod.sql

echo ""
echo -e "${GREEN}🎉 Migration terminée!${NC}"
echo "=================================================="
echo -e "${GREEN}Votre base de données a été migrée de tookanAI vers tookanAI-prod${NC}"
echo ""
echo -e "${YELLOW}Prochaines étapes:${NC}"
echo "1. Mettre à jour la configuration de votre application"
echo "2. Tester votre application avec la nouvelle base"
echo "3. Mettre à jour les variables d'environnement"
