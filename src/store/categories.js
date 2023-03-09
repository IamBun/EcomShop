import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  //luu query category vao de hien thi ra dua theo khach hang tim kiem
  name: "categoriesSlice",
  initialState: { categories: [], isActive: false },
  reducers: {
    getCategories(state, action) {
      state.categories = action.payload; //nhan query tu input
      state.isActive = true;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
