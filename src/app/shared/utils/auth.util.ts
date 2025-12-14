export function isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

export function getUsername(): string | null {
  return localStorage.getItem('username');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}
