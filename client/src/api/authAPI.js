import request from './request';

export const signUp = data => {
  return request({
    url: '/api/users/register',
    method: 'POST',
    data
  });
};

export const login = data => {
  return request({
    url: '/api/users/login',
    method: 'POST',
    data
  });
};
