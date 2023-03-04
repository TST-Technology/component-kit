function setCookie(name, value, days) {
  let expires = '';
  const date = new Date();
  if (days) {
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  localStorage.setItem('cookie-expires', date.toUTCString());
  document.cookie = `${name} =  ${value || ''}  ${expires} ; path=/`;
}

export function getCookie() {
  return document.cookie ? document.cookie.replace('SAID=', '') : null;
}

export function eraseCookie(name) {
  document.cookie = `${name} =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}

export default setCookie;
