# Database Migration Guide: tookan_ai → tookanai_prod

## Overview
This guide will help you migrate your database from the development environment (`tookan_ai`) to the production environment (`tookanai_prod`) using Supabase CLI and PostgreSQL tools.

## Prerequisites
- Supabase CLI installed
- PostgreSQL client tools (`pg_dump`, `psql`) installed
- Access to both database projects
- Database passwords for both environments

## Database Information
- **Source Database**: `tookan_ai` (dmwvccsjbfhzjyoajgyw)
  - Host: `db.dmwvccsjbfhzjyoajgyw.supabase.co`
  - Version: PostgreSQL 15.8.1.126
  - Region: Southeast Asia (Singapore)

- **Target Database**: `tookanai_prod` (fkggvollieqtmatgajcg)
  - Host: `db.fkggvollieqtmatgajcg.supabase.co`
  - Version: PostgreSQL 17.6.1.025
  - Region: West US (North California)

## Migration Methods

### Method 1: Automated Script (Recommended)
Run the provided migration script:

```bash
./migrate_database.sh
```

This script will:
1. Export schema and data from source database
2. Import schema and data to target database
3. Verify the migration was successful
4. Clean up temporary files

### Method 2: Manual Step-by-Step

#### Step 1: Export from Source Database

**Export Schema Only:**
```bash
pg_dump -h db.dmwvccsjbfhzjyoajgyw.supabase.co \
        -U postgres \
        -d postgres \
        --schema-only \
        --no-owner \
        --no-privileges \
        -f schema_backup.sql
```

**Export Data Only:**
```bash
pg_dump -h db.dmwvccsjbfhzjyoajgyw.supabase.co \
        -U postgres \
        -d postgres \
        --data-only \
        --no-owner \
        --no-privileges \
        -f data_backup.sql
```

**Export Complete Database:**
```bash
pg_dump -h db.dmwvccsjbfhzjyoajgyw.supabase.co \
        -U postgres \
        -d postgres \
        --no-owner \
        --no-privileges \
        -f complete_backup.sql
```

#### Step 2: Import to Target Database

**Import Schema:**
```bash
psql -h db.fkggvollieqtmatgajcg.supabase.co \
     -U postgres \
     -d postgres \
     -f schema_backup.sql
```

**Import Data:**
```bash
psql -h db.fkggvollieqtmatgajcg.supabase.co \
     -U postgres \
     -d postgres \
     -f data_backup.sql
```

#### Step 3: Verification

**Count Tables:**
```bash
# Source database
psql -h db.dmwvccsjbfhzjyoajgyw.supabase.co \
     -U postgres \
     -d postgres \
     -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"

# Target database
psql -h db.fkggvollieqtmatgajcg.supabase.co \
     -U postgres \
     -d postgres \
     -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"
```

**Check Data Integrity:**
```bash
# Compare row counts for each table
psql -h db.dmwvccsjbfhzjyoajgyw.supabase.co \
     -U postgres \
     -d postgres \
     -c "SELECT schemaname,tablename,n_tup_ins-n_tup_del as rowcount FROM pg_stat_user_tables ORDER BY tablename;"
```

### Method 3: Using Supabase CLI (When Docker is Available)

If you have Docker running, you can use Supabase CLI:

```bash
# Link to source project
supabase link --project-ref dmwvccsjbfhzjyoajgyw

# Dump from source
supabase db dump --linked --file source_backup.sql

# Link to target project
supabase link --project-ref fkggvollieqtmatgajcg

# Push to target
supabase db push --linked
```

## Post-Migration Steps

### 1. Update Application Configuration

Update your environment variables to point to the new production database:

```bash
# Old configuration
SUPABASE_URL=https://dmwvccsjbfhzjyoajgyw.supabase.co
SUPABASE_ANON_KEY=your_old_anon_key

# New configuration
SUPABASE_URL=https://fkggvollieqtmatgajcg.supabase.co
SUPABASE_ANON_KEY=your_new_anon_key
```

### 2. Update Supabase Project Link

```bash
supabase link --project-ref fkggvollieqtmatgajcg
```

### 3. Test Your Application

1. Start your development server
2. Test all major functionality
3. Verify data is loading correctly
4. Check that all API endpoints work

### 4. Update Deployment Configuration

Update your production deployment with the new database credentials.

## Troubleshooting

### Common Issues

1. **Permission Errors**: Make sure you have the correct database passwords
2. **Connection Timeouts**: Check your network connection and firewall settings
3. **Schema Conflicts**: If tables already exist, you may need to drop them first
4. **Version Differences**: The target database is PostgreSQL 17 vs 15 in source

### Rollback Plan

If something goes wrong, you can restore from the backup:

```bash
psql -h db.dmwvccsjbfhzjyoajgyw.supabase.co \
     -U postgres \
     -d postgres \
     -f complete_backup.sql
```

## Security Notes

- Never commit database passwords to version control
- Use environment variables for sensitive information
- Consider using connection pooling for production
- Enable SSL connections in production

## Support

If you encounter issues during migration:
1. Check the Supabase documentation
2. Review the migration logs
3. Contact Supabase support if needed
4. Consider using the Supabase dashboard for manual operations
