export const isTokenValid = () => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
  
    if (!token || !tokenExpiry) {
      return false;
    }
  
    return Date.now() < parseInt(tokenExpiry, 10);
};