import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const  ButtonAppBar = () =>{
  const navigate = useNavigate()
  const handleLogin =()=>{
      navigate('auth/login')
  }
  const handleCreateAccount =()=>{
      navigate('auth/create_account')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MSW
          </Typography>
          <Button sx={{bgcolor:'#008CFF', margin:1}} color="inherit" onClick={handleLogin}>Login</Button>
          <Button sx={{bgcolor:'#008CFE'}} color="inherit" onClick={handleCreateAccount}>Create Account</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ButtonAppBar;