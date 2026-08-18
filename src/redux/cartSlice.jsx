import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://690f3fc545e65ab24ac302dd.mockapi.io/cart";

const initialState = {
  cartList: [],
  totalprice: 0,
  status: "idle",
  error: null,
};

// ====================
// LẤY GIỎ HÀNG
// ====================
export const getcart = createAsyncThunk("cart/getcart", async (userId) => {
  try {
    const res = await axios.get(`${url}?userId=${userId}`);

    return res.data;
  } catch (error) {
    // User chưa có sản phẩm trong cart
    if (error.response?.status === 404) {
      return [];
    }

    throw error;
  }
});

// ====================
// THÊM VÀO GIỎ
// ====================
export const addcart = createAsyncThunk(
  "cart/addcart",
  async ({ itemcart, userId }) => {
    let currentCart = [];

    try {
      const res = await axios.get(`${url}?userId=${userId}`);

      currentCart = res.data;
    } catch (error) {
      // User chưa có cart
      if (error.response?.status !== 404) {
        throw error;
      }

      currentCart = [];
    }

    const existing = currentCart.find(
      (item) => String(item.productId) === String(itemcart.productId),
    );

    // SẢN PHẨM ĐÃ CÓ
    if (existing) {
      const updated = {
        ...existing,
        quantity:
          Number(existing.quantity || 0) + Number(itemcart.quantity || 1),
      };

      const res = await axios.put(`${url}/${existing.id}`, updated);

      return res.data;
    }

    // SẢN PHẨM CHƯA CÓ
    const newItem = {
      ...itemcart,
      userId: String(userId),
      quantity: Number(itemcart.quantity || 1),
    };

    const res = await axios.post(url, newItem);

    return res.data;
  },
);

// CẬP NHẬT GIỎ
export const updatecart = createAsyncThunk("cart/updatecart", async (item) => {
  const res = await axios.put(`${url}/${item.id}`, {
    ...item,
    userId: String(item.userId),
    quantity: Number(item.quantity),
  });

  return res.data;
});

// XÓA 1 SẢN PHẨM
export const removecart = createAsyncThunk("cart/removecart", async (id) => {
  await axios.delete(`${url}/${id}`);

  return id;
});

// XÓA TOÀN BỘ GIỎ
export const resetcart = createAsyncThunk("cart/resetcart", async (userId) => {
  let data = [];

  try {
    const res = await axios.get(`${url}?userId=${userId}`);

    data = res.data;
  } catch (error) {
    if (error.response?.status !== 404) {
      throw error;
    }

    data = [];
  }

  await Promise.all(data.map((item) => axios.delete(`${url}/${item.id}`)));

  return userId;
});


const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCart: (state) => {
      state.cartList = [];
      state.totalprice = 0;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder


      .addCase(getcart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getcart.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.cartList = action.payload || [];

        state.totalprice = state.cartList.reduce(
          (total, item) =>
            total + Number(item.price || 0) * Number(item.quantity || 1),
          0,
        );
      })

      .addCase(getcart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;

        // Không giữ cart của user cũ
        state.cartList = [];
        state.totalprice = 0;
      })


      .addCase(addcart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(addcart.fulfilled, (state, action) => {
        state.status = "succeeded";

        const idx = state.cartList.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (idx !== -1) {
          state.cartList[idx] = action.payload;
        } else {
          state.cartList.push(action.payload);
        }

        state.totalprice = state.cartList.reduce(
          (total, item) =>
            total + Number(item.price || 0) * Number(item.quantity || 1),
          0,
        );
      })

      .addCase(addcart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })


      .addCase(updatecart.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updatecart.fulfilled, (state, action) => {
        state.status = "succeeded";

        const idx = state.cartList.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (idx !== -1) {
          state.cartList[idx] = action.payload;
        }

        state.totalprice = state.cartList.reduce(
          (total, item) =>
            total + Number(item.price || 0) * Number(item.quantity || 1),
          0,
        );
      })

      .addCase(updatecart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })


      .addCase(removecart.fulfilled, (state, action) => {
        state.cartList = state.cartList.filter(
          (item) => item.id !== action.payload,
        );

        state.totalprice = state.cartList.reduce(
          (total, item) =>
            total + Number(item.price || 0) * Number(item.quantity || 1),
          0,
        );
      })

      
      .addCase(resetcart.fulfilled, (state) => {
        state.cartList = [];
        state.totalprice = 0;
        state.status = "succeeded";
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
