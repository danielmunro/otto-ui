export default function() {
  return {
    getAuthenticated() {
      return localStorage.getItem('sessionToken') !== null;
    },
    getToken() {
      return localStorage.getItem('sessionToken');
    },
    invalidate() {
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('authResponse');
    },
    update({ sessionToken, authResponse }) {
      localStorage.setItem('sessionToken', sessionToken);
      localStorage.setItem('authResponse', authResponse);
    },
  };
}
