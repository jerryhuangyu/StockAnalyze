import React from "react";

// TODO: 串接ＡＰＩ
const stockList = [
  {
    symbol: "MSFT",
    change: 1.72,
  },
  {
    symbol: "INTC",
    change: -0.8,
  },
  {
    symbol: "T",
    change: 1.30,
  },
  {
    symbol: "MCD",
    change: 0.49,
  },
  {
    symbol: "KO",
    change: 0.47,
  },
  {
    symbol: "NFLX",
    change: 0.62,
  },
  {
    symbol: "SBUX",
    change: 2.38,
  },
  {
    symbol: "COST",
    change: 1.78,
  },
  {
    symbol: "NVDA",
    change: 4.06,
  },
  {
    symbol: "DWAC",
    change: -0.46,
  },
  {
    symbol: "QQQ",
    change: 2.13,
  },
  {
    symbol: "META",
    change: -0.32,
  },
  {
    symbol: "AAPL",
    change: 4.69,
  },
  {
    symbol: "DIS",
    change: 3.15,
  },
  {
    symbol: "SPY",
    change: 1.85,
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
