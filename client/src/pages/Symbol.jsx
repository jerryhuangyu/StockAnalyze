import { useState, useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { GroupButton } from "../components";
import { useGetStocksCategoryQuery } from "../services/stockRecord";

const fetchStockHistoryWithSymbol = async (
  stockSymbol,
  setStockHistoryDatas,
  setBuyStockAverage,
  setSellStockAverage
) => {
  let buyTotalAmount = 0;
  let buyTotalQuantity = 0;
  let sellTotalAmount = 0;
  let sellTotalQuantity = 0;

  try {
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL + "symbol/" + stockSymbol,
      {
        method: "GET",
      }
    );

    const resDatas = await response.json();

    const datas = resDatas.map((data) => {
      data.transaction = Math.sign(data.amount) * data.price;
      return data;
    });
    setStockHistoryDatas(datas);

    let buyAverage = 0;
    let sellAverage = 0;
    datas.forEach((x) => {
      if (x.amount > 0) {
        sellTotalAmount += x.amount;
        sellTotalQuantity += x.quantity;
        sellAverage = sellTotalAmount / sellTotalQuantity;
      } else {
        buyTotalAmount += x.amount;
        buyTotalQuantity += x.quantity;
        buyAverage = buyTotalAmount / buyTotalQuantity;
      }
    });
    setBuyStockAverage(buyAverage);
    setSellStockAverage(sellAverage);
  } catch (error) {
    alert(error);
  }
};

const Symbol = () => {
  const { data: category = [] } = useGetStocksCategoryQuery();
  const [stockSymbol, setStockSymbol] = useState();

  const [stockHistoryDatas, setStockHistoryDatas] = useState([]);
  const [buyStockAverage, setBuyStockAverage] = useState(0.0);
  const [sellStockAverage, setSellStockAverage] = useState(0.0);

  useEffect(() => {
    fetchStockHistoryWithSymbol(
      stockSymbol,
      setStockHistoryDatas,
      setBuyStockAverage,
      setSellStockAverage
    );
  }, [stockSymbol]);

  return (
    <div className="w-[450px]">
      <div className="w-full flex justify-center mt-5">個股觀察</div>
      <div className="h-20 w-full flex items-center justify-center">
        <GroupButton names={category} />
      </div>
      <div className="w-full h-[330px] flex-col flex justify-center items-center bg-stone-100 rounded-lg">
        <div>
          <Outlet
            context={{
              stockHistoryDatas: [stockHistoryDatas, setStockHistoryDatas],
              buyStockAverage: [buyStockAverage, setBuyStockAverage],
              sellStockAverage: [sellStockAverage, setSellStockAverage],
              stockSymbol: [stockSymbol, setStockSymbol],
            }}
          />
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
