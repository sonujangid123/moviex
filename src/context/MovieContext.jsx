import React, { createContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
    loading: true,
    error: null,
  });

  const API_KEY = "c6fb36a8605634e1c243f9e0317511cc";
  const base_url = "https://api.themoviedb.org/3";

  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchPopular: `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingRes, popularRes, topRatedRes, upcomingRes] =
          await Promise.all([
            fetch(`${base_url}${requests.fetchTrending}`),
            fetch(`${base_url}${requests.fetchPopular}`),
            fetch(`${base_url}${requests.fetchTopRated}`),
            fetch(`${base_url}${requests.fetchUpcoming}`),
          ]);

        const [trending, popular, topRated, upcoming] = await Promise.all([
          trendingRes.json(),
          popularRes.json(),
          topRatedRes.json(),
          upcomingRes.json(),
        ]);

        setMovies({
          trending: trending.results,
          popular: popular.results,
          topRated: topRated.results,
          upcoming: upcoming.results,
          loading: false,
          error: null,
        });
      } catch (error) {
        setMovies({
          trending: [],
          popular: [],
          topRated: [],
          upcoming: [],
          loading: false,
          error: error.message,
        });
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={movies}>{children}</MovieContext.Provider>
  );
};

export default MovieContext;
