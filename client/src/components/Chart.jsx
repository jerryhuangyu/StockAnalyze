import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const colors = ["#82ca9d", "#8884d8"];

const fetchStockHistoryWithSymbol = async (
  getAccessTokenSilently,
  stockSymbol,
  setStockHistoryDatas,
  setBuyStockAverage,
  setSellStockAverage,
  user
) => {
  let buyTotalAmount = 0;
  let buyTotalQuantity = 0;
  let sellTotalAmount = 0;
  let sellTotalQuantity = 0;

  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL +
        "symbol/" +
        stockSymbol +
        `&userId=${user.sub}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
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
    // alert(error);
    console.log(error);
  }
};

const Chart = () => {
  const { symbol } = useParams();
  const [stockHistoryDatas, setStockHistoryDatas] = useState([]);
  const [buyStockAverage, setBuyStockAverage] = useState(0.0);
  const [sellStockAverage, setSellStockAverage] = useState(0.0);
  const { getAccessTokenSilently, user } = useAuth0();
  const {
    stockSymbol: [, setStockSymbol],
  } = useOutletContext();

  useEffect(() => {
    setStockSymbol(symbol);
    fetchStockHistoryWithSymbol(
      getAccessTokenSilently,
      symbol,
      setStockHistoryDatas,
      setBuyStockAverage,
      setSellStockAverage,
      user
    );
  }, [symbol]);

  return (
    <div className="w-[400px] h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={250}
          data={stockHistoryDatas}
          margin={{
            top: 25,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="2 5" />
          {/* <XAxis dataKey="quantity" /> */}
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          {/* <Bar dataKey="transaction" fill={ props.data.transaction > 0 ? 'green' : "red"} /> */}
          <Bar dataKey="transaction">
            {stockHistoryDatas.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[entry.transaction > 0 ? 0 : 1]}
              />
            ))}
          </Bar>
          <ReferenceLine
            y={buyStockAverage}
            label={{
              value: `buy avarage: ${buyStockAverage.toFixed(2)}`,
              position: "bottom",
              fill: "black",
            }}
            isFront={true}
            stroke="#000"
          />
          <ReferenceLine
            y={sellStockAverage}
            label={{
              value: `sell avarage: ${sellStockAverage.toFixed(2)}`,
              position: "top",
              fill: "black",
            }}
            isFront={true}
            stroke="#000"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
