import {
  Bar,
  CartItem,
  Line,
  Order,
  Pie,
  Product,
  Reviews,
  ShippingInfo,
  Stats,
  User,
} from "./types";

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
export type AllReviewsResponse = {
  success: boolean;
  all_reviews: Reviews[];
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
export type StatsResponse = {
  success: boolean;
  stats: Stats;
};
export type PieResponse = {
  success: boolean;
  charts: Pie;
};
export type BarResponse = {
  success: boolean;
  charts: Bar;
};
export type LineResponse = {
  success: boolean;
  charts: Line;
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
export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
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
export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};
export type OrdersDetailsResponse = {
  success: boolean;
  order: Order;
};
export type ProductResponse = {
  success: boolean;
  product: Product;
};
export type AllUserResponse = {
  success: boolean;
  users: User[];
};
