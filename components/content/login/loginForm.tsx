import { VisibilityOff, Visibility } from '@mui/icons-material';
import { FormControl, InputAdornment, IconButton, Button, TextField, Box, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { api } from '../../../src/services/api';

const Styled = styled.div`
display: flex;

img {
  height: 100vh;
}

.login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 28px;
      font-weight: 600;
    }

    .form {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      margin-bottom: 50px;

      caption {
        color: red;
        margin-top: 20px;
      }
    }
  }

`;

const LoginForm: FC = () => {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [userNameError, setUserNameError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [loginError, setLoginError] = useState<string>('');
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const handleLogin = async () => {
    if (userName !== '' && pass !== '') {
      setLoadingLogin(true);
      const res = await api.auth.login(userName, pass);

      switch (res) {
        case 'Unauthorized': {
          setLoginError('Incorrect Username or Password');
          setLoadingLogin(false);
          break;
        }
        case 'Success': {
          router.push('/dashboard');
          break;
        }
        default: {
          setLoginError(res);
          setLoadingLogin(false);
          break;
        }
      }

      return;
    }
    setUserNameError(userName === '');
    setPassError(pass === '');
  };

  return (
    <Styled>
      <div>
        <img src="https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80" alt="Speed" />
      </div>
      <div onSubmit={handleLogin} className="login-form">
        <h2>Democratizing Data</h2>
        <div className="form">
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <TextField
              required
              value={userName}
              id="outlined-adornment-username"
              type="text"
              label="Username"
              error={userNameError}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <TextField
              required
              value={pass}
              error={passError}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPass(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              label="Password"
            />
          </FormControl>
          {loginError &&
            <caption>{loginError}</caption>
          }
        </div>
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            variant="contained"
            disabled={loadingLogin}
            onClick={handleLogin}
          >
            Login
          </Button>
          {loadingLogin && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px'
              }}
            />
          )}
        </Box>
      </div>
    </Styled>
  );
};

export { LoginForm };