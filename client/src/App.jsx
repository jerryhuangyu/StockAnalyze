import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import { Add, Home, Update, Symbol, Login, PageNotFound } from "./pages";
import { Chart, Footer, Navbar } from "./components";
import { showGuide } from "./utils/guide";

function App() {
  const isSmall = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (!localStorage.getItem("isOnboardSinsight")) {
      showGuide(isSmall);
    }
  }, []);

  return (
    <>
      <Navbar />
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
