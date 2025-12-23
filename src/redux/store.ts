import { configureStore } from "@reduxjs/toolkit";
// import { useReducer } from "react;
import useReducer1 from "./slices/users";
import useReducer2 from "./slices/categories";
import useReducer3 from "./slices/tests";

const store = configureStore({
  reducer: {
    users: useReducer1,
    categories: useReducer2,
    tests: useReducer3,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
