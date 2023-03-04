import { all, call, takeEvery } from 'redux-saga/effects';
import authStorage from 'utils/API/authStroge';
import {

  LOGOUT_USER,
} from '../contants';



export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {

  authStorage.deleteAuthDetails();
  history.push("/login");
};

function* logout({ payload }) {
  const { history } = payload;
  yield call(logoutAsync, history);
}



export default function* rootSaga() {
  yield all([logout]);
}
