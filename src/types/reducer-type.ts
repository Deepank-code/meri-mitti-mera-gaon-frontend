import { CartItem, ShippingInfo, User } from "./types";

export interface UserReducerInitalStateType {
  user: User | null;
  loading: boolean;
}
export interface CartReducerInitalStateType {
  loading: boolean;
  cartItems: CartItem[];
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}
