import { BillNumber, LegislationDetailed } from "app/api/types/legislationDetailed";
import { legislationDetails$ } from "app/store/legislaton-store";
import { useState, useEffect } from "react";



/**
 * Returns current store of legislation details and names
 * @returns Array of legislation details
 */
export const useLegislationDetails = () => {
    const [details, setDetails] = useState<Map<BillNumber, LegislationDetailed>>(new Map());

    useEffect(() => {
        const sub = legislationDetails$.subscribe(val => {
            setDetails(val)
        })
        return () => sub.unsubscribe();
    }, []);

    return details;
}