import { authHeader } from '../helpers';

const getAll = async () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/`, requestOptions);
  return handleResponse(response);
};

const create = (student: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...student })
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/students/`, requestOptions)
    .then(handleResponse);
};


const update = async (student: any) => {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...student }),
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/${student.id}`, requestOptions);
  return handleResponse(response);
};

const remove = async (studentId: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/${studentId}`, requestOptions);
  return handleResponse(response);
};

function handleResponse(response: any) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

export const studentService = {
  getAll,
  create,
  update,
  remove,
};
