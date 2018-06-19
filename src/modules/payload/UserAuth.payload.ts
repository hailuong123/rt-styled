const Cookies = require('universal-cookie');
import { auth } from '../../utility/auth';

export let authenticate = (username: string, password: string) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username, password})
  };
  return fetch('/authenticate', requestOptions)
          .then(handleResponse)
          .then(
            user => {
              if (user && user.id_token) {
                const cookies = new Cookies();
                const expiresTime = 24 * 3600;
                cookies.set('JBCUser', JSON.stringify(user), { path: '/', maxAge: expiresTime });
              }
              return user;
            }
          );
};

export let register = (body: any) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch('/users', requestOptions)
          .then(handleResponse);
};

export let changePass = (password: string) => {
  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth()}`
    },
    body: JSON.stringify({password})
  };
  return fetch('/users', requestOptions)
          .then(handleResponse);
};

function handleResponse(response: any) {
  if (response.status >= 404) {
    return alert('Error ' + response.status + '. Please try again or contact to Admin!');
  }
  if (!response.ok) {
    return Promise.reject(response.json());
  }
  return response.json();
}