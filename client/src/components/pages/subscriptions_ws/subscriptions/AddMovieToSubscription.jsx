import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useEffect, useState } from "react"
import moment from "moment";
import { useGetAllMoviesQuery } from "../../../../rtk/features/movies/moviesApiSlice";
import { useCreateSubscriptionMutation } from "../../../../rtk/features/subscriptions/subscriptionsApiSlice";

const AddMovieToSubscription = ({member_id, memberMoviesSubscribedArray, setShowAddMovieToSubscriptionsBox}) => {
    const [selectedMovie, setSelectedMovie] = useState({movieId:"",date:moment().add(1, 'day')})
    const {data: movies, isLoading, isSuccess} = useGetAllMoviesQuery();
    const [createSubscription,{isError}]=useCreateSubscriptionMutation()

    let memberMovieList=[]
    console.log(isSuccess)
    if (isSuccess) {
        const watchedMoviesIdsArray= memberMoviesSubscribedArray?.map((movie)=>movie.movieId)
        memberMovieList = movies?.filter(movie => !watchedMoviesIdsArray?.includes(movie._id));
        console.log("memberMovieList",memberMovieList);
    }
    const handleChange =(e)=>{
        const{name, value} = e.target;
        console.log("name",name);
        console.log("value",value);
        setSelectedMovie({...selectedMovie, [name]:value})
    }
    const handleSubscribe = () =>{
        console.log(selectedMovie);
        if(member_id && selectedMovie.movieId && selectedMovie.date){
            const newSubscription = {memberId:member_id, movieIdAndDateObj:selectedMovie}
            createSubscription(newSubscription)
            if(!isError){
                setShowAddMovieToSubscriptionsBox(false)
            }
        }
    }
    return (
    <div className="add_new_subscription_box">
        <h6>Add a new Movie</h6>
        {isLoading?<div>Loading...</div>:
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth sx={{ gap: 2 }}>
        <InputLabel id="demo-simple-select-label" >Movie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={memberMovieList[0].name}
          label="Movie"
          name="movieId"
          onChange={handleChange}
        >
            {memberMovieList?.map(movie =>
                <MenuItem value={movie._id} key={movie._id}>{movie?.name}</MenuItem>
            )}
        </Select>
        {/* <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={memberMovieList.map(movie=>movie.name)}
  name="movieId"
  onChange={(newValue)=>{
    setSelectedMovieName(newValue)}}
  sx={{ width: "auto" }}
  renderInput={(params) => <TextField {...params} label="Select Movie" />}
/> */}
        <LocalizationProvider sx={{ margin: 2 }}  dateAdapter={AdapterMoment}>
              <DatePicker
              disablePast
              label="Pick a date to watch"
              name="date"
              openTo="day"
              inputFormat="YYYY MMM DD"
              views={['year', 'month', 'day']}
              value={selectedMovie.date}
              onChange={(newValue) => {
                setSelectedMovie({...selectedMovie, date: newValue });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
          sx={{ margin: 2 }}
          onClick={handleSubscribe}
          disabled={!selectedMovie.movieId && !selectedMovie.date}

          variant="contained"
          startIcon={<PlaylistAddIcon />}
        >
            Subscribe
        </Button>
        
      </FormControl>
    </Box>}
    </div>
  )
}

export default AddMovieToSubscription