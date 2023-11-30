import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import rootSaga from "./sagas/root.saga";
import storage from "redux-persist/lib/storage";
import {rootReducer} from "@/store/reducers/root.reducer.ts";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'persist',
    storage,
    whitelist: ['userReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {

    const store = configureStore( {
        reducer: persistedReducer,
        middleware: getDefaultMiddleware => [
            sagaMiddleware,
            ...getDefaultMiddleware({
                thunk: false,
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
        ],
    })

    sagaMiddleware.run(rootSaga);

    const persistor = persistStore(store);

    return {
        store, persistor
    }
}

export const {store, persistor} = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
// @ts-ignore
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
