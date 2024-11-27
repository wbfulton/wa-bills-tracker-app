import {
  LegislationDetailRaw,
  LegislationInfoRaw,
  LegislativeDocumentRaw,
  LegislativeFiscalDocumentRaw,
  RcwCiteAffectedRaw,
} from "../../lib/types/index";

interface GeneratedType {
  "xmlns:xsd": string;
  "xmlns:xsi": string;
  xmlns: string;
}

/** DOCUMENTS */

export interface LegislativeDocumentResponseData {
  ArrayOfLegislativeDocument: {
    $: GeneratedType;
    LegislativeDocument: LegislativeDocumentRaw[];
  };
}

export interface LegislativeFiscalDataResponse {
  data: LegislativeFiscalDocumentRaw[];
}

/** DETAILS */

export interface LegislationDetailResponseData {
  ArrayOfLegislation: {
    $: GeneratedType;
    Legislation: LegislationDetailRaw[];
  };
}

export interface RcwCiteAffectedResponse {
  ArrayOfRcwCiteAffected: {
    $: GeneratedType;
    RcwCiteAffected: RcwCiteAffectedRaw[];
  };
}

/** LEGISLATION */

export interface LegislationInfoResponseData {
  ArrayOfLegislationInfo: {
    $: GeneratedType;
    LegislationInfo: LegislationInfoRaw[];
  };
}
