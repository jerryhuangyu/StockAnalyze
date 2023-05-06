import { useState, useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { GroupButton } from "../components";
import { url } from "../constants";

const fetchStockCategory = async (setCategory) => {
  try {
    const response = await fetch(url.deploy + "stocks/category", {
      method: "GET",
    });
    const data = await response.json();
    setCategory(data);
  } catch (err) {
    alert(err);
  }
};

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
      url.deploy + "symbol/" + stockSymbol,
      { method: "GET" }
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
  const [category, setCategory] = useState([]);
  const [stockSymbol, setStockSymbol] = useState();

  const [stockHistoryDatas, setStockHistoryDatas] = useState([]);
  const [buyStockAverage, setBuyStockAverage] = useState(0.0);
  const [sellStockAverage, setSellStockAverage] = useState(0.0);

  console.log("render symbol " + stockSymbol);

  useEffect(() => {
    fetchStockCategory(setCategory);
  }, []);

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
      <div className="w-full flex justify-center">個股觀察</div>
      <div className="h-20 w-full flex items-center justify-center">
        <GroupButton names={category} />
      </div>
      <div className="w-full h-[330px] flex-col flex justify-between items-center bg-stone-100 rounded-lg">
        <div>header</div>
        <div>
          <Outlet
            context={{
              stockHistoryDatas: [stockHistoryDatas, setStockHistoryDatas],
              buyStockAverage: [buyStockAverage, setBuyStockAverage],
              sellStockAverage: [sellStockAverage, setSellStockAverage],
              stockSymbol: [stockSymbol, setStockSymbol],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Symbol;
