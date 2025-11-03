import { defineEventHandler, readBody } from "h3";
import Replicate from "replicate";
import { createSupabaseClientWithUserAuthTokenFromHeader } from "../../utils/auth/supabaseClient";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Helper function to process ReadableStream
const processReadableStream = async (
  stream: ReadableStream,
): Promise<string | null> => {
  try {
    const reader = stream.getReader();
    const chunks = [];
    let done = false;

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      if (value) {
        chunks.push(value);
      }
    }

    // Convert chunks to string
    const decoder = new TextDecoder();
    const streamContent = decoder.decode(new Uint8Array(chunks.flat()));

    // Try to parse as JSON first
    try {
      const parsed = JSON.parse(streamContent);
      if (
        parsed.url &&
        typeof parsed.url === "string" &&
        parsed.url.startsWith("http")
      ) {
        return parsed.url;
      }
    } catch {
      // If not JSON, check if it's a direct URL
      if (streamContent.trim().startsWith("http")) {
        return streamContent.trim();
      }
    }

    return null;
  } catch (error) {
    console.error("Error processing ReadableStream:", error);
    return null;
  }
};

export default defineEventHandler(async (event) => {
  try {
    const supabase = createSupabaseClientWithUserAuthTokenFromHeader(event);
    const body = await readBody(event);

    if (!body.prompt) {
      throw new Error("Missing prompt");
    }

    // Determine quality level and model to use
    const qualityLevel = body.quality_level || "standard"; // 'fast', 'standard', 'high', 'ultra'
    const enableUpscaling = body.enable_upscaling || false;

    let modelName: string;
    let modelInput: any;

    // Base configuration
    const baseInput = {
      prompt: body.prompt,
      output_format: body.output_format || "png",
      aspect_ratio: body.aspect_ratio || "1:1",
      num_outputs: body.num_outputs || 1,
      seed: body.seed || Math.floor(Math.random() * 1000000),
    };

    // Choose model and configure parameters based on quality level
    switch (qualityLevel) {
      case "fast":
        modelName = "black-forest-labs/flux-schnell";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 3.5,
          num_inference_steps: body.num_inference_steps || 4,
        };
        break;
      case "standard":
        modelName = "black-forest-labs/flux-dev";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 7.0,
          num_inference_steps: body.num_inference_steps || 28,
        };
        break;
      case "high":
        modelName = "black-forest-labs/flux-1.1-pro";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 7.5,
          num_inference_steps: body.num_inference_steps || 40,
        };
        break;
      case "ultra":
        modelName = "black-forest-labs/flux-1.1-pro-ultra";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 8.0,
          num_inference_steps: body.num_inference_steps || 50,
          output_quality: 100,
        };
        break;
      default:
        modelName = "black-forest-labs/flux-dev";
        modelInput = {
          ...baseInput,
          guidance_scale: body.guidance_scale || 7.0,
          num_inference_steps: body.num_inference_steps || 28,
        };
    }

    // Handle input image for inpainting/img2img
    if (body.input_image) {
      modelInput.input_image = body.input_image;
      // For input images, use kontext-max or flux-dev depending on quality
      if (qualityLevel === "high" || qualityLevel === "ultra") {
        modelName = "black-forest-labs/flux-kontext-max";
      }
    }

    console.log(
      `Using model: ${modelName} with quality level: ${qualityLevel}`,
    );

    // Generate the initial image
    const output = await replicate.run(modelName as `${string}/${string}`, {
      input: modelInput,
    });
    console.log(
      `Output type: ${typeof output}, isArray: ${Array.isArray(output)}`,
    );
    console.log(`Output structure:`, JSON.stringify(output, null, 2));

    // Handle different output formats from Replicate
    let finalImageUrl: string | null = null;

    // Replicate typically returns an array of URLs or a single URL
    if (Array.isArray(output)) {
      if (output.length > 0) {
        const firstOutput = output[0];
        console.log(`First output type: ${typeof firstOutput}`, firstOutput);

        if (typeof firstOutput === "string" && firstOutput.startsWith("http")) {
          finalImageUrl = firstOutput;
          console.log("Extracted URL from array:", finalImageUrl);
        } else if (typeof firstOutput === "object" && firstOutput !== null) {
          // Check for common URL properties in objects
          const urlProperties = ["url", "image_url", "output", "image", "src"];
          for (const prop of urlProperties) {
            if (
              firstOutput[prop] &&
              typeof firstOutput[prop] === "string" &&
              firstOutput[prop].startsWith("http")
            ) {
              finalImageUrl = firstOutput[prop];
              console.log(
                `Extracted URL from object property '${prop}':`,
                finalImageUrl,
              );
              break;
            }
          }

          // Handle ReadableStream case
          if (
            !finalImageUrl &&
            (firstOutput.constructor.name === "ReadableStream" ||
              "getReader" in firstOutput)
          ) {
            console.log("Detected ReadableStream, processing...");
            try {
              finalImageUrl = await processReadableStream(firstOutput);
              if (finalImageUrl) {
                console.log(
                  "Extracted URL from ReadableStream:",
                  finalImageUrl,
                );
              }
            } catch (streamError) {
              console.error("Error processing ReadableStream:", streamError);
            }
          }
        }
      }
    } else if (
      typeof output === "string" &&
      (output as string).startsWith("http")
    ) {
      finalImageUrl = output;
      console.log("Direct URL from output:", finalImageUrl);
    } else if (typeof output === "object" && output !== null) {
      // Handle single object output
      const urlProperties = ["url", "image_url", "output", "image", "src"];
      for (const prop of urlProperties) {
        if (
          output[prop] &&
          typeof output[prop] === "string" &&
          (output[prop] as string).startsWith("http")
        ) {
          finalImageUrl = output[prop];
          console.log(
            `Extracted URL from object property '${prop}':`,
            finalImageUrl,
          );
          break;
        }
      }
    }

    console.log("Extracted finalImageUrl:", finalImageUrl);

    let upscaledImageUrl = null;

    // Optional upscaling for even better quality
    if (enableUpscaling && finalImageUrl && typeof finalImageUrl === "string") {
      try {
        console.log("Upscaling image with Real-ESRGAN...");
        const upscaleOutput = await replicate.run(
          "nightmareai/real-esrgan" as `${string}/${string}`,
          {
            input: {
              image: finalImageUrl,
              scale: body.upscale_factor || 4,
              face_enhance: body.face_enhance || false,
            },
          },
        );
        console.log("upscaleOutput", upscaleOutput);
        // Handle upscale output format
        if (typeof upscaleOutput === "string") {
          console.log("is a string", upscaleOutput);
          upscaledImageUrl = upscaleOutput;
          console.log("upscaledImageUrl", upscaledImageUrl);
        } else if (Array.isArray(upscaleOutput) && upscaleOutput.length > 0) {
          console.log("second if", upscaleOutput);
          upscaledImageUrl = upscaleOutput[0];
          console.log("upscaledImageUrl", upscaledImageUrl);
        }

        if (upscaledImageUrl) {
          finalImageUrl = upscaledImageUrl; // Use upscaled version as final
          console.log("Image upscaled successfully");
        }
      } catch (upscaleError) {
        console.error("Upscaling failed, using original image:", upscaleError);
        // Continue with original image if upscaling fails
      }
    }

    // Save image to Supabase storage
    let supabaseImageUrl = null;
    console.log(
      "Final finalImageUrl for storage:",
      finalImageUrl,
      "Type:",
      typeof finalImageUrl,
    );

    if (
      finalImageUrl &&
      typeof finalImageUrl === "string" &&
      finalImageUrl.startsWith("http")
    ) {
      try {
        // Validate required environment variables
        if (
          !process.env.SUPABASE_URL ||
          !process.env.SERVICE_SUPABASE_ANON_KEY
        ) {
          console.error("Missing required Supabase environment variables");
          throw new Error("Supabase configuration incomplete");
        }

        // Fetch the image from Replicate URL
        console.log("Fetching image from Replicate URL:", finalImageUrl);
        const imageResponse = await fetch(finalImageUrl);
        if (!imageResponse.ok) {
          throw new Error(
            `Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`,
          );
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBlob = new Blob([imageBuffer], { type: "image/png" });
        console.log(
          `Image fetched successfully, size: ${imageBlob.size} bytes`,
        );

        // Generate a unique filename
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const fileName = `generated_${qualityLevel}_${timestamp}_${random}.png`;

        // Upload to Supabase storage
        const bucketName = process.env.SUPABASE_BUCKET_NAME || "images";
        console.log(
          `Uploading image to Supabase storage: ${fileName} in bucket ${bucketName}`,
        );

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, imageBlob, {
            cacheControl: "3600",
            upsert: false,
            contentType: "image/png",
          });

        if (uploadError) {
          console.error("Supabase upload error:", {
            message: uploadError.message,
            name: uploadError.name,
            stack: uploadError.stack,
          });

          // Check if bucket exists
          const { data: buckets } = await supabase.storage.listBuckets();
          const bucketExists = buckets?.some(
            (bucket) => bucket.name === bucketName,
          );
          if (!bucketExists) {
            console.error(
              `Bucket '${bucketName}' does not exist. Available buckets:`,
              buckets?.map((b) => b.name),
            );
          }
        } else {
          console.log("Upload successful:", uploadData);

          // Get the public URL
          const { data: urlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(uploadData.path);

          supabaseImageUrl = urlData.publicUrl;
          console.log("Supabase public URL generated:", supabaseImageUrl);
        }
      } catch (error) {
        console.error("Error saving image to Supabase:", {
          message: error.message,
          stack: error.stack,
          finalImageUrl,
        });
        // Continue execution even if storage fails
      }
    } else {
      console.warn(
        "Invalid finalImageUrl for Supabase storage:",
        finalImageUrl,
      );
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
      original_image_url: enableUpscaling
        ? Array.isArray(output)
          ? output[0]
          : output
        : null,
    };
  } catch (error) {
    console.error("Replicate API error:", error);

    return {
      success: false,
      error: error.message || "Failed to generate image",
    };
  }
});
