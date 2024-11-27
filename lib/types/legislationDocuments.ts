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

export interface LegislativeFiscalDocumentRaw {
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

export interface LegislativeFiscalDocument {
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

export interface RcwCiteAffectedRaw {
  RcwCite: string[];
  Action: string[];
}

export interface RcwCiteAffected {
  rcwCite: string;
  action: string;
}
