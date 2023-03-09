interface Movie {
  id: number;
  originalTitle: string;
  releaseDate: string;
  posterPath: string;
  overview: string;
  voteAverage: number;
  movieGenre: number[];
  rating: number;
}

interface MoviesResult {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}

interface SessionResult {
  sessionId: string;
}

function transformDate(movie: any): Movie {
  return {
    id: movie.id,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path,
    overview: movie.overview,
    voteAverage: movie.vote_average,
    movieGenre: movie.genre_ids,
    rating: movie.rating,
  };
}

function transformMovies(result: any): MoviesResult {
  return {
    page: result.page,
    results: result.results.map(transformDate),
    totalPages: result.total_pages,
    totalResults: result.total_results,
  };
}

function transformIDSession(result: any): SessionResult {
  return { sessionId: result.guest_session_id };
}

export { transformDate, transformMovies, transformIDSession, Movie };
