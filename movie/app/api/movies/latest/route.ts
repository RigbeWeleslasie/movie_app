import { NextResponse } from "next/server";

const apiKey = process.env.API_KEY;
const baseUrl = process.env.BASE_URL;

async function fetchTMDB(endpoint: string) {
  if (!apiKey) {
    console.error("Server configuration error: Missing TMDB_API_KEY environment variable");
    throw new Error("Server configuration error."); 
  }

  const url = `${baseUrl}/${endpoint}?api_key=${apiKey}&language=en-US&page=1`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorBody = await response.text(); 
    console.error(`TMDB API Error (${response.status}): ${errorBody}`);
    throw new Error(`Failed to fetch data from TMDB: ${response.status}`);
  }
  return response.json();
}

export async function GET() {
  try {
    const data = await fetchTMDB("movie/now_playing");
    return NextResponse.json(data);
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.message.includes("Server configuration error")) {
        statusCode = 503; 
      } else if (error.message.includes("Failed to fetch data from TMDB")) {
        statusCode = 502; 
      }
    }
    
    console.error("Error in GET /api/movies/now-playing:", errorMessage);
    return NextResponse.json(
      { error: "Failed to load latest movies", details: errorMessage },
      { status: statusCode }
    );
  }
}
