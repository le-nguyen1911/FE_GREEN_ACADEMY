import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_USER = "http://localhost:3000/users";

const initialState = {
    userlist: [],
    status: "idle",
    error: null,
};

export const getdata = createAsyncThunk("users/getdata", async () => {
    try {
        const res = await axios.get(URL_USER);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});
export const updateuser = createAsyncThunk("users/updateuser", async (data) => {
    try {
        const res = await axios.put(`${URL_USER}/${data.id}`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
});
export const deleteuser = createAsyncThunk("users/deleteuser", async (data) => {
    try {
        const res = await axios.delete(`${URL_USER}/${data.id}`, data);
        return res.data.id;
    }catch(error) {
        console.log(error);
    }
})
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
                state.error = action.error.message;
            })
            .addCase(updateuser.fulfilled, (state, action) => {
                const updated = action.payload;
                if (!updated?.id) return;
                const index = state.userlist.findIndex(p => p.id === updated.id);
                if (index !== -1) state.userlist[index] = updated;
            })
            .addCase(deleteuser.fulfilled, (state, action) => {
                state.status = "success";
                state.userlist = state.userlist.filter(p => p.id !== action.payload);
            })
    },
});

export default userSlice.reducer;
