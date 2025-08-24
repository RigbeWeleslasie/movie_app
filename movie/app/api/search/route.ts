import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; 

export async function GET(request: NextRequest) {
  if (!apiKey) {
    console.error("SERVER ERROR: TMDB_API_KEY is not set in environment variables.");
    return NextResponse.json(
      { message: "Server configuration error: Unable to contact movie database." },
      { status: 503 } 
    );
  }
  const searchParams = request.nextUrl.searchParams; 
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json(
      { message: "Search query is missing. Please provide a 'query' parameter." },
      { status: 400 } 
    );
  }
  const encodedQuery = encodeURIComponent(query);
  const tmdbSearchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${encodedQuery}&page=1`;

  try {
    const tmdbResponse = await fetch(tmdbSearchUrl);
    if (!tmdbResponse.ok) {
      const errorData = await tmdbResponse.text(); 
      console.error(`TMDB API Error (${tmdbResponse.status}): ${errorData}`);
      return NextResponse.json(
        { message: `Failed to search movies. Movie database error: ${tmdbResponse.statusText}` },
        { status: tmdbResponse.status } 
      );
    }
    const moviesData = await tmdbResponse.json();
    return NextResponse.json(moviesData);

  } catch (error) {
    console.error("UNEXPECTED ERROR while searching movies:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 } 
    );
  }
}
