import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stockRecordApi = createApi({
    reducerPath: 'stockRecordApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
    // tagTypes: [''],
    endpoints: (builder) => ({
        getStocks: builder.query({
            query: () => 'stocks',
            // providesTags: [''],
        }),
        getLastSixStocks: builder.query({
            query: () => "stocks/lastsix",
        }),
        getValueOfTransaction: builder.query({
            query: () => "stocks/value/transaction",
            transformResponse: res => res[0].idcount
        }),
        getValueOfDailyVolume: builder.query({
            query: () => "stocks/value/dailyvolume",
            transformResponse: res => res[0].volumecount
        }),
    })
})

export const { useGetStocksQuery, useLazyGetStocksQuery,  useGetLastSixStocksQuery, useGetValueOfTransactionQuery, useGetValueOfDailyVolumeQuery } = stockRecordApi;