import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface Token {
  user: User;
  exp: number;
}
interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface UserState {
  value: User | null;
}

const token = localStorage.getItem("token");
let user: User | null = null;

if (token) {
  try {
    const decodedToken = jwtDecode<Token>(token);
    if (decodedToken.exp > Date.now() / 1000) {
      user = decodedToken.user;
      user.token = token;
    }
  } catch (error) {
    console.error(`Failed to extract user from token: ${error}`);
  }
}
const initialState: UserState = {
  value: user,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin: (state, action) => {
      const token = action.payload;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode<Token>(token);
      if (decodedToken.exp > Date.now() / 1000) {
        user = decodedToken.user;
        user.token = token;
        state.value = user;
      }
    },
    signout: (state) => {
      state.value = null;
      localStorage.removeItem("token");
    },
  },
});

export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
