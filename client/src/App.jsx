import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";

import ProtectedRoute from "./components/ProtectedRoute";
import { Add, Home, Update, Symbol, Login, PageNotFound } from "./pages";
import { Chart, Footer, Navbar } from "./components";
import { steps } from "./constants";

function App() {
  const isSmall = useMediaQuery("(max-width: 640px)");
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
    <>
      <Navbar showOnboardGuide={showOnboardGuide} driver={driver} />
      <div className="flex flex-col mt-1 items-center overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/add" element={<Add />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/symbol" element={<Symbol />}>
              <Route path=":symbol" element={<Chart />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
