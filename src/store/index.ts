declare var window: Window & { devToolsExtension: any, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any };
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { getDataFileAccountBalance, userAuthen, userRegister, userChangePass } from '../modules/reducers';
export type RootState = {
  routing: any;
};

const rootReducer = combineReducers<RootState>({
  routing: routerReducer,
  dataAccBalance: getDataFileAccountBalance,
  userAuthen,
  userRegister,
  userChangePass
});

// rehydrating state on app start: implement here...
const recoverState = (): RootState => ({} as RootState);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  recoverState(),
  composeEnhancers(applyMiddleware(thunk)),
);

export type Store = { getState: () => RootState, dispatch: Function };

// systemjs-hot-reloader hook, rehydrating the state of redux store
export function __reload(exports: any) {
  console.log(exports.store.getState());
}
