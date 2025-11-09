import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orders_url = "https://68d7ccd92144ea3f6da673fb.mockapi.io/orders";

const initialState = {
    orderlist: [],
    status: "idle",
    error: null,
};

//Lấy đơn hàng theo user
export const getdataOrder = createAsyncThunk(
    "orders/getdataOrder",
    async (userId = null, { rejectWithValue }) => {
        try {
            const url = userId ? `${orders_url}?userId=${userId}` : orders_url;
            const res = await axios.get(url);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Tạo đơn hàng mới
export const createOrders = createAsyncThunk(
    "orders/createOrders",
    async ({ orderData, userId }, { rejectWithValue }) => {
        try {
            const res = await axios.post(orders_url, {
                ...orderData,
                userId,
                status: "pending",
                createdAt: new Date().toISOString(),
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

//Cập nhật trạng thái đơn hàng
export const updateOrderStatus = createAsyncThunk(
    "orders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${orders_url}/${id}`, { status });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
//Xóa đơn hàng
export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (data, { rejectWithValue }) => {
        try {
            await axios.delete(`${orders_url}/${data.id}`);
            return data.id;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getdataOrder
            .addCase(getdataOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getdataOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orderlist = action.payload;
            })
            .addCase(getdataOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // createOrders
            .addCase(createOrders.fulfilled, (state, action) => {
                state.orderlist.push(action.payload);
                state.status = "succeeded";
            })

            // updateOrderStatus
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.orderlist.findIndex((o) => o.id === action.payload.id);
                if (index !== -1) state.orderlist[index] = action.payload;
            })

            // deleteOrder
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orderlist = state.orderlist.filter((o) => o.id !== action.payload);
            });
    },
});

export default ordersSlice.reducer;
