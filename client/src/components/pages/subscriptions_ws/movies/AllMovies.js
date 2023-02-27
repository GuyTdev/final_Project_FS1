import '../../../styles.css'
import { useGetAllMoviesQuery } from '../../../../rtk/features/movies/moviesApiSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material"
import { useEffect, useState } from 'react';
const Movies = () => {
  const {data: movies, isLoading} = useGetAllMoviesQuery();
  const [searchField, setSearchField] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([])
  useEffect(() => {
    if(movies?.length > 0)
      setFilteredMovies(movies)
  }, [])
  const handleChange = (e) =>{

  }
  const handleDelete = () =>{
    //TODO implement
  }
  return (
    <>
      {/* Show data related to movie. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
    <h3>Movies</h3>
    <input type="search" placeholder="Search" onChange={handleChange}/>

    {isLoading?
        <div>Loading...</div>
        : movies?.map(movie => <div key={movie._id} className={"movie_box"}>
                                            <p><b>{movie.name}</b></p>
                                            <b>Genres:</b> {movie.genres.toString()}<br/>
                                            <img style={{padding:"5px"}} src={`${movie.image}`} alt={movie.name} /><br/>
                                            <b>Premiered</b> {movie.premiered}<br/>
                                            <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
                                              Delete
                                            </Button>
                                            <Button variant="outlined" onClick={handleDelete} startIcon={<EditIcon />}>
                                              Edit
                                            </Button>
                                        </div>

    )}
  </>
)
}

export default Movies