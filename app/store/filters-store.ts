import { BehaviorSubject } from "rxjs";

export interface LegislationFilters {
    biennum: string;
}

export const DEFAULT_FILTERS: LegislationFilters = {
    biennum: '2023-24'
}

export const legislationFilters$ = new BehaviorSubject<LegislationFilters>(DEFAULT_FILTERS)

export const updateLegislationFilters = async (newFilters: Partial<LegislationFilters>) => {
    legislationFilters$.next({ ...legislationFilters$.getValue(), ...newFilters })
}