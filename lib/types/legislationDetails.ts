import { Biennium, BillId, BillStatus } from "./legislation";

export interface LegislationDetailRaw {
  Biennium: string[];
  BillId: string[];
  BillNumber: string[];
  SubstituteVersion: string[];
  EngrossedVersion: string[];
  ShortLegislationType: Array<{
    ShortLegislationType: string[];
    LongLegislationType: string[];
  }>;
  OriginalAgency: string[];
  Active: string[];
  StateFiscalNote: string[];
  LocalFiscalNote: string[];
  Appropriations: string[];
  RequestedByGovernor: string[];
  RequestedByBudgetCommittee: string[];
  RequestedByDepartment: string[];
  RequestedByOther: string[];
  ShortDescription: string[];
  Request: string[];
  IntroducedDate: string[];
  CurrentStatus: Array<{
    BillId: string[];
    HistoryLine: string[];
    ActionDate: string[];
    AmendedByOppositeBody: string[];
    PartialVeto: string[];
    Veto: string[];
    AmendmentsExist: string[];
    Status: string[];
  }>;
  Sponsor: string[];
  PrimeSponsorID: string[];
  LongDescription: string[];
  LegalTitle: string[];
  Companions?: Array<{
    Companion: Array<{
      Biennium: string[];
      BillId: string[];
      Status: string[];
    }>;
  }>;
}

export interface LegislationDetail {
  biennium: string;
  billId: string;
  billNumber: number;
  substituteVersion: number;
  engrossedVersion: number;
  shortLegislationType: string;
  longLegislationType: string;
  originalAgency: string;
  active: boolean;
  stateFiscalNote: boolean;
  localFiscalNote: boolean;
  appropriations: boolean;
  requestedByGovernor: boolean;
  requestedByBudgetCommittee: boolean;
  requestedByDepartment: boolean;
  requestedByOther: boolean;
  shortDescription: string;
  request: string;
  introducedDate: Date;
  currentStatus: CurrentStatus;
  sponsor: string;
  primeSponsorID: number;
  longDescription: string;
  legalTitle: string;
  companionLeglislation?: CompanionLegislation;
}

export interface CurrentStatus {
  billId: string;
  historyLine: string;
  actionDate: Date;
  amendedByOppositeBody: boolean;
  partialVeto: boolean;
  veto: boolean;
  amendmentsExist: boolean;
  status: string;
}

/**
 * Companion bill: A bill introduced with the same language in both the House and the Senate
 */
export interface CompanionLegislation {
  /**
   * Two year time period beginning on odd years.  Legislation introduced during this time period can be considered in any sessions scheduled within the time period.  Information is only available from 1991-current.
   * @example "1991-92"
   */
  biennium: Biennium;
  /**
   * Prefix and bill number of a piece of legislation.  When paired with the biennium, it is a unique * reference to legislation.  This field is commonly used for display purposes on legislative reports.
   * @example "HB 1001", "2SHB 1000"
   */
  billId: BillId;
  /**
   * Abbreviated description of the status of a piece of legislation in the legislative process
   * @example "H3rd Reading", "SRules G"
   */
  status: BillStatus;
}
