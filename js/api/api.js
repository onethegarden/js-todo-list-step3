import {message} from '../common/message.js';

export const option = {
  post: (contents) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contents),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: (contents) => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contents),
  }),
};

//요청 보내는 함수
export const request = async (url, option = {}) => {
  try {
    const response = await fetch(url, option);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();

  } catch (e) {
    alert(message.error(e));
  }
};
