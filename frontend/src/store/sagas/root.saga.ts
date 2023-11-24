import { all } from 'redux-saga/effects';
import watchUserAuth from "@/store/sagas/auth/auth.saga.ts";


export default function* rootSaga() {
    yield all([
        watchUserAuth()
    ]);
}
