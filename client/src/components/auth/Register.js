import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, clearErrors, register } from '../../context/auth/AuthState';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      setIsLoading(true);
      await register(authDispatch, {
        name,
        email,
        password
      });
      setIsLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <div className='form-container'>
      <h1>
        Get <span className='text-primary'>Started</span>
      </h1>
      <p>Create an Account to start saving notes</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        
        <input
          type='submit'
          value={isLoading ? 'Loading...' : 'Register'}
          className='btn btn-primary btn-block'
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default Register;
