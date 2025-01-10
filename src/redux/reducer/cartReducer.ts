import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitalStateType } from "../../types/reducer-type";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: CartReducerInitalStateType = {
  loading: false,
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: 0,
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (index !== -1) {
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },
    removeCartItems: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      let subTotal = 0;

      for (let i = 0; i < state.cartItems.length; i++) {
        const item = state.cartItems[i];
        subTotal += item.price * item.quantity;
      }
      state.subTotal = subTotal;
      state.shippingCharges =
        state.subTotal > 1000 ? 0 : state.subTotal === 0 ? 0 : 100;
      state.tax = Math.round(state.subTotal * 0.18);
      state.total =
        state.subTotal + state.tax + state.shippingCharges - state.discount;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => {
      return initialState;
    },
  },
});

export const {
  addToCart,
  saveShippingInfo,
  resetCart,
  removeCartItems,
  discountApplied,
  calculatePrice,
} = cartReducer.actions;
