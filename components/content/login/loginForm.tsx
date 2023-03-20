import { VisibilityOff, Visibility } from '@mui/icons-material';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
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

  const [userName, setUserName] = useState<string>('');
  const [pass, setPass] = useState<string>('');


  const handleLogin = async () => {

    if (userName !== '' && pass !== '') {
      const res = await api.auth.login(userName, pass);

      switch (res) {
        case 'Unauthorized': {
          setLoginError('Incorrect Username or Password');
          break;
        }
        case 'Success': {
          router.push('dashboard');
          break;
        }
        default: {
          setLoginError(res);
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
                ),
              }}
              label="Password"
            />
          </FormControl>
          {loginError &&
            <caption>{loginError}</caption>
          }
        </div>
        <Button onClick={handleLogin} variant="contained">Login</Button>
      </div>
    </Styled>
  );
};

export { LoginForm };