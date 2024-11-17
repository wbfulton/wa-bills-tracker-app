interface GeneratedType {
  "xmlns:xsd": string;
  "xmlns:xsi": string;
  xmlns: string;
}

export interface LegislativeDocumentResponseData {
  ArrayOfLegislativeDocument: {
    $: GeneratedType;
    LegislativeDocument: LegislativeDocumentRaw[];
  };
}

export interface LegislativeDocumentRaw {
  Name: string[];
  ShortFriendlyName: string[];
  Biennium: string[];
  LongFriendlyName: string[];
  Description: string[];
  Type: string[];
  Class: string[];
  HtmUrl: string[];
  HtmCreateDate: string[];
  HtmLastModifiedDate: string[];
  PdfUrl: string[];
  PdfCreateDate: string[];
  PdfLastModifiedDate: string[];
  BillId: string[];
}

export interface LegislativeDocument {
  name: string;
  shortFriendlyName: string;
  biennium: string;
  longFriendlyName: string;
  description: string;
  type: string;
  class: string;
  htmUrl: string;
  htmCreateDate: string;
  htmLastModifiedDate: string;
  pdfUrl: string;
  pdfCreateDate: string;
  pdfLastModifiedDate: string;
  billId: number;
}

export interface LegislativeFiscalDataResponse {
  data: LegislativeFiscalDataRaw[];
}

export interface LegislativeFiscalDataRaw {
  packageId: number;
  SessionYear: string;
  ProposedFlag: string;
  BillId: number;
  BillNumber: string;
  BillTitle: string;
  PublishedDate: string;
  BillType: string;
  RequestType: string;
  AmendmentName: string;
  EngrossedNotation: string;
  SustituteNotation: string;
  Qualifier: string;
  Origin: string;
}

export interface LegislativeFiscalData {
  packageId: number;
  sessionYear: string;
  proposedFlag: string;
  billId?: number;
  billNumber: string;
  billTitle: string;
  publishedDate: Date;
  billType: string;
  requestType: string;
  amendmentName: string;
  engrossedNotation: string;
  sustituteNotation: string;
  qualifier: string;
  origin: string;
  fiscalNotePDFUrl: string;
}

export interface LegislationInfoResponseData {
  ArrayOfLegislationInfo: {
    $: GeneratedType;
    LegislationInfo: LegislationInfoRaw[];
  };
}

export interface LegislationInfoRaw {
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
  DisplayNumber: string[];
}

export interface LegislationInfo {
  biennium: string;
  billId: string;
  billNumber: number;
  substituteVersion: number;
  engrossedVersion: number;
  shortLegislationType: string;
  longLegislationType: string;
  originalAgency: string;
  active: boolean;
  displayNumber: number;
}

export interface LegislationDetailResponseData {
  ArrayOfLegislation: {
    $: GeneratedType;
    Legislation: LegislationDetailRaw[];
  };
}

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

export interface CompanionLegislation {
  biennium: string;
  billId: string;
  status: string;
}

export interface RcwCiteAffectedResponse {
  ArrayOfRcwCiteAffected: {
    $: GeneratedType;
    RcwCiteAffected: RcwCiteAffectedRaw[];
  };
}

export interface RcwCiteAffectedRaw {
  RcwCite: string[];
  Action: string[];
}

export interface RcwCiteAffected {
  rcwCite: string;
  action: string;
}

export interface LegislationTopicSearch {
  topicTitle: string;
  legislation: Array<{
    legislationSummary: string;
    billIds: Array<string>;
  }>;
}
