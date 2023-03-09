import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  //lay data tu trang chu khi chay lan dau
  name: "dataSlice",
  initialState: { currentData: [] },
  reducers: {
    getData(state, action) {
      state.currentData = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
