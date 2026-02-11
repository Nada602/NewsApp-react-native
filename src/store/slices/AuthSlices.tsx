import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "lib/supabase";
import { saveSession, getSession, removeSession } from "lib/secureStore";

interface AuthState {
  auth: boolean;
  isAuthorized: boolean | null;
  user?: any;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  auth: false,
  isAuthorized: null,
  user: null,
  loading: false,
  error: undefined,
};

// -------- Async Thunks --------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return thunkAPI.rejectWithValue(error.message);
    await saveSession(data.session);
    return data.session;
  },
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return thunkAPI.rejectWithValue(error.message);
    await saveSession(data.session);
    return data.session;
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    const { error } = await supabase.auth.signOut();
    if (error) return thunkAPI.rejectWithValue(error.message);
    await removeSession();
    return true;
  },
);

export const checkUserSession = createAsyncThunk(
  "auth/checkUserSession",
  async (_, thunkAPI) => {
    const session = await getSession();
    if (session) return session;
    return null;
  },
);

// -------- Slice --------
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = true;
      state.isAuthorized = true;
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.auth = false;
      state.isAuthorized = false;
      state.error = action.payload as string;
    });

    // SIGNUP
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = true;
      state.isAuthorized = true;
      state.user = action.payload.user;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.auth = false;
      state.isAuthorized = false;
      state.error = action.payload as string;
    });

    // LOGOUT
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.auth = false;
      state.isAuthorized = false;
      state.user = null;
    });

    // CHECK SESSION
    builder.addCase(checkUserSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkUserSession.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.auth = true;
        state.isAuthorized = true;
        state.user = action.payload.user;
      } else {
        state.auth = false;
        state.isAuthorized = false;
        state.user = null;
      }
    });
    builder.addCase(checkUserSession.rejected, (state) => {
      state.loading = false;
      state.auth = false;
      state.isAuthorized = false;
      state.user = null;
    });
  },
});

export default AuthSlice.reducer;
