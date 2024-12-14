import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductsRequest,
  ProductResponse,
  SearchProductRequest,
  SearchProductResponse,
  UpdateProductRequest,
} from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}api/v1/product`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "/latest",
      providesTags: ["Product"],
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `/admin-products?id=${id}`,
      providesTags: ["Product"],
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `/categories`,
      providesTags: ["Product"],
    }),
    searchProducts: builder.query<SearchProductResponse, SearchProductRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `/all?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        return base;
      },
      providesTags: ["Product"],
    }),
    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags: ["Product"],
    }),
    newProduct: builder.mutation<MessageResponse, NewProductsRequest>({
      query: ({ id, formData }) => {
        return {
          url: `/new?id=${id}`,
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ userId, formData, productId }) => {
        return {
          url: `${productId}?id=${userId}`,
          method: "PUT",
          body: formData,
        };
      },

      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => {
        return {
          url: `${productId}?id=${userId}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useCategoriesQuery,
  useAllProductsQuery,
  useNewProductMutation,
  useSearchProductsQuery,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
