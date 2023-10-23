const BackgroundCover = () => {
  return (
    <div
      className="fixed top-0 invert w-full h-full -z-20 opacity-[0.35]"
      style={{ backgroundImage: "url(/grid.svg)" }}
    >
      <div className="background_gradient" />
    </div>
  );
};
export default BackgroundCover;
