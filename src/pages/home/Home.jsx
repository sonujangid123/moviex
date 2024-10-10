import React from "react";
import { MovieProvider } from "../../context/MovieContext";
import Trending from "./homeComponents/Trending";
import Popular from "./homeComponents/Popular";
import TopRated from "./homeComponents/TopRated";
import Upcoming from "./homeComponents/Upcomming";
import HeroBanner from "./homeComponents/HeroBanner";

function Home() {
  return (
    <MovieProvider>
      <HeroBanner />
      <div className="container text-light mt-5">
        <h1 className="text-center mb-4">Trending Movies</h1>
        <Trending />
        <h1 className="text-center my-4">Popular Movies</h1>
        <Popular />
        <h1 className="text-center my-4">Top Rated Movies</h1>
        <TopRated />
        <h1 className="text-center my-4">Upcoming Movies</h1>
        <Upcoming />
      </div>
    </MovieProvider>
  );
}

export default Home;
