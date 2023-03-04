import '../../../styles.css'
import { useDeleteMovieMutation, useGetAllMoviesQuery } from '../../../../rtk/features/movies/moviesApiSlice';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionsWatchedBox from '../subscriptions/SubscriptionsWatchedBox';


const Movies = () => {
  const {data: movies, isLoading,isFetching,isError, error} = useGetAllMoviesQuery();
  const [deleteMovie,{isSuccess}] = useDeleteMovieMutation()
  const [searchPhrase, setSearchPhrase] = useState("")
  const [filteredMovies, setFilteredMovies] = useState([])
  const navigate= useNavigate();
  useEffect(() => {
    if(movies?.length > 0)
      setFilteredMovies(movies)
  }, [])

  useEffect(() => {
    setFilteredMovies(movies);
      if(searchPhrase.length>0)
      setFilteredMovies(movies.filter(movie=>movie.name.toLowerCase().includes(searchPhrase.toLowerCase())))
  }, [movies,searchPhrase])//change filtered moviesList any time search phrase is changed.
  const handleDelete = (id) =>{

    if(window.confirm("Are you sure you want to delete this movie?")){
      deleteMovie(id)
    }
    if(isSuccess){
     navigate("")
    }
  }
  const handleEdit = (id) =>{
    console.log(`navigate to EditMoviePage details with id: ${id}`)
    if(id){
      navigate(`${id}`)
    }
  }
  return (
    <>
      {/* Show data related to movie. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
      {!isError?
      <TextField
      label="Movie Search"
        type="search"
        placeholder="Under the.."
        onChange={e=>setSearchPhrase(e.target.value)}
        InputProps={{
          endAdornment: (
              <InputAdornment position='end'>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
        }}
        />
    :null}
<br/><br/><br/>
    {isFetching?
        <div>Fetching...</div>
        : isLoading?<div>Loading...</div>:!isError?<Grid container  style={{ display: "flex", justifyContent: "center" }} sx={{gap:1}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 10, md: 16, lg:18}}>
              {filteredMovies?.map(movie => <Grid className={"movie_box"}  item xs={2} sm={4} md={4} key={movie._id} >
                                            <p><b>{movie.name}, {movie.premiered.split('-').filter(el=>el.length===4)}</b></p>
                                            <b>Genres:</b> {movie.genres.toString().replaceAll(",",", ")}<br/>
                                            <img id="movie_img" style={{padding:"5px"}} src={`${movie.image}`} alt={movie.name} /><br/>
                                            <b>Premiered</b> {movie.premiered}<br/>
                                            <Button variant="outlined" onClick={()=>handleDelete(movie._id)} startIcon={<DeleteIcon />}>
                                              Delete
                                            </Button>
                                            <Button variant="outlined" onClick={()=>handleEdit(movie._id)} startIcon={<EditIcon />}>
                                              Edit
                                            </Button>
                                            <SubscriptionsWatchedBox/>
                                        </Grid>


              )}
              </Grid>
    :isError?<div>failed to load data</div>:<div>no movies to show</div>}
  </>
)
}

export default Movies