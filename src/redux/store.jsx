import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import odersReducer from "./ordersSlice";
import authReducer from "./authSlice.jsx";
import userReducer from "./userSlice";
import commentReducer from "./commentSlice";
const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
        products: productReducer,
        orders: odersReducer,
        auth: authReducer,
        user: userReducer,
        comment: commentReducer,
    },
});

export default store;
