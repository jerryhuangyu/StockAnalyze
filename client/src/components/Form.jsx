import React from 'react';
import { Link } from 'react-router-dom';

import { save, trash } from '../assets';

const StockForm = ({
  title,
  handleChange,
  forceUppercase,
  handleSubmit,
  symbolPlaceholder,
  pricePlaceholder,
  quantityPlaceholder,
  amountPlaceholder,
  statusPlaceholder, 
}) => {
  return (
    <div
        className='flex flex-col gap-2 lg:w-[40%] sm:w-[60%] w-[85%]
        rounded-xl p-10 shadow-xl bg-opacity-[0.17] bg-primary-100'
    >
      <h1
        className='text-2xl text-primary-300 font-bold'
      >
        {title}
      </h1>
      <input
        ref={symbolPlaceholder}
        type="text"
        placeholder="Stock's symbol"
        onChange={forceUppercase}
        name='symbol'
        className='bg-primary-100 py-1 px-3 text-secondary-800
        rounded-md font-medium'
        />
      <input
        ref={pricePlaceholder}
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name='price'
        className='bg-primary-100 py-1 px-3 text-secondary-800
        rounded-md font-medium'
      />
      <input
        ref={quantityPlaceholder}
        type="number"
        placeholder="Quantity"
        onChange={handleChange}
        name='quantity'
        className='bg-primary-100 py-1 px-3 text-secondary-800
        rounded-md font-medium'
      />
      <input
        ref={amountPlaceholder}
        type="number"
        placeholder="Amount"
        onChange={handleChange}
        name='amount'
        className='bg-primary-100 py-1 px-3 text-secondary-800
        rounded-md font-medium'
      />
      <input
        ref={statusPlaceholder}
        type="text"
        placeholder="Status"
        onChange={handleChange}
        name='status'
        className='bg-primary-100 py-1 px-3 text-secondary-800
        rounded-md font-medium'
      />
      <hr className='h-3 border-t-1 mt-3 border-black'/>
      <div className='flex justify-end gap-2'>
        <button
          className='rounded-md p-3 w-[6rem] gap-2 flex items-center justify-center'
        >
          <img className='w-4' src={trash} alt="save" /><Link to={"/"}>Cancel</Link>
        </button>
        <button
          onClick={handleSubmit}
          className='bg-primary-out hover:bg-primary-hover rounded-md p-3 w-[6rem] gap-2 flex items-center justify-center'
        >
          <img className='w-4' src={save} alt="save" /><span>Save</span>
        </button>
      </div>
    </div>
  )
}

export default StockForm