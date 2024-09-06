import { CurrentWeather } from "./components/CurrentWeather";
// LATER FOR DARKMODE!

// import { ToggleMode } from "./components/ToggleTheme";

// Define the type for the props
// interface DashboardProps {
//   isChecked: boolean;
//   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export const Dashboard: React.FC<DashboardProps> = ({
//   isChecked,
//   handleChange,
// }) => {
//   return (
//     <>
//       <AbcIcon sx={{ fontSize: 60 }} />
//       <ToggleMode handleChange={handleChange} isChecked={isChecked} />
//     </>
//   );
// };

export const Dashboard = () => {
  return (
    <>
      <CurrentWeather />
    </>
  );
};
