import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000/products";

// Lấy dữ liệu
export const getdata = createAsyncThunk("Product/getdata", async () => {
    const res = await axios.get(url);
    return res.data;
});

// Xoá sản phẩm
export const deletedata = createAsyncThunk("Product/deletedata", async (id) => {
    const res = await axios.delete(`${url}/${id}`);
    return res.data.id;
});
// add sản phârm
export const AddProduct = createAsyncThunk("Product/addProduct", async (data) => {
    const res = await axios.post(url, data)
    return res.data;
})
// cập nhật sản phẩm
export const UpdateProduct = createAsyncThunk(
    "Product/updateProduct",
    async (data, {rejectWithValue}) => {
        try {
            const res = await axios.put(`${url}/${data.id}`, data);
            return res.data;
        } catch (error) {
            console.error(" Lỗi cập nhật sản phẩm:", error);
            return rejectWithValue(error.response?.data || "Update failed");
        }
    }
);
const productSlice = createSlice({
    name: "Product",
    initialState: {
        products: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getdata
            .addCase(getdata.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getdata.fulfilled, (state, action) => {
                state.status = "success";

                state.products = Array.isArray(action.payload)
                    ? action.payload
                    : action.payload.products || [];
            })
            .addCase(getdata.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // deletedata
            .addCase(deletedata.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletedata.fulfilled, (state, action) => {
                state.status = "success";
                state.products = state.products.filter(
                    (item) => item.id !== action.payload
                );
            })
            .addCase(deletedata.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // thêm sản phẩm
            .addCase(AddProduct.fulfilled, (state, action) => {
                state.status = "success";
                state.products.push(action.payload);
            })
            // cập nhật sản phẩm
            .addCase(UpdateProduct.fulfilled, (state, action) => {
                const updated = action.payload;
                if (!updated?.id) return;
                const index = state.products.findIndex(p => p.id === updated.id);
                if (index !== -1) state.products[index] = updated;
                localStorage.setItem("products", JSON.stringify(state.products));
            })
    },
});

export default productSlice.reducer;
