import { APIUrls } from '../helpers/urls';
import { LOGIN_START } from './actionTypes';
import { getFormBody } from '../helpers/utils';
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

//'/login?email=a@a.com&password=13213'
export function login(email, password) {
  return (dispatch) => {
    const url = APIUrls.login();
    //post request
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-ww-form-urlencoded', //if api accepts json,this doesnt need to be specified
      },
      body: getFormBody({ email, password }),
    });
  };
}
