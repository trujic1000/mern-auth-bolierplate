import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import { register, clearErrors } from 'features/auth/authSlice';
import Icon from 'assets/Icon';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.auth.errors);

  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector(state => state.auth);
  // If logged in and user navigates to Register page, should redirect them to dashboard
  useEffect(() => {
    if (isAuthenticated) history.push('/dashboard');
  }, [isAuthenticated]);

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      password2
    };

    dispatch(register(newUser));
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col s8 offset-s2'>
          <Link
            to='/'
            onClick={() => dispatch(clearErrors())}
            className='btn-flat waves-effect'
          >
            <i className='material-icons left'>keyboard_backspace</i> Back to
            home
          </Link>
          <div className='col s12' style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className='grey-text text-darken-1'>
              Already have an account? <Link to='/login'>Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className='input-field col s12'>
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                error={errors.name}
                id='name'
                type='text'
                className={classnames('', {
                  invalid: errors.name
                })}
              />
              <label htmlFor='name'>Name</label>
              <span className='red-text'>{errors.name}</span>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                error={errors.email}
                id='email'
                type='email'
                className={classnames('', {
                  invalid: errors.email
                })}
              />
              <label htmlFor='email'>Email</label>
              <span className='red-text'>{errors.email}</span>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                error={errors.password}
                id='password'
                type='password'
                className={classnames('', {
                  invalid: errors.password
                })}
              />
              <label htmlFor='password'>Password</label>
              <span className='red-text'>{errors.password}</span>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={e => setPassword2(e.target.value)}
                value={password2}
                error={errors.password2}
                id='password2'
                type='password'
                className={classnames('', {
                  invalid: errors.password2
                })}
              />
              <label htmlFor='password2'>Confirm Password</label>
              <span className='red-text'>{errors.password2}</span>
            </div>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                type='submit'
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                disabled={loading === 'pending'}
              >
                {loading === 'pending' ? (
                  <Icon name='spinner' />
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
