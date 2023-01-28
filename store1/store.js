import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import catReducer from "./slices/cat";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cat: catReducer,
  },
});
export default store;
