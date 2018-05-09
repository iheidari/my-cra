import { put, takeEvery } from "redux-saga/effects";

function* fetchUser(action) {
  try {
    const user = { userId: 1, username: "imsn" }; // yield call(Api.fetchUser, action.payload.userId);
    yield put({ type: "USER_FETCH_SUCCEEDED", user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* sagaControler() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

export default sagaControler;
