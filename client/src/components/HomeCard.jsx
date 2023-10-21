import { LineWave } from "react-loader-spinner";

const LineWaveLoader = () => (
  <div className="relative h-12 overflow-hidden">
    <div className="absolute bgout -top-10 -left-4">
      <LineWave color="#8CD4E5" />
    </div>
  </div>
);

const HomeCard = ({ header, description, icon }) => {
  return (
    <div className="bg-primary-50 shadow rounded-lg flex justify-between items-center px-9">
      <div className="flex flex-col">
        <h2 className="text-primary-out font-bold drop-shadow-sm text-5xl">
          {header !== undefined ? String(header) : <LineWaveLoader />}
        </h2>
        <p className="text-primary-200">{description}</p>
      </div>
      <img className="w-10 mr-2" src={icon} alt={header} />
    </div>
  );
};

export default HomeCard;
