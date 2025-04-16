import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { taskApi } from "./api/taskApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  devTools: true,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
