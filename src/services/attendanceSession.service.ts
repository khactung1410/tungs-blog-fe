import { authHeader } from '../helpers';

const getAll = async () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/attendance_session/`, requestOptions);
  return handleResponse(response);
};

const create = (classId: any, date: any, studentList: any, createdByTeacherId: any, lastUpdatedByTeacherId: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ classId, date, studentList, createdByTeacherId, lastUpdatedByTeacherId })
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/attendance_session/`, requestOptions)
    .then(handleResponse);
};


const update = async (student: any) => {
//   const requestOptions = {
//     method: 'PUT',
//     headers: { ...authHeader(), 'Content-Type': 'application/json' },
//     body: JSON.stringify({ ...student }),
//   };

//   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/${student.id}`, requestOptions);
//   return handleResponse(response);
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

export const attendanceSessionService = {
  getAll,
  create,
  update,
};