import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import apireducer from './features/UserApiReducer';
import paginationreducer from './features/UserPaginationReducer';
import userreducer from './features/UserManagementReducer';
import userRoleSlice from './features/UserRoleSlice';

export const store = configureStore({
    reducer: {
        UserManagementReducer:userreducer,
        UserApiReducer:apireducer,
        UserPaginationReducer:paginationreducer,
        UserRoleSlice:userRoleSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
