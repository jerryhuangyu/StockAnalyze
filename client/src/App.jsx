import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { Add, Home, Update, Symbol } from './pages';
import { Chart } from './components';

function App() {

  return (
    <BrowserRouter>
    <div className='flex flex-col justify-center items-center h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Add />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/symbol' element={<Symbol />} >
          <Route path=":symbol" element={<Chart />} />
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
