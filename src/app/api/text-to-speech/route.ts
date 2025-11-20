import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      );
    }

    // Initialize ElevenLabs client with API key
    const client = new ElevenLabsClient({
      apiKey: apiKey,
    });

    const body = await request.json();
    // Using newer model available on free tier: eleven_turbo_v2_5 or eleven_turbo_v2
    const { text, voiceId = "21m00Tcm4TlvDq8ikWAM", modelId = "eleven_turbo_v2_5" } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // Use ElevenLabs SDK to generate speech
    const audioStream = await client.textToSpeech.convert(voiceId, {
      text: text,
      model_id: modelId,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    });

    // Convert the stream to a buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    // Combine all chunks into a single buffer
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const audioBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      audioBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    // Return the audio as a blob
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error in text-to-speech API route:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Handle specific ElevenLabs errors
    if (error instanceof Error) {
      if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your ElevenLabs API key." },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.json(
      { error: `Failed to generate speech: ${errorMessage}` },
      { status: 500 }
    );
  }
}

