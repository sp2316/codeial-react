export function getFormBody(params) {
  let formBody = []; //['username=akash,'password=12312'];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property); //converts user name -> user%20name
    let encodedValue = encodeURIComponent(params[property]); //akash 123 -> akash%20123

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&'); //['user%20name=akash&password=12312'];
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
