import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { transaction, money, earning, volue, question, bell } from "../assets";
import {
  TransactionHistoryTable,
  GroupButton,
  HomeCard,
  StockTicker,
} from "../components";
import {
  useGetStocksQuery,
  useGetLastSixStocksQuery,
  useGetValueOfTransactionQuery,
  useGetValueOfDailyVolumeQuery,
  useLazyGetStocksQuery,
} from "../services/stockRecord";

const LoginLink = () => (
  <Link
    to="/login"
    className="cursor-pointer bg-primary-hover hover:bg-primary-out px-3 rounded-full"
  >
    Login Now
  </Link>
);

const PersonalProfile = ({ picture, username }) => {
  const src = picture ? picture : question;
  const name = username ? username : <LoginLink />;
  return (
    <div className="flex justify-between">
      <div className="flex gap-6">
        <img
          src={src}
          alt="member"
          className="w-[60px] object-cover aspect-square rounded-full"
        />
        <div>
          <p className="text-primary-300">Hello, good morning!</p>
          <p className="mt-2">{name}</p>
        </div>
      </div>
      <div className="flex items-center">
        <img src={bell} alt="notification" className="w-6 h-6" />
      </div>
    </div>
  );
};

const Home = ({ user }) => {
  const { data: lastSixStocks = [] } = useGetLastSixStocksQuery();
  const { data: valueOfTransaction = "..." } = useGetValueOfTransactionQuery();
  const { data: valueOfDailyVolume = "..." } = useGetValueOfDailyVolumeQuery();
  const [trigger, allStocksData = null] = useLazyGetStocksQuery();

  return (
    <>
      <div className="w-full">
        <StockTicker />
      </div>
      <div className="xl:w-[60%] lg:w-[70%] w-[90%] pt-10 pb-10">
        <PersonalProfile username={user.name} picture={user.picture} />
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
      <div className="grid sm:gap-3 gap-4 mb-3 grid-cols-1 sm:grid-cols-2 xl:w-[60%] lg:w-[70%] w-[90%] h-[400px] sm:h-[240px]">
        <HomeCard
          header={valueOfTransaction}
          description={"Transaction"}
          icon={transaction}
        />
        <HomeCard
          header={valueOfDailyVolume}
          description={"Daily Volume"}
          icon={volue}
        />
        <HomeCard header={284} description={"Total Injection"} icon={money} />
        <HomeCard
          header={"$7802"}
          description={"Total Earning"}
          icon={earning}
        />
      </div>
      <div className="bg-primary-100 bg-opacity-[0.17] shadow-xl rounded-xl p-10 pb-5 mb-6 xl:w-[60%] lg:w-[70%] w-[90%]">
        <TransactionHistoryTable
          stocks={lastSixStocks}
          allStocks={allStocksData.data}
          fetchAllStocks={trigger}
        />
      </div>
    </>
  );
};

export default Home;
