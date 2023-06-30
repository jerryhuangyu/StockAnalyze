// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApi } from './baseApi';

const endpointUrl = import.meta.env.VITE_SERVER_URL;

const stockRecordApi = baseApi.injectEndpoints({
    // tagTypes: [''],
    endpoints: (builder) => ({
        getStocks: builder.query({
            query: () => `${endpointUrl}stocks`,
            // providesTags: [''],
        }),
        getLastSixStocks: builder.query({
            query: () => `${endpointUrl}stocks/lastsix`,
        }),
        getValueOfTransaction: builder.query({
            query: () => `${endpointUrl}stocks/value/transaction`,
            transformResponse: res => res[0].idcount
        }),
        getValueOfDailyVolume: builder.query({
            query: () => `${endpointUrl}stocks/value/dailyvolume`,
            transformResponse: res => res[0].volumecount
        }),
        getStocksCategory: builder.query({
            query: () => `${endpointUrl}stocks/category`,
            // transformResponse: res => res[0].volumecount
        }),
    })
})

export const { useGetStocksQuery, useLazyGetStocksQuery,  useGetLastSixStocksQuery, useGetValueOfTransactionQuery, useGetValueOfDailyVolumeQuery, useGetStocksCategoryQuery } = stockRecordApi;