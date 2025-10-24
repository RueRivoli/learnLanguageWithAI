import { defineEventHandler } from "h3";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_ANON_KEY,
);

export default defineEventHandler(async (event) => {
  try {
    // Check environment variables
    const envCheck = {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SERVICE_SUPABASE_ANON_KEY: !!process.env.SERVICE_SUPABASE_ANON_KEY,
      REPLICATE_API_TOKEN: !!process.env.REPLICATE_API_TOKEN,
      SUPABASE_BUCKET_NAME: process.env.SUPABASE_BUCKET_NAME || 'images'
    };

    // Check if Supabase connection works
    let supabaseConnection = false;
    let buckets: any[] = [];
    
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (!error) {
        supabaseConnection = true;
        buckets = data || [];
      }
    } catch (error) {
      console.error('Supabase connection error:', error);
    }

    // Check if the images bucket exists
    const bucketExists = buckets.some(bucket => bucket.name === envCheck.SUPABASE_BUCKET_NAME);
    const bucketIsPublic = buckets.find(bucket => bucket.name === envCheck.SUPABASE_BUCKET_NAME)?.public;

    return {
      success: true,
      environment: envCheck,
      supabase: {
        connected: supabaseConnection,
        buckets: buckets.map(b => ({ name: b.name, public: b.public })),
        targetBucket: envCheck.SUPABASE_BUCKET_NAME,
        bucketExists,
        bucketIsPublic
      },
      recommendations: [
        ...(!envCheck.SUPABASE_URL ? ['Set SUPABASE_URL environment variable'] : []),
        ...(!envCheck.SERVICE_SUPABASE_ANON_KEY ? ['Set SERVICE_SUPABASE_ANON_KEY environment variable'] : []),
        ...(!envCheck.REPLICATE_API_TOKEN ? ['Set REPLICATE_API_TOKEN environment variable'] : []),
        ...(!supabaseConnection ? ['Check Supabase connection and credentials'] : []),
        ...(!bucketExists ? [`Create '${envCheck.SUPABASE_BUCKET_NAME}' bucket in Supabase`] : []),
        ...(bucketExists && !bucketIsPublic ? [`Make '${envCheck.SUPABASE_BUCKET_NAME}' bucket public`] : [])
      ]
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      environment: {
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        SERVICE_SUPABASE_ANON_KEY: !!process.env.SERVICE_SUPABASE_ANON_KEY,
        REPLICATE_API_TOKEN: !!process.env.REPLICATE_API_TOKEN,
        SUPABASE_BUCKET_NAME: process.env.SUPABASE_BUCKET_NAME || 'images'
      }
    };
  }
});
