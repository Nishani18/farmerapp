import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const add = createAsyncThunk("root/lang", (lang) => {
  console.log(lang);
  return lang;
});

const initialState = {
  lang: "en",
};

const rootSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(add.fulfilled, (state, action) => {
      state.lang = action.payload;
    });
  },
});

const { reducer } = rootSlice;
export default reducer;
