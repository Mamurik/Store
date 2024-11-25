

import BookApi from '@/Api/BookApi';
import { configureStore } from '@reduxjs/toolkit';
import SearchSlice from './Slices/SearchSlice';
import userApi from '@/Api/UserApi';
import UserSlice from './Slices/UserSlice';
import GenresSlice from './Slices/GenresSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
           [BookApi.reducerPath]:BookApi.reducer,
           [userApi.reducerPath]:userApi.reducer,
            search:SearchSlice,
            user:UserSlice,
            genres:GenresSlice
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(BookApi.middleware).concat(userApi.middleware)
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];