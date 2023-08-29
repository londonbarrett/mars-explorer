import cx from "classnames";
import { memo } from "react";
import Moon from "../icons/moon";

function NoResults() {
  return (
    <div
      className={cx(
        "border-1",
        "flex",
        "flex-col",
        "w-full",
        "items-center",
        "justify-center"
      )}
      style={{
        height: "calc(100vh - 66px)",
      }}
    >
      <Moon fill="white" height="20em" />
      <div>No results for your search.</div>
    </div>
  );
}

export default memo(NoResults);
