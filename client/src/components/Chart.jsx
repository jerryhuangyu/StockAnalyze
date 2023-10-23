import { useEffect } from "react";
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

const Chart = () => {
  const {
    stockHistoryDatas: [stockHistoryDatas, setStockHistoryDatas],
    buyStockAverage: [buyStockAverage, setBuyStockAverage],
    sellStockAverage: [sellStockAverage, setSellStockAverage],
    stockSymbol: [stockSymbol, setStockSymbol],
  } = useOutletContext();
  const { symbol } = useParams();

  useEffect(() => {
    setStockSymbol(symbol);
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
