import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { taskApi } from "./api/taskApi";
import { categoryApi } from "./api/categoryApi";
import { accountApi } from "./api/accountApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  devTools: true,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware).concat(categoryApi.middleware).concat(accountApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
