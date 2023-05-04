import React, { useEffect, useRef, useState } from 'react';
import { StockForm } from '../components';
import { useLocation, useNavigate } from 'react-router-dom';

const fetchIdStock = async (
  stockId,
  setStock,
  symbolPlaceholder,
  pricePlaceholder,
  quantityPlaceholder,
  amountPlaceholder,
  statusPlaceholder
) => {
  try {
    const response = await fetch( "http://localhost:8080/stock/" + stockId, { method: 'GET' } );
    const data = await response.json();
    // setup defualt value for submit
    setStock({
      symbol: data[0].symbol,
      price: data[0].price,
      quantity: data[0].quantity,
      amount: data[0].amount,
      status: data[0].status,
    })
    // setup defualt value for visual in form
    symbolPlaceholder.current.value = data[0].symbol;
    pricePlaceholder.current.value = data[0].price;
    quantityPlaceholder.current.value = data[0].quantity;
    amountPlaceholder.current.value = data[0].amount;
    statusPlaceholder.current.value = data[0].status;
  }
  catch (err) {
    alert(err);
  }
}

const Update = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const symbolPlaceholder = useRef(null);
  const pricePlaceholder = useRef(null);
  const quantityPlaceholder = useRef(null);
  const amountPlaceholder = useRef(null);
  const statusPlaceholder = useRef(null);
  const stockId = location.pathname.split("/").slice(-1);
  const [stock, setStock] = useState({
    symbol: "",
    price: null,
    quantity: null,
    amount: null,
    status: ""
  });

  const handleChange = (e) => {
    setStock((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  };

  const forceUppercase = (e) => {
    e.target.value = e.target.value.toUpperCase();
    setStock((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/stock/" + stockId,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...stock })
        }
      );
      const data = await response.json();
      alert(data);
      navigation("/")
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchIdStock(
      stockId,
      setStock,
      symbolPlaceholder,
      pricePlaceholder,
      quantityPlaceholder,
      amountPlaceholder,
      statusPlaceholder
    );
  }, [])

  return (
    <StockForm
      title="Update Order Info"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      forceUppercase={forceUppercase}
      symbolPlaceholder={symbolPlaceholder}
      pricePlaceholder={pricePlaceholder}
      quantityPlaceholder={quantityPlaceholder}
      amountPlaceholder={amountPlaceholder}
      statusPlaceholder={statusPlaceholder}
    />
  )
}

export default Update