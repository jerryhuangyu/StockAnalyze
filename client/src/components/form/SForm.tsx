import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { save, trash } from "../../assets";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";

import {
  useLazyGetStockQuery,
  useAddStockMutation,
  useUpdateStockMutation,
} from "../../services/stockRecord";
import { useQueryFetch } from "../../hooks/useQueryFetch";

type FormProps = {
  title: string;
  isUpdate?: boolean;
};

const schema = yup
  .object({
    symbol: yup.string().uppercase().required(),
    price: yup.number().typeError("price must be a number").required(),
    quantity: yup
      .number()
      .typeError("quantity must be a number")
      .integer()
      .required(),
    amount: yup.string(),
    status: yup.string(),
  })
  .required();
type Inputs = yup.InferType<typeof schema>;

const FormErrorText = ({ error }: { error: string | undefined }) => (
  <>{error && <p className="text-red-400 text-sm">{error}</p>}</>
);

const SForm = ({ title, isUpdate = false }: FormProps) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const navigation = useNavigate();
  const location = useLocation();
  const stockId = location.pathname.split("/").slice(-1);

  const [addStockTrigger] = useAddStockMutation();
  const [updateStockTrigger] = useUpdateStockMutation();
  // const { data: originStock } = useQueryFetch(useLazyGetStockQuery, {
  //   arg: { id: stockId },
  // });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue("symbol", watch("symbol").toUpperCase());
    trigger("symbol");
  }, [watch("symbol")]);

  useEffect(() => {
    const quantity = watch("quantity");
    const price = watch("price");
    const newStatus =
      watch("quantity").toString() === "" ||
      watch("price").toString() === "" ||
      !Number.isInteger(parseFloat(quantity))
        ? undefined
        : (quantity * price).toFixed(2);

    setValue("amount", newStatus);
  }, [watch("price"), watch("quantity")]);

  useEffect(() => {
    const q = watch("quantity");
    const s = watch("symbol");
    const p = watch("price");
    if (!q || !p || !s) return;

    const boughtOrSold = q > 0 ? "Bought" : "Sold";
    const absoluteQuantity = Math.abs(q);
    const newStatus = `${boughtOrSold} ${absoluteQuantity} ${s} @ ${p}`;
    setValue("status", newStatus);
  }, [watch("quantity"), watch("price"), watch("symbol")]);

  const onStockFormSubmit: SubmitHandler<Inputs> = async (data, e) => {
    console.log(data);
    const stock = { ...data, userId: user?.sub };
    e?.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      if (isUpdate) {
        updateStockTrigger({ id: stockId, stock, token });
      } else {
        addStockTrigger({ stock, token });
      }
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 lg:w-[40%] sm:w-[60%] w-[85%]
        rounded-xl p-10 shadow-xl bg-opacity-[0.17] bg-primary-100"
    >
      <h1 className="text-2xl text-primary-300 font-bold">{title}</h1>

      <input
        placeholder="Stock's symbol"
        className="bg-primary-100 py-1 px-3 text-secondary-800 rounded-md font-medium"
        {...register("symbol")}
      />
      {errors.symbol && <FormErrorText error={errors.symbol?.message} />}
      <input
        placeholder="Price"
        className="bg-primary-100 py-1 px-3 text-secondary-800 rounded-md font-medium"
        {...register("price")}
      />
      {errors.price && <FormErrorText error={errors.price?.message} />}
      <input
        placeholder="Quantity"
        className="bg-primary-100 py-1 px-3 text-secondary-800 rounded-md font-medium"
        {...register("quantity")}
      />
      {errors.quantity && <FormErrorText error={errors.quantity?.message} />}
      <input
        placeholder="Amount"
        disabled
        className="bg-primary-100 py-1 px-3 text-secondary-800 rounded-md font-medium"
        {...register("amount")}
      />
      <input
        placeholder="Status"
        className="bg-primary-100 py-1 px-3 text-secondary-800 rounded-md font-medium"
        {...register("status")}
      />

      <hr className="h-3 border-t-1 mt-3 border-black" />

      <div className="flex justify-end gap-2">
        <button className="rounded-md p-3 w-[6rem] gap-2 flex items-center justify-center">
          <img className="w-4" src={trash} alt="save" />
          <Link to={"/"}>Cancel</Link>
        </button>
        <button
          onClick={handleSubmit(onStockFormSubmit)}
          className="bg-primary-out hover:bg-primary-hover rounded-md p-3 w-[6rem] gap-2 flex items-center justify-center"
        >
          <img className="w-4" src={save} alt="save" />
          <span>Save</span>
        </button>
      </div>
    </form>
  );
};
export default SForm;
