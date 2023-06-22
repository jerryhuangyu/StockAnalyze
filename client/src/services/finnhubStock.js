import { baseApi } from "./baseApi";

const endpointUrl = import.meta.env.VITE_FINNHUB_SERVER_URL;

const finnhubStockApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAapl: builder.query({
            query: () => `${endpointUrl}quote?symbol=AAPL&token=${import.meta.env.VITE_FINNHUB_APIKEY}`
        }),
        getSymbol: builder.query({
            query: (symbol) => `${endpointUrl}quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_APIKEY}`
        }),
    })
})

export const { useGetAaplQuery, useGetSymbolQuery } = finnhubStockApi;