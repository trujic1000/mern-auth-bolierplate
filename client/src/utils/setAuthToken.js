import { client } from '../api/request';

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    client.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete client.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
