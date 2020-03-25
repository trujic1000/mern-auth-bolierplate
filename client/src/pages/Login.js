import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from 'features/auth/authSlice';
import classnames from 'classnames';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errors = useSelector(state => state.auth.errors);
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const history = useHistory();
  const dispatch = useDispatch();

  // If logged in and user navigates to Login page, should redirect them to dashboard
  useEffect(() => {
    if (isAuth) history.push('/dashboard');
  }, [isAuth]);

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      email,
      password
    };

    dispatch(login(data));
  };

  return (
    <div className='container'>
      <div style={{ marginTop: '4rem' }} className='row'>
        <div className='col s8 offset-s2'>
          <Link to='/' className='btn-flat waves-effect'>
            <i className='material-icons left'>keyboard_backspace</i> Back to
            home
          </Link>
          <div className='col s12' style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className='grey-text text-darken-1'>
              Don't have an account? <Link to='/register'>Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className='input-field col s12'>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                error={errors.auth}
                id='email'
                type='email'
                className={classnames('', {
                  invalid: errors.auth || errors.email
                })}
              />
              <label htmlFor='email'>Email</label>
              <span className='red-text'>{errors.email}</span>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                error={errors.auth}
                id='password'
                type='password'
                className={classnames('', {
                  invalid: errors.auth
                })}
              />
              <label htmlFor='password'>Password</label>
              <span className='red-text'>{errors.auth}</span>
            </div>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem'
                }}
                type='submit'
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
