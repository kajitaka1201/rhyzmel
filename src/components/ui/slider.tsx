import { cn } from "@/lib/utils";
import React from "react";

export default function Slider(props: React.HTMLProps<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      type="range"
      className={cn("h-1 appearance-none rounded-full bg-muted accent-primary", className)}
      {...rest}
    />
  );
}
