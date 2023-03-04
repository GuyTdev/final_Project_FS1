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
        memberMovieList = movies?.filter(movie => {
          console.log(movie._id);
          console.log("memberMoviesSubscribedArray",memberMoviesSubscribedArray);
          return !memberMoviesSubscribedArray?.includes(movie._id)
        });
        console.log("memberMovieList",memberMovieList);
    }
    const handleChange =(e)=>{
        const{name, value} = e.target;
        setSelectedMovie({...selectedMovie, [name]:value})
    }
    const handleChangeMovie =(e,value)=>{
      console.log("newValue in handle",value);

      let index = movies?.findIndex(movie=>movie.name===value);
      if(index!==-1){
        console.log("movies[index].name",movies[index]._id)
        setSelectedMovie({...selectedMovie,movieId: movies[index]._id})
      }
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
       
        <Autocomplete
  id="combo-box-demo"
  options={memberMovieList.map(movie=>movie.name)}
  onChange={handleChangeMovie}
  sx={{ width: "auto" }}
  renderInput={(params) => 
  <TextField {...params} label="Select Movie" />}
/>
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