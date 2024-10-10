import React, { useContext } from "react";
import MovieContext from "../../../context/MovieContext";

function HeroBanner() {
  const { trending, loading, error } = useContext(MovieContext);

  if (loading) return <div>Loading Banner...</div>;
  if (error) return <div>Error: {error}</div>;

  const randomIndex = Math.floor(Math.random() * trending.length);
  const heroMovie = trending[randomIndex];

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(4, 21, 45, 0.99)),url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
        height: "60vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#04152d",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="banner-content">
        <input
          className="inp"
          type="text"
          placeholder="search for Movie or tvShows"
        />
        <button className="btn"></button>
      </div>
    </div>
  );
}

export default HeroBanner;
