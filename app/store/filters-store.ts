import { BehaviorSubject } from "rxjs";

export interface LegislationFilters {
    biennium: string;
}

export const DEFAULT_FILTERS: LegislationFilters = {
    biennium: '2023-24'
}

export const legislationFilters$ = new BehaviorSubject<LegislationFilters>(DEFAULT_FILTERS)

export const updateLegislationFilters = async (newFilters: Partial<LegislationFilters>) => {
    legislationFilters$.next({ ...legislationFilters$.getValue(), ...newFilters })
}