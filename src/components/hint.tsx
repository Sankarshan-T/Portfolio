import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  children: React.ReactNode;
}

export default function Hint({ label, side = "right", sideOffset = 4, children }: HintProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger >
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}