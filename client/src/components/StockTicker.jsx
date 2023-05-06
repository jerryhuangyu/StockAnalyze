import React from "react";

const stockList = [
  {
    symbol: "TSLA",
    change: 5.5,
  },
  {
    symbol: "APPL",
    change: 4.69,
  },
  {
    symbol: "NVDA",
    change: 4.06,
  },
  {
    symbol: "DIS",
    change: 3.15,
  },
  {
    symbol: "META",
    change: -0.8,
  },
  {
    symbol: "6",
    change: 5.5,
  },
  {
    symbol: "APPL",
    change: 4.69,
  },
  {
    symbol: "NVDA",
    change: 4.06,
  },
  {
    symbol: "DIS",
    change: 3.15,
  },
  {
    symbol: "10",
    change: -0.8,
  },
];

const StockTicker = () => {
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
              } rounded px-1`}
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
