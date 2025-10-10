-- Migration: Add Token Payment System
-- Description: Adds token-based payment functionality to the profiles table
-- Date: 2024

-- Add token-related columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS tokens_available NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS tokens_purchased_total NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_token_purchase_date TIMESTAMP WITH TIME ZONE;

-- Create index for faster token balance lookups
CREATE INDEX IF NOT EXISTS idx_profiles_tokens_available ON profiles(tokens_available);

-- Set 2 free tokens for existing users
UPDATE profiles 
SET tokens_available = 2 
WHERE tokens_available = 0 OR tokens_available IS NULL;

-- Function to give free tokens to new users
CREATE OR REPLACE FUNCTION give_free_tokens_to_new_users()
RETURNS TRIGGER AS $$
BEGIN
  -- Give 2 free tokens to new users
  IF NEW.tokens_available IS NULL THEN
    NEW.tokens_available := 2;
  END IF;
  
  IF NEW.tokens_purchased_total IS NULL THEN
    NEW.tokens_purchased_total := 0;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically give free tokens to new users
DROP TRIGGER IF EXISTS trigger_give_free_tokens ON profiles;
CREATE TRIGGER trigger_give_free_tokens
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION give_free_tokens_to_new_users();

-- Optional: Create a function to check if user has enough tokens
CREATE OR REPLACE FUNCTION has_enough_tokens(user_id UUID, required_tokens NUMERIC)
RETURNS BOOLEAN AS $$
DECLARE
  available_tokens NUMERIC;
BEGIN
  SELECT tokens_available INTO available_tokens
  FROM profiles
  WHERE id = user_id;
  
  RETURN available_tokens >= required_tokens;
END;
$$ LANGUAGE plpgsql;

-- Add comment to document the token system
COMMENT ON COLUMN profiles.tokens_available IS 'Number of tokens available for generating stories and quizzes. 1 token = 1 story + 2 quizzes';
COMMENT ON COLUMN profiles.tokens_purchased_total IS 'Total number of tokens purchased by the user (lifetime)';
COMMENT ON COLUMN profiles.last_token_purchase_date IS 'Timestamp of the last token purchase';

