import {createSlice} from "@reduxjs/toolkit";

export interface IUser {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
    token: string | null;
}

interface UserSlice {
    user: IUser;
    isLoading: boolean;
}

const initialState: UserSlice = {
    user: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        token: ''
    },
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export default userSlice.reducer
