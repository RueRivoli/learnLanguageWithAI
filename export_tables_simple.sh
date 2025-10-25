#!/bin/bash

# Script simplifié pour copier des tables spécifiques
set -e

# Couleurs pour l'affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Tables à exporter
TABLES=(
    "languages_support"
    "turkish_expressions"
    "turkish_grammar_rules"
    "turkish_words"
    "turkish_grammar_quizzes"
)

echo -e "${BLUE}🚀 Copie de tables spécifiques${NC}"
echo "=================================================="
echo -e "${YELLOW}Tables à copier:${NC}"
for table in "${TABLES[@]}"; do
    echo "  - $table"
done
echo ""

echo -e "${YELLOW}📋 Instructions:${NC}"
echo "1. Ce script va créer des fichiers CSV pour chaque table"
echo "2. Vous devrez ensuite les importer manuellement dans tookanAI-prod"
echo "3. Ou utiliser les fichiers CSV avec l'interface Supabase"
echo ""

read -p "Voulez-vous continuer ? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Annulé."
    exit 1
fi

# Informations de connexion
SOURCE_HOST="db.dmwvccsjbfhzjyoajgyw.supabase.co"
DB_NAME="postgres"
DB_USER="postgres"

echo -e "${YELLOW}Entrez le mot de passe pour tookanAI:${NC}"
read -s SOURCE_PASSWORD

echo ""
echo -e "${BLUE}📤 Export des données...${NC}"

for table in "${TABLES[@]}"; do
    echo "Export de: $table"
    
    # Export des données avec COPY
    PGPASSWORD=$SOURCE_PASSWORD psql \
        -h $SOURCE_HOST \
        -U $DB_USER \
        -d $DB_NAME \
        -c "\COPY $table TO '${table}_data.csv' WITH CSV HEADER;"
    
    echo -e "${GREEN}✅ $table exportée vers ${table}_data.csv${NC}"
done

echo ""
echo -e "${GREEN}🎉 Export terminé!${NC}"
echo "=================================================="
echo -e "${YELLOW}Fichiers CSV créés:${NC}"
for table in "${TABLES[@]}"; do
    echo "  - ${table}_data.csv"
done
echo ""
echo -e "${YELLOW}Prochaines étapes:${NC}"
echo "1. Vérifiez les fichiers CSV"
echo "2. Importez-les dans tookanAI-prod via:"
echo "   - Interface Supabase Dashboard"
echo "   - Ou utilisez psql avec \\COPY"
echo "3. Supprimez les fichiers CSV après import"
