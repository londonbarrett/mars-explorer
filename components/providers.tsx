"use client";

import { NextUIProvider } from "@nextui-org/react";
import { memo } from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default memo(Providers);
