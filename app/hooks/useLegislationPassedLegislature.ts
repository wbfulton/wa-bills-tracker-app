"use client";

import { Legislation } from "@/lib/types";
import { legislationPassedLegislature$ } from "app/store/legislaton-store";
import { useEffect, useState } from "react";

/**
 * Returns current store of legislation passed legislature
 * @returns Array of passed legislation
 */
export const useLegislationPassedLegislature = () => {
  const [leg, setLeg] = useState<Array<Legislation>>([]);

  useEffect(() => {
    const sub = legislationPassedLegislature$.subscribe((val) => {
      setLeg(val);
    });
    return () => sub.unsubscribe();
  }, []);

  return leg;
};
