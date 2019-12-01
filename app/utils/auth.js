export default function() {
  return {
    getAuthenticated() {
      return localStorage.getItem('sessionToken') !== null;
    },
    getToken() {
      return localStorage.getItem('sessionToken');
    },
    getAuthResponse() {
      return localStorage.getItem('authResponse');
    },
    update({ sessionToken, authResponse }) {
      localStorage.setItem('sessionToken', sessionToken);
      localStorage.setItem('authResponse', authResponse);
    },
  };
}
