import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import AllMembers from './AllMembers';
import AddMember from './AddMember';

 const  MembersMenu = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered aria-label="lab API tabs example">
            <Tab label="All Members" value="1" />
            <Tab label="Add Member" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><AllMembers/></TabPanel>
        <TabPanel value="2"><AddMember/></TabPanel>
      </TabContext>
    </Box>
  );
}
export default MembersMenu;