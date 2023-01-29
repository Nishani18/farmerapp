import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://farmer-test.onrender.com/api/categorie/";

const authHeader = (token) => {
  if (token) {
    return {
      "x-access-token": token,
    };
  }
  return {};
};

export const getCategory = createAsyncThunk("Category/get", async (token) => {
  try {
    const response = await axios.get(baseURL, {
      headers: authHeader(token.accessToken),
    });
    return response.data;
  } catch (error) {
    return {
      message: "error",
    };
  }
});

export const createCategory = createAsyncThunk("Category/add", async (name) => {
  const response = await axios.post(
    baseURL,
    {
      name: name.name,
    },
    {
      headers: authHeader(name.accessToken),
    }
  );
  console.log("Main response", response.data);
  return response.data.category;
});

const initialState = {
  category: [],
  loading: false,
};

const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state, action) => {
      state.loading = true;
      state.category = [];
    }),
      builder.addCase(getCategory.fulfilled, (state, action) => {
        console.log("main action", action.payload.result);
        state.loading = false;
        state.category = action.payload.result;
      }),
      builder.addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.category = [];
      }),
      builder.addCase(createCategory.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createCategory.fulfilled, (state, action) => {
        console.log("Category after adding", state.category);
        state.loading = false;
      });
  },
});

const { reducer } = categorySlice;
export default reducer;
