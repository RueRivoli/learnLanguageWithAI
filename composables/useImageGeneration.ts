export interface ImageGenerationOptions {
  prompt: string;
  aspect_ratio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:2' | '2:3';
  output_format?: 'webp' | 'jpg' | 'png';
  guidance_scale?: number;
  num_inference_steps?: number;
  num_outputs?: number;
  seed?: number;
  input_image?: string;
}

export interface ImageGenerationResult {
  success: boolean;
  image_url?: string;
  model_used?: string;
  error?: string;
}

export const useImageGeneration = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const generateImage = async (options: ImageGenerationOptions): Promise<ImageGenerationResult> => {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await $fetch<ImageGenerationResult>('/api/replica/generate', {
        method: 'POST',
        body: {
          prompt: options.prompt,
          aspect_ratio: options.aspect_ratio || '1:1',
          output_format: options.output_format || 'webp',
          guidance_scale: options.guidance_scale || 3.5,
          num_inference_steps: options.num_inference_steps || 28,
          num_outputs: options.num_outputs || 1,
          seed: options.seed,
          input_image: options.input_image
        }
      });

      if (!result.success) {
        error.value = result.error || 'Erreur inconnue';
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de connexion';
      error.value = errorMessage;
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      isLoading.value = false;
    }
  };

  const generateQuickImage = async (prompt: string, format: '1:1' | '16:9' | '9:16' = '1:1') => {
    return generateImage({
      prompt,
      aspect_ratio: format,
      output_format: 'webp',
      guidance_scale: 3.5
    });
  };

  const modifyImage = async (prompt: string, inputImageUrl: string) => {
    return generateImage({
      prompt,
      input_image: inputImageUrl,
      output_format: 'webp'
    });
  };

  return {
    generateImage,
    generateQuickImage,
    modifyImage,
    isLoading: readonly(isLoading),
    error: readonly(error)
  };
};
