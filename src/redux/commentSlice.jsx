import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const comments_url = "http://localhost:3000/comment";

const initialState = {
    commentList: [],
    status: "idle",
    error: null,
};


export const getComments = createAsyncThunk(
    "comments/getComments",
    async (productId, { rejectWithValue }) => {
        try {
            const url = productId
                ? `${comments_url}?productId=${productId}`
                : comments_url;
            const res = await axios.get(url);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(comments_url, {
                ...data,
                createdAt: new Date().toISOString(),
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const updateComment = createAsyncThunk(
    "comments/updateComment",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${comments_url}/${data.id}`, data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${comments_url}/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //GET
            .addCase(getComments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.status = "success";
                state.commentList = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //ADD
            .addCase(addComment.fulfilled, (state, action) => {
                state.commentList.push(action.payload);
            })

            //UPDATE
            .addCase(updateComment.fulfilled, (state, action) => {
                const idx = state.commentList.findIndex(
                    (c) => c.id === action.payload.id
                );
                if (idx !== -1) state.commentList[idx] = action.payload;
            })

            .addCase(deleteComment.fulfilled, (state, action) => {
                state.commentList = state.commentList.filter(
                    (c) => c.id !== action.payload
                );
            });
    },
});

export default commentSlice.reducer;
