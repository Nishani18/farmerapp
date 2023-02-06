import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import catReducer from "./slices/cat";
import rootReducer from "./slices/root";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cat: catReducer,
    root: rootReducer,
  },
});
export default store;
