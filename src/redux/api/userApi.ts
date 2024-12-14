import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}api/v1/user/`,
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation<MessageResponse, User>({
        query: (user) => ({
          url: "new",
          method: "POST",
          body: user,
        }),
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

export const { useLoginMutation } = userApi;
