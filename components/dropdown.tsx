import {
  Button,
  Dropdown as NUIDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@nextui-org/react";
import cx from "classnames";
import React, { ReactNode, memo } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  onChange: (keys: Selection) => void;
  options: { value: string; label: string }[];
  value: Selection;
};

function Dropdown({ icon, label, onChange, options, value }: Props) {
  return (
    <NUIDropdown>
      <DropdownTrigger>
        <Button
          className={cx("capitalize", "border-white")}
          endContent={icon}
          size="sm"
          variant="bordered"
        >
          {label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        onSelectionChange={onChange}
        selectedKeys={value}
        selectionMode="single"
        variant="bordered"
      >
        {options.map((option) => (
          <DropdownItem key={option.value}>{option.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </NUIDropdown>
  );
}

export default memo(Dropdown);
