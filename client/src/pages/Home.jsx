import React, { useEffect, useState } from "react";

import { transaction, money, earning, volue, jerry, bell } from "../assets";
import { url } from "../constants";
import {
  TransactionHistoryTable,
  GroupButton,
  HomeCard,
  StockTicker,
} from "../components";

const fetchAllStocks = async (setStocks) => {
  try {
    const response = await fetch(url.deploy + "stocks", {
      method: "GET",
    });
    const data = await response.json();
    setStocks(data);
  } catch (err) {
    // alert(err);
  }
};

const fetchLast6Stocks = async (setStocks) => {
  try {
    const response = await fetch(url.deploy + "stocks/lastsix", {
      method: "GET",
    });
    const data = await response.json();
    setStocks(data);
  } catch (err) {
    // alert(err);
  }
};

const fetchTransactionValue = async (setTransactionValue) => {
  try {
    const response = await fetch(url.deploy + "stocks/value/transaction", {
      method: "GET",
    });
    const data = await response.json();
    setTransactionValue(data[0].idcount);
  } catch (err) {
    // alert(err);
  }
};

const fetchTodayVolume = async (setTransactionValue) => {
  try {
    const response = await fetch(url.deploy + "stocks/value/dailyvolume", {
      method: "GET",
    });
    const data = await response.json();
    setTransactionValue(data[0].volumecount);
  } catch (err) {
    // alert(err);
  }
};

const PersonalProfile = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-6">
        <img
          src={jerry}
          alt="member"
          className="w-[60px] object-cover aspect-square rounded-full"
        />
        <div>
          <p className="text-primary-300">Hello, good morning!</p>
          <p>Jerry Huang</p>
        </div>
      </div>
      <div className="flex items-center">
        <img src={bell} alt="notification" className="w-6 h-6" />
      </div>
    </div>
  );
};

const Home = () => {
  const [last6stocks, setLast6Stocks] = useState([]);
  const [allStocks, setAllStocks] = useState(null);
  const [transactionValue, setTransactionValue] = useState(null);
  const [todayVolume, setTodayVolume] = useState(null);

  useEffect(() => {
    fetchLast6Stocks(setLast6Stocks);
    fetchTransactionValue(setTransactionValue);
    fetchTodayVolume(setTodayVolume);
  }, []);

  return (
    <>
      <div className="w-full">
        <StockTicker />
      </div>
      <div className="xl:w-[60%] lg:w-[70%] w-[90%] pt-10 pb-10">
        <PersonalProfile />
      </div>
      <div className="h-[200px] flex flex-col items-center">
        <p className="text-primary-300">Available Balance</p>
        <div className="flex items-end pt-4 pb-6">
          <p className="text-6xl">$112,340.</p>
          <span className="text-5xl">00</span>
        </div>
        <div className="flex">
          <p>$10,240.</p>
          <span>00</span>
          <span className="ml-2 text-green-400">+12%</span>
        </div>
      </div>
      <div
        className="grid sm:gap-3 gap-4 mb-3 grid-cols-1 sm:grid-cols-2
        xl:w-[60%] lg:w-[70%] w-[90%] h-[400px] sm:h-[240px]"
      >
        <HomeCard
          header={transactionValue}
          description={"Transaction"}
          icon={transaction}
        />
        <HomeCard header={todayVolume} description={"Daily Volume"} icon={volue} />
        <HomeCard header={284} description={"Injection"} icon={money} />
        <HomeCard header={"$7802"} description={"Earning"} icon={earning} />
      </div>
      <div
        className="bg-primary-100 bg-opacity-[0.17] shadow-xl
        rounded-xl p-10 pb-5 mb-6 xl:w-[60%] lg:w-[70%] w-[90%]"
      >
        <TransactionHistoryTable
          stocks={last6stocks}
          allStocks={allStocks}
          setAllStocks={setAllStocks}
          fetchAllStocks={fetchAllStocks}
        />
      </div>
    </>
  );
};

export default Home;
