import { Switch } from '@nextui-org/react'
import { ToggleSwitch } from '../redux/features/topics';
import { useAppDispatch, useAppSelector } from '../redux/hooks'


export const ToggleComponent = () => {
 const {toggleMode}= useAppSelector((state)=>state.topic);
 const dispatch = useAppDispatch();

  return (
    <div>
      <Switch
        checked={!toggleMode}
        onChange={() =>dispatch(ToggleSwitch())}
      />
    </div>
  )
}