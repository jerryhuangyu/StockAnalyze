import { useLocation } from "react-router-dom";
import StockForm from "../components/form/StockForm";
// @ts-ignore
import { useQueryFetch } from "../hooks/useQueryFetch";
// @ts-ignore
import { useLazyGetStockQuery } from "../services/stockRecord";
import { useEffect, useState } from "react";

const Update = () => {
  const title = "Update Order Info";
  const [stock, setStock] = useState();
  const location = useLocation();
  const stockId = location.pathname.split("/").slice(-1)[0];
  const { data: originData } = useQueryFetch(useLazyGetStockQuery, {
    arg: { id: stockId },
  });

  useEffect(() => {
    if (originData.data) setStock(originData.data[0]);
  }, [originData.data]);

  return (
    <div className="w-full h-[calc(100vh-132px)] flex items-center justify-center">
      <StockForm
        title={title}
        isUpdate
        originStock={stock}
        updatedStockId={stockId}
      />
    </div>
  );
};

export default Update;
