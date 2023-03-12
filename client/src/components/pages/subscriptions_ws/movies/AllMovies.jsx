import '../../../styles.css'
import { useDeleteMovieMutation, useGetAllMoviesQuery } from '../../../../rtk/features/movies/moviesApiSlice';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionsWatchedBox from '../subscriptions/SubscriptionsWatchedBox';
import { useDeleteMovieFromAllSubscriptionsMutation } from '../../../../rtk/features/subscriptions/subscriptionsApiSlice';
import { useSelector } from 'react-redux';


const Movies = () => {
  const {data: movies, isLoading,isFetching,isError, error} = useGetAllMoviesQuery();
  const [deleteMovie,{isSuccess,isError:isErrorDeleting, error:errorDelete}] = useDeleteMovieMutation()
  const [deleteMovieFromAllSubscriptions,{isSuccess:isSuccessDeleteMovieFromAllSubscriptions,isError:isErrorDeleteMovieFromAllSubscriptions, error:errorDeleteMovieFromAllSubscriptions}] = useDeleteMovieFromAllSubscriptionsMutation()
  const [searchPhrase, setSearchPhrase] = useState("")
  const [filteredMovies, setFilteredMovies] = useState([])
  const {permissions} = useSelector(state=>state.user.userDetails)
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
  useEffect(() => {
    if(isSuccess && isSuccessDeleteMovieFromAllSubscriptions){
      navigate("")
      console.log(`movie deleted successfully`);
     }
     if(isErrorDeleting||isErrorDeleteMovieFromAllSubscriptions){
      if(isErrorDeleting){
        console.log(`error while deleting data: ${errorDelete}`);
      }
      if(isErrorDeleteMovieFromAllSubscriptions){
        console.log(`error while deleting data: ${errorDeleteMovieFromAllSubscriptions}`);
      }
     }
     if(isError){
      console.log(`error while fetching data: ${error}`);
     }
  }, [isSuccess,isErrorDeleting,isError,isErrorDeleteMovieFromAllSubscriptions,isSuccessDeleteMovieFromAllSubscriptions])
  
  const handleDelete = async(id) =>{

    if(window.confirm("Are you sure you want to delete this movie?")){
      await deleteMovie(id)
      await deleteMovieFromAllSubscriptions(id);
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
                                            {permissions?.includes("Update Movies")?
                                            <Button sx={{margin:1}} variant="outlined" onClick={()=>handleEdit(movie._id)} startIcon={<EditIcon />}>
                                              Edit
                                            </Button>
                                            :null}
                                            {permissions?.includes("Delete Movies")?
                                            <Button sx={{margin:1}} variant="outlined" onClick={()=>handleDelete(movie._id)} startIcon={<DeleteIcon />}>
                                              Delete
                                            </Button>
                                            :null}
                                            <SubscriptionsWatchedBox movieId={movie._id}/>
                                        </Grid>
              )}
              </Grid>
    :isError?<div>failed to load data</div>:<div>no movies to show</div>}
  </>
)
}

export default Movies