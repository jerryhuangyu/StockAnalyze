import { StockForm } from "../components";
import SForm from "../components/form/SForm";

const Add = () => {
  const title = "Add New Order History";

  return (
    <div className="w-full h-[calc(100vh-132px)] flex items-center justify-center">
      <StockForm title={title} />
      <SForm title={title} />
    </div>
  );
};

export default Add;
