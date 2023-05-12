import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Add, Home, Update, Symbol, Login } from "./pages";
import { Chart, Footer, Navbar, StockTicker } from "./components";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

function App() {
  const [user, setUser] = useState({});

  const handleSignOut = (e) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };
  useEffect(() => {
    // global google
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="flex flex-col mt-1 items-center overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/symbol" element={<Symbol />}>
            <Route path=":symbol" element={<Chart />} />
          </Route>
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
