import React, { useEffect, useState } from "react";

import { TransactionHistoryTable, GroupButton, HomeCard } from "../components";
import { transaction, money, earning, volue, olulu, bell } from "../assets";

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

const PersonalProfile = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-6">
        <img
          src={olulu}
          alt="member"
          className="w-[60px] object-cover aspect-square rounded-full"
        />
        <div>
          <p className="text-primary-300">Hello, good morning!</p>
          <p>Olulu Chen</p>
        </div>
      </div>
      <div className="flex items-center">
        <img src={bell} alt="notification" className="w-6 h-6" />
      </div>
    </div>
  );
};

const Home = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchLast6Stocks(setStocks);
  }, []);

  return (
    <>
      <div className="xl:w-[60%] lg:w-[70%] w-[90%] pt-6 pb-12">
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
          header={"1504"}
          description={"Transaction"}
          icon={transaction}
        />
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
