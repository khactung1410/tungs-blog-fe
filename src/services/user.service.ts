import jwt_decode from 'jwt-decode';
import { authHeader } from '../helpers';

const login = (userName: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/teachers/login`, requestOptions)
    .then(handleResponse)
    .then((token) => {
      console.log(token)
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('token', JSON.stringify(token.token));
      return token;
    });
};

const getUserByToken = (token: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  };
  return fetch(`${process.env.API_URL}/api/teachers/getByToken`, requestOptions).then(handleResponse);
};

const signup = (user: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({...user, role: 2}) // role giáo viên, do chỉ có admin là người được dùng giao diện đăng kí tài khoản cho giáo viên(role=2)
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/teachers/register`, requestOptions).then(handleResponse);
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
};

export const userService = {
  login,
  logout,
  signup,
  getAll,
  getById,
  update,
  getUserByToken,
  delete: delete_user
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${process.env.API_URL}/users`, requestOptions).then(handleResponse);
}

function getById(id: any) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${process.env.API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user: any) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${process.env.API_URL}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function delete_user(id: any) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${process.env.API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response: any) {
  console.log(response)
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
