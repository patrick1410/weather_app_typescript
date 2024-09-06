import "./css/ToggleTheme.css";

// Define the type for the handleChange function
type HandleChangeFunction = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

// Define the props type
interface ToggleModeProps {
  handleChange: HandleChangeFunction;
  isChecked: boolean;
}

export const ToggleMode: React.FC<ToggleModeProps> = ({
  handleChange,
  isChecked,
}) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check">{isChecked ? "Dark Mode" : "Light Mode"}</label>
    </div>
  );
};
