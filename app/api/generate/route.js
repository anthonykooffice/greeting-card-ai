import { NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';

fal.config({
  credentials: process.env.FAL_KEY,
});

// Prompt enhancement dictionaries
const styleModifiers = {
  photo: 'photorealistic 8k resolution, hyper-realistic, warm studio lighting, cinematic composition',
  paint: 'vibrant digital oil painting, soft brush strokes, artistic lighting, masterpiece',
  picasso: 'cubist art style, Pablo Picasso inspired, bold geometric abstract shapes, artistic expression',
  video: 'dynamic animated style, vibrant motion blur effect, 3D render look, glowing illumination',
};

const categoryPrompts = {
  birthday: 'festive birthday celebration with glowing candles, elegant cake, confetti, and festive balloons',
  mothers_day: 'warm floral bouquet of blooming pink roses and lilies, gentle golden sunlight, heartfelt mother affection',
  fathers_day: 'sophisticated leather, classic watch, warm mahogany tones, cozy father celebration atmosphere',
  new_year: 'spectacular midnight fireworks over city skyline, sparkling champagne, sparkling gold bokeh',
  valentine: 'romantic red roses, glowing golden heart-shaped lights, soft romantic backdrop',
  christmas: 'cozy Christmas tree with twinkling fairy lights, wrapped gifts, snow falling outside window',
};

export async function POST(request) {
  try {
    const formData = await request.formData();

    const category = formData.get('category') || 'birthday';
    const style = formData.get('style') || 'photo';
    const message = formData.get('message') || '';
    const aspectRatio = formData.get('aspectRatio') || '16:9';

    const categoryText = categoryPrompts[category] || 'festive greeting card celebration';
    const styleText = styleModifiers[style] || styleModifiers.photo;

    // Compose final AI prompt
    const finalPrompt = `A high quality greeting card cover featuring ${categoryText}. Personal touch: "${message}". Style: ${styleText}. Elegant composition, vivid colors, no text blur.`;

    console.log('Sending prompt to fal.ai:', finalPrompt);

    const result = await fal.subscribe('fal-ai/flux/schnell', {
      input: {
        prompt: finalPrompt,
        image_size: aspectRatio === '9:16' ? 'portrait_16_9' : 'landscape_16_9',
        num_inference_steps: 4,
      },
      logs: true,
    });

    const generatedImageUrl = result.data?.images?.[0]?.url;

    if (!generatedImageUrl) {
      throw new Error('No image returned from fal.ai engine.');
    }

    return NextResponse.json({
      success: true,
      cardUrl: generatedImageUrl,
      message: 'Greeting card generated successfully via fal.ai!'
    });
  } catch (error) {
    console.error('fal.ai Generation Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}