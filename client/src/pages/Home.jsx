import React, { useEffect, useState } from "react";

import { TransactionHistoryTable, GroupButton } from "../components";

const fetchAllStocks = async (setStocks) => {
  try {
    const response = await fetch("http://localhost:8080/stocks", {
      method: "GET",
    });
    const data = await response.json();
    setStocks(data);
  } catch (err) {
    alert(err);
  }
};

const fetchLast6Stocks = async (setStocks) => {
  try {
    const response = await fetch("http://localhost:8080/stocks/lastsix", {
      method: "GET",
    });
    const data = await response.json();
    setStocks(data);
  } catch (err) {
    alert(err);
  }
};

const Home = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchLast6Stocks(setStocks);
  }, []);

  return (
    <>
      <div
        className="grid gap-3 mb-3 grid-cols-2 grid-rows-2 xl:w-[60%] lg:w-[70%] w-[90%] h-[240px]"
      >
        <div className="bg-primary-100 rounded-lg">one</div>
        <div className="bg-primary-100 rounded-lg">two</div>
        <div className="bg-primary-100 rounded-lg">three</div>
        <div className="bg-primary-100 rounded-lg">four</div>
      </div>
      <div
        className="bg-primary-100 bg-opacity-[0.17] shadow-xl
        h-[460px] rounded-xl p-10 xl:w-[60%] lg:w-[70%] w-[90%]"
      >
        <TransactionHistoryTable stocks={stocks} />
      </div>
    </>
  );
};

export default Home;
