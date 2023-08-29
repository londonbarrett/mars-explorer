import {
  Button,
  Dropdown as NUIDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@nextui-org/react";
import cx from "classnames";
import React, { ReactNode, memo, useCallback } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  onChange: (values: string[]) => void;
  options?: Record<string, string>;
  values?: string[];
};

function Dropdown({ icon, label, onChange, options, values }: Props) {
  const selectionChangeHandler = useCallback(
    (keys: Selection) => onChange(Array.from(keys as Set<string>)),
    [onChange]
  );
  const selectedValue =
    !!values && options ? values?.map((value) => options[value]) : label;
  return (
    <NUIDropdown>
      <DropdownTrigger>
        <Button
          aria-label={label}
          className={cx("capitalize", "border-white")}
          endContent={icon}
          size="sm"
          variant="bordered"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      {options && (
        <DropdownMenu
          aria-label={`${label} options`}
          onSelectionChange={selectionChangeHandler}
          selectedKeys={new Set(values)}
          selectionMode="single"
          variant="bordered"
        >
          {Object.keys(options).map((option) => (
            <DropdownItem aria-label={options[option]} key={option}>
              {options[option]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </NUIDropdown>
  );
}

export default memo(Dropdown);
