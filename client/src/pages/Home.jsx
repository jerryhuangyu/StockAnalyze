import React, { useEffect, useState } from "react";

import { TransactionHistoryTable, GroupButton, HomeCard } from "../components";
import { transaction, money, earning, volue } from "../assets";

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
        className="grid gap-3 mb-3 grid-cols-1 sm:grid-cols-2
        xl:w-[60%] lg:w-[70%] w-[90%] h-[400px] sm:h-[240px]"
      >
        <HomeCard header={"1504"} description={"Transaction"} icon={transaction} />
        <HomeCard header={80} description={"Daily Volue"} icon={volue} />
        <HomeCard header={284} description={"Injection"} icon={money} />
        <HomeCard header={"$7802"} description={"Earning"} icon={earning} />
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
