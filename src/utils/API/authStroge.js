import setCookie, { getCookie, eraseCookie } from '../Cookies';

class AuthStorage {
  getAuthToken = () => {
    return getCookie('SAID');
  };

  setAuthDetails = (accessToken) => {
    setCookie('SAID', accessToken, 1);
    localStorage.setItem('token', accessToken);
  };

  deleteAuthDetails = () => {
    eraseCookie('SAID');
  };
}
const authStorage = new AuthStorage();

export default authStorage;
