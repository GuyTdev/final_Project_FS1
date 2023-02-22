import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import AllUsers from './AllUsers';
import AddUser from './AddUser';

 const  UsersMenu = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered aria-label="lab API tabs example">
            <Tab label="All Users" value="1" />
            <Tab label="Add User" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><AllUsers/></TabPanel>
        <TabPanel value="2"><AddUser/></TabPanel>
      </TabContext>
    </Box>
  );
}
export default UsersMenu;