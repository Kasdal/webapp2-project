import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import SiteHeader from "../components/siteHeader";
import Pagination from "@material-ui/lab/Pagination"

const HomePage = (props) => {
  const [page, setPage] = React.useState(1);
  const {data, error, isLoading, isError}  = useQuery(['discover',{page : page}], getMovies)
  const handleChange = (event, value) => {
    setPage(value);
  };


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 
   return (
    <>
    <SiteHeader/>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
        <Pagination count={data.total_pages} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} page={page} onChange={handleChange} color="secondary" />
      </>
      
  );
};

export default HomePage;