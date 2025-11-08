import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000/cart";

const initialState = {
    cartList: [],
    totalprice: 0,
    status: "idle",
    error: null,
};

// Lấy giỏ hàng theo userId
export const getcart = createAsyncThunk("cart/getcart", async (userId) => {
    const res = await axios.get(`${url}?userId=${userId}`);
    return res.data;
});

// Thêm vào giỏ
export const addcart = createAsyncThunk("cart/addcart", async ({ itemcart, userId }) => {
    const { data: currentCart } = await axios.get(`${url}?userId=${userId}`);
    const existing = currentCart.find((item) => item.productId === itemcart.productId);

    if (existing) {
        const updated = { ...existing, quantity: existing.quantity + itemcart.quantity };
        const res = await axios.put(`${url}/${existing.id}`, updated);
        return res.data;
    } else {
        const newItem = { ...itemcart, userId };
        const res = await axios.post(url, newItem);
        return res.data;
    }
});

// Cập nhật giỏ
export const updatecart = createAsyncThunk("cart/updatecart", async (item) => {
    const res = await axios.put(`${url}/${item.id}`, item);
    return res.data;
});

// Xóa 1 sản phẩm
export const removecart = createAsyncThunk("cart/removecart", async (id) => {
    await axios.delete(`${url}/${id}`);
    return id;
});

// Xóa toàn bộ giỏ hàng sau khi thanh toán
export const resetcart = createAsyncThunk("cart/resetcart", async (userId) => {
    const { data } = await axios.get(`${url}?userId=${userId}`);
    await Promise.all(data.map((item) => axios.delete(`${url}/${item.id}`)));
    return userId;
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getcart.fulfilled, (state, action) => {
                state.cartList = action.payload;
                state.totalprice = state.cartList.reduce(
                    (t, i) => t + i.price * (i.quantity || 1),
                    0
                );
            })
            .addCase(addcart.fulfilled, (state, action) => {
                const idx = state.cartList.findIndex((i) => i.id === action.payload.id);
                if (idx !== -1) state.cartList[idx] = action.payload;
                else state.cartList.push(action.payload);
                state.totalprice = state.cartList.reduce(
                    (t, i) => t + i.price * (i.quantity || 1),
                    0
                );
            })
            .addCase(updatecart.fulfilled, (state, action) => {
                const idx = state.cartList.findIndex((i) => i.id === action.payload.id);
                if (idx !== -1) state.cartList[idx] = action.payload;
                state.totalprice = state.cartList.reduce(
                    (t, i) => t + i.price * (i.quantity || 1),
                    0
                );
            })
            .addCase(removecart.fulfilled, (state, action) => {
                state.cartList = state.cartList.filter((i) => i.id !== action.payload);
                state.totalprice = state.cartList.reduce(
                    (t, i) => t + i.price * (i.quantity || 1),
                    0
                );
            })
            .addCase(resetcart.fulfilled, (state) => {
                state.cartList = [];
                state.totalprice = 0;
            });
    },
});

export default cartSlice.reducer;
