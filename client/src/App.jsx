import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Add, Home, Update, Symbol, Login } from "./pages";
import { Chart, Footer, Navbar, StockTicker } from "./components";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

function App() {
  const [user, setUser] = useState({});
  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
    var userObject = jwt_decode(res.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  };
  const handleSignOut = (e) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };
  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id:
        "759855032131-pn9b9ko6glu6925r5nna6dp9salgdneb.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

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
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
      {Object.keys(user).length !== 0 && (
        <div className="w-full flex gap-3 items-center">
          <img src={user.picture} alt="user" className="w-8 aspect-square" />
          <h3>{user.name}</h3>
          <button
            className="h-8 text-white px-3 bg-black"
            onClick={(e) => handleSignOut(e)}
          >
            Sign out
          </button>
        </div>
      )}
      <div id="signInDiv"></div>
    </BrowserRouter>
  );
}

export default App;
