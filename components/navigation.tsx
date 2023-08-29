"use client";

import React, { memo, useCallback, useState } from "react";
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Selection,
} from "@nextui-org/react";
import Dropdown from "./dropdown";
import Chevron from "./icons/chevron";
import Heart from "./icons/heart";

const rovers = [
  { value: "curiosity", label: "Curiosity" },
  { value: "oportunity", label: "Oportunity" },
  { value: "spirit", label: "Spirit" },
];
const cameras = [
  { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
  { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
  { value: "MAST", label: "Mast Camera" },
  { value: "CHEMCAM", label: "Chemistry and Camera Complex" },
  { value: "MAHLI", label: "Mars Hand Lens Imager" },
  { value: "MARDI", label: "Mars Descent Imager" },
  { value: "NAVCAM", label: "Navigation Camera" },
  { value: "PANCAM", label: "Panoramic Camera" },
  {
    value: "MINITES",
    label: "Miniature Thermal Emission Spectrometer (Mini-TES)",
  },
];

function Navigation() {
  const [favorite, setFavorite] = useState(false);
  const roverChangeHandler = useCallback(
    (keys: Selection) => console.log(keys),
    []
  );
  const cameraChangeHandler = useCallback(
    (keys: Selection) => console.log(keys),
    []
  );
  const favoriteClickHandler = useCallback(
    () => setFavorite((prev) => !prev),
    []
  );
  return (
    <Navbar
      isBlurred={false}
      isBordered
      classNames={{ base: "border-white border-1" }}
      maxWidth="full"
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">Mars Explorer</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown
            icon={<Chevron height=".8em" fill="white" />}
            label="Select a rover"
            onChange={roverChangeHandler}
            options={rovers}
            value={new Set(["oportunity"])}
          />
        </NavbarItem>
        <NavbarItem>
          <Dropdown
            icon={<Chevron height=".8em" fill="white" />}
            label="Select a camera"
            onChange={cameraChangeHandler}
            options={cameras}
            value={new Set(["MARDI"])}
          />
        </NavbarItem>
        <NavbarItem>
          <Input
            classNames={{
              inputWrapper: "border-white hover:border-white",
            }}
            size="sm"
            type="date"
            variant="bordered"
          />
        </NavbarItem>
        <NavbarItem>
          <Button
            aria-label="Add to favorites"
            isIconOnly
            onClick={favoriteClickHandler}
            variant="light"
          >
            <Heart fill="white" active={favorite} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default memo(Navigation);
