import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';
function Row({ title, fetchUrl, isLargeRow }) {
  //props ={title="NETFILX ORIGINALS", fetchUrl={requests.fetchNetflixOriginals}}
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); //https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
      setMovies(request.data.results); //20개의 data.result array를 setmovie를 통해 movie객체에 넣는다.
      console.log(request);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} //이미지주소 https://image.tmdb.org/t/p/original/data.results[i].post_path
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
