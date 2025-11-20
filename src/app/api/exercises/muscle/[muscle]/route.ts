import { NextRequest, NextResponse } from "next/server";

const EXERCISESDB_API_KEY = process.env.EXERCISESDB_API_KEY || "";
const RAPIDAPI_BASE_URL = "https://exercisedb.p.rapidapi.com";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ muscle: string }> }
) {
  try {
    if (!EXERCISESDB_API_KEY) {
      return NextResponse.json(
        { error: "ExercisesDB API key not configured" },
        { status: 500 }
      );
    }

    const { muscle } = await params;

    console.log("Received muscle parameter:", muscle);

    if (!muscle || muscle.trim() === "") {
      return NextResponse.json(
        { error: "Muscle parameter is required" },
        { status: 400 }
      );
    }

    // Map muscle names to API-compatible format
    const muscleNameMap: Record<string, string> = {
      lower_back: "lower back",
      middle_back: "middle back",
      chest: "pectorals", // API uses "pectorals" instead of "chest"
      quadriceps: "quads", // API uses "quads" instead of "quadriceps"
    };

    // Call RapidAPI ExercisesDB API - using /exercises/target/{muscle} endpoint
    let muscleParam = muscle.toLowerCase().trim();
    // Apply mapping if needed
    if (muscleNameMap[muscleParam]) {
      muscleParam = muscleNameMap[muscleParam];
    }
    const apiUrl = `${RAPIDAPI_BASE_URL}/exercises/target/${encodeURIComponent(
      muscleParam
    )}`;

    console.log("Calling RapidAPI ExercisesDB:", apiUrl);
    console.log("API Key configured:", !!EXERCISESDB_API_KEY);
    console.log("Muscle parameter:", muscleParam);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": EXERCISESDB_API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `ExercisesDB API error: ${response.status} ${response.statusText}`;

      // Provide more specific error messages
      if (response.status === 403) {
        errorMessage =
          "API key is invalid or access is forbidden. Please check your ExercisesDB API key configuration.";
      } else if (response.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (response.status === 401) {
        errorMessage = "Unauthorized. Please verify your API key is correct.";
      } else if (response.status === 422) {
        errorMessage = `Invalid muscle name: "${muscleParam}". The API may not recognize this muscle group.`;
      }

      console.error("ExercisesDB API error:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: apiUrl,
      });

      return NextResponse.json(
        { error: errorMessage, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in exercises API route:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch exercises: ${errorMessage}` },
      { status: 500 }
    );
  }
}
