export default function() {
  return {
    getAuthenticated() {
      return localStorage.getItem('sessionToken') !== null;
    },
    getToken() {
      return localStorage.getItem('sessionToken');
    },
    setToken(token) {
      localStorage.setItem('sessionToken', token);
    },
  };
}
