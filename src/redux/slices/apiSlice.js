import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://saveurapi.onrender.com/',
  prepareHeaders: (headers, { getState }) => {
    const userInfo = getState().auth.userInfo;
    if (userInfo && userInfo.token) {
      headers.set('authorization', `Bearer ${userInfo.token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Contact'],
  endpoints: (builder) => ({}),
});
