import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  useLazyGetLastSixStocksQuery,
  useLazyGetStocksQuery,
  useDeleteStockMutation,
} from "../services/stockRecord";
import { trash, edit } from "../assets";

const HistoryTableHeader = () => {
  return (
    <thead>
      <tr className="font-bold">
        <td className={`py-2 pl-3 w-[100px]`}>Symbol</td>
        <td className={`py-2 w-[100px] text-end pr-6`}>Price</td>
        <td className={`py-2 w-[100px] text-center`}>Quantity</td>
        <td className={`py-2 text-end pr-3 hidden lg:table-cell`}>Amount</td>
        <td className={`py-2 text-end pr-3 hidden md:table-cell`}>Status</td>
        <td className={`py-2 w-[25px] text-end pr-3`}></td>
        <td className={`py-2 w-[25px] text-end pr-3`}></td>
      </tr>
    </thead>
  );
};

const HistoryTableList = ({ stocks }) => {
  const navigation = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [deleteStockTrigger, { isLoading }] = useDeleteStockMutation();

  const handleDeleteWithToken = async (id) => {
    if (!isLoading) {
      const token = await getAccessTokenSilently();
      deleteStockTrigger({ id, token });
    }
  };

  const navToUpdateId = (e, id) => {
    if (e.target === e.currentTarget) {
      navigation(`/update/${id}`);
    }
  };

  return (
    <tbody>
      {stocks.map((stock) => (
        <tr
          key={stock.id}
          className="border-b-[1px] hover:bg-primary-50 z-10 cursor-pointer"
          onClick={(e) => navToUpdateId(e, stock.id)}
        >
          <td className={`py-2 pl-3`}>{stock.symbol}</td>
          <td className={`py-2 text-end pr-6`}>${stock.price}</td>
          <td className={`py-2 text-center`}>{stock.quantity}</td>
          <td className={`py-2 text-end pr-3 hidden lg:table-cell`}>
            {stock.amount}
          </td>
          <td className={`py-2 text-end pr-3 hidden md:table-cell`}>
            {stock.status}
          </td>
          <td className="py-2 pr-2">
            <div className="cursor-pointer flex justify-center items-center bg-primary-out opacity-70 w-6 h-6 rounded-full">
              <Link to={`/update/${stock.id}`}>
                <img src={edit} alt="edit" className="w-4" />
              </Link>
            </div>
          </td>
          <td
            className="py-2 pr-2"
            onClick={() => handleDeleteWithToken(stock.id)}
          >
            <div className="cursor-pointer flex justify-center items-center bg-red-200 w-6 h-6 rounded-full z-50">
              <img src={trash} alt="delete" className="w-4" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const HistoryTableListSkeleton = ({ count }) => {
  const tdSkeletonStyle = [
    "",
    "",
    "",
    "hidden lg:table-cell",
    "hidden md:table-cell",
    "",
    "",
  ];

  return (
    <tbody>
      {Array(count)
        .fill(0)
        .map((_, id) => (
          <tr className="border-b-[1px] h-[41px] z-10 w-full" key={id}>
            {tdSkeletonStyle.map((style, id) => (
              <td key={id} className={`px-2 ${style}`}>
                <Skeleton height="14px" />
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};

const TransactionHistoryTable = () => {
  const [lastSixStocksTrigger, lastSixStocks] = useLazyGetLastSixStocksQuery();
  const [allStocksTrigger, allStocks] = useLazyGetStocksQuery();
  const { getAccessTokenSilently } = useAuth0();

  let historyTableList;
  if (allStocks.data) {
    historyTableList = <HistoryTableList stocks={allStocks.data} />;
  } else if (lastSixStocks.data) {
    historyTableList = <HistoryTableList stocks={lastSixStocks.data} />;
  } else {
    historyTableList = <HistoryTableListSkeleton count={6} />;
  }

  const getLastSixStocksWithToken = async () => {
    const token = await getAccessTokenSilently();
    lastSixStocksTrigger(token, true);
  };

  const fetchAllStocksWithToken = async () => {
    const token = await getAccessTokenSilently();
    allStocksTrigger(token, true);
  };

  useEffect(() => {
    getLastSixStocksWithToken();
  }, []);

  return (
    <div>
      {/* title */}
      <div className="flex justify-between pb-6">
        <h2 className="text-primary-300 font-bold text-3xl">Recent Orders</h2>
        <div className="flex justify-end">
          <button className="rounded-md px-4 bg-primary-out hover:bg-primary-hover w-[120px] hidden sm:block">
            <Link to={"/add"}>Add Order</Link>
          </button>
          <div className="bg-primary-300 flex justify-center items-center w-8 h-8 rounded-full font-bold sm:hidden">
            <Link to={"/add"}>+</Link>
          </div>
        </div>
      </div>

      {/* table */}
      <table className="text-black rounded-lg w-full">
        <HistoryTableHeader />
        {historyTableList}
      </table>
      <div className="flex justify-end w-full">
        <button
          className="underline cursor-pointer pr-3 pt-3 text-primary-300"
          onClick={fetchAllStocksWithToken}
        >
          view all
        </button>
      </div>
    </div>
  );
};

export default TransactionHistoryTable;
