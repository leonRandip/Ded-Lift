import { NextRequest, NextResponse } from "next/server";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || "";
const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";

export async function GET(request: NextRequest) {
  try {
    if (!SPOONACULAR_API_KEY) {
      return NextResponse.json(
        { error: "Spoonacular API key not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const recipeId = searchParams.get("id");

    if (!recipeId) {
      return NextResponse.json(
        { error: "Recipe ID is required" },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      includeNutrition: "true",
    });

    const url = `${SPOONACULAR_BASE_URL}/recipes/${recipeId}/information?${params.toString()}`;
    console.log("Fetching recipe info from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spoonacular API error:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      
      return NextResponse.json(
        { error: `API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in recipe-info API route:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch recipe info: ${errorMessage}` },
      { status: 500 }
    );
  }
}

