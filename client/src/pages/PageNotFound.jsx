import { BackgroundCover, ErrorImage, HomeButton } from "../components";

const PageNotFound = () => {
  return (
    <div className="flex text-black flex-col gap-4 max-w-xs mx-auto items-center h-[calc(100vh-132px)] justify-center text-center">
      <BackgroundCover />
      <p className="font-bold text-primary-out grayscale-[40%] text-7xl text-primary font-mono">
        404
      </p>
      <p>
        Oops Page not found. We&apos;re working on constructing new feature.
      </p>
      <ErrorImage />
      <HomeButton />
    </div>
  );
};
export default PageNotFound;
// 108
