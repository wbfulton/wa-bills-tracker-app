import { LegislativeDocument } from 'app/api/types/legislationDocuments';
import { LegislativeFiscalData } from 'express/src/types';

/**
 * Prefix and bill number of a piece of legislation.  When paired with the biennium, it is a unique * reference to legislation.  This field is commonly used for display purposes on legislative reports.
 * @example "HB 1001", "2SHB 1000"
 */
export type BillId = string;

/**
 * Abbreviated description of the status of a piece of legislation in the legislative process
 * @example "H3rd Reading", "SRules G"
 */
export type BillStatus = string;

/**
 * Two year time period beginning on odd years.  Legislation introduced during this time period can be considered in any sessions scheduled within the time period.  Information is only available from 1991-current.
 * @example "1991-92"
 */
export enum Biennium {
  '2023-24' = '2023-24',
  '2021-22' = '2021-22',
  '2019-20' = '2019-20',
  '2017-18' = '2017-18',
  '2015-16' = '2015-16',
  '2013-14' = '2013-14',
  '2011-12' = '2011-12',
  '2009-10' = '2009-10',
  '2007-08' = '2007-08',
  '2005-06' = '2005-06',
  '2003-04' = '2003-04',
  '2001-02' = '2001-02',
  '1999-00' = '1999-00',
  '1997-98' = '1997-98',
  '1995-96' = '1995-96',
  '1993-94' = '1993-94',
  '1991-92' = '1991-92'
}

/**
 * Two year time period beginning on odd years.  Legislation introduced during this time period can be considered in any sessions scheduled within the time period.  Information is only available from 1991-current.
 * @example "1991-92"
 */
export enum BienniumToLegislativeYear {
  '2023-24' = '68',
  '2021-22' = '67',
  '2019-20' = '66',
  '2017-18' = '65',
  '2015-16' = '64',
  '2013-14' = '63',
  '2011-12' = '62',
  '2009-10' = '61',
  '2007-08' = '60',
  '2005-06' = '59',
  '2003-04' = '58',
  '2001-02' = '57',
  '1999-00' = '56',
  '1997-98' = '55',
  '1995-96' = '54',
  '1993-94' = '53',
  '1991-92' = '52'
}

/**
 * e.g. CR
 * Abbreviated designation of the type of legislation.
 * @example "CR"

 */
export enum ShortLegislationType {
  B = 'B',
  JM = 'JM',
  JR = 'JR',
  I = 'I',
  CR = 'CR',
  R = 'R',
  GA = 'GA'
}

/**
 * e.g. Concurrent Resolution
 * Descriptive designation of the type of legislation.
 * @example "Concurrent Resolution"
 */
export enum LongLegislationType {
  Bill = 'Bill',
  JointMemorial = 'Joint Memorial',
  JointResolution = 'Joint Resolution',
  ConcurrentResolution = 'Concurrent Resolution',
  GubernatorialAppointment = 'Gubernatorial Appointment',
  Resolution = 'Resolution',
  Initiative = 'Initiative'
}

/**
 * Legislative body was originally introduced.
 * @example "House"
 */
export enum Agency {
  House = 'House',
  Senate = 'Senate'
}

