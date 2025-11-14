// store/userSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfo = Record<string, any> | null;
interface UserState {
  userInfo: UserInfo;
}

const initialState: UserState = {
  userInfo: {} as Record<string, any>,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<Record<string, any>>) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
    updateUserInfo: (state, action: PayloadAction<Record<string, any>>) => {
      return {
        ...state,
        userInfo: {
          ...(state.userInfo || {}),
          ...action.payload,
        },
      };
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
