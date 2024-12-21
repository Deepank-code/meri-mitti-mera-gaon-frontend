import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  AllUserResponse,
  DeleteUserRequest,
  MessageResponse,
  UserResponse,
} from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}api/v1/user/`,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => {
    return {
      login: builder.mutation<MessageResponse, User>({
        query: (user) => ({
          url: "new",
          method: "POST",
          body: user,
        }),
        invalidatesTags: ["Users"],
      }),
      deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
        query: ({ userId, adminUserId }) => ({
          url: `${userId}?id=${adminUserId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Users"],
      }),
      allUsers: builder.query<AllUserResponse, string>({
        query: (id) => `all?id=${id}`,
        providesTags: ["Users"],
      }),
    };
  },
});
//

export const getUser = async (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}api/v1/user/${id}`
    );
    const user: UserResponse = res.data;
    return user;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation, useAllUsersQuery, useDeleteUserMutation } =
  userApi;
