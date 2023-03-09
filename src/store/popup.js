import { createSlice } from "@reduxjs/toolkit";

const popupInitial = { isShow: false, index: null };

const popupSlice = createSlice({
  //dispatch hien thi trang thai popup
  name: "popupSlice",
  initialState: popupInitial,
  reducers: {
    showPopup(state) {
      state.isShow = true;
      // state.index = action.payload; //index la id san pham
    },
    hidePopup(state) {
      state.isShow = false;
    },
  },
});

export const popupActions = popupSlice.actions;
export default popupSlice.reducer;
