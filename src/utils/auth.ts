export const setToken = (token: string, accessLevelType?: string) => {
  if (typeof window === 'undefined') return; 
  localStorage.setItem('token', token);
  if (accessLevelType) {
    localStorage.setItem('access-type', accessLevelType);
  }
  const expires = new Date();
  expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
  document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Strict`;
};

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const getAccessLevelType = () => {
  return localStorage.getItem('access-type');
};

export const removeToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('access-type');
  localStorage.clear();
};

export const isAuthenticated = () => {
  const token = getToken();
  return Boolean(token);
};
