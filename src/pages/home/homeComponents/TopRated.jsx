import React, { useContext } from "react";
import MovieContext from "../../../context/MovieContext";

function TopRated() {
  const { topRated, loading, error } = useContext(MovieContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Split the top-rated movies into chunks of 4 per slide
  const chunkedMovies = [];
  for (let i = 0; i < topRated.length; i += 4) {
    chunkedMovies.push(topRated.slice(i, i + 4));
  }

  return (
    <div id="topRatedMoviesCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {chunkedMovies.map((chunk, index) => (
          <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
            <div className="row">
              {chunk.map((movie) => (
                <div className="col-md-3 mb-4" key={movie.id}>
                  <div className="card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5>{movie.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Carousel controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#topRatedMoviesCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#topRatedMoviesCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default TopRated;
