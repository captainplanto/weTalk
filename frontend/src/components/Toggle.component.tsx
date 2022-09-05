import { Switch } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { ToggleSwitch } from "../redux/features/topics";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
//interface IToggle {toggleMode:boolean;}



export const ToggleComponent= () => {
  const [toggleMode, setToggleMode]=useState<boolean>(false)
console.log(toggleMode)

  const handleChange = () => {
   setToggleMode(!toggleMode)
   localStorage.setItem("theme", JSON.stringify(toggleMode));


  };

  return (
    <div>
      <Switch checked={toggleMode} onChange={() => handleChange()} />
    </div>
  );
};
