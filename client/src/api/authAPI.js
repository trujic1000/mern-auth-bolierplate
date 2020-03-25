import request from './request';

const register = data => {
  return request({
    url: '/api/users/register',
    method: 'POST',
    data
  });
};

const login = data => {
  return request({
    url: '/api/users/login',
    method: 'POST',
    data
  });
};

export default {
  register,
  login
};
