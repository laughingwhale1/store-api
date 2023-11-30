import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

import {ApiResponse, SagaError} from "@/types/api.types.ts";
import {
    authError,
    authStart,
    authSuccess,
    UserPayload,
    logoutSuccess,
    logoutStart, getCurrentUserStart, getCurrentUserSuccess
} from "@/store/reducers/user.reducer.ts";
import {Alerter} from "@/utils/Alerter.tsx";
import {LoginForm} from "@/pages/auth/login/components/LoginForm.tsx";
import ApiBase from "@/api/api.base.ts";
import {PayloadAction} from "@reduxjs/toolkit";

function* userAuthWorker(payload: PayloadAction<LoginForm>) {
    try {
        const result: ApiResponse<UserPayload> = yield call(
            ApiBase.post,
            'api/auth/login',
            payload.payload,
        );
        if (result.success) {
            yield put(authSuccess(result.value));

            if (result.value.token) {
                sessionStorage.setItem('TOKEN', result.value.token);
            }
        } else {
            yield put(authError(result.errors));
            Alerter.error(result.message);
        }
    } catch (e) {
        Alerter.error(e as SagaError);
    }
}

function* userLogoutWorker() {
    try {
        yield call(
            ApiBase.post,
            'api/auth/logout',
            {}
        );
        yield put(logoutSuccess());
        sessionStorage.removeItem('TOKEN');
        window.location.href = '/'
    } catch (e) {
        Alerter.error(e as SagaError);
    }
}

function* currentUserWorker() {
    try {
        const result = yield call(
            ApiBase.get,
            'api/user',
            {}
        );
        yield put(getCurrentUserSuccess(result))
    } catch (e) {
        Alerter.error(e as SagaError);
    }
}

export default function* watchUserAuth() {
    yield takeLatest(authStart.type, userAuthWorker);
    yield takeLatest(logoutStart.type, userLogoutWorker);
    yield takeLatest(getCurrentUserStart.type, currentUserWorker);
}
