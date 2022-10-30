import {
  InputLabel, TextField, Button, Stack, Snackbar, Alert,
} from '@mui/material';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { SignupProps } from '../../interfaces';
import { signUpSchema } from '../../validation';
import './style.css';
import FreelancerSignUp from './freelancerStep';
import UserContext from '../../context';

function Signup({ setActiveStep, userRole, setUserInfo }: SignupProps) {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const checkUser = () => {
    if (userRole === 'freelancer') {
      setActiveStep((activeStep: number) => activeStep + 1);
    } else {
      navigate('/profile');
    }
  };
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post('/api/v1/auth/signup', {
          role: userRole,
          name: values.userName,
          email: values.email,
          password: values.password,
        });
        const userData = data.data.data;
        const { name, id } = data.data.data;
        setUserInfo({ userId: id, name });
        if (userRole === 'client') {
          if (setUser) {
            setUser(userData);
          }
        }
        setError(false);
        formik.resetForm();
        checkUser();
      } catch (err:unknown) {
        formik.setErrors({ email: err.response.data.message });
        setError(true);
      }
    },
  });

  return (
    <div className="s-u-form">
      <h3 className="header-signup-1">
        you are signing up as
        {' '}
        {userRole}
      </h3>
      <form className="signup-form-1" onSubmit={formik.handleSubmit}>
        <div className="form-input">
          <InputLabel className="title-input">Username</InputLabel>
          <TextField
            className="input-login"
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.errors.userName ? formik.errors.userName : ' '}
            name="userName"
            id="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </div>
        <div className="form-input">
          <InputLabel className="title-input">Email</InputLabel>
          <TextField
            className="input-login"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.errors.email ? formik.errors.email : ' '}
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </div>
        <div className="form-input">
          <InputLabel className="title-input">Password</InputLabel>
          <TextField
            id="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.errors.password ? formik.errors.password : ' '}
            name="password"
            type="password"
            className="input-login"
            value={formik.values.password}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </div>
        <div className="form-input">
          <InputLabel className="title-input">Confirm Password</InputLabel>
          <TextField
            id="confirmPassword"
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.errors.confirmPassword ? formik.errors.confirmPassword : ' '}
            name="confirmPassword"
            type="password"
            className="input-login"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          style={{ width: '25%', margin: '0 auto', marginTop: '10px' }}
        >
          Submit
        </Button>
      </form>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={error}
          onClose={() => setError(false)}
          autoHideDuration={6000}
        >
          <Alert severity="error">
            Something went Wrong
          </Alert>
        </Snackbar>
      </Stack>

    </div>
  );
}

export { Signup, FreelancerSignUp };
