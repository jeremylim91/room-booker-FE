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

// function to get userid; assumes that userId was the second cookie that was set when user logged in
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


// function to get userid; assumes that cookie is the last (or idx 3)  cookie that was set when user logged n 
export const getIsAdminFromCookie = () => {
  if (document.cookie) {
    const splitCookieVal = document.cookie.split(' ');
    const isAdminStartPos = splitCookieVal[3].indexOf('=') + 1;
    const isAdminEndingPos = isAdminStartPos+11;
    const isAdminVal = splitCookieVal[3].substring(isAdminStartPos, isAdminEndingPos);
    return isAdminVal==='true'
  }
  return null;
};