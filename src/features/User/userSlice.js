import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  photo: null,
  uid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.uid = action.payload.uid;
    },

    setLogOut: (state) => {
      state.name = null;
      state.email = null;
      state.photo = null;
      state.uid = null;
    },
  },
});

export const { setLogin, setLogOut } = userSlice.actions;

export const selectName = (state) => state.user.name;
export const selectEmail = (state) => state.user.email;
export const selectPhoto = (state) => state.user.photo;
export const selectUid = (state) => state.user.uid;

export default userSlice.reducer;
