import { useState } from "react";
import { Outlet } from "react-router-dom";
import { GroupButton } from "../components";
import { useLazyGetStocksCategoryQuery } from "../services/stockRecord";
import { useQueryFetch } from "../hooks/useQueryFetch";

const Symbol = () => {
  const [stockSymbol, setStockSymbol] = useState();
  const { data: category } = useQueryFetch(useLazyGetStocksCategoryQuery);

  return (
    <div className="w-[450px] h-[calc(100vh-132px)] flex flex-col justify-center">
      <div className="w-full flex justify-center mt-5">個股觀察</div>
      <div className="h-20 w-full flex items-center justify-center">
        <GroupButton names={category.data} />
      </div>
      <div className="w-full h-[330px] flex-col flex justify-center items-center bg-stone-100 rounded-lg">
        <div>
          <Outlet context={{ stockSymbol: [stockSymbol, setStockSymbol] }} />
          {stockSymbol ? (
            <div className=" text-center tracking-wider font-light text-sm">
              您的 {stockSymbol} 的買賣歷史
            </div>
          ) : (
            <div className=" text-center tracking-wider font-light text-sm">
              點選您想觀察的股票
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Symbol;
