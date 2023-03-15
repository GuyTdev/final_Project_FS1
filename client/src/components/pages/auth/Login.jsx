import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useLoginUserMutation } from '../../../rtk/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { setUserRoleAsAdmin } from '../../../rtk/features/users/userSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        GuyTDev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [showPassword, setShowPassword ] = useState(false)
  const [firstTimeFlag, setFirstTimeFlag ] = useState(true)//indicates whether the user is first time logging in
  const [loginUser]=useLoginUserMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFirstTimeFlag(true);
    let username= data.get('username')
    let password= data.get('password')
    const {data:loginResp,isError,error}=await loginUser({username,password})
    if(isError){
      alert(error)
    }else{
      if(loginResp){
        sessionStorage.setItem('userId', loginResp?.user?._id)
        sessionStorage.setItem('Auth Token', loginResp?.user?.token)
        sessionStorage.setItem('username', loginResp?.user?.username)
        if(firstTimeFlag){
          sessionStorage.setItem('firstTimeFlag', true)
          sessionStorage.setItem('autoLogoutTime',"")
        }else{
          setFirstTimeFlag(false)
        }
        if (loginResp?.user?._id === '63fc6f05ff57c69b8bd0cd30') {//id of the only admin
          dispatch(setUserRoleAsAdmin())//turn rtk role as admin
        }
        navigate('/api')
      }else{
        alert('wrong username or password\n please check your credentials!\n Note: If you didn\'t create an account yet, please navigate to Create Account')
      }
    }

    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
            />
                    <FormControl sx={{ mt: 1, width:'45ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            required
            type={showPassword ? 'text' : 'password'}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link to="create_account" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item sx={{centered:true}}>
                <Link to="/auth/create_account"  variant="body2">
                  {"Don't have an account? Create Account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}