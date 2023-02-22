import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import AllMovies from './AllMovies';
import AddMovie from './AddMovie';

 const  MoviesMenu = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered aria-label="lab API tabs example">
            <Tab label="All Movies" value="1" />
            <Tab label="Add Movie" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><AllMovies/></TabPanel>
        <TabPanel value="2"><AddMovie/></TabPanel>
      </TabContext>
    </Box>
  );
}
export default MoviesMenu;