import { Switch } from "@nextui-org/react";
import { ToggleSwitch } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const ToggleComponent = () => {
  const { toggleMode } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
  const handleChange = () => {
    dispatch(ToggleSwitch(!toggleMode));
    localStorage.setItem("theme", JSON.stringify(toggleMode));
  };

  return (
    <div>
      <Switch
        initialChecked={false}
        checked={toggleMode ? false : true}
        onChange={() => handleChange()}
      />
    </div>
  );
};
