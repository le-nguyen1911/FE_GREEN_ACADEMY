import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_USER = "http://localhost:3000/users";

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

//  Đăng nhập
export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ nameAccount, password }, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${URL_USER}?nameAccount=${nameAccount}`);
            const users = res.data;
            if (users.length === 0) return rejectWithValue("Tài khoản không tồn tại!");
            const user = users[0];
            if (user.password !== password) return rejectWithValue("Sai mật khẩu!");
            localStorage.setItem("currentUser", JSON.stringify(user));
            return user;
        } catch (error) {
            return rejectWithValue("Đăng nhập thất bại: " + error.message);
        }
    }
);

//  Đăng xuất
export const logoutUser = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("currentUser");
    return null;
});

//  Cập nhật thông tin người dùng
export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async ({ userId, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${URL_USER}/${userId}`, updatedData);
            localStorage.setItem("currentUser", JSON.stringify(res.data)); // lưu lại vào localStorage
            return res.data;
        } catch (error) {
            console.error("Lỗi cập nhật hồ sơ:", error);
            return rejectWithValue("Cập nhật hồ sơ thất bại");
        }
    }
);

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Đăng nhập
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

            // Đăng xuất
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null;
                state.status = "idle";
            })

            // Cập nhật user
            .addCase(updateProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = action.payload;
                localStorage.setItem("currentUser", JSON.stringify(action.payload));
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
