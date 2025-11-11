import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_USER = "https://68d7ccd92144ea3f6da673fb.mockapi.io/users";

const storageUser = (() => {
    try {
        const data = localStorage.getItem("currentUser");
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
})();

const initialState = {
    currentUser: storageUser,
    status: "idle",
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ nameAccount, password }, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${URL_USER}?nameAccount=${nameAccount}`);
            const users = res.data;
            if (users.length === 0) return rejectWithValue("Tài khoản không tồn tại!");

            const user = users[0];
            if (user.password !== password) return rejectWithValue("Sai mật khẩu!");

            if (user.status === false) return rejectWithValue("Tài khoản của bạn đã bị khóa!");

            localStorage.setItem("currentUser", JSON.stringify(user));
            return user;
        } catch (error) {
            return rejectWithValue("Đăng nhập thất bại: " + error.message);
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("currentUser");
    return null;
});

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async ({ userId, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${URL_USER}/${userId}`, updatedData);
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            return res.data;
        } catch (error) {
            return rejectWithValue("Cập nhật hồ sơ thất bại: " + error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null;
                state.status = "idle";
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            });
    },
});

export default authSlice.reducer;
