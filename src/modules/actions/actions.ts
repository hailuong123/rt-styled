
import * as accountBalance from '../payload/AccountBalance.payload';
import * as userPayload from '../payload/UserAuth.payload';
import history from '../../utility/history';
import * as types from './constants';

export const readFileData = (filePath: any) => {
  return (dispatch: any) => {
    dispatch(requestGetData());
    accountBalance.getDataURL(filePath)
      .then( 
        data => {
          dispatch(requestDataSuccess(data));
        },
        error => {
          dispatch(requestDataFailed(error));
        }
      );
  };
  function requestGetData() { return { type: types.GET_DATA, isloading: true }; }
  function requestDataSuccess(data: any) { return { type: types.GET_DATA_SUCCESS, data }; }
  function requestDataFailed(error: any) { return { type: types.GET_DATA_FAILED, error }; }
};

export const login = (username: string, password: string) => {
  return (dispatch: any) => {
    dispatch(requestUser());
    userPayload.authenticate(username, password)
      .then(
        user => {
          dispatch(requestUserSuccess(user));
          history.push('/');
        },
        error => {
          dispatch(requestUserFailed(error));
        }
      );
  };
  function requestUser() { return { type: types.LOGIN_REQUEST }; }
  function requestUserSuccess(user: any) { return { type: types.LOGIN_SUCCESS, user }; }
  function requestUserFailed(error: any) { return { type: types.LOGIN_FAILED, error }; }
};

export const register = (body: any) => {
  return (dispatch: any) => {
    dispatch(requestRegister());
    userPayload.register(body)
      .then(
        user => {
          dispatch(requestRegisterSuccess(user));
        },
        error => {
          dispatch(requestRegisterFailed(error));
        }
      );
  };
  function requestRegister() { return { type: types.REGISTER_REQUEST, isloading: true }; }
  function requestRegisterSuccess(user: any) { return { type: types.REGISTER_SUCCESS, user }; }
  function requestRegisterFailed(error: any) { return { type: types.REGISTER_FAILED, error }; }
};

export const changePass = (password: string) => {
  return (dispatch: any) => {
    dispatch(requestChangePass());
    userPayload.changePass(password)
      .then(
        result => {
          dispatch(requestChangePassSuccess(result));
        },
        error => {
          dispatch(requestChangePassFailed(error));
        }
      );
  };
  function requestChangePass() { return { type: types.CHANGE_PASS_REQUEST, isloading: true }; }
  function requestChangePassSuccess(result: any) { return { type: types.CHANGE_PASS_SUCCESS, result }; }
  function requestChangePassFailed(error: any) { return { type: types.CHANGE_PASS_FAILED, error }; }
};
