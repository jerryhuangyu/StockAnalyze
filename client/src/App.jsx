import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import jwt_decode from "jwt-decode";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { Add, Home, Update, Symbol, Login } from "./pages";
import { Chart, Footer, Navbar, StockTicker } from "./components";
import { steps } from "./constants";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isSmall = useMediaQuery("(max-width: 640px)");
  const [user, setUser] = useState({});
  const driver = new Driver();

  const showOnboardGuide = (driver) => {
    try {
      driver.start();
      localStorage.setItem("isOnboardSinsight", true);
      setInterval(() => {
        localStorage.removeItem("isOnboardSinsight");
      }, 86400000);
    } catch (error) {
      console.log("can't find element for driver");
    }
  };

  useEffect(() => {
    const driverSteps = isSmall ? steps.slice(0, 2) : steps;
    driver.defineSteps(driverSteps);
    if (!localStorage.getItem("isOnboardSinsight")) {
      showOnboardGuide(driver);
    }
  }, []);

  return (
    <BrowserRouter>
      <SkeletonTheme baseColor="#ebebe8" highlightColor="#dadad8">
        <Navbar
          user={user}
          showOnboardGuide={showOnboardGuide}
          driver={driver}
        />
        <div className="flex flex-col mt-1 items-center overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/add" element={<Add />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/symbol" element={<Symbol />}>
                <Route path=":symbol" element={<Chart />} />
              </Route>
            </Route>
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            />
          </Routes>
        </div>
        <Footer />
      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
