

import BookApi from '@/Api/BookApi';
import { configureStore } from '@reduxjs/toolkit';
import SearchSlice from './Slices/SearchSlice';
import userApi from '@/Api/UserApi';
import UserSlice from './Slices/UserSlice';
import GenresSlice from './Slices/GenresSlice';
import BooksSlice from './Slices/BooksSlice';
import ReviewsApi from '@/Api/ReviewApi';
import ReviewSlice from './Slices/ReviewSlice';
import PaginationSlice from './Slices/PaginationSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
           [BookApi.reducerPath]:BookApi.reducer,
           [userApi.reducerPath]:userApi.reducer,
           [ReviewsApi.reducerPath]:ReviewsApi.reducer,
            search:SearchSlice,
            pagination:PaginationSlice,
            reviews:ReviewSlice,
            user:UserSlice,
            genres:GenresSlice,
            books:BooksSlice
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(BookApi.middleware).concat(userApi.middleware).concat(ReviewsApi.middleware)
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];