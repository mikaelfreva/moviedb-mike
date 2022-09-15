import React, { useState, useEffect } from "react";
import { classNames, makeRequest } from "../../App";
import MoviePoster from "../MoviePoster/MoviePoster";
import Style from "./Home.module.css";
import MovieModal from "../MovieModal/MovieModal";

export default function Home(props) {
  const { searchResults } = props;
  const url = makeRequest("/movie/popular");
  const [popularMovies, setPopularMovies] = useState([]);
  const [showMovie, setShowMovie] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((movies) => setPopularMovies(movies.results));
  }, [url]);

  function onClickPoster(movie) {
    setShowMovie(true);
    setMovie(movie);
  }

  return (
    <div className={classNames(Style.main, showMovie && Style.showMovie)}>
      {searchResults.length > 0
        ? searchResults.map((movie, index) => (
            <MoviePoster
              key={index}
              movie={movie}
              onClick={(movie) => onClickPoster(movie)}
              hover={true}
            />
          ))
        : popularMovies.map((movie, index) => (
            <MoviePoster
              key={index}
              movie={movie}
              onClick={onClickPoster}
              hover={true}
            />
          ))}
      {showMovie && (
        <MovieModal
          movie={movie}
          onCloseModal={() => setShowMovie(false)}
        />
      )}
    </div>
  );
}
