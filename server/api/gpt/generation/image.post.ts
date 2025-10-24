import OpenAI from "openai";
import { defineEventHandler, readBody } from "h3";
import { getPromptForImageGeneration } from "../../../utils/gpt/image-generation";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../../utils/auth/supabaseClient";

const openai = new OpenAI();

export default defineEventHandler(async (event) => {
  try {
    const supabaseAuthToken = createSupabaseClientWithUserAuthTokenFromHeader(event)
    const body = await readBody(event);
    const userId = body.userId;
    if (!body.prompt) {
      throw new Error('Missing prompt');
    }
    console.log('gpt/generation/image.post', body)

    // Validate required environment variables
    if (!process.env.SUPABASE_URL || !process.env.SERVICE_SUPABASE_ANON_KEY) {
      throw new Error('Supabase configuration incomplete');
    }

    console.log('Generating image with GPT-Image-1...');
    const img = await openai.images.generate({
      model: "gpt-image-1",
      prompt: getPromptForImageGeneration(body.prompt),
      n: 1,
      size: body.size || "1024x1024"
    });

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(img.data[0].b64_json, "base64");
    console.log(`Image generated successfully, size: ${imageBuffer.length} bytes`);

    // Generate a unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const fileName = `${userId}/gpt_image_${timestamp}_${random}.png`;
    // Upload to Supabase storage
    const bucketName = process.env.SUPABASE_BUCKET_NAME || 'images';
    console.log(`Uploading image to Supabase storage: ${fileName} in bucket ${bucketName}`);

    const { data: uploadData, error: uploadError } = await supabaseAuthToken.storage
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
      const { data: buckets } = await supabaseAuthToken.storage.listBuckets();
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
    const { data: urlData } = supabaseAuthToken.storage
      .from(bucketName)
      .getPublicUrl(uploadData.path);

    const supabaseImageUrl = urlData.publicUrl;
    console.log('Supabase public URL generated:', supabaseImageUrl);

    // Update story if storyId is provided
    if (body.storyId) {
      try {
        await supabaseAuthToken
          .from("turkish_lessons")
          .update({ img_url: supabaseImageUrl })
          .eq("id", body.storyId);
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