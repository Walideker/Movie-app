import React, { useEffect, useState } from 'react'
import MoviesList from './components/MoviesList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heading from './components/Heading';
import './App.css'
function App() {


  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const apiKey = 'apikey=a50aefe1'


  const MoviesRequest = async (search) => {
    const url = `http://www.omdbapi.com/?s=${search}&${apiKey}`
    const response = await fetch(url)
    const responseJson = await response.json()
    console.log(responseJson)
    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }
  useEffect(() => {
    MoviesRequest(search)
  }, [search])
  const daempty = () => {
    if (movies.length === 0) {
      return <h1 className='nomvies'>No movies to show</h1>;
    }
    return null;
  };

  return (
    <div className='container-fluid text-center '>
      <div>
        <Heading />
        <input
          placeholder='Search...'
          onChange={(e) => setSearch(e.target.value)}
          className='m-3'
        />
      </div>
      <div className="d-flex justify-content-around align-items-center flex-wrap dano">
        {daempty()}
        {movies.map((movie) => (
          <div key={movie.imdbID} className="text-center">
            <img className="m2" src={movie.Poster} alt=""></img>
            <h1>{movie.Title}</h1>
            <h2>{movie.Year}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
export default App;
