import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useEffect, useState } from "react";
import moment from "moment";
import { useGetAllMoviesQuery } from "../../../../rtk/features/movies/moviesApiSlice";
import { useCreateSubscriptionMutation } from "../../../../rtk/features/subscriptions/subscriptionsApiSlice";

const AddMovieToSubscription = ({ member_id, memberMoviesIdsSubscribedArray, setShowAddMovieToSubscriptionsBox}) => {
  const [selectedMovie, setSelectedMovie] = useState({
    movieId: "",
    date: moment().add(1, "day"),
  });
  const { data: movies, isLoading, isSuccess,isError,error } = useGetAllMoviesQuery();
  const [createSubscription, { isSuccess:isSuccessCreate }] = useCreateSubscriptionMutation();
  useEffect(() => {
    if(isError){
      console.log(error);
    }
    if(isSuccessCreate){
      console.log(`successfully create subscription of Member: ${member_id} with movie id: ${selectedMovie.movieId}`);
      setShowAddMovieToSubscriptionsBox(false);
    }
  }, [isSuccessCreate, isError])

  let memberMovieList = [];
  if (isSuccess) {
    memberMovieList = movies?.filter((movie) => {
      return !memberMoviesIdsSubscribedArray?.includes(movie._id);
    });
  }
  const handleChangeMovie = (e, value) => {
    let index = movies?.findIndex((movie) => movie.name === value);
    if (index !== -1) {
      setSelectedMovie({ ...selectedMovie, movieId: movies[index]._id });
    }
  };
  const handleSubscribe = async() => {
    if (member_id && selectedMovie.movieId && selectedMovie.date) {
      const newSubscription = {
        memberId: member_id,
        movieIdAndDateObj: selectedMovie,
      };
      await createSubscription(newSubscription);
    }
  };
  return (
    <div className="add_new_subscription_box">
      <h6>Add a new Movie</h6>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth sx={{ gap: 2 }}>
            <Autocomplete
              id="combo-box-demo"
              options={memberMovieList.map((movie) => movie.name)}
              onChange={handleChangeMovie}
              sx={{ width: "auto" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Movie" />
              )}
            />
            <LocalizationProvider
              sx={{ margin: 2 }}
              dateAdapter={AdapterMoment}
            >
              <DatePicker
                disablePast
                label="Pick a date to watch"
                name="date"
                openTo="day"
                inputFormat="YYYY MMM DD"
                views={["year", "month", "day"]}
                disableMaskedInput
                value={selectedMovie.date}
                onChange={(newValue) => {
                  setSelectedMovie({ ...selectedMovie, date: newValue });
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
        </Box>
      )}
    </div>
  );
};

export default AddMovieToSubscription;
