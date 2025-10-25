#!/bin/bash

# Database Migration Script: tookan_ai -> tookanai_prod
# This script migrates your database from the development environment to production

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Database connection details
SOURCE_HOST="db.dmwvccsjbfhzjyoajgyw.supabase.co"
TARGET_HOST="db.fkggvollieqtmatgajcg.supabase.co"
DB_NAME="postgres"
DB_USER="postgres"

echo -e "${GREEN}🚀 Starting Database Migration: tookan_ai -> tookanai_prod${NC}"
echo "=================================================="

# Function to prompt for password
get_password() {
    local host=$1
    echo -e "${YELLOW}Enter password for $host:${NC}"
    read -s password
    echo $password
}

# Step 1: Export from source database
echo -e "${YELLOW}📤 Step 1: Exporting from source database (tookan_ai)${NC}"
echo "Source: $SOURCE_HOST"

# Get source password
SOURCE_PASSWORD=$(get_password $SOURCE_HOST)

# Export schema
echo "Exporting schema..."
PGPASSWORD=$SOURCE_PASSWORD pg_dump \
    -h $SOURCE_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    --schema-only \
    --no-owner \
    --no-privileges \
    -f schema_backup.sql

# Export data
echo "Exporting data..."
PGPASSWORD=$SOURCE_PASSWORD pg_dump \
    -h $SOURCE_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    --data-only \
    --no-owner \
    --no-privileges \
    -f data_backup.sql

# Export complete backup
echo "Creating complete backup..."
PGPASSWORD=$SOURCE_PASSWORD pg_dump \
    -h $SOURCE_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    --no-owner \
    --no-privileges \
    -f complete_backup.sql

echo -e "${GREEN}✅ Export completed successfully${NC}"

# Step 2: Import to target database
echo -e "${YELLOW}📥 Step 2: Importing to target database (tookanai_prod)${NC}"
echo "Target: $TARGET_HOST"

# Get target password
TARGET_PASSWORD=$(get_password $TARGET_HOST)

# Import schema
echo "Importing schema..."
PGPASSWORD=$TARGET_PASSWORD psql \
    -h $TARGET_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    -f schema_backup.sql

# Import data
echo "Importing data..."
PGPASSWORD=$TARGET_PASSWORD psql \
    -h $TARGET_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    -f data_backup.sql

echo -e "${GREEN}✅ Import completed successfully${NC}"

# Step 3: Verification
echo -e "${YELLOW}🔍 Step 3: Verifying migration${NC}"

# Count tables in source
echo "Counting tables in source database..."
SOURCE_TABLES=$(PGPASSWORD=$SOURCE_PASSWORD psql \
    -h $SOURCE_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")

# Count tables in target
echo "Counting tables in target database..."
TARGET_TABLES=$(PGPASSWORD=$TARGET_PASSWORD psql \
    -h $TARGET_HOST \
    -U $DB_USER \
    -d $DB_NAME \
    -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")

echo "Source tables: $SOURCE_TABLES"
echo "Target tables: $TARGET_TABLES"

if [ "$SOURCE_TABLES" -eq "$TARGET_TABLES" ]; then
    echo -e "${GREEN}✅ Table count matches!${NC}"
else
    echo -e "${RED}❌ Table count mismatch!${NC}"
    exit 1
fi

# Clean up backup files
echo -e "${YELLOW}🧹 Cleaning up backup files...${NC}"
rm -f schema_backup.sql data_backup.sql complete_backup.sql

echo -e "${GREEN}🎉 Migration completed successfully!${NC}"
echo "=================================================="
echo -e "${GREEN}Your database has been migrated from tookan_ai to tookanai_prod${NC}"
echo ""
echo "Next steps:"
echo "1. Update your application configuration to use the new database URL"
echo "2. Test your application with the new database"
echo "3. Update environment variables in your deployment"
