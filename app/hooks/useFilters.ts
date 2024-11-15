import { DEFAULT_FILTERS, LegislationFilters } from 'app/store/filters-store';
import { legislationFilters$ } from 'app/store/filters-store';
import { useState, useEffect } from 'react';

/**
 * Returns current store of legislation filters
 * @returns Array of passed legislation
 */
export const useLegislationFilters = () => {
  const [filters, setFilters] = useState<LegislationFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    const sub = legislationFilters$.subscribe((val) => {
      setFilters(val);
    });
    return () => sub.unsubscribe();
  }, []);

  return filters;
};
