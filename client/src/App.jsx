import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { Add, Home, Update, Symbol } from './pages';
import { Chart, Navbar } from './components';

function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <div className='flex flex-col mt-10 items-center'>
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
