export async function fetchLatestMovies() {
  const res = await fetch("/api/movies/latest");
  if (!res.ok) throw new Error("Failed to fetch latest movies");
  return await res.json();
}

export async function searchMovies(query: string) {
  const res = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search movies");
  return await res.json();
}
