import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authApi,
  UserInfo,
  LoginParams,
  PasswordLoginParams,
} from "@/api/auth";
import { message } from "antd";

interface UserState {
  token: string;
  userInfo: UserInfo | null;
  loginType: "password" | "code";
}

// Get initial state from localStorage
const getInitialState = (): UserState => {
  const token = localStorage.getItem("token") || "";
  const userInfo = localStorage.getItem("userInfo");

  return {
    token,
    userInfo: userInfo ? JSON.parse(userInfo) : null,
    loginType: "code",
  };
};

export const login = createAsyncThunk(
  "user/login",
  async (params: LoginParams) => {
    const response = await authApi.mobileCodeLogin(params);

    return response
  }
);

export const passwordLogin = createAsyncThunk(
  "user/passwordLogin",
  async (params: PasswordLoginParams, { rejectWithValue }) => {
    try {
      const response = await authApi.passwordLogin(params);

      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setLoginType(state, action) {
      state.loginType = action.payload;
    },
    logout(state) {
      state.token = "";
      state.userInfo = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userInfo = action.payload;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(passwordLogin.fulfilled, (state, action) => {
        if (action.payload?.code === 0 && action.payload?.data) {
          const userData = action.payload.data;
          state.token = userData.token;
          state.userInfo = userData;
          localStorage.setItem("token", userData.token);
          localStorage.setItem("userInfo", JSON.stringify(userData));
        }
      })
      .addCase(passwordLogin.rejected, (_, action) => {
        const msg = (action.payload as string) || "";

        if (msg) {
          message.error(msg);
        }
      });
  },
});

export const { setToken, setUserInfo, setLoginType, logout } =
  userSlice.actions;
export default userSlice.reducer;
