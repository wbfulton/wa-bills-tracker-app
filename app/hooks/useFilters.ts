import { LegislationInfo } from "app/api/types/legislationPassedLegislature";
import { DEFAULT_FILTERS, LegislationFilters } from "app/store/filters-store";
import { legislationFilters$ } from "app/store/filters-store";
import { useState, useEffect } from "react";



/**
 * Returns current store of legislation filters
 * @returns Array of passed legislation
 */
export const useLegislationFilters = () => {
    const [filters, setFilters] = useState<LegislationFilters>(DEFAULT_FILTERS);

    useEffect(() => {
        legislationFilters$.subscribe(val => {
            setFilters(val)
        })
        return () => legislationFilters$.unsubscribe();
    }, []);

    return filters;
}