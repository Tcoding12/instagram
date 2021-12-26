import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boolean: false,
};

const boolSlice = createSlice({
  name: "bool",
  initialState,
  reducers: {
    setBoolean: (state, action) => {
      state.boolean = action.payload.boolean;
    },
  },
});

export const { setBoolean } = boolSlice.actions;

export const selectBoolean = (state) => state.bool.boolean;

export default boolSlice.reducer;
