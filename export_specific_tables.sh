#!/bin/bash

# Script pour exporter des tables spécifiques de tookanAI vers tookanAI-prod
set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
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

# Informations de connexion
SOURCE_HOST="db.dmwvccsjbfhzjyoajgyw.supabase.co"
TARGET_HOST="db.fkggvollieqtmatgajcg.supabase.co"
DB_NAME="postgres"
DB_USER="postgres"

echo -e "${BLUE}🚀 Export/Import de tables spécifiques${NC}"
echo "=================================================="
echo -e "${YELLOW}Tables à traiter:${NC}"
for table in "${TABLES[@]}"; do
    echo "  - $table"
done
echo ""

# Fonction pour obtenir le mot de passe
get_password() {
    local project_name=$1
    echo -e "${YELLOW}Entrez le mot de passe pour $project_name:${NC}"
    read -s password
    echo $password
}

# Étape 1: Export des données
echo -e "${BLUE}📤 Étape 1: Export des données depuis tookanAI${NC}"
SOURCE_PASSWORD=$(get_password "tookanAI")

for table in "${TABLES[@]}"; do
    echo "Export de la table: $table"
    
    # Export des données avec COPY
    PGPASSWORD=$SOURCE_PASSWORD psql \
        -h $SOURCE_HOST \
        -U $DB_USER \
        -d $DB_NAME \
        -c "\COPY $table TO '${table}_data.csv' WITH CSV HEADER;"
    
    echo -e "${GREEN}✅ $table exportée vers ${table}_data.csv${NC}"
done

echo ""
echo -e "${BLUE}📥 Étape 2: Import des données vers tookanAI-prod${NC}"
TARGET_PASSWORD=$(get_password "tookanAI-prod")

for table in "${TABLES[@]}"; do
    echo "Import de la table: $table"
    
    # Import des données avec COPY
    PGPASSWORD=$TARGET_PASSWORD psql \
        -h $TARGET_HOST \
        -U $DB_USER \
        -d $DB_NAME \
        -c "\COPY $table FROM '${table}_data.csv' WITH CSV HEADER;"
    
    echo -e "${GREEN}✅ $table importée avec succès${NC}"
done

echo ""
echo -e "${BLUE}🔍 Étape 3: Vérification${NC}"
for table in "${TABLES[@]}"; do
    echo "Vérification de la table: $table"
    
    # Compter les lignes dans la source
    SOURCE_COUNT=$(PGPASSWORD=$SOURCE_PASSWORD psql \
        -h $SOURCE_HOST \
        -U $DB_USER \
        -d $DB_NAME \
        -t -c "SELECT COUNT(*) FROM $table;" | tr -d ' ')
    
    # Compter les lignes dans la destination
    TARGET_COUNT=$(PGPASSWORD=$TARGET_PASSWORD psql \
        -h $TARGET_HOST \
        -U $DB_USER \
        -d $DB_NAME \
        -t -c "SELECT COUNT(*) FROM $table;" | tr -d ' ')
    
    echo "  Source ($table): $SOURCE_COUNT lignes"
    echo "  Destination ($table): $TARGET_COUNT lignes"
    
    if [ "$SOURCE_COUNT" -eq "$TARGET_COUNT" ]; then
        echo -e "  ${GREEN}✅ $table: Migration réussie${NC}"
    else
        echo -e "  ${RED}❌ $table: Problème détecté${NC}"
    fi
done

echo ""
echo -e "${BLUE}🧹 Nettoyage des fichiers CSV...${NC}"
for table in "${TABLES[@]}"; do
    rm -f "${table}_data.csv"
done

echo ""
echo -e "${GREEN}🎉 Migration des tables spécifiques terminée!${NC}"
echo "=================================================="
