import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_USER = "https://68d7ccd92144ea3f6da673fb.mockapi.io/users";

const initialState = {
    userlist: [],
    status: "idle",
    error: null,
};

export const getdata = createAsyncThunk("users/getdata", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(URL_USER);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const postuser = createAsyncThunk("users/postuser", async (newUser, { rejectWithValue }) => {
    try {
        const res = await axios.post(URL_USER, newUser);
        return res.data;
    } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const updateuser = createAsyncThunk("users/updateuser", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${URL_USER}/${data.id}`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteuser = createAsyncThunk("users/deleteuser", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${URL_USER}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getdata.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getdata.fulfilled, (state, action) => {
                state.status = "success";
                state.userlist = action.payload;
            })
            .addCase(getdata.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(postuser.fulfilled, (state, action) => {
                state.userlist.push(action.payload);
            })
            .addCase(updateuser.fulfilled, (state, action) => {
                const index = state.userlist.findIndex((u) => u.id === action.payload.id);
                if (index !== -1) state.userlist[index] = action.payload;
            })
            .addCase(deleteuser.fulfilled, (state, action) => {
                state.userlist = state.userlist.filter((u) => u.id !== action.payload);
            });
    },
});

export default userSlice.reducer;
