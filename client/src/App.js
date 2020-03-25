import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import PrivateRoute from './components/private-route/PrivateRoute';
import checkAuth from './utils/checkAuth';
import store from './store';

const App = () => {
  // Check if user is already logged in
  useEffect(() => {
    checkAuth(store);
  }, []);
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Switch>
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
