import { Biennium } from "app/types/legislation";
import { BehaviorSubject } from "rxjs";

export interface LegislationFilters {
    biennium?: Biennium;
}

export const DEFAULT_FILTERS: LegislationFilters = {}

export const legislationFilters$ = new BehaviorSubject<LegislationFilters>(DEFAULT_FILTERS)

export const updateLegislationFilters = async (newFilters: Partial<LegislationFilters>) => {
    legislationFilters$.next({ ...legislationFilters$.getValue(), ...newFilters })
}