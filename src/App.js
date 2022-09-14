import { useState } from "react";

import TopBar from "./Components/TopBar/TopBar";
import Home from "./Components/Home/Home";

export function makeRequest(specs) {
  // return `https://api.themoviedb.org/3${specs}?api_key=4d91796accee221c06cb109a9805be7e`;

   return `https://api.themoviedb.org/3${specs}?api_key=7fd7d7e0d432031c5ae55f16dced0d2a`;

}

export function makePosterImageUrl(posterPath) {
  return `https://image.tmdb.org/t/p/original${posterPath}`;
}

export function makeBackdropImageUrl(url) {
  return `https://image.tmdb.org/t/p/original${url}`;
}

export function classNames(...names) {
  return names.filter((name) => name).join(" ");
}


function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <TopBar onSearchMovies={setSearchResults} />
    
      <Home searchResults={searchResults} />
    </div>
  );
}

export default App;
