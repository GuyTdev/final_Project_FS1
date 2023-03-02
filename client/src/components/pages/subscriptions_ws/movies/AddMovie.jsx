import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useCreateMovieMutation } from "../../../../rtk/features/movies/moviesApiSlice";
import { useNavigate } from "react-router-dom";
import { MultipleSelectChip } from "./MultipleSelectChip";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddMovie = () => {
  const navigate = useNavigate();

  const [createMovie, { isError, error }] =
  useCreateMovieMutation();
  const [movie, setMovie] = useState({
    name: "",
    genres: [],
    image: "",
    premiered: moment("12/19/1997")
  });
  const [genreName, setGenreName] = useState([]);
  useEffect(() => {
    setMovie({...movie, genres: genreName });
  }, [genreName])

  const handleSave = async (e) => {
    if (movie) {
      const dateISOStringFormat= moment(movie.premiered).format('L').replaceAll('/', '-')
      const newMovie = {...movie, premiered: dateISOStringFormat };
      console.log(newMovie);
      await createMovie(newMovie);
      if(!isError) {
        navigate("");
      }else
        console.log(error);
    }
  }
  const handleCancel = (e) => {
    console.log("canceled");
    navigate("");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };
  let areAllFieldsFilled =
    movie?.name !== "" &&
    movie?.genres?.length > 0 &&
    movie?.image !== "" &&
    movie?.premiered !== "";

  return (
    <>
      <h3>Add Movie</h3>
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
            defaultValue=""
          />
          <TextField
            sx={{ margin: 2 }}
            type='url'
            required
            id="outlined-required"
            label="image url"
            name="image"
            placeholder="Paste image url here.."
            onChange={handleChange}
            defaultValue=""
          />
          <MultipleSelectChip genreName={genreName} setGenreName={setGenreName} />
          <LocalizationProvider  dateAdapter={AdapterMoment}>
              <DatePicker
              disableFuture
              label="Premiered"
              name="premiered"
              openTo="year"
              inputFormat="YYYY MMM DD"
              views={['year', 'month', 'day']}
              value={movie.premiered}
              onChange={(newValue) => {
                const stringDate = newValue;
                setMovie({...movie, premiered: stringDate });
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
          onClick={handleSave}
          disabled={!areAllFieldsFilled}
          variant="contained"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
        <Button
          onClick={handleCancel}
          variant="outlined"
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default AddMovie;