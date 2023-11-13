import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
    id: number;
    name: string;
    email: string;
}

interface UserSlice {
    users: IUser[];
    isLoading: boolean;
    error: string;
}

const initialState: UserSlice = {
    users: [],
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export default userSlice.reducer
