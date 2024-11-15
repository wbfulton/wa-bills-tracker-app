"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TooltipProvider delayDuration={300}>{children}</TooltipProvider>;
}
