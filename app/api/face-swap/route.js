
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { sourceImage, targetVideoUrl } = await request.json();

    if (!sourceImage || !targetVideoUrl) {
      return NextResponse.json(
        { error: "Missing sourceImage or targetVideoUrl" },
        { status: 400 }
      );
    }

    const falApiKey = process.env.FAL_KEY;
    if (!falApiKey) {
      // Fallback if FAL_KEY is not yet set in environment variables
      return NextResponse.json({ 
        swappedVideoUrl: targetVideoUrl,
        warning: "FAL_KEY not configured. Returned original video template." 
      });
    }

    // Call FAL.AI Face Swap / ReActor Video API
    const response = await fetch("https://fal.run/fal-ai/face-swap", {
      method: "POST",
      headers: {
        "Authorization": `Key ${falApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base_image_url: sourceImage,
        swap_image_url: targetVideoUrl,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ swappedVideoUrl: data.video?.url || targetVideoUrl });

  } catch (error) {
    console.error("Face Swap API Error:", error);
    return NextResponse.json(
      { error: "Failed to process face swap" },
      { status: 500 }
    );
  }
}