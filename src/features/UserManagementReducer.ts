// src/features/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface roleApiResponse {
    limit?: number,
    page?: number,
    totalPages?: number,
    statusCode?: number,
    data?: any
}

// Define the Redux state structure
export interface FullRedux {
    doc: roleApiResponse;
}

// Initial state with proper typing
const initialState: FullRedux = {
    doc: {},
};

// Redux slice definition
const UserManagementReducer = createSlice({
    name: 'RoleManagement',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<roleApiResponse>) => {
            state.doc = action.payload;
        },
    },
});

// Export actions and reducer
export const {
    setUserData,
} = UserManagementReducer.actions;

export default UserManagementReducer.reducer;
