// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApi } from "./baseApi";

const endpointUrl = import.meta.env.VITE_SERVER_URL;

const stockRecordApi = baseApi.injectEndpoints({
  tagTypes: ["stock"],
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: () => `${endpointUrl}stocks`,
      // providesTags: [''],
    }),
    getStock: builder.query({
      query: (id) => `${endpointUrl}stock/${id}`,
    }),
    getLastSixStocks: builder.query({
      query: () => `${endpointUrl}stocks/lastsix`,
      providesTags: ["stock"],
    }),
    addStock: builder.mutation({
      query: (stock) => ({
        url: endpointUrl + "stock",
        method: "POST",
        body: stock,
      }),
      invalidatesTags: ["stock"],
    }),
    updateStock: builder.mutation({
      query: ({ id, stock }) => ({
        url: endpointUrl + `stock/${id}`,
        method: "PUT",
        body: stock,
      }),
      invalidatesTags: ["stock"],
    }),
    deleteStock: builder.mutation({
      query: (id) => ({
        url: endpointUrl + `stock/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["stock"],
    }),
    getValueOfTransaction: builder.query({
      query: () => `${endpointUrl}stocks/value/transaction`,
      transformResponse: (res) => res[0].idcount,
    }),
    getValueOfDailyVolume: builder.query({
      query: () => `${endpointUrl}stocks/value/dailyvolume`,
      transformResponse: (res) => res[0].volumecount,
    }),
    getStocksCategory: builder.query({
      query: () => `${endpointUrl}stocks/category`,
      // transformResponse: res => res[0].volumecount
    }),
  }),
});

export const {
  useGetStocksQuery,
  useLazyGetStocksQuery,
  useGetStockQuery,
  useLazyGetStockQuery,
  useAddStockMutation,
  useUpdateStockMutation,
  useDeleteStockMutation,
  useGetLastSixStocksQuery,
  useGetValueOfTransactionQuery,
  useGetValueOfDailyVolumeQuery,
  useGetStocksCategoryQuery,
} = stockRecordApi;
