"use client";

import { Photo } from "@/types";
import cx from "classnames";
import Image from "next/image";
import { memo, useCallback, useRef, useState } from "react";

type Props = {
  data: Photo;
};

const randomizeText = (value: string) =>
  value
    .split("")
    .map((char) =>
      char === " " || char === "-"
        ? char
        : char.match(/\d/)
        ? String.fromCharCode(48 + Math.random() * 10)
        : char.match(/[A-Z]/)
        ? String.fromCharCode(65 + Math.random() * 25)
        : String.fromCharCode(97 + Math.random() * 25)
    )
    .join("");

const randomizePhoto = (...args: string[]) =>
  args.map((value) => randomizeText(value));

function Item({ data }: Props) {
  const [hover, setHover] = useState(false);

  const timerCount = useRef(0);
  const [effectStrings, setEffectStrings] = useState([
    data.rover.name,
    data.camera.full_name,
    data.earth_date,
  ]);
  const changeText = useCallback(() => {
    if (timerCount.current > 10) {
      setHover(false);
    } else {
      timerCount.current = timerCount.current + 1;
      setEffectStrings(
        randomizePhoto(data.rover.name, data.camera.full_name, data.earth_date)
      );
      setTimeout(changeText, 80);
    }
  }, [data, timerCount]);

  const mouseEnterHandler = useCallback(() => {
    setHover(true);
    timerCount.current = 0;
    setTimeout(changeText, 80);
  }, [changeText]);
  const mouseLeaveHandler = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <div
      className={cx(
        "divide-white",
        "divide-y",
        "relative",
        "border-r-1",
        "border-b-1"
      )}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <Image
        alt={`${data.rover.name} ${data.camera.name} ${data.earth_date}`}
        className={cx("w-full")}
        height={500}
        src={data.img_src}
        width={500}
      />
      <div
        className={cx(
          "absolute",
          "bg-black/80",
          "bottom-0",
          "inset-x-0",
          "p-2"
        )}
      >
        <p>{hover ? effectStrings[0] : data.rover.name}</p>
        <p>{hover ? effectStrings[1] : data.camera.full_name}</p>
        <p>{hover ? effectStrings[2] : data.earth_date}</p>
      </div>
    </div>
  );
}

export default memo(Item);
