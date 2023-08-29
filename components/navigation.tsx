"use client";

import React, {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Input,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
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

const getFavoriteInfo = (search: string) => {
  const sp = new URLSearchParams(search);
  return `${sp.get("rover")} - ${sp.get("camera")} - ${sp.get("date")}`;
};

const getFavorites = () => {
  try {
    return localStorage && localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites") as string)
      : [];
  } catch {
    return [];
  }
};

function Navigation() {
  const searchParams = useSearchParams();
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [favorite, setFavorite] = useState<boolean>(
    favorites.includes(searchParams.toString())
  );
  const { push } = useRouter();
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
  const favoriteClickHandler = useCallback(() => {
    const newFavorites = favorite
      ? favorites.filter(
          (favorite: string) => favorite !== searchParams.toString()
        )
      : Array.from(new Set([...favorites, searchParams.toString()]));

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    setFavorite((prev) => !prev);
  }, [favorite, favorites, searchParams]);
  const selectedRover = searchParams.get("rover");
  const selectedCamera = searchParams.get("camera");
  const selectedDate = searchParams.get("date");
  const favoriteVisible = selectedRover && selectedCamera && selectedDate;
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
      <NavbarContent>
        <NavbarMenuToggle />
        <Link href="/" className="font-bold text-inherit">
          Mars Explorer
        </Link>
      </NavbarContent>
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
        {favoriteVisible && (
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
        )}
      </NavbarContent>
      <NavbarMenu>
        {favorites.map((favorite) => (
          <NavbarMenuItem key={`${favorite}`}>
            <Link className="w-full" href={`/?${favorite}`}>
              {getFavoriteInfo(favorite)}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default memo(Navigation);
