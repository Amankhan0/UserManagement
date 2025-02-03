import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import apireducer from './features/apireducer';
import paginationreducer from './features/paginationreducer';
import userreducer from './features/userreducer';

export const store = configureStore({
    reducer: {
        UserManagementReducer:userreducer,
        ApiReducer:apireducer,
        PaginationReducer:paginationreducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
