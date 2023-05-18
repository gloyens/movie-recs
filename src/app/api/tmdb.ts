async function getMoviePoster(movieString: string) {
  const title = movieString.match(/^(.*?)\s*\(\d{4}\)$/)?.[1] || "";
  const year = movieString.match(/\((\d{4})\)/)?.[1];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTVhNTY4YjIxZGY5YjQyZmFlMDJlYWEzMmE3MmVkNyIsInN1YiI6IjY0NjVkMTA2YTUwNDZlMDEwNThhNTFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._J4ylv3RWi2bcr2G4ztQZByCOHqOkR4xrviKnX-UdNw",
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        title
      )}&include_adult=false&language=en-US&primary_release_year=${year}&page=1`,
      options
    );
    const searchData = await response.json();
    const movieId = searchData.results[0].id;

    const imagesResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images`,
      options
    );
    const imageData = await imagesResponse.json();
    const poster = imageData.posters[0].file_path;

    return `https://image.tmdb.org/t/p/original${poster}`;
  } catch (err) {
    console.error(err);
  }
}

export default getMoviePoster;
