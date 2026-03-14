import React from "react";
import "./App.css";
import PortfolioCard from "./portfolioCard/portfolioCard.js";
import MovieCard from "./movieCard/movieCard.js";

function App() {

  return (
    <div className="App">
      <PortfolioCard />
      <MovieCard />
    </div>
  );
}

export default App;
