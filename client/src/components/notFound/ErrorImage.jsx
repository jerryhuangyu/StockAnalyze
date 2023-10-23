import { notFoundIcon, notFoundIcon2 } from "../../assets";

const getRandomImage = (imgLists) => {
  const randomIndex = Math.floor(Math.random() * imgLists.length);
  return imgLists[randomIndex];
};

const ErrorImage = () => {
  const errorImg = getRandomImage([notFoundIcon, notFoundIcon2]);
  return (
    <>
      <img src={errorImg} alt="404 error" className="h-[200px] aspect-auto" />
      <p className="-mt-6 text-gray-500 text-xs font-light">
        Image by catalyststuff on Freepik
      </p>
    </>
  );
};
export default ErrorImage;
