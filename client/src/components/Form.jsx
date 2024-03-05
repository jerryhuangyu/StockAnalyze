import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  useLazyGetStockQuery,
  useAddStockMutation,
  useUpdateStockMutation,
} from "../services/stockRecord";
import { save, trash } from "../assets";
import FormInput from "./FormInput";
import { useQueryFetch } from "../hooks/useQueryFetch";

const StockForm = ({ title, isUpdate = false }) => {
  const symbolInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const statusInputRef = useRef(null);

  const { getAccessTokenSilently, user } = useAuth0();
  const navigation = useNavigate();
  const location = useLocation();
  const stockId = location.pathname.split("/").slice(-1);

  const [addStockTrigger] = useAddStockMutation();
  const [updateStockTrigger] = useUpdateStockMutation();
  const { data: originStock } = useQueryFetch(useLazyGetStockQuery, {
    arg: { id: stockId },
  });

  const [stock, setStock] = useState({
    symbol: "",
    price: null,
    quantity: null,
    amount: null,
    status: "",
    userId: user.sub,
  });

  const addStockWithToken = async (stock) => {
    const token = await getAccessTokenSilently();
    addStockTrigger({ stock, token });
  };

  const updateStockWithToken = async ({ id, stock }) => {
    const token = await getAccessTokenSilently();
    updateStockTrigger({ id, stock, token });
  };

  const handleInputChange = (e) => {
    setStock((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStockFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        updateStockWithToken({ id: stockId, stock: stock });
      } else {
        addStockWithToken(stock);
      }
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  const inputLists = [
    {
      type: "text",
      name: "symbol",
      placeholder: "Stock's symbol",
      handleFunction: (e) => {
        e.target.value = e.target.value.toUpperCase();
        handleInputChange(e);
      },
      ref: symbolInputRef,
    },
    {
      type: "number",
      name: "price",
      placeholder: "Price",
      handleFunction: handleInputChange,
      ref: priceInputRef,
    },
    {
      type: "number",
      name: "quantity",
      placeholder: "Quantity",
      handleFunction: handleInputChange,
      ref: quantityInputRef,
    },
    {
      type: "number",
      name: "amount",
      placeholder: "Amount",
      handleFunction: handleInputChange,
      ref: amountInputRef,
      disabled: true,
    },
    {
      type: "text",
      name: "status",
      placeholder: "Status",
      handleFunction: handleInputChange,
      ref: statusInputRef,
    },
  ];

  useEffect(() => {
    if (originStock.data) {
      const data = originStock.data[0];
      if (data) {
        // setup defualt value for submit
        setStock({
          symbol: data.symbol,
          price: data.price,
          quantity: data.quantity,
          amount: data.amount,
          status: data.status,
          userId: data.userId,
        });
        // setup defualt value for visual in form
        symbolInputRef.current.value = data.symbol;
        priceInputRef.current.value = data.price;
        quantityInputRef.current.value = data.quantity;
        amountInputRef.current.value = data.amount;
        statusInputRef.current.value = data.status;
      }
    }
  }, [originStock.data]);

  useEffect(() => {
    const newAmount = parseFloat(stock.quantity * stock.price).toFixed(2);
    setStock((prev) => ({
      ...prev,
      amount: newAmount,
    }));
    amountInputRef.current.value = newAmount;
  }, [stock.quantity, stock.price]);

  useEffect(() => {
    const boughtOrSold = stock.quantity > 0 ? "Bought" : "Sold";
    const absoluteQuantity = Math.abs(stock.quantity);
    const newStatus = `${boughtOrSold} ${absoluteQuantity} ${stock.symbol} @ ${stock.price}`;
    if (!stock.quantity || !stock.price || !stock.symbol) return;

    setStock((prev) => ({
      ...prev,
      status: newStatus,
    }));
    statusInputRef.current.value = newStatus;
  }, [stock.quantity, stock.price, stock.symbol]);

  return (
    <div
      className="flex flex-col gap-2 lg:w-[40%] sm:w-[60%] w-[85%]
        rounded-xl p-10 shadow-xl bg-opacity-[0.17] bg-primary-100"
    >
      <h1 className="text-2xl text-primary-300 font-bold">{title}</h1>
      {inputLists.map((inputList) => (
        <FormInput
          key={inputList.name}
          name={inputList.name}
          type={inputList.type}
          ref={inputList.ref}
          placeholder={inputList.placeholder}
          handleChange={inputList.handleFunction}
          disabled={inputList.disabled}
        />
      ))}
      <hr className="h-3 border-t-1 mt-3 border-black" />
      <div className="flex justify-end gap-2">
        <button className="rounded-md p-3 w-[6rem] gap-2 flex items-center justify-center">
          <img className="w-4" src={trash} alt="save" />
          <Link to={"/"}>Cancel</Link>
        </button>
        <button
          onClick={handleStockFormSubmit}
          className="bg-primary-out hover:bg-primary-hover rounded-md p-3 w-[6rem] gap-2 flex items-center justify-center"
        >
          <img className="w-4" src={save} alt="save" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default StockForm;
