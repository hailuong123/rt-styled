// import history from './history';
const Cookies = require('universal-cookie');

export const auth = () => {
  const cookie = new Cookies();
  const userInfo = cookie.get('JBCUser');
  if (!userInfo) {
    return false;
  }
  return userInfo.id_token;
};