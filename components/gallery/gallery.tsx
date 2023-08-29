import { Photo } from "@/types";
import cx from "classnames";
import { memo } from "react";
import Item from "./item";
import NoResults from "./no-results";

export type Props = {
  data: Photo[];
};

function Gallery({ data }: Props) {
  return (
    <section>
      {data.length ? (
        <div
          className={cx("border-l-1", "grid", "grid-cols-3", "gap-0")}
          style={{
            minHeight: "calc(100vh - 66px)",
          }}
        >
          {data?.map((photo) => (
            <Item key={photo.id} data={photo} />
          ))}
        </div>
      ) : (
        <NoResults />
      )}
    </section>
  );
}

export default memo(Gallery);
