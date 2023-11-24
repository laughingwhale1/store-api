import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PayloadError} from "@/types/api.types.ts";
import {LoginForm} from "@/pages/auth/login/components/LoginForm.tsx";

export interface UserPayload {
    user: {
        id: number,
        name: string,
        email: string,
        email_verified_at: string,
        created_at: string,
        updated_at: string,
        is_admin: number
    },
    token: string
}

export interface IUser {
    id: number,
    name: string,
    email: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string,
    is_admin: number
}

interface UserReducer {
    user: IUser;
    token: string
    loading: boolean;
    errors: PayloadError[];
}

const initialState: UserReducer = {
    user: {
        id: null,
        name: '',
        email: '',
        email_verified_at: '',
        created_at: '',
        updated_at: '',
        is_admin: null
    },
    token: '',
    loading: false,
    errors: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authStart(state, action: PayloadAction<LoginForm>) {
            state.loading = true;
        },
        authSuccess(state, action: PayloadAction<UserPayload>) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        authError(state, action: PayloadAction<PayloadError[]>) {
            state.loading = false;
            state.errors = action.payload;
        },
    }
})

export const {
    authStart,
    authSuccess,
    authError
} = userSlice.actions;

export default userSlice.reducer
