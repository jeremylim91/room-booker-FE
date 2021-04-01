export const getUsernameFromCookie = () => {
  if (document.cookie) {
    const splitCookieVal = document.cookie.split(' ');
    const usernameStartPos = splitCookieVal[0].indexOf('=') + 1;
    const usernameEndPos = splitCookieVal[0].indexOf(';');
    const loggedInUsername = splitCookieVal[0].substring(usernameStartPos, usernameEndPos);
    return loggedInUsername;
  }
  return null;
};

export const getUserIdFromCookie = () => {
  if (document.cookie) {
    const splitCookieVal = document.cookie.split(' ');
    const userIdStartPos = splitCookieVal[1].indexOf('=') + 1;
    const userIdEndPos = splitCookieVal[1].indexOf(';');
    const loggedInUserId = splitCookieVal[1].substring(userIdStartPos, userIdEndPos);
    return Number(loggedInUserId);
  }
  return null;
};