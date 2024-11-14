'use client'

import { LegislationInfo } from "app/api/types/legislationPassedLegislature";
import { legislationPassedLegislature$ } from "app/store/legislaton-store";
import { useState, useEffect } from "react";



/**
 * Returns current store of legislation passed legislature
 * @returns Array of passed legislation
 */
export const useLegislationPassedLegislature = () => {
    const [leg, setLeg] = useState<Array<LegislationInfo>>([]);

    useEffect(() => {
        const sub = legislationPassedLegislature$.subscribe(val => {
            setLeg(val)
        })
        return () => sub.unsubscribe();
    }, []);

    return leg;
}