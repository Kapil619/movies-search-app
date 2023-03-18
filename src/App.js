import React, { useEffect, useState } from "react";
import SearchIcon from "./search.svg"
import "./App.css"
import MovieCard from "./MovieCard";
import LoadingBar from "react-top-loading-bar";
const API_URL = 'https://www.omdbapi.com?apikey=17eea424';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [progress, setProgress] = useState(0)

  const SearchMovies = async (title) => {
    setProgress(10);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    setProgress(100);
  }

  useEffect(() => {
    SearchMovies('John Wick');
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      SearchMovies(searchTerm)
    }

  }
  return (
    <div className="app">
      <LoadingBar
        color='#f11946'
        progress={progress} />
      <h1>Movieland</h1>

      <div className="search">
        <input autoFocus placeholder="Search for movies"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          onKeyDown={handleKeyDown}
        />
        <img src={SearchIcon} alt="searchIcon"
          onClick={() => {
            SearchMovies(searchTerm)
          }} />

      </div>
      {
        movies?.length > 0
          ? (
            <div className="container">
              {/* <MovieCard movie={movies[0]}  */}
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Oops, No Movies found</h2>
            </div>
          )

      }
    </div>

  )
}

export default App;