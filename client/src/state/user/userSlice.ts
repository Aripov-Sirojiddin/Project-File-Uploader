import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface Token {
  user: User;
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
    user = decodedToken.user;
    user.token = token;
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
    signout: (state) => {
      state.value = null;
      localStorage.removeItem("token");
    },
  },
});

export const { signout } = userSlice.actions;
export default userSlice.reducer;
