import { getAllUsers, getUser, addUser } from "../api";
import { put, call, takeLatest, throttle, all, fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { getAllUsersSuccess, getUserByIdSuccess, AddUserSuccess, getUserById, AddUser } from "./actions";
import { ADD_NEW_USER, SHOW_USER_BY_ID, SHOW_ALL_USERS } from "./constants";
import Reducer from "./reducer";

function* getAllUsersSaga() {
    try {
        const response = yield call(getAllUsers);
        if (response.status === 200) {
            console.log(response.data);
            yield put(getAllUsersSuccess(response.data));
        }
    } catch (err) {
        console.log("failed to get data")
    }
}

function* getUserByIdSaga(action: any) {
    try {
        const response = yield call(getUser, action.payload);
        if (response.status === 200) {
            yield put(getUserByIdSuccess(response.data));
        }
    } catch (err) {
        console.log("failed to get data")
    }
}

function* AddUserSaga(action: any) {
    console.log(action.payload);
    try {
        const response = yield call(addUser, action.payload);
        if (response.status === 200) {
            yield put(AddUserSuccess("Successfully Added User"));
        }
    } catch (err) {
        console.log("failed to add data")
    }
}

function* userSaga() {
    yield takeLatest(SHOW_ALL_USERS, getAllUsersSaga);
    yield takeLatest(SHOW_USER_BY_ID, getUserByIdSaga);
    yield takeLatest(ADD_NEW_USER, AddUserSaga);
}

function* rootSaga() {
    yield all([fork(userSaga)]);
}

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(Reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default Store;