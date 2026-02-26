import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUserAPI, googleLoginAPI, loginAPI, logoutAPI, registerAPI, addAddressAPI } from "./authService";


export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            return await loginAPI(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "auth/current-user",
    async (_, thunkAPI) => {
        try {
            return await getCurrentUserAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            return await logoutAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            return await registerAPI(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const googleLoginUser = createAsyncThunk(
    "auth/google-login",
    async (credential, thunkAPI) => {
        try {
            return await googleLoginAPI(credential);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addUserAddress = createAsyncThunk(
    "auth/add-address",
    async (data, thunkAPI) => {
        try {
            return await addAddressAPI(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        role: null,
        loading: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔥 LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.role = action.payload.data.role;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔥 FETCH CURRENT USER
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.role = action.payload.data.role;
                console.log(action.payload)
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.role = null;
            })

            // 🔥 Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.role = action.payload.data.role;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.role = null;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.loading = false;
            })
            // 🔥 GOOGLE LOGIN
            .addCase(googleLoginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(googleLoginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.role = action.payload.data.role;
            })
            .addCase(googleLoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // 🔥 ADD ADDRESS
            .addCase(addUserAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUserAddress.fulfilled, (state, action) => {
                state.loading = false;
                if (state.user) {
                    state.user.addresses = action.payload.data;
                }
            })
            .addCase(addUserAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
});

export default authSlice.reducer;