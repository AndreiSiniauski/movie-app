function transformDate(movie) {
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

function transformMovies(result) {
  return {
    page: result.page,
    results: result.results,
    totalPages: result.total_pages,
    totalResults: result.total_results,
  };
}

export { transformDate, transformMovies };
