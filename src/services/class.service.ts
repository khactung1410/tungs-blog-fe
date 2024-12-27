// File class.service.ts
import { authHeader } from '../helpers';

const getAll = () => {
  const requestOptions = {
    method: 'GET',
    headers: {...authHeader(), "ngrok-skip-browser-warning": "69420"},
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/classes/`, requestOptions)
    .then(handleResponse)
    .then((classes: any) => {
      return classes;
    });
};

const create = (classObj: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json', "ngrok-skip-browser-warning": "69420" },
    body: JSON.stringify({ ...classObj })
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/classes/`, requestOptions).then(handleResponse);
};

const update = (classObj: any) => {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json', "ngrok-skip-browser-warning": "69420" },
    body: JSON.stringify({ ...classObj })
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/classes/${classObj.id}`, requestOptions).then(handleResponse);
};

const remove = (classId: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...authHeader(), 'Content-Type': 'application/json', "ngrok-skip-browser-warning": "69420" },
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/classes/${classId}`, requestOptions).then(handleResponse);
};

const logout = () => {
  // Xóa accessToken khỏi localStorage khi logout
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

function handleResponse(response: any) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // Nếu bị lỗi 401 (token hết hạn), auto logout
        logout();
        window.location.reload();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

export const classService = {
  getAll,
  create,
  update,
  remove
};
