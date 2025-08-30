import { defineEventHandler, readBody } from "h3";
import { createClient } from "@supabase/supabase-js";
import Replicate from "replicate";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_SUPABASE_KEY,
);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    if (!body.prompt) {
      throw new Error('Missing prompt');
    }

    // Determine quality level and model to use
    const qualityLevel = body.quality_level || 'standard'; // 'fast', 'standard', 'high', 'ultra'
    const enableUpscaling = body.enable_upscaling || false;
    
    let modelName: string;
    let modelInput: any;

    // Base configuration
    const baseInput = {
      prompt: body.prompt,
      output_format: body.output_format || "png",
      aspect_ratio: body.aspect_ratio || "1:1",
      num_outputs: body.num_outputs || 1,
      seed: body.seed || Math.floor(Math.random() * 1000000)
    };

    // Choose model and configure parameters based on quality level
    switch (qualityLevel) {
      case 'fast':
        modelName = "black-forest-labs/flux-schnell";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 3.5,
          num_inference_steps: body.num_inference_steps || 4
        };
        break;
      case 'standard':
        modelName = "black-forest-labs/flux-dev";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 7.0,
          num_inference_steps: body.num_inference_steps || 28
        };
        break;
      case 'high':
        modelName = "black-forest-labs/flux-1.1-pro";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 7.5,
          num_inference_steps: body.num_inference_steps || 40
        };
        break;
      case 'ultra':
        modelName = "black-forest-labs/flux-1.1-pro-ultra";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 8.0,
          num_inference_steps: body.num_inference_steps || 50,
          output_quality: 100
        };
        break;
      default:
        modelName = "black-forest-labs/flux-dev";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 7.0,
          num_inference_steps: body.num_inference_steps || 28
        };
    }

    // Handle input image for inpainting/img2img
    if (body.input_image) {
      modelInput.input_image = body.input_image;
      // For input images, use kontext-max or flux-dev depending on quality
      if (qualityLevel === 'high' || qualityLevel === 'ultra') {
        modelName = "black-forest-labs/flux-kontext-max";
      }
    }

    console.log(`Using model: ${modelName} with quality level: ${qualityLevel}`);
    
    // Generate the initial image
    const output = await replicate.run(modelName as `${string}/${string}`, { 
      input: modelInput 
    });
    console.log(`Output type: ${typeof output}, isArray: ${Array.isArray(output)}`);
    console.log(`Output: ${JSON.stringify(output)}`);
    
    // Handle different output formats from Replicate
    let finalImageUrl: string | null = null;
    
    if (Array.isArray(output) && output.length > 0) {
      finalImageUrl = output[0];
    } else if (typeof output === 'string') {
      finalImageUrl = output;
    } else if (output && typeof output === 'object') {
      // Handle ReadableStream or other complex objects
      console.log('Attempting to extract URL from object:', output);
      
      // Try to find URL in various possible properties
      if ('url' in output && typeof output.url === 'string') {
        finalImageUrl = output.url;
      } else if ('image_url' in output && typeof output.image_url === 'string') {
        finalImageUrl = output.image_url;
      } else if ('output' in output && typeof output.output === 'string') {
        finalImageUrl = output.output;
      } else {
        // Handle ReadableStream case - wait for the stream to complete
        if (output.constructor.name === 'ReadableStream' || 'getReader' in output) {
          console.log('Detected ReadableStream, waiting for completion...');
          try {
            // For Replicate, the stream usually contains the final URL
            // We need to read the stream to get the URL
            const reader = (output as ReadableStream).getReader();
            const chunks = [];
            let done = false;
            
            while (!done) {
              const { value, done: streamDone } = await reader.read();
              done = streamDone;
              if (value) {
                chunks.push(value);
              }
            }
            
            // Convert chunks to string and look for URL
            const decoder = new TextDecoder();
            const streamContent = decoder.decode(new Uint8Array(chunks.flat()));
            console.log('Stream content:', streamContent);
            
            // Try to parse as JSON first
            try {
              const parsed = JSON.parse(streamContent);
              if (parsed.url) {
                finalImageUrl = parsed.url;
              } else if (typeof parsed === 'string' && parsed.startsWith('http')) {
                finalImageUrl = parsed;
              }
            } catch {
              // If not JSON, check if it's a direct URL
              if (streamContent.startsWith('http')) {
                finalImageUrl = streamContent.trim();
              }
            }
          } catch (streamError) {
            console.error('Error reading stream:', streamError);
          }
        } else {
          // Last resort: convert to string and check if it looks like a URL
          const stringOutput = output.toString();
          if (stringOutput.includes('http') && stringOutput !== '[object Object]') {
            finalImageUrl = stringOutput;
          } else {
            console.error('Unable to extract URL from output object:', output);
          }
        }
      }
    }
    
    console.log('Extracted finalImageUrl:', finalImageUrl);
    
    let upscaledImageUrl = null;

    // Optional upscaling for even better quality
    if (enableUpscaling && finalImageUrl && typeof finalImageUrl === 'string') {
      try {
        console.log('Upscaling image with Real-ESRGAN...');
        const upscaleOutput = await replicate.run("nightmareai/real-esrgan" as `${string}/${string}`, {
          input: {
            image: finalImageUrl,
            scale: body.upscale_factor || 4,
            face_enhance: body.face_enhance || false
          }
        });
        
        // Handle upscale output format
        if (typeof upscaleOutput === 'string') {
          upscaledImageUrl = upscaleOutput;
        } else if (Array.isArray(upscaleOutput) && upscaleOutput.length > 0) {
          upscaledImageUrl = upscaleOutput[0];
        }
        
        if (upscaledImageUrl) {
          finalImageUrl = upscaledImageUrl; // Use upscaled version as final
          console.log('Image upscaled successfully');
        }
      } catch (upscaleError) {
        console.error('Upscaling failed, using original image:', upscaleError);
        // Continue with original image if upscaling fails
      }
    }
      
    // Save image to Supabase storage
    let supabaseImageUrl = null;
    console.log('Final finalImageUrl for storage:', finalImageUrl, 'Type:', typeof finalImageUrl);
    
    if (finalImageUrl && typeof finalImageUrl === 'string' && finalImageUrl.startsWith('http')) {
      try {
        // Fetch the image from Replicate URL
        const imageResponse = await fetch(finalImageUrl);
        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
        }
        
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBlob = new Blob([imageBuffer], { type: 'image/png' });
        
        // Generate a unique filename
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const fileName = `generated_${qualityLevel}_${timestamp}_${random}.png`;
        
        // Upload to Supabase storage
        const bucketName = process.env.SUPABASE_BUCKET_NAME || 'images';
        console.log(`Uploading image to Supabase storage: ${fileName} in bucket ${bucketName} `);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, imageBlob, {
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/png'
          });

        if (uploadError) {
          console.error('Supabase upload error:', uploadError);
        } else {
          // Get the public URL
          const { data: urlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(uploadData.path);
          
          supabaseImageUrl = urlData.publicUrl;
        }
      } catch (error) {
        console.error('Error saving image to Supabase:', error);
        // Continue execution even if storage fails
      }
    }

    // Update story if storyId is provided
    if (body.storyId) {
      // Use Supabase URL if available, otherwise fallback to original
      const imageUrlToSave = supabaseImageUrl || finalImageUrl;
      await supabase
        .from("turkish_lessons")
        .update({ img_url: imageUrlToSave })
        .eq("id", body.storyId);
    }
    
    return {
      success: true,
      image_url: finalImageUrl,
      supabase_url: supabaseImageUrl,
      model_used: modelName,
      quality_level: qualityLevel,
      upscaled: enableUpscaling && upscaledImageUrl !== null,
      original_image_url: enableUpscaling ? (Array.isArray(output) ? output[0] : output) : null
    };

  } catch (error) {
    console.error('Replicate API error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to generate image'
    };
  }
});

