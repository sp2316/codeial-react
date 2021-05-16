import { APIUrls } from '../helpers/urls';
import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';
import { getFormBody } from '../helpers/utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

//'/login?email=a@a.com&password=13213'
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    //post request
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-ww-form-urlencoded', //if api accepts json,this doesnt need to be specified
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data ', data);
        if (data.success) {
          //dispatch action to save user
          dispatch(loginSuccess(data.data.user));
        }
        dispatch(loginFailed(data.message));
      });
  };
}
