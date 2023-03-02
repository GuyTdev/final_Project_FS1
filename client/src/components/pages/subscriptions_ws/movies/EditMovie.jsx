import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useGetMovieQuery, useUpdateMovieMutation } from "../../../../rtk/features/movies/moviesApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MultipleSelectChip } from "./MultipleSelectChip";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const EditMovie = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const {data: movie, isLoading:isLoadingMovie, isFetching, isError:isErrorGetMovie} = useGetMovieQuery(id);
  const [updateMovie, { isError, error }] = useUpdateMovieMutation();
  const [updatedMovie, setUpdatedMovie] = useState({});
  const [genreName, setGenreName] = useState([]);

  useEffect(() => {
    if(movie){
      console.log("old Details", movie);
      console.log("premiered object details", moment(movie.premiered.replaceAll('-', '/')));
      const momentObjMovieDate = moment(movie.premiered.replaceAll('-', '/'));
      setUpdatedMovie({...movie,premiered: momentObjMovieDate});
      setGenreName(movie?.genres);
    }
  }, [movie])
  useEffect(() => {
    setUpdatedMovie({...updatedMovie, genres: genreName });
  }, [genreName])


  const handleUpdate = async (e) => {
    if (updatedMovie) {
      const dateISOStringFormat= moment(updatedMovie.premiered).format('L').replaceAll('/', '-')
      const newUpdatedMovie = {...updatedMovie, premiered: dateISOStringFormat, genres: genreName };
      await updateMovie(newUpdatedMovie);
      if(!isError) {
        navigate("");
      }else{
        alert("something went wrong");
      }
    }
  }
  const handleCancel = (e) => {
    console.log("canceled");
    navigate("");
  };
  const handleChange = (e) => {
    console.log(updatedMovie)
    const { name, value } = e.target;
    console.log("genreName",genreName);
    setUpdatedMovie({ ...updatedMovie, [name]: value });
  };
  let areAllFieldsFilled =
    updatedMovie?.name !== "" &&
    updatedMovie?.genres?.length > 0 &&
    updatedMovie?.image !== "" &&
    updatedMovie?.premiered !== "";

  return (

    <div>
      <h3>Edit Movie: {movie?.name}</h3>
    {
        isErrorGetMovie? <p>Error: {error.message}</p>:
      isLoadingMovie? <p>Loading...</p>:
      isFetching? <p>Fetching...</p>:
      <div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControl>
          <FormLabel
            sx={{ color: areAllFieldsFilled ? "green" : "red" }}
          >
            Movie Details
          </FormLabel>
          <TextField
            sx={{ margin: 2 }}
            required
            id="outlined-required"
            label="Movie Title"
            name="name"
            placeholder="Titanic"
            onChange={handleChange}
            defaultValue={movie.name}
          />
          <TextField
            sx={{ margin: 2 }}
            type='url'
            required
            id="outlined-required"
            label="image url"
            name="image"
            placeholder="Paste image url here"
            onChange={handleChange}
            defaultValue={movie.image}
          />
          <MultipleSelectChip genreName={genreName} setGenreName={setGenreName}  name="genres" onChange={handleChange}/>
          <LocalizationProvider  dateAdapter={AdapterMoment}>
              <DatePicker
              disableFuture
              label="Premiered"
              name="premiered"
              openTo="year"
              inputFormat="YYYY MMM DD"
              views={['year', 'month', 'day']}
              value={updatedMovie?.premiered}
              onChange={(newValue) => {
                setUpdatedMovie({...updatedMovie, premiered: newValue });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        direction="row"
        spacing={2}
      >
        <Button
          onClick={handleUpdate}
          disabled={!areAllFieldsFilled}
          variant="contained"
          startIcon={<UpdateIcon />}
        >
          Update
        </Button>
        <Button
          onClick={handleCancel}
          variant="outlined"
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </Stack>
      </div>
      }
      </div>
  );
};

export default EditMovie;