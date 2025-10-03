import OpenAI from "openai";
import { defineEventHandler, readBody } from "h3";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.prompt) {
      throw new Error('Missing prompt');
    }

    // Validate required environment variables
    if (!process.env.SUPABASE_URL || !process.env.SERVICE_SUPABASE_KEY) {
      throw new Error('Supabase configuration incomplete');
    }

    console.log('Generating image with GPT-Image-1...');
    const img = await openai.images.generate({
      model: "gpt-image-1",
      prompt: body.prompt,
      n: 1,
      size: body.size || "1024x1024"
    });

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(img.data[0].b64_json, "base64");
    console.log(`Image generated successfully, size: ${imageBuffer.length} bytes`);

    // Generate a unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const fileName = `gpt_image_${timestamp}_${random}.png`;

    // Upload to Supabase storage
    const bucketName = process.env.SUPABASE_BUCKET_NAME || 'images';
    console.log(`Uploading image to Supabase storage: ${fileName} in bucket ${bucketName}`);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, imageBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/png'
      });

    if (uploadError) {
      console.error('Supabase upload error:', {
        message: uploadError.message,
        name: uploadError.name,
        stack: uploadError.stack
      });
      
      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      if (!bucketExists) {
        console.error(`Bucket '${bucketName}' does not exist. Available buckets:`, buckets?.map(b => b.name));
      }

      return {
        success: false,
        error: `Upload failed: ${uploadError.message}`,
        image_generated: true,
        image_size: imageBuffer.length
      };
    }

    console.log('Upload successful:', uploadData);

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(uploadData.path);

    const supabaseImageUrl = urlData.publicUrl;
    console.log('Supabase public URL generated:', supabaseImageUrl);

    // Update story if storyId is provided
    if (body.storyId) {
      try {
        await supabase
          .from("turkish_lessons")
          .update({ img_url: supabaseImageUrl })
          .eq("id", body.storyId);
        console.log(`Updated story ${body.storyId} with image URL`);
      } catch (updateError) {
        console.error('Error updating story:', updateError);
      }
    }

    return {
      success: true,
      image_url: supabaseImageUrl,
      image_path: uploadData.path,
      bucket: bucketName,
      model_used: "gpt-image-1",
      image_size: imageBuffer.length,
      prompt: body.prompt
    };

  } catch (error) {
    console.error('Error generating image with GPT:', error);
    return {
      success: false,
      error: error?.message ?? 'Unknown error'
    };
  }
});