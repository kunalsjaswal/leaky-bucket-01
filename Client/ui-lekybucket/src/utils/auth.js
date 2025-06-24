export const isAuthenticated = () => {
  // Check if the user is authenticated
  // This could be a check for a token in localStorage or a cookie
  const token = localStorage.getItem('auth-token');
  
  if(!token)
      return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }
  catch (error) {
    return false;
  }
}
