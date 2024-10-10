import { authHeader } from '../helpers';

const getAll = async () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/multiple_choice_questions/`, requestOptions);
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

export const multipleChoiceQuestionService = {
  getAll,
};
