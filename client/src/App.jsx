import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Add, Home, Update, Symbol } from "./pages";
import { Chart, Footer, Navbar, StockTicker } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="flex flex-col mt-1 items-center overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/symbol" element={<Symbol />}>
            <Route path=":symbol" element={<Chart />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
