import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();

  // If logged in redirect to dashboard
  useEffect(() => {
    if (isAuth) history.push('/dashboard');
  }, [isAuth]);
  return (
    <div style={{ height: '75vh' }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Build</b> a login/auth app with the{' '}
            <span style={{ fontFamily: 'monospace' }}>MERN</span> stack from
            scratch
          </h4>
          <p className="flow-text grey-text text-darken-1">
            Create a (minimal) full-stack app with user authentication via
            passport and JWTs
          </p>
          <br />
          <div className="col s6">
            <Link
              to="/register"
              style={{
                width: '140px',
                borderRadius: '3px',
                letterSpacing: '1.5px'
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </Link>
          </div>
          <div className="col s6">
            <Link
              to="/login"
              style={{
                width: '140px',
                borderRadius: '3px',
                letterSpacing: '1.5px'
              }}
              className="btn btn-large btn-flat waves-effect white black-text"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
