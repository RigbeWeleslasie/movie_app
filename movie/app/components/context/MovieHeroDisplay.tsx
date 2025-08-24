"use client";
import { Movie } from "@/app/utils/movieDetails";
import React from "react";
import Image from "next/image";
import Link from "next/link";
interface MovieHeroDisplayProps {
  movie: Movie | null;
  onAddFavorite: (movieToAdd: Movie) => void;
  onRemoveFavorite: (idToRemove: number) => void;
  isMovieFavorite: (idToCheck: number) => boolean;
  topRatedMovies?: Movie[];
  upcomingMovies?: Movie[];
}
interface MiniMovieCardProps {
  movie: Movie;
}
function MiniMovieCard({ movie }: MiniMovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "/images/placeholder-poster-small.png";
  return (
    <Link href={`/movie/${movie.id}`} className="group block w-full">
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl">
        <Image
          src={posterUrl}
          alt={movie.title || "Movie poster"}
          fill
          className="object-cover group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
          <h4 className="text-white text-sm font-semibold truncate">
            {movie.title}
          </h4>
        </div>
      </div>
    </Link>
  );
}
export default function MovieHeroDisplay({
  movie,
  onAddFavorite,
  onRemoveFavorite,
  isMovieFavorite,
  topRatedMovies,
  upcomingMovies,
}: MovieHeroDisplayProps) {
  if (!movie) {
    return (
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black text-gray-300 rounded-2xl mb-12">
        <p className="text-xl font-light">No featured movie available.</p>
      </section>
    );
  }
  const isCurrentHeroMovieFavorite = isMovieFavorite(movie.id);
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/images/placeholder-backdrop.png";
  const renderSubList = (list?: Movie[], title?: string) => {
    if (!list || list.length === 0) return null;
    const itemsToShow = list.slice(0, 6);
    return (
      <div className="mt-16">
        {title && (
          <h3 className="text-3xl md:text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 tracking-wide">
            {title}
          </h3>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {itemsToShow.map((item) => (
            <MiniMovieCard key={`mini-${item.id}`} movie={item} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <section className="relative overflow-hidden rounded-3xl mb-20 shadow-2xl">
      <div className="absolute inset-0">
        <Image
          src={backdropUrl}
          alt={movie.title || "Movie backdrop"}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-sm" />
      </div>
      <div className="relative z-20 container mx-auto px-6 py-20 flex flex-col md:flex-row items-center md:items-end min-h-[80vh]">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-2xl border border-white/20 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-500">
            {movie.title}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-10 line-clamp-4">
            {movie.overview}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/movie/${movie.id}`}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-pink-500/40 transition transform hover:scale-105"
            >
              Watch Now
            </Link>
            {isCurrentHeroMovieFavorite ? (
              <button
                onClick={() => onRemoveFavorite(movie.id)}
                className="px-8 py-3 rounded-full border border-red-500 text-red-400 font-semibold hover:bg-red-500/20 shadow-lg transition transform hover:scale-105"
              >
                Remove Favorite
              </button>
            ) : (
              <button
                onClick={() => onAddFavorite(movie)}
                className="px-8 py-3 rounded-full border border-blue-500 text-blue-400 font-semibold hover:bg-blue-500/20 shadow-lg transition transform hover:scale-105"
              >
                Add Favorite
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="relative z-20 container mx-auto px-6 pb-20">
        {renderSubList(topRatedMovies, "Top Rated Movies")}
        {renderSubList(upcomingMovies, "Coming Soon")}
      </div>
    </section>
  );
}

















