export function authHeader() {
  // return authorization header with jwt token
  const token = JSON.parse(localStorage.getItem('token') || '');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return { Authorization: '' };
}
