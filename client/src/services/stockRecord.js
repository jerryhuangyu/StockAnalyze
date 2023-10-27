import { baseApi } from "./baseApi";
const endpointUrl = import.meta.env.VITE_SERVER_URL;

const stockRecordApi = baseApi.injectEndpoints({
  tagTypes: ["stock"],
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: ({ token, userId }) => ({
        url: `${endpointUrl}stocks`,
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      }),
      providesTags: ["stock"],
    }),

    getStock: builder.query({
      query: ({ token, userId, id }) => ({
        url: `${endpointUrl}stock/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      }),
    }),

    getLastSixStocks: builder.query({
      query: ({ token, userId }) => ({
        url: `${endpointUrl}stocks/lastsix`,
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      }),
      providesTags: ["stock"],
    }),

    addStock: builder.mutation({
      query: ({ stock, token }) => ({
        url: endpointUrl + "stock",
        method: "POST",
        body: stock,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["stock"],
    }),

    updateStock: builder.mutation({
      query: ({ id, stock, token }) => ({
        url: endpointUrl + `stock/${id}`,
        method: "PUT",
        body: stock,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["stock"],
    }),

    deleteStock: builder.mutation({
      query: ({ id, token, userId }) => ({
        url: endpointUrl + `stock/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        body: { userId: userId },
      }),
      invalidatesTags: ["stock"],
    }),

    getTransaction: builder.query({
      query: ({ token, userId }) => ({
        url: `${endpointUrl}stocks/value/transaction`,
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      }),
      transformResponse: (res) => res[0].idcount,
      providesTags: ["stock"],
    }),

    getDailyVolume: builder.query({
      query: ({ token, userId }) => ({
        url: `${endpointUrl}stocks/value/dailyvolume`,
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      }),
      transformResponse: (res) => res[0].volumecount,
      providesTags: ["stock"],
    }),

    getStocksCategory: builder.query({
      query: ({ token }) => ({
        url: `${endpointUrl}stocks/category`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      // transformResponse: res => res[0].volumecount
    }),
  }),
});

export const {
  useLazyGetStocksQuery,
  useGetStockQuery,
  useLazyGetStockQuery,
  useLazyGetLastSixStocksQuery,
  useLazyGetTransactionQuery,
  useLazyGetDailyVolumeQuery,
  useLazyGetStocksCategoryQuery,
  useAddStockMutation,
  useUpdateStockMutation,
  useDeleteStockMutation,
} = stockRecordApi;
