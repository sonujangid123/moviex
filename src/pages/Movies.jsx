import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "c6fb36a8605634e1c243f9e0317511cc";
const base_url = "https://api.themoviedb.org/3";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum) => {
    try {
      const response = await axios.get(`${base_url}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          sort_by: sortBy,
          with_genres: selectedGenre,
          page: pageNum,
        },
      });
      if (response.data.results.length === 0) {
        setHasMore(false);
      }
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch movies");
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${base_url}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      });
      setGenres(response.data.genres);
    } catch (error) {
      setError("Failed to fetch genres");
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchMovies(page);
  }, [page, sortBy, selectedGenre]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) {
        if (hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setMovies([]);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setMovies([]);
    setPage(1);
  };

  if (loading && page === 1) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Movies</h1>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label htmlFor="genre" className="form-label">
            Select Genre:
          </label>
          <select
            id="genre"
            className="form-select"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="sortBy" className="form-label">
            Sort By:
          </label>
          <select
            id="sortBy"
            className="form-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="popularity.desc">Popularity (Descending)</option>
            <option value="popularity.asc">Popularity (Ascending)</option>
            <option value="release_date.desc">Release Date (Descending)</option>
            <option value="release_date.asc">Release Date (Ascending)</option>
            <option value="vote_average.desc">Rating (Descending)</option>
            <option value="vote_average.asc">Rating (Ascending)</option>
          </select>
        </div>
      </div>

      <div className="row">
        {movies.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="col-md-3 col-sm-6 mb-4">
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="card-img-top"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="text-center">Loading more movies...</div>}
    </div>
  );
}

export default Movies;
