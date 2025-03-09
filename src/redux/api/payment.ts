import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}api/v1/payment/`,
  }),
  tagTypes: ["discount-codes"],
  endpoints: (builder) => ({
    coupon: builder.query({
      query: (userId) => `/all-coupon?id=${userId}`,
      providesTags: ["discount-codes"],
    }),
    createCoupon: builder.mutation({
      query: ({ userId, coupon, amount }) => {
        return {
          url: `/coupon/new?id=${userId}`,
          method: "POST",
          body: { coupon, amount },
        };
      },
      invalidatesTags: ["discount-codes"],
    }),
    deleteCode: builder.mutation({
      query: ({ userId, discountId }) => {
        return {
          url: `coupon/${discountId}?id=${userId}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["discount-codes"],
    }),
  }),
});

export const {
  useCouponQuery,
  useDeleteCodeMutation,
  useCreateCouponMutation,
} = paymentApi;
