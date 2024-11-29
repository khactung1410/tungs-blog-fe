export function authHeader() {
  // Lấy accessToken từ localStorage
  const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');

  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  return { Authorization: '' };
}
