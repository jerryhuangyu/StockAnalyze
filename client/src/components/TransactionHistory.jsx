import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { trash, edit } from "../assets";

const HistoryTableHeader = () => {
  return (
    <thead>
      <tr className="items-center justify-center font-bold">
        <td className={`py-2 pl-3`}>Symbol</td>
        <td className={`py-2 w-[100px] text-end pr-6`}>Price</td>
        <td className={`py-2 text-center`}>Quantity</td>
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
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "stock/" + id,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      alert(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
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
          <td className="py-2 pr-2" onClick={() => handleDelete(stock.id)}>
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
  return (
    <tbody>
      {Array(count)
        .fill(0)
        .map((_, id) => (
          <tr className="border-b-[1px] z-10" key={id}>
            <td>
              <Skeleton height="30px" />
            </td>
            <td>
              <Skeleton height="30px" />
            </td>
            <td>
              <Skeleton height="30px" />
            </td>
            <td className={`hidden lg:table-cell`}>
              <Skeleton height="30px" />
            </td>
            <td className={`hidden md:table-cell`}>
              <Skeleton height="30px" />
            </td>
            <td>
              <Skeleton height="30px" />
            </td>
            <td>
              <Skeleton height="30px" />
            </td>
          </tr>
        ))}
    </tbody>
  );
};

const TransactionHistoryTable = ({ stocks, allStocks, fetchAllStocks, id }) => {
  let historyTableList;
  if (allStocks) {
    historyTableList = <HistoryTableList stocks={allStocks} />;
  } else if (stocks) {
    historyTableList = <HistoryTableList stocks={stocks} />;
  } else {
    historyTableList = <HistoryTableListSkeleton count={4} />;
  }

  return (
    <div id={id}>
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
          onClick={() => fetchAllStocks()}
        >
          view all
        </button>
      </div>
    </div>
  );
};

export default TransactionHistoryTable;
