#!/bin/bash

# Script pour générer des requêtes INSERT pour copier des tables spécifiques
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

# Informations de connexion
SOURCE_HOST="db.dmwvccsjbfhzjyoajgyw.supabase.co"
DB_NAME="postgres"
DB_USER="postgres"

echo -e "${BLUE}🚀 Génération des requêtes INSERT${NC}"
echo "=================================================="

# Fonction pour obtenir le mot de passe
get_password() {
    local project_name=$1
    echo -e "${YELLOW}Entrez le mot de passe pour $project_name:${NC}"
    read -s password
    echo $password
}

SOURCE_PASSWORD=$(get_password "tookanAI")

echo -e "${BLUE}📤 Génération des requêtes INSERT...${NC}"

for table in "${TABLES[@]}"; do
    echo "Génération des INSERT pour: $table"
    
    # Générer les requêtes INSERT
    PGPASSWORD=$SOURCE_PASSWORD psql \
        -h $SOURCE_HOST \
        -U $DB_USER \
        -d $DB_NAME \
        -c "SELECT 'INSERT INTO $table VALUES (' || string_agg(quote_literal(value), ', ') || ');' FROM (SELECT * FROM $table) t;" \
        -t > "${table}_inserts.sql"
    
    echo -e "${GREEN}✅ Requêtes générées dans ${table}_inserts.sql${NC}"
done

echo ""
echo -e "${YELLOW}📋 Instructions:${NC}"
echo "1. Vérifiez les fichiers *_inserts.sql générés"
echo "2. Connectez-vous à votre base de données tookanAI-prod"
echo "3. Exécutez les requêtes INSERT dans l'ordre"
echo ""
echo -e "${BLUE}Fichiers générés:${NC}"
for table in "${TABLES[@]}"; do
    echo "  - ${table}_inserts.sql"
done
