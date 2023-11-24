import { call, put, takeEvery } from 'redux-saga/effects';

import {ApiResponse, SagaError} from "@/types/api.types.ts";
import {authError, authStart, authSuccess, UserPayload} from "@/store/reducers/user.reducer.ts";
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

export default function* watchUserAuth() {
    yield takeEvery(authStart.type, userAuthWorker);
}
