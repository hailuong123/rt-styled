import { 
  GET_DATA, 
  GET_DATA_SUCCESS, 
  GET_DATA_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST, 
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST, 
  CHANGE_PASS_FAILED,
  CHANGE_PASS_REQUEST,
  CHANGE_PASS_SUCCESS
} from '../actions/constants';

type State = {
  readonly isLoading: boolean;
  readonly data: any;
  readonly error: any;
};

type UserAuthen = {
  readonly isLoading: boolean;
  readonly user: any;
  readonly error: any;
};

type UserChangePass = {
  readonly isLoading: boolean;
  readonly result: any;
  readonly error: any;
};

const initialState: State = {
  isLoading: false,
  data: null,
  error: null
};
const initialStateUserAthen: UserAuthen = {
  isLoading: false,
  user: null,
  error: null
};
const initialStateChangePass: UserChangePass = {
  isLoading: false,
  result: null,
  error: null
};

export function userAuthen(state: UserAuthen = initialStateUserAthen, action: any) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        user: action.user
      };
    case LOGIN_FAILED:
      return {
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function userRegister(state: UserAuthen = initialStateUserAthen, action: any) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        isLoading: true
      };
    case REGISTER_SUCCESS:
      return {
        isLoading: false,
        user: action.user
      };
    case REGISTER_FAILED:
      return {
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function getDataFileAccountBalance(state: State = initialState, action: any) {
  switch (action.type) {
    case GET_DATA:
      return {
        isLoading: true,
      };
    
    case GET_DATA_SUCCESS: 
      const newData = Object.assign({}, state.data);
      const resData = action.data;
      for (let i in resData) {
        if (resData.hasOwnProperty(i)) {
          newData[i] = resData[i];
        }
      }
      return {
        isLoading: false,
        data: newData
      };

    case GET_DATA_FAILED: 
      return {
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
}
export function userChangePass(state: UserChangePass = initialStateChangePass, action: any) {
  switch (action.type) {
    case CHANGE_PASS_REQUEST:
      return {
        isLoading: true
      };
    case CHANGE_PASS_SUCCESS:
      return {
        isLoading: false,
        result: action.result
      };
    case CHANGE_PASS_FAILED:
      return {
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}
export default {
  getDataFileAccountBalance,
  userAuthen,
  userRegister,
  userChangePass
};