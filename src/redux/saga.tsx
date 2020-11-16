import { getAllUsersApi, getUserApi, addUserApi, deleteUserApi } from "../api";
import { put, call, takeLatest, throttle, all, fork, takeEvery, debounce } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { getAllUsersSuccess, getUserByNameSuccess, AddUserSuccess, DeleteUserSucess, getAllUsers } from "./actions";
import { ADD_NEW_USER, SHOW_USER_BY_NAME, SHOW_ALL_USERS, DELETE_USER } from "./constants";
import Reducer from "./reducer";

function* getAllUsersSaga() {
    try {
        const response = yield call(getAllUsersApi);
        if (response.status === 200) {
            console.log(response.data);
            yield put(getAllUsersSuccess(response.data));
        }
    } catch (err) {
        console.log("failed to get data");
    }
}

function* getUserByIdSaga(action: any) {
    console.log(action.payload);
    try {
        const response = yield call(getUserApi, action.payload);
        if (response.status === 200) {
            yield put(getUserByNameSuccess(response.data));
        }
    } catch (err) {
        console.log("failed to get data");
    }
}

function* AddUserSaga(action: any) {
    try {
        const response = yield call(addUserApi, action.payload);
        if (response.status === 200) {
            yield put(AddUserSuccess("Successfully Added User"));
            yield put(getAllUsers());
        }
    } catch (err) {
        console.log("failed to add data");
    }
}

function* DeleteUserSaga(action: any) {
    try {
        const response = yield call(deleteUserApi, action.payload);

        if (response.status === 200) {
            yield put(DeleteUserSucess(response.data));
        }
    } catch (err) {
        console.log("failed to Delete data");
    }
}

function* userSaga() {
    yield takeLatest(SHOW_ALL_USERS, getAllUsersSaga);
    yield debounce(2000, SHOW_USER_BY_NAME, getUserByIdSaga);
    yield takeLatest(ADD_NEW_USER, AddUserSaga);
    yield takeLatest(DELETE_USER, DeleteUserSaga);
}

function* rootSaga() {
    yield all([fork(userSaga)]);
}

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(Reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default Store;