import { authHeader } from '../helpers';

const getByMonth = async (year: number, month: number) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  // Thêm `year` và `month` vào đường dẫn API
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/attendance_student_records/${year}/${month}`, requestOptions);
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

export const attendanceStudentRecordService = {
  getByMonth,
};