/** Current status of legislation */
export interface LegislationCurrentStatus {
  billId: BillId;
  /** One line describing the action taken on the legislation. */
  historyLine: string;
  /** Date that action was taken on the legislation. */
  actionDate: Date;
  /** True if the chamber that did not introduce the bill passed amendments to the bill */
  amendedByOppositeBody: boolean;
  /** True if the governor has partially vetoed the bill */
  partialVeto: boolean;
  /** True if the governor has vetoed the legislation */
  veto: boolean;
  /** True if the legislation has amendments */
  amendmentsExist: boolean;
  /**
   * Abbreviated description of the status of a piece of legislation in the legislative process
   * @example "H3rd Reading", "SRules G"
   */
  status: BillStatus;
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

/**
 * Detailed legislation. "https://wslwebservices.leg.wa.gov/WebServiceDataDictionary.doc"
 */
export interface Legislation {
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
   * 3 or 4 digit number assigned to a piece of legislation
   * @example 1001
   */
  billNumber: number;
  /**
   * Substitute version of the legislation.  Standing committees in the originating body can recommend substitutes to a piece of legislation.  When the bill is considered on the floor, the legislative body will decide what version (original or a specific substitute version) they will vote on.  There is no limit on the substitute version although it is rare to go above 4.
   * @example 1
   */
  substituteVersion: number;
  /**
   * The engrossed version of the bill number.  Each time the bill is amended on the floor by the body it originated in, its engrossed version is incremented by one.
   * @example 1
   */
  engrossedVersion: number;
  shortLegislationType: ShortLegislationType;
  longLegislationType: LongLegislationType;
  /**
   * Legislative body that the legislation was originally introduced.
   * @example "House"
   */
  originalAgency: Agency;
  /**
   * Unsure. Might be if passed
   */
  active: boolean;
  /**
   * True if legislation has one or more state fiscal notes
   * A fiscal note is a written estimate of the financial impact of a bill or resolution
   */
  stateFiscalNote: boolean;
  /**
   * True if legislation has one or more local fiscal notes
   * A fiscal note is a written estimate of the financial impact of a bill or resolution
   */
  localFiscalNote: boolean;
  /**
   * True if the bill has appropriations
   * Appropriation: A law of Congress that provides an agency with budget authority.
   */
  appropriations: boolean;
  /**
   * True if the legislation is introduced by request of the Governor
   */
  requestedByGovernor: boolean;
  /**
   * True if the legislation is introduced by request of a budget committee
   */
  requestedByBudgetCommittee: boolean;
  /**
   * True if the legislation is introduced by request of a department
   */
  requestedByDepartment: boolean;
  /**
   * True if the legislation is introduced by request of others
   */
  requestedByOther: boolean;
  /**
   * Brief description of the legislation.  This is commonly used on legislative reports to briefly describe the topic of the legislation.
   * @example "Salmon recovery"
   */
  shortDescription: string;
  /**
     * Request number and version created by the staff in the Code Reviser’s Office.  This request is assigned a bill number when it is dropped in the hopper.
     * 
     * The Code Reviser's Office periodically codifies, indexes, and publishes the Revised Code of Washington and to revises, corrects, and harmonizes the statutes by means of administrative or suggested legislative action as may be appropriate.
     * 
     * The Code Reviser's Office is also the official bill drafting arm of the legislature and provides a central bill drafting service for legislators, legislators-elect, legislative committees, joint committees, the governor, state elected officials, and agencies. Others, including lobbyists and private citizens must first obtain authorization from a legislator to use his or her name. Written authorization is preferred, but oral direction is agreeable.

     * @example H-1000.1, S-1002.3, Z-2222.1
     */
  request: string;
  /**
   * Date that the bill was read first time on the floor of the originating body.
   */
  introducedDate: Date;
  currentStatus?: LegislationCurrentStatus;
  /**
   * Common display string of sponsor name.  If the bill is a committee, the string will contain the committee acronym followed by the primary sponsor of the original bill in parens.
   * @example "Smith", "CB(Smith)"
   */
  sponsor: string;
  /** Unique identifier for the primary sponsor of the legislation. */
  primeSponsorID: number;
  /**
   * Summary of legislation written by staff in the Code Reviser’s Office.   Can also be referred to as the Brief Description.
   */
  longDescription: string;
  /**
   * Summary of legislation or jingle
   * @example "An act relating to salmon recovery"
   */
  legalTitle: string;
  /**
   * Companion bill: A bill introduced with the same language in both the House and the Senate
   */
  companion?: CompanionLegislation;
  /**
   * Array of relevant documents based on biennium and text query from bill number
   */
  documents?: Array<LegislativeDocument>;
  /**
   * Array of relevant fiscal notes
   */
  fiscalNotes?: Array<LegislativeFiscalData>;
}
