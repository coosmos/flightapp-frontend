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

 export function getRoles(): string[] {
  const token = localStorage.getItem('token');
  if (!token) return [];

  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));

  return decoded.roles || [];
}

export function isAdmin(): boolean {
  return getRoles().includes('ROLE_ADMIN');
}
