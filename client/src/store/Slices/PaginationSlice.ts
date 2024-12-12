import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 8, 
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    resetPagination(state) {
      state.currentPage = 1;
      state.itemsPerPage = initialState.itemsPerPage;
    },
  },
});

export const { setCurrentPage, setItemsPerPage, resetPagination } =
  paginationSlice.actions;

export default paginationSlice.reducer;
