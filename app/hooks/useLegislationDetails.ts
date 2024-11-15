import { legislationDetails$ } from "app/store/legislaton-store";
import { LegislationDetail } from "express/src/types";
import { useState, useEffect } from "react";



/**
 * Returns current store of legislation details and names
 * @returns Array of legislation details
 */
export const useLegislationDetails = () => {
    const [details, setDetails] = useState<Map<number, LegislationDetail>>(new Map());

    useEffect(() => {
        const sub = legislationDetails$.subscribe(val => {
            setDetails(val)
        })
        return () => sub.unsubscribe();
    }, []);

    return details;
}