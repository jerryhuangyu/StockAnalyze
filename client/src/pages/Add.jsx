import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { StockForm } from '../components';

const Add = () => {
  const title = "Add New Order History";
  const navigation = useNavigate();
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
        import.meta.env.VITE_SERVER_URL + "stock",
        {
          method: 'POST',
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

  return (
    <StockForm
      title={title}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      forceUppercase={forceUppercase}
    />
  )
}

export default Add