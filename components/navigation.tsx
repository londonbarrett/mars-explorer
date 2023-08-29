"use client";

import React, { ChangeEvent, memo, useCallback, useState } from "react";
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Dropdown from "./dropdown";
import Chevron from "./icons/chevron";
import Heart from "./icons/heart";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const roverOptions = {
  curiosity: "Curiosity",
  opportunity: "Opportunity",
  spirit: "Spirit",
};

type RoverOption = "curiosity" | "opportunity" | "spirit";

const camerasOptions = {
  curiosity: {
    fhaz: "Front Hazard Avoidance Camera",
    rhaz: "Rear Hazard Avoidance Camera",
    mast: "Mast Camera",
    chemcam: "Chemistry and Camera Complex",
    mahli: "Mars Hand Lens Imager",
    mardi: "Mars Descent Imager",
    navcam: "Navigation Camera",
  },
  opportunity: {
    fhaz: "Front Hazard Avoidance Camera",
    rhaz: "Rear Hazard Avoidance Camera",
    navcam: "Navigation Camera",
    pancam: "Panoramic Camera",
    minites: "Miniature Thermal Emission Spectrometer (Mini-TES)",
  },
  spirit: {
    fhaz: "Front Hazard Avoidance Camera",
    rhaz: "Rear Hazard Avoidance Camera",
    navcam: "Navigation Camera",
    pancam: "Panoramic Camera",
    minites: "Miniature Thermal Emission Spectrometer (Mini-TES)",
  },
};

function Navigation() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [favorite, setFavorite] = useState(false);
  const pushSearchParams = useCallback(
    (param: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(param, value);
      push(`/?${params.toString()}`);
    },
    [push, searchParams]
  );
  const roverChangeHandler = useCallback(
    (keys: string[]) => {
      const params = new URLSearchParams();
      params.set("rover", keys[0]);
      push(keys.length ? `/?${params.toString()}` : "/");
    },
    [push]
  );
  const cameraChangeHandler = useCallback(
    (keys: string[]) => pushSearchParams("camera", keys[0]),
    [pushSearchParams]
  );
  const dateChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      pushSearchParams("date", event.target.value),
    [pushSearchParams]
  );
  const favoriteClickHandler = useCallback(
    () => setFavorite((prev) => !prev),
    []
  );
  const selectedRover = searchParams.get("rover");
  const selectedCamera = searchParams.get("camera");
  const selectedDate = searchParams.get("date");
  const roverValues = Object.keys(roverOptions).includes(selectedRover || "")
    ? [selectedRover as string]
    : undefined;
  const cameraOptions = selectedRover
    ? camerasOptions[selectedRover as RoverOption]
    : undefined;
  const cameraValues = !selectedCamera ? undefined : [selectedCamera];
  return (
    <Navbar
      isBlurred={false}
      isBordered
      classNames={{ base: "border-white border-1" }}
      maxWidth="full"
    >
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          Mars Explorer
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown
            icon={<Chevron height=".8em" fill="white" />}
            label="Select a rover"
            onChange={roverChangeHandler}
            options={roverOptions}
            values={roverValues}
          />
        </NavbarItem>
        <NavbarItem>
          <Dropdown
            icon={<Chevron height=".8em" fill="white" />}
            label="Select a camera"
            onChange={cameraChangeHandler}
            options={cameraOptions}
            values={cameraValues}
          />
        </NavbarItem>
        <NavbarItem>
          <Input
            classNames={{
              inputWrapper: "border-white hover:border-white",
            }}
            aria-label="Select a date"
            id="date"
            name="date"
            onChange={dateChangeHandler}
            placeholder="Select a date"
            size="sm"
            type="date"
            value={selectedDate || undefined}
            variant="bordered"
          />
        </NavbarItem>
        <NavbarItem>
          <Button
            aria-label="Add to favorites"
            isIconOnly
            onClick={favoriteClickHandler}
            size="sm"
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
