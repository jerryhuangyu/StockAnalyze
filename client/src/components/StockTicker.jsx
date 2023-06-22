import React, { useEffect } from "react";
import { useGetSymbolQuery } from "../services/finnhubStock";

const stockList = [
  {
    symbol: "MSFT",
    change: "",
  },
  {
    symbol: "INTC",
    change: "",
  },
  {
    symbol: "T",
    change: "",
  },
  {
    symbol: "MCD",
    change: "",
  },
  {
    symbol: "KO",
    change: "",
  },
  {
    symbol: "NFLX",
    change: "",
  },
  {
    symbol: "SBUX",
    change: "",
  },
  {
    symbol: "COST",
    change: "",
  },
  {
    symbol: "NVDA",
    change: "",
  },
  {
    symbol: "DWAC",
    change: "",
  },
  {
    symbol: "QQQ",
    change: "",
  },
  {
    symbol: "META",
    change: "",
  },
  {
    symbol: "AAPL",
    change: "",
  },
  {
    symbol: "DIS",
    change: "",
  },
  {
    symbol: "SPY",
    change: "",
  },
]

const updateStocks = (data) => {
  data.forEach((stock) => {
    const {data} = useGetSymbolQuery(stock.symbol);
    if (data) {
      let dataChange = (data?.d/data?.c*100).toFixed(2)
      stock.change = dataChange
    }
  })
}

const StockTicker = () => {
  updateStocks(stockList);

  const TickerObject = ({ tickers }) => {
    return (
      <>
        {tickers.map((stock, index) => (
          <div className="flex gap-2" key={index}>
            <p>{stock.symbol}</p>
            <span
              className={`${
                stock.change > 0
                  ? "text-green-500 bg-green-100"
                  : "text-red-500 bg-red-100"
              } rounded px-1 w-16 text-center`}
            >
              {stock.change > 0 ? "+" : ""}
              {stock.change}%
            </span>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="relative flex overflow-x-hidden">
      <div className="flex gap-3 animate-marquee-left whitespace-nowrap">
        <TickerObject tickers={stockList} />
      </div>

      <div className="absolute flex top-0 gap-3 pl-2 animate-marquee-right whitespace-nowrap">
        <TickerObject tickers={stockList} />
      </div>
    </div>
  );
};

export default StockTicker;
