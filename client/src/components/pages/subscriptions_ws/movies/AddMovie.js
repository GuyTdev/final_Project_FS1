import { Button, FormControl, Stack, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import '../../../styles.css'
const AddMovie = () => {
  const handleCancel = () => {
  //TODO
  }
  const handleSave = () => {
  //TODO
  }
  return (
    <div>
      <h3>AddMovie</h3>
      <FormControl>
      <TextField
          required
          id="outlined-required"
          label="Movie Title"
          placeholder="Titanic"
          defaultValue=""
        />
      <TextField
          required
          id="outlined-required"
          label="Genres"
          placeholder="Drama, Thriller"
          defaultValue=""
        />
      <TextField
          required
          id="outlined-required"
          label="image url"
          placeholder="Drama, Thriller"
          defaultValue=""
        />
      <TextField
          required
          id="outlined-required"
          label="Premiered"
          placeholder="20/05/2020"
          defaultValue=""
        />
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<SaveIcon />}>
          Save
        </Button>
        <Button variant="outlined" endIcon={<CancelIcon />}>
          Cancel
        </Button>
      </Stack>
      </FormControl>



    </div>
  )
}

export default AddMovie