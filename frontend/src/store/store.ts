import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice.ts';
import createSagaMiddleware from 'redux-saga'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import rootSaga from "./sagas/root.saga.ts";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    userReducer,
})

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'persist',
    storage,
    whitelist: ['auth'],
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

const store = setupStore().store

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
