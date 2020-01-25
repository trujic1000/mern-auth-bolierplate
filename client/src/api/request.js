import axios from 'axios';

/**
 * Create an Axios Client with defaults
 */
export const client = axios.create({
  // TODO: Change it to use .env or config file
  baseURL: 'http://localhost:5000'
});

/**
 * Request Wrapper with default success/error actions
 */
const request = function(options) {
  const onSuccess = function(response) {
    console.log('Request Successful!', response);
    return response.data;
  };

  const onError = function(error) {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.log('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
