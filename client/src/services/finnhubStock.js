import { baseApi } from "./baseApi";

const endpointUrl = import.meta.env.VITE_FINNHUB_SERVER_URL;
const token = import.meta.env.VITE_FINNHUB_APIKEY;

const finnhubStockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAapl: builder.query({
      query: () => `${endpointUrl}quote?symbol=AAPL&token=${token}`,
    }),
    getSymbol: builder.query({
      query: (symbol) => ({
        url: `${endpointUrl}quote?symbol=${symbol}`,
        headers: { "X-Finnhub-Token": `${token}` },
      }),
    }),
  }),
});

export const { useGetAaplQuery, useGetSymbolQuery } = finnhubStockApi;
