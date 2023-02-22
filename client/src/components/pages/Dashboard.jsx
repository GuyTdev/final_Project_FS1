
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import UsersMenu from './users/UsersMenu';
import MembersMenu from './subscriptions_ws/members/MembersMenu';
import MoviesMenu from './subscriptions_ws/movies/MoviesMenu';

 const  Dashboard = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <h3>Dashboard for loggedIn users</h3>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered aria-label="lab API tabs example">
            <Tab label="Movies" value="1" />
            <Tab label="Subscriptions" value="2" />
            <Tab label="User Management" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><MoviesMenu/></TabPanel>
        <TabPanel value="2"><MembersMenu/></TabPanel>
        <TabPanel value="3"><UsersMenu/></TabPanel>
      </TabContext>
    </Box>
  );
}
export default Dashboard;