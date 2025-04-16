import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const initialState: Partial<User> = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return { ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
