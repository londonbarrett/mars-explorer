import { Photo } from "@/types";
import cx from "classnames";
import { memo } from "react";
import Item from "./item";

export type Props = {
  data: Photo[];
};

function Gallery({ data }: Props) {
  return (
    <section>
      <div
        className={cx(
          "border-l-1",
          "columns-1",
          "sm:columns-2",
          "lg:columns-3",
          "gap-0"
        )}
      >
        {data?.map((photo) => (
          <Item key={photo.id} data={photo} />
        ))}
      </div>
    </section>
  );
}

export default memo(Gallery);
