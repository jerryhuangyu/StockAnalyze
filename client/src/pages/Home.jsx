import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import { transactionIcon, money, earning, volue } from "../assets";
import {
  TransactionHistoryTable,
  HomeCard,
  StockTicker,
  ProfileCard,
  BackgroundCover,
} from "../components";
import {
  useLazyGetDailyVolumeQuery,
  useLazyGetTransactionQuery,
} from "../services/stockRecord";
import { getTokenAndQuery } from "../utils/authUtils";

const Home = () => {
  const [dailyVolumeTrigger, dailyVolume] = useLazyGetDailyVolumeQuery();
  const [transactionTrigger, transaction] = useLazyGetTransactionQuery();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getTokenAndQuery(transactionTrigger, getAccessTokenSilently);
    getTokenAndQuery(dailyVolumeTrigger, getAccessTokenSilently);
  }, []);

  return (
    <>
      <BackgroundCover />
      <div className="w-full">
        <StockTicker />
      </div>
      <div
        className="xl:w-[60%] lg:w-[70%] w-[90%] pt-10 pb-10"
        id="first-element-introduction"
      >
        <ProfileCard />
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
          header={transaction.data}
          description={"Transaction"}
          icon={transactionIcon}
        />
        <HomeCard
          header={dailyVolume.data}
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
      <div
        className="bg-stone-50 shadow-xl rounded-xl p-10 pb-5 mb-6 xl:w-[60%] lg:w-[70%] w-[90%]"
        id="step-two"
      >
        <TransactionHistoryTable />
      </div>
    </>
  );
};

export default Home;
