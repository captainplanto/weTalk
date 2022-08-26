import { Dropdown } from "@nextui-org/react";
import { CollectionChildren } from "@react-types/shared";
import { FC } from "react";

interface IDropDown {
  showContent: string;
  children: CollectionChildren<object>;
}

const DropdownComponent: FC<IDropDown> = ({
  showContent,
  children,
  ...props
}) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <img src={showContent} style={{ width: "25px", marginLeft:'3rem' }} alt="icon" />
      </Dropdown.Trigger>
      <Dropdown.Menu aria-label="Example with disabled actions">
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;
