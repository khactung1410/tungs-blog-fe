import { authHeader } from '../helpers';

const getAll = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {...authHeader(), "ngrok-skip-browser-warning": "69420"},
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/attendance_session/`, requestOptions);
  return handleResponse(response);
};

const create = (classId: any, date: any, studentList: any, createdByTeacherId: any, lastUpdatedByTeacherId: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json', "ngrok-skip-browser-warning": "69420" },
    body: JSON.stringify({ classId, date, studentList, createdByTeacherId, lastUpdatedByTeacherId })
  };

  return fetch(`${process.env.REACT_APP_API_URL}/api/attendance_session/`, requestOptions)
    .then(handleResponse);
};


const update = async (attendanceSessionId: number, date: string, studentList: { studentId: number; isPresent: number }[], lastUpdatedByTeacherId: number) => {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json', "ngrok-skip-browser-warning": "69420" },
    body: JSON.stringify({ attendanceSessionId, date, studentList, lastUpdatedByTeacherId }),
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/attendance_session/${attendanceSessionId}`, requestOptions);
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

export const attendanceSessionService = {
  getAll,
  create,
  update,
};