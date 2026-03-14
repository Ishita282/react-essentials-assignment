import React, { useState } from "react";
import "./movieCard.css";

const MovieData = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    releaseYear: 2014,
    rating: 8.6,
    secondGenre: "Adventure",
    extraGenre: ["Space", "Time", "Survival"],
    favourite: false,
  },
  {
    id: 2,
    title: "Star Wars: A New Hope",
    genre: "Sci-Fi",
    releaseYear: 1977,
    rating: 8.6,
    secondGenre: "Space Opera",
    extraGenre: ["Rebels", "Force", "Galaxy"],
    favourite: false,
  },
  {
    id: 3,
    title: "The Star",
    genre: "Animation",
    releaseYear: 2017,
    rating: 6.1,
    secondGenre: "Family",
    extraGenre: ["Journey", "Friends"],
    favourite: false,
  },
];

const MovieCard = () => {
  const [Loading, setLoading] = useState(false);
  const [toDark, setTodark] = useState(false);
  const [SearchBar, setSearchBar] = useState("");
  const [Movies, setMovies] = useState(MovieData);

  const ToggleMode = () => {
    setTodark(!toDark);
    if (!toDark) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  const ratingCategory = (rating) => {
    if (rating > 9.0) return "Super Hit";
    if (rating > 8.0) return "Hit";
    return "Average";
  };

  const term = SearchBar.toLowerCase();

  const FilterMovies = Movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(term) ||
      movie.genre.toLowerCase().includes(term) ||
      movie.secondGenre.toLowerCase().includes(term) ||
      movie.extraGenre?.some((genre) => genre.toLowerCase().includes(term)) ||
      movie.releaseYear.toString().includes(term) ||
      movie.rating.toString().includes(term),
  );

  const ToggleFavourite = (id) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, favourite: !movie.favourite } : movie,
      ),
    );
  };

  const FavouriteMovie = Movies.filter((movie) => movie.favourite);

  return (
    <div className="movie-card">
      <button className="mode" onClick={ToggleMode}>
        ◐ Toggle Theme
      </button>

      <div className="main-container">
        <div className="header-section">
          <div className="header">
            <h2>Movie Explorer Project</h2>
            <p>
              Search, filter, and favorite movies. Designed for a single-page
              React component structure.
            </p>
          </div>

          <button
            className="short-data"
            onClick={() => {
              setLoading(!Loading);
            }}
          >
            Local data- {Loading ? "Loading..." : "React state ready"}
          </button>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder={'Search movies (e.g. "Interstellar", "Star")'}
            className="search-bar"
            value={SearchBar}
            onChange={(e) => setSearchBar(e.target.value)}
          />
          <button className="clear-search" onClick={() => setSearchBar("")}>
            ×
          </button>
          <button
            className="reset-button"
            onClick={() => {
              setSearchBar("");
            }}
          >
            Reset
          </button>

          {SearchBar && (
            <p className="search-result">
              {FilterMovies.length} results for "{SearchBar}"
            </p>
          )}
        </div>

        {Loading ? (
          <div className="loading">
            <p>Loading movie data...</p>
          </div>
        ) : (
          <div className="movie-list">
            <div className="main-content">
              <h3>Matching Movies</h3>
              {FilterMovies.length > 0 ? (
                FilterMovies.map((movie) => (
                  <div key={movie.id}>
                    <div className="movie-card-item">
                      <div className="detail-fav">
                        <div className="name-detail">
                        <p className="movie-title"> {movie.title}</p>
                        <p className="movie-realseYear">{movie.releaseYear}</p>
                        <p className="movie-genre">• {movie.genre}</p>
                      </div>
                      <div className="genre-details">
                        <p
                        className={`movie-rating rating ${ratingCategory(movie.rating)}`}
                      >
                        ⭐ {movie.rating}
                      </p>
                      <p className="movie-secondgenre">{movie.secondGenre}</p>
                      <p className="movie-extragenre">
                        {movie.extraGenre.join(" • ")}
                      </p>
                      </div>
                      </div>
                      <button
                        className={movie.favourite ? "movie-favourite active" : "movie-favourite"}
                        onClick={() => ToggleFavourite(movie.id)}
                      >
                        {movie.favourite ? "★ Favorited" : "☆ Favorite"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No movies found</p>
              )}
            </div>
            <div className="favourite-movies">
              <div className="fav-movie-header">
                <h3>Favorite Movies</h3>
              <p>Derived from favorite state</p>
              </div>
              {FavouriteMovie.length === 0 && <p>No Favourite Movie</p>}
              {FavouriteMovie.map((movie) => (
                <p key={movie.id}>
                  {movie.title} ({movie.releaseYear})
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
