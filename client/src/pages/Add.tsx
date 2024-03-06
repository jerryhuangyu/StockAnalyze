import StockForm from "../components/form/StockForm";

const Add = () => {
  const title = "Add New Order History";

  return (
    <div className="w-full h-[calc(100vh-132px)] flex items-center justify-center">
      <StockForm title={title} />
    </div>
  );
};

export default Add;
