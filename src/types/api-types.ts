import { CartItem, Order, Product, ShippingInfo, User } from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
export type MessageResponse = {
  success: boolean;
  message: string;
};
export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllProductsResponse = {
  success: boolean;
  products: Product[];
};

export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};
export type SearchProductResponse = {
  success: boolean;
  products: Product[];
  totalPage: number;
};
export type SearchProductRequest = {
  page: number;
  category: string;
  price: number;
  search: string;
  sort: string;
};

export type NewProductsRequest = {
  id: string;
  formData: FormData;
};
export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type ProductResponse = {
  success: boolean;
  product: Product;
};
export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};
export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};
export type OrdersDetailsResponse = {
  success: boolean;
  orders: Order;
};
export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};
