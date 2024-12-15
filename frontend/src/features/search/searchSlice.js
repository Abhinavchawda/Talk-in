import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchString: ""
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setsearchString(state, action) {
        state.searchString = action.payload;
    }
  }  
});

export const { setsearchString } = searchSlice.actions;
export default searchSlice.reducer;