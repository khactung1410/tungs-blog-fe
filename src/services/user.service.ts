import jwt_decode from 'jwt-decode';
import { authHeader } from '../helpers';

// File userService.js
const login = (userName: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/teachers/login`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      // Lưu accessToken và refreshToken vào localStorage
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));  // Lưu accessToken
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));  // Lưu refreshToken
      return data;
    });
};

// File userService.js

const refreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return Promise.reject('No refresh token available');
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/teachers/refresh-token`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      // Lưu lại accessToken mới và refreshToken mới (nếu có)
      localStorage.setItem('accessToken', JSON.stringify(data.token));
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
      }
      return data.token;
    });
};

const signup = (user: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({...user, role: 2}) // role=2 là giáo viên, do chỉ có admin(role=0) là người được dùng giao diện để đăng kí tài khoản cho giáo viên(role=2)
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/teachers/register`, requestOptions).then(handleResponse);
};

const logout = () => {
  // Xóa accessToken và refreshToken khỏi localStorage khi logout
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};


export const userService = {
  login,
  logout,
  signup,
  getAll,
  getById,
  update,
  delete: delete_user,
  refreshToken,
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: {...authHeader(), "ngrok-skip-browser-warning": "69420"},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/teachers/`, requestOptions).then(handleResponse);
}

function getById(id: any) {
  const requestOptions = {
    method: 'GET',
    headers: {...authHeader(), "ngrok-skip-browser-warning": "69420"},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/teachers/${id}`, requestOptions)
  .then(handleResponse)
  .then((teacherInfor) => {
    return teacherInfor
  });
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

// File userService.js

function handleResponse(response: any) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // Nếu token hết hạn, thử làm mới token
        return refreshToken()
          .then(newAccessToken => {
            // Tạo lại header Authorization với token mới và retry request ban đầu
            const retryRequestOptions = {
              ...response.config,
              headers: {
                ...response.config.headers,
                'Authorization': `Bearer ${newAccessToken}`
              }
            };
            return fetch(retryRequestOptions);
          })
          .then(retryResponse => retryResponse.json()); // Tiếp tục trả về kết quả từ request đã retry
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

