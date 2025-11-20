import { NextRequest, NextResponse } from "next/server";

const RAPIDAPI_KEY = process.env.EXERCISESDB_API_KEY || "";
const RAPIDAPI_BASE_URL = "https://exercisedb.p.rapidapi.com";

// Simple rate limiting: track last request time
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 200; // 200ms between requests (5 requests per second max)

export async function GET(request: NextRequest) {
  try {
    if (!RAPIDAPI_KEY) {
      return NextResponse.json(
        { error: "RapidAPI key not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const exerciseId = searchParams.get("exerciseId");
    const resolution = searchParams.get("resolution") || "180"; // Default to 180

    if (!exerciseId) {
      return NextResponse.json(
        { error: "exerciseId parameter is required" },
        { status: 400 }
      );
    }

    // Rate limiting: wait if needed
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise((resolve) =>
        setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
      );
    }
    lastRequestTime = Date.now();

    // Call RapidAPI image endpoint
    const imageUrl = `${RAPIDAPI_BASE_URL}/image?exerciseId=${encodeURIComponent(
      exerciseId
    )}&resolution=${encodeURIComponent(
      resolution
    )}&rapidapi-key=${RAPIDAPI_KEY}`;

    console.log("Fetching exercise image:", imageUrl);

    const response = await fetch(imageUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      // Don't log 429/403 as errors - they're expected when rate limited or IDs don't match
      if (response.status === 429) {
        console.log(`Rate limited for exercise: ${exerciseId}`);
      } else if (response.status === 403) {
        console.log(`Forbidden/Invalid ID for exercise: ${exerciseId}`);
      } else {
        console.error("RapidAPI image error:", {
          status: response.status,
          statusText: response.statusText,
        });
      }

      // Return a 404 so the client can handle it gracefully (show placeholder)
      return NextResponse.json(
        { error: `Image not available` },
        { status: 404 }
      );
    }

    // Get the image as a blob
    const imageBlob = await response.blob();
    const imageBuffer = await imageBlob.arrayBuffer();

    // Return the image with proper content type
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error in exercise image API route:", error);
    // Return 404 instead of 500 so client can show placeholder
    return NextResponse.json({ error: `Image not available` }, { status: 404 });
  }
}
