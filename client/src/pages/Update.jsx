import { StockForm } from "../components";

const Update = () => {
  const title = "Update Order Info";

  return (
    <div className="w-full h-[calc(100vh-132px)] flex items-center justify-center">
      <StockForm title={title} isUpdate />
    </div>
  );
};

export default Update;
