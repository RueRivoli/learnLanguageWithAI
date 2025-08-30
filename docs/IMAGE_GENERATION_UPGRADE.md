# Enhanced Image Generation API

## Overview
The image generation API has been upgraded to support multiple quality levels and optional upscaling for better image quality.

## Quality Levels

### Fast (`quality_level: 'fast'`)
- **Model**: `black-forest-labs/flux-schnell`
- **Speed**: Fastest generation (4 inference steps)
- **Quality**: Good for quick previews and drafts
- **Cost**: Lowest
- **Use case**: Rapid prototyping, content previews

### Standard (`quality_level: 'standard'`) - Default
- **Model**: `black-forest-labs/flux-dev`
- **Speed**: Moderate (28 inference steps)
- **Quality**: High quality, balanced approach
- **Cost**: Moderate
- **Use case**: Most general use cases

### High (`quality_level: 'high'`)
- **Model**: `black-forest-labs/flux-1.1-pro`
- **Speed**: Slower (40 inference steps)
- **Quality**: Very high quality with fine details
- **Cost**: Higher
- **Use case**: Professional content, final images

### Ultra (`quality_level: 'ultra'`)
- **Model**: `black-forest-labs/flux-1.1-pro-ultra`
- **Speed**: Slowest (50 inference steps)
- **Quality**: Maximum quality with highest fidelity
- **Cost**: Highest
- **Use case**: Premium content, marketing materials

## Upscaling Feature

### Real-ESRGAN Upscaling
- **Enable**: Set `enable_upscaling: true`
- **Model**: `nightmareai/real-esrgan`
- **Scale Factor**: 2x or 4x (configurable via `upscale_factor`)
- **Face Enhancement**: Optional face restoration (`face_enhance: true/false`)
- **Benefits**: Increases resolution and sharpens details

## API Parameters

### New Parameters

```typescript
interface ImageGenerationRequest {
  // Existing parameters
  prompt: string;
  output_format?: string;
  aspect_ratio?: string;
  num_outputs?: number;
  seed?: number;
  storyId?: string;
  input_image?: string; // For img2img/inpainting
  
  // New quality parameters
  quality_level?: 'fast' | 'standard' | 'high' | 'ultra';
  
  // New upscaling parameters
  enable_upscaling?: boolean;
  upscale_factor?: 2 | 4;
  face_enhance?: boolean;
  
  // Advanced parameters (optional overrides)
  guidance_scale?: number;
  num_inference_steps?: number;
}
```

### Response Format

```typescript
interface ImageGenerationResponse {
  success: boolean;
  image_url: string;
  supabase_url?: string;
  model_used: string;
  quality_level: string;
  upscaled: boolean;
  original_image_url?: string; // Only if upscaling was enabled
  error?: string;
}
```

## Usage Examples

### Basic High-Quality Generation
```javascript
const response = await fetch('/api/replicate/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "A beautiful landscape with mountains and lakes",
    quality_level: 'high'
  })
});
```

### Ultra Quality with Upscaling
```javascript
const response = await fetch('/api/replicate/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "Professional portrait of a person",
    quality_level: 'ultra',
    enable_upscaling: true,
    upscale_factor: 4,
    face_enhance: true
  })
});
```

### Fast Generation for Preview
```javascript
const response = await fetch('/api/replicate/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "Quick sketch of a concept",
    quality_level: 'fast'
  })
});
```

## Model-Specific Parameters

### FLUX-Schnell (Fast)
- `guidance_scale`: 3.5 (default)
- `num_inference_steps`: 4 (maximum)

### FLUX-Dev (Standard)
- `guidance_scale`: 7.0 (default)
- `num_inference_steps`: 28 (default)

### FLUX-1.1-Pro (High)
- `guidance_scale`: 7.5 (default)
- `num_inference_steps`: 40 (default)

### FLUX-1.1-Pro-Ultra (Ultra)
- `guidance_scale`: 8.0 (default)
- `num_inference_steps`: 50 (default)
- `output_quality`: 100

## Cost Considerations

| Quality Level | Relative Cost | Generation Time | Best For |
|---------------|---------------|-----------------|----------|
| Fast          | 1x            | ~5 seconds      | Previews, drafts |
| Standard      | 3x            | ~15 seconds     | General use |
| High          | 5x            | ~25 seconds     | Professional content |
| Ultra         | 8x            | ~40 seconds     | Premium content |

**Note**: Upscaling adds approximately 50% to the total cost and time.

## Error Handling

The API includes robust error handling:
- If upscaling fails, the original image is returned
- Storage failures don't prevent image generation
- Model fallbacks for unavailable models
- Detailed error messages for debugging

## Migration Guide

### From Previous Version
The API remains backward compatible. Existing calls will use the 'standard' quality level by default.

### Recommended Upgrades
1. Add `quality_level: 'high'` for better results
2. Enable upscaling for final images: `enable_upscaling: true`
3. Use 'fast' for preview generation to save costs
