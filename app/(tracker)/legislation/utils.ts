import { RankingInfo, compareItems } from "@tanstack/match-sorter-utils";
import { Row, sortingFns } from "@tanstack/react-table";

export function fuzzySort<T>(rowA: Row<T>, rowB: Row<T>, columnId: string) {
  let dir = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowARank: RankingInfo = (rowA.columnFiltersMeta[columnId] as any)
    ?.itemRank;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowBRank: RankingInfo = (rowB.columnFiltersMeta[columnId] as any)
    ?.itemRank;

  // Only sort by rank if the column has ranking information
  if (!!rowARank && !!rowBRank) {
    dir = compareItems(rowARank, rowBRank);
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
}

export interface LegTopic {
  value: string;
  label: string;
}

export const topics: Array<LegTopic> = [
  { value: "15726", label: "911" },
  { value: "16007", label: "988" },
  { value: "15655", label: "ABORTION" },
  { value: "16054", label: "ACCOUNTANCY, BOARD" },
  { value: "16052", label: "ACCOUNTANTS AND ACCOUNTING" },
  { value: "15496", label: "ACTIONS AND PROCEEDINGS" },
  { value: "16013", label: "ADDRESS CONFIDENTIALITY PROGRAM" },
  { value: "15610", label: "ADMINISTRATIVE OFFICE OF THE COURTS" },
  { value: "15557", label: "ADMINISTRATIVE PROCEDURE" },
  {
    value: "16097",
    label: "ADULT ENTERTAINMENT ESTABLISHMENTS AND ENTERTAINERS",
  },
  { value: "16095", label: "ADULT FAMILY HOMES" },
  { value: "15821", label: "ADVERTISING" },
  { value: "15667", label: "AERONAUTICS" },
  { value: "15669", label: "AEROSPACE" },
  { value: "15566", label: "AFFORDABLE HOUSING" },
  { value: "15865", label: "AFRICAN AMERICANS" },
  { value: "15595", label: "AGRICULTURE" },
  { value: "15594", label: "AGRICULTURE, DEPARTMENT" },
  { value: "15950", label: "AIR POLLUTION CONTROL AUTHORITIES" },
  { value: "15658", label: "AIR QUALITY AND POLLUTION" },
  { value: "15889", label: "AIRPLANES AND AIRCRAFT" },
  { value: "15888", label: "AIRPORTS" },
  { value: "15488", label: "ALCOHOLIC BEVERAGES" },
  { value: "16018", label: "AMBULANCES" },
  {
    value: "15985",
    label: "ANDY HILL CANCER RESEARCH ENDOWMENT (CARE) FUND",
  },
  { value: "15653", label: "ANIMALS" },
  { value: "15688", label: "APARTMENT OWNER ASSOCIATIONS" },
  { value: "15790", label: "APPEALS, COURT OF" },
  { value: "16140", label: "APPLIANCES" },
  { value: "15997", label: "APPLIED BEHAVIOR ANALYSIS" },
  { value: "15545", label: "APPRENTICES AND APPRENTICESHIP PROGRAMS" },
  {
    value: "16108",
    label: "APPRENTICESHIP AND TRAINING COUNCIL, WASHINGTON STATE",
  },
  { value: "15804", label: "AQUATIC LANDS" },
  {
    value: "16131",
    label: "ARCHAEOLOGY AND HISTORIC PRESERVATION, DEPARTMENT",
  },
  { value: "16039", label: "ARCHITECTS" },
  { value: "15679", label: "ARENAS" },
  { value: "15955", label: "ART AND ARTWORKS" },
  { value: "16066", label: "ARTIFICIAL INTELLIGENCE (AI)" },
  { value: "15958", label: "ARTS COMMISSION" },
  { value: "15915", label: "ASIAN AMERICANS" },
  {
    value: "15992",
    label: "ASIAN PACIFIC AMERICAN AFFAIRS, STATE COMMISSION",
  },
  { value: "15988", label: "ASIAN PACIFIC AMERICANS" },
  { value: "16139", label: "ASSAULT" },
  { value: "15620", label: "ATTORNEY GENERAL" },
  { value: "15624", label: "ATTORNEYS" },
  { value: "15784", label: "AUDITOR, STATE" },
  { value: "15604", label: "AUDITORS AND AUDITING" },
  { value: "15999", label: "AUTISM" },
  { value: "16078", label: "AUTONOMOUS VEHICLES" },
  { value: "15668", label: "AVIATION" },
  { value: "15823", label: "BACKGROUND CHECKS" },
  { value: "15716", label: "BAIL AND BAIL BONDS" },
  { value: "16040", label: "BANKS AND BANKING" },
  { value: "15586", label: "BARBERS" },
  { value: "15788", label: "BATTERIES" },
  { value: "15506", label: "BEHAVIORAL HEALTH" },
  { value: "15789", label: "BEVERAGES AND BEVERAGE CONTAINERS" },
  { value: "15868", label: "BICYCLES" },
  { value: "16128", label: "BIRDS" },
  { value: "15676", label: "BLIND" },
  { value: "16087", label: "BLIND, DEPARTMENT OF SERVICES FOR THE" },
  { value: "15993", label: "BLIND, STATE SCHOOL FOR THE" },
  { value: "16085", label: "BOARDS AND COMMISSIONS" },
  { value: "15776", label: "BOATS AND BOATING" },
  { value: "15750", label: "BONDS" },
  { value: "15851", label: "BOUNDARIES" },
  { value: "16134", label: "BOUNDARY REVIEW BOARDS" },
  { value: "15455", label: "BRIDGES" },
  { value: "16082", label: "BRITISH COLUMBIA" },
  { value: "16071", label: "BROADBAND" },
  { value: "15986", label: "BROADBAND OFFICE, GOVERNOR&#x27;S STATEWIDE" },
  { value: "16117", label: "BUDGET STABILIZATION ACCOUNT" },
  { value: "15708", label: "BUDGETS" },
  { value: "15614", label: "BUILDING CODE COUNCIL" },
  { value: "15615", label: "BUILDING CODES AND PERMITS" },
  { value: "15684", label: "BUILDINGS, COMMERCIAL" },
  { value: "15683", label: "BUILDINGS, STATE" },
  { value: "15553", label: "BUSINESS AND OCCUPATION TAX" },
  { value: "15493", label: "BUSINESS CORPORATIONS" },
  { value: "15494", label: "BUSINESS ORGANIZATIONS" },
  { value: "15466", label: "BUSINESSES" },
  { value: "16145", label: "CAMERAS" },
  { value: "15818", label: "CAMPAIGN DISCLOSURE AND CONTRIBUTION" },
  { value: "15760", label: "CANCER" },
  { value: "15709", label: "CANNABIS" },
  { value: "16121", label: "CAPITAL GAINS TAX" },
  { value: "15824", label: "CAPITOL CAMPUS, STATE" },
  { value: "15951", label: "CAREER AND TECHNICAL EDUCATION" },
  { value: "15714", label: "CASELOAD FORECAST COUNCIL" },
  { value: "16034", label: "CATALYTIC CONVERTERS" },
  { value: "15920", label: "CATS" },
  { value: "15665", label: "CEMETERIES AND CEMETERY DISTRICTS" },
  { value: "15841", label: "CENTRAL WASHINGTON UNIVERSITY" },
  { value: "16053", label: "CERTIFIED PUBLIC ACCOUNTANTS" },
  { value: "15780", label: "CHARITABLE ORGANIZATIONS" },
  { value: "15984", label: "CHARTER SCHOOL COMMISSION" },
  { value: "15706", label: "CHARTER SCHOOLS" },
  { value: "16051", label: "CHECK CASHERS AND SELLERS" },
  { value: "15874", label: "CHIEF INFORMATION OFFICER, OFFICE OF THE STATE" },
  { value: "15829", label: "CHILD CARE" },
  { value: "16075", label: "CHILD CUSTODY" },
  { value: "15964", label: "CHILD PROTECTIVE SERVICES" },
  { value: "15837", label: "CHILD SUPPORT" },
  { value: "15769", label: "CHILD WELFARE SERVICES" },
  { value: "15509", label: "CHILDREN" },
  { value: "15627", label: "CHILDREN, YOUTH, AND FAMILIES, DEPARTMENT" },
  { value: "15795", label: "CIRCUSES AND CARNIVALS" },
  { value: "15457", label: "CITIES AND TOWNS" },
  {
    value: "15970",
    label: "CITIZENS&#x27; COMMISSION ON SALARIES FOR ELECTED OFFICIALS",
  },
  { value: "16046", label: "CITIZENSHIP" },
  { value: "15497", label: "CIVIL ACTIONS AND PROCEDURE" },
  { value: "16003", label: "CIVIL LEGAL AID, OFFICE" },
  { value: "16022", label: "CIVIL PROTECTION ORDERS" },
  { value: "15870", label: "CIVIL SERVICE" },
  { value: "15800", label: "CLEMENCY AND PARDONS BOARD" },
  { value: "15657", label: "CLERGY" },
  { value: "15746", label: "CLIMATE" },
  { value: "15961", label: "COLLECTION AGENCIES AND DEBT COLLECTION" },
  { value: "15742", label: "COLLECTIVE BARGAINING" },
  { value: "15441", label: "COLLEGES AND UNIVERSITIES" },
  { value: "15991", label: "COLUMBIA RIVER" },
  { value: "15529", label: "COMMERCE, DEPARTMENT" },
  { value: "15695", label: "COMMERCIAL BUILDINGS" },
  { value: "15752", label: "COMMERCIAL VESSELS AND SHIPPING" },
  { value: "15641", label: "COMMISSIONER OF PUBLIC LANDS" },
  { value: "16086", label: "COMMISSIONS AND BOARDS" },
  { value: "15779", label: "COMMODITY BOARDS AND COMMISSIONS" },
  { value: "15685", label: "COMMON INTEREST COMMUNITIES" },
  { value: "15442", label: "COMMUNITY AND TECHNICAL COLLEGES" },
  {
    value: "15946",
    label: "COMMUNITY AND TECHNICAL COLLEGES, STATE BOARD FOR",
  },
  { value: "15833", label: "COMMUNITY ECONOMIC REVITALIZATION BOARD" },
  {
    value: "15936",
    label: "COMMUNITY PRESERVATION AND DEVELOPMENT AUTHORITIES",
  },
  { value: "15648", label: "COMPOST AND COMPOSTING" },
  { value: "15697", label: "COMPUTERS" },
  { value: "15475", label: "CONCURRENT RESOLUTIONS" },
  { value: "15686", label: "CONDOMINIUMS" },
  { value: "15727", label: "CONSERVATION" },
  { value: "15814", label: "CONSERVATION COMMISSION" },
  { value: "16010", label: "CONSERVATION DISTRICTS" },
  { value: "16058", label: "CONSERVATORSHIP" },
  { value: "15864", label: "CONSOLIDATED TECHNOLOGY SERVICES AGENCY" },
  { value: "15516", label: "CONSTITUTION, STATE" },
  { value: "15853", label: "CONSTITUTION, U.S." },
  { value: "15766", label: "CONSTRUCTION" },
  { value: "15698", label: "CONSUMER PROTECTION" },
  {
    value: "16074",
    label: "CONSUMER REPORTING AND CONSUMER REPORTING AGENCIES",
  },
  { value: "15712", label: "CONTRACEPTION" },
  { value: "15703", label: "CONTRACTORS" },
  { value: "15924", label: "CONTRACTS" },
  { value: "15798", label: "COOPERATIVE ASSOCIATIONS" },
  { value: "16096", label: "CORONERS AND MEDICAL EXAMINERS" },
  { value: "15495", label: "CORPORATIONS" },
  { value: "15617", label: "CORRECTIONAL FACILITIES AND JAILS" },
  { value: "15954", label: "CORRECTIONS OFFICERS" },
  { value: "16107", label: "CORRECTIONS OMBUDS, OFFICE" },
  { value: "15580", label: "CORRECTIONS, DEPARTMENT" },
  { value: "15745", label: "COSMETICS" },
  {
    value: "15585",
    label:
      "COSMETOLOGISTS, HAIR DESIGNERS, BARBERS, MANICURISTS, AND ESTHETICIANS",
  },
  { value: "15607", label: "COUNSELORS AND COUNSELING" },
  { value: "15458", label: "COUNTIES" },
  { value: "15974", label: "COUNTY AUDITORS" },
  { value: "15480", label: "COURTS" },
  { value: "15558", label: "COVID-19" },
  { value: "15774", label: "COVID-19 AND CORONAVIRUS" },
  { value: "15962", label: "CREDIT AND DEBIT CARDS" },
  { value: "16073", label: "CREDIT HISTORY AND CREDIT REPORTING" },
  { value: "15878", label: "CREDIT SERVICES ORGANIZATIONS" },
  { value: "15773", label: "CRIME VICTIMS ADVOCACY, OFFICE" },
  { value: "15626", label: "CRIME VICTIMS&#x27; COMPENSATION PROGRAM" },
  { value: "15443", label: "CRIMES" },
  { value: "15621", label: "CRIMINAL JUSTICE TRAINING COMMISSION" },
  { value: "15512", label: "CRIMINAL OFFENDERS" },
  { value: "15513", label: "CRIMINAL PROCEDURE" },
  { value: "16153", label: "CROPS" },
  { value: "15733", label: "CRYPTOCURRENCY" },
  { value: "15732", label: "CURRENCY" },
  { value: "15931", label: "DAIRY FARMS AND DAIRY PRODUCTS" },
  { value: "15675", label: "DEAF" },
  {
    value: "16008",
    label: "DEAF AND HARD OF HEARING YOUTH, WASHINGTON CENTER FOR",
  },
  { value: "16123", label: "DEAF AND HARD OF HEARING, OFFICE OF THE" },
  { value: "15654", label: "DEATH" },
  { value: "15927", label: "DENTAL HYGIENISTS" },
  { value: "16093", label: "DENTAL QUALITY ASSURANCE COMMISSION" },
  { value: "15967", label: "DENTAL THERAPISTS" },
  { value: "15767", label: "DENTISTS AND DENTISTRY" },
  { value: "15609", label: "DEVELOPMENTAL DISABILITIES, INDIVIDUALS WITH" },
  { value: "15600", label: "DINOSAURS" },
  { value: "15611", label: "DISABILITIES, PERSONS WITH" },
  { value: "15786", label: "DISCRIMINATION" },
  { value: "15791", label: "DISTRICT COURTS" },
  { value: "15905", label: "DOCUMENT RECORDING" },
  { value: "15919", label: "DOGS" },
  { value: "15510", label: "DOMESTIC RELATIONS" },
  { value: "15605", label: "DOMESTIC VIOLENCE" },
  { value: "16138", label: "DRIVER TRAINING SCHOOLS" },
  { value: "15491", label: "DRIVERS AND DRIVERS&#x27; LICENSES" },
  { value: "15490", label: "DRIVING UNDER THE INFLUENCE" },
  { value: "16072", label: "DRUG COURTS" },
  { value: "15470", label: "DRUGS" },
  {
    value: "15937",
    label: "EARLY CHILDHOOD EDUCATION AND ASSISTANCE PROGRAM",
  },
  { value: "15938", label: "EARLY LEARNING" },
  { value: "15498", label: "EASEMENTS" },
  { value: "15842", label: "EASTERN WASHINGTON UNIVERSITY" },
  { value: "15649", label: "ECOLOGY, DEPARTMENT" },
  { value: "16015", label: "ECONOMIC AND REVENUE FORECAST COUNCIL" },
  { value: "15831", label: "ECONOMIC DEVELOPMENT" },
  { value: "15916", label: "EDUCATION DATA CENTER" },
  { value: "16024", label: "EDUCATION OMBUDS, OFFICE" },
  { value: "15877", label: "EDUCATION, STATE BOARD OF" },
  { value: "15546", label: "EDUCATIONAL SERVICE DISTRICTS" },
  { value: "16019", label: "ELECTED AND APPOINTED OFFICIALS" },
  { value: "15634", label: "ELECTIONS" },
  { value: "15872", label: "ELECTRICIANS AND ELECTRICAL INSTALLATIONS" },
  { value: "16149", label: "ELECTRICITY" },
  { value: "15876", label: "ELECTRONIC PRODUCTS" },
  { value: "16012", label: "EMERGENCIES" },
  { value: "15542", label: "EMERGENCY MANAGEMENT AND SERVICES" },
  { value: "15785", label: "EMERGENCY MEDICAL SERVICES" },
  { value: "15559", label: "EMERGENCY, STATE OF" },
  { value: "15531", label: "EMPLOYMENT AND EMPLOYEES" },
  { value: "15528", label: "EMPLOYMENT SECURITY DEPARTMENT" },
  { value: "15592", label: "ENERGY" },
  { value: "15796", label: "ENERGY FACILITY SITE EVALUATION COUNCIL" },
  { value: "15909", label: "ENTERPRISE SERVICES, DEPARTMENT" },
  { value: "15866", label: "ENVIRONMENT" },
  { value: "16100", label: "ENVIRONMENTAL AND LAND USE HEARINGS OFFICE" },
  { value: "15647", label: "ENVIRONMENTAL HEALTH AND SAFETY" },
  { value: "16104", label: "ENVIRONMENTAL JUSTICE" },
  { value: "16105", label: "ENVIRONMENTAL JUSTICE COUNCIL" },
  { value: "15947", label: "EQUITY, WASHINGTON STATE OFFICE OF" },
  { value: "16122", label: "EROTIC MATERIAL" },
  { value: "15757", label: "ESTATE TAX" },
  { value: "15499", label: "ESTATES" },
  { value: "15500", label: "ESTATES, TRUSTS, AND PROBATE" },
  { value: "15589", label: "ESTHETICIANS" },
  { value: "15782", label: "ETHICS IN GOVERNMENT" },
  { value: "15844", label: "EVERGREEN STATE COLLEGE, THE" },
  { value: "15808", label: "EVICTION" },
  { value: "15718", label: "EVIDENCE" },
  { value: "15672", label: "EXAMINING BOARD OF PSYCHOLOGY" },
  { value: "15556", label: "EXCISE TAXES" },
  { value: "15912", label: "EXPLOSIVES" },
  { value: "16001", label: "EXPORTS" },
  { value: "16143", label: "FAIRS" },
  { value: "15755", label: "FAMILY AND MEDICAL LEAVE, PAID" },
  { value: "15596", label: "FARMS AND FARMING" },
  { value: "16103", label: "FASHION INDUSTRY" },
  { value: "15940", label: "FENTANYL" },
  { value: "15751", label: "FERRIES" },
  { value: "15989", label: "FILIPINO AMERICANS" },
  { value: "15925", label: "FINANCIAL INSTITUTIONS" },
  { value: "15907", label: "FINANCIAL INSTITUTIONS, DEPARTMENT" },
  { value: "15725", label: "FINANCIAL MANAGEMENT, OFFICE" },
  { value: "15583", label: "FIRE PROTECTION" },
  { value: "15582", label: "FIRE PROTECTION DISTRICTS" },
  { value: "15503", label: "FIREARMS" },
  { value: "15473", label: "FIREFIGHTERS" },
  { value: "15953", label: "FIRST RESPONDERS" },
  { value: "15835", label: "FISCAL NOTES" },
  { value: "15741", label: "FISH" },
  { value: "15968", label: "FISH AND WILDLIFE COMMISSION" },
  { value: "15464", label: "FISH AND WILDLIFE, DEPARTMENT" },
  { value: "15535", label: "FISHING" },
  { value: "16069", label: "FITNESS CENTERS" },
  { value: "15793", label: "FLOODS AND FLOOD CONTROL" },
  { value: "16035", label: "FLOOR RESOLUTIONS" },
  { value: "15536", label: "FOOD AND FOOD PRODUCTS" },
  { value: "15933", label: "FOOD ASSISTANCE" },
  { value: "15932", label: "FOOD BANKS" },
  { value: "16016", label: "FOREIGN GOVERNMENTS" },
  { value: "15591", label: "FOREST PRACTICES AND PRODUCTS" },
  { value: "16005", label: "FORESTLANDS" },
  { value: "15599", label: "FOSSILS" },
  { value: "15704", label: "FOSTER CARE" },
  { value: "15590", label: "FUELS" },
  { value: "16041", label: "FUNERALS AND BURIAL" },
  { value: "15650", label: "FUR FARMING AND FUR PRODUCTS" },
  { value: "15923", label: "GAMBLING" },
  { value: "15948", label: "GAMBLING COMMISSION" },
  { value: "15806", label: "GAS STATIONS" },
  { value: "16144", label: "GENDER" },
  { value: "16020", label: "GENDER AND JUSTICE COMMISSION" },
  { value: "16077", label: "GENDER EXPRESSION" },
  { value: "15603", label: "GENDER IDENTITY" },
  { value: "16111", label: "GEOLOGY AND GEOLOGISTS" },
  { value: "15982", label: "GIFT CERTIFICATES AND CARDS" },
  { value: "15476", label: "GOVERNOR" },
  {
    value: "16135",
    label:
      "GOVERNOR&#x27;S INTERAGENCY COORDINATING COUNCIL ON HEALTH DISPARITIES",
  },
  { value: "15569", label: "GROWTH MANAGEMENT" },
  { value: "15894", label: "GROWTH MANAGEMENT HEARINGS BOARD" },
  { value: "15768", label: "GUARDIANSHIP" },
  { value: "15517", label: "GUBERNATORIAL APPOINTMENTS" },
  {
    value: "16084",
    label: "GUBERNATORIAL APPOINTMENTS TO OFFICES OR POSITIONS",
  },
  { value: "15587", label: "HAIR DESIGNERS" },
  { value: "15444", label: "HARASSMENT" },
  { value: "15689", label: "HAZARDOUS MATERIALS" },
  { value: "15858", label: "HAZARDOUS SUBSTANCES TAX" },
  { value: "15787", label: "HAZARDOUS WASTE" },
  { value: "15451", label: "HEALTH AND SAFETY, PUBLIC" },
  { value: "15772", label: "HEALTH BENEFIT EXCHANGE" },
  { value: "15560", label: "HEALTH CARE" },
  { value: "15518", label: "HEALTH CARE AUTHORITY" },
  { value: "15707", label: "HEALTH CARE BENEFIT MANAGERS" },
  { value: "15636", label: "HEALTH CARE FACILITIES" },
  { value: "16088", label: "HEALTH CARE FACILITIES AUTHORITY" },
  { value: "15439", label: "HEALTH CARE PROFESSIONS AND PROVIDERS" },
  { value: "15840", label: "HEALTH CARE WORKERS" },
  { value: "15996", label: "HEALTH CORPS, WASHINGTON" },
  { value: "15929", label: "HEALTH DEPARTMENTS, LOCAL" },
  { value: "15527", label: "HEALTH, DEPARTMENT" },
  { value: "15533", label: "HEALTH, STATE BOARD OF" },
  { value: "15737", label: "HIGH HAZARD FACILITIES" },
  { value: "16089", label: "HIGHER EDUCATION FACILITIES AUTHORITY" },
  { value: "15956", label: "HISTORICAL SOCIETIES" },
  { value: "15483", label: "HOLIDAYS AND OBSERVANCES" },
  { value: "15575", label: "HOME-BASED INSTRUCTION" },
  { value: "15564", label: "HOMELESS PERSONS" },
  { value: "15687", label: "HOMEOWNERS&#x27; ASSOCIATIONS" },
  { value: "15565", label: "HOMES AND HOUSING" },
  { value: "15943", label: "HORSE RACING" },
  { value: "15944", label: "HORSE RACING COMMISSION" },
  { value: "15942", label: "HORSES" },
  { value: "15749", label: "HOSPITALITY INDUSTRY" },
  { value: "15635", label: "HOSPITALS" },
  { value: "16031", label: "HOTELS" },
  { value: "15736", label: "HOURS" },
  { value: "15479", label: "HOUSE RESOLUTIONS" },
  { value: "15567", label: "HOUSING AND HOMES" },
  { value: "16047", label: "HOUSING AUTHORITIES" },
  { value: "15815", label: "HOUSING FINANCE COMMISSION" },
  { value: "16113", label: "HULK HAULERS AND SCRAP PROCESSORS" },
  { value: "15664", label: "HUMAN REMAINS" },
  { value: "15801", label: "HUMAN RIGHTS COMMISSION" },
  { value: "15913", label: "HUNTING" },
  { value: "15645", label: "IDENTICARDS" },
  { value: "15633", label: "IDENTIFICATION" },
  {
    value: "15602",
    label: "IMMIGRATION, IMMIGRANTS, AND IMMIGRATION STATUS",
  },
  { value: "15630", label: "IMMUNIZATION" },
  { value: "15856", label: "IMPACT FEES" },
  { value: "15694", label: "INCARCERATED INDIVIDUALS" },
  { value: "16142", label: "INCOME TAX" },
  { value: "16062", label: "INDEPENDENT INVESTIGATIONS, OFFICE" },
  { value: "15884", label: "INDETERMINATE SENTENCE REVIEW BOARD" },
  { value: "15544", label: "INDIANS" },
  { value: "15662", label: "INDIGENT PERSONS" },
  { value: "15729", label: "INDUSTRIAL INSURANCE" },
  { value: "15753", label: "INITIATIVE AND REFERENDUM" },
  { value: "16141", label: "INITIATIVES" },
  { value: "15892", label: "INSTITUTIONAL REVIEW BOARD, WASHINGTON STATE" },
  { value: "15539", label: "INSURANCE" },
  { value: "15581", label: "INSURANCE COMMISSIONER" },
  { value: "15759", label: "INTELLECTUAL DISABILITIES, INDIVIDUALS WITH" },
  { value: "16081", label: "INTERNATIONAL RELATIONS" },
  { value: "16080", label: "INTERNATIONAL RELATIONS AND PROTOCOL, OFFICE" },
  { value: "15696", label: "INTERNET" },
  { value: "15677", label: "INTERPRETERS" },
  { value: "15744", label: "INVESTMENT BOARD, STATE" },
  { value: "15886", label: "IRRIGATION DISTRICTS" },
  { value: "15713", label: "JOINT MEMORIALS" },
  { value: "15515", label: "JOINT RESOLUTIONS" },
  { value: "15481", label: "JUDGES" },
  { value: "15692", label: "JUDGMENTS" },
  { value: "15770", label: "JURORS AND JURIES" },
  { value: "16011", label: "JUVENILE COURT AND JUVENILE OFFENDERS" },
  { value: "15570", label: "JUVENILES AND JUVENILE COURT" },
  { value: "15530", label: "LABOR" },
  { value: "15625", label: "LABOR AND INDUSTRIES, DEPARTMENT" },
  { value: "15904", label: "LAKES AND RESERVOIRS" },
  { value: "15832", label: "LAND USE PLANNING AND DEVELOPMENT" },
  { value: "15693", label: "LANDLORD AND TENANT" },
  { value: "15472", label: "LAW ENFORCEMENT AND LAW ENFORCEMENT PERSONNEL" },
  { value: "15949", label: "LEAD" },
  { value: "15922", label: "LEGAL FINANCIAL OBLIGATIONS" },
  { value: "15880", label: "LEGAL NOTICES" },
  {
    value: "15965",
    label: "LEGISLATIVE AUDIT AND REVIEW COMMITTEE, JOINT (JLARC)",
  },
  {
    value: "16021",
    label: "LEGISLATIVE EVALUATION AND ACCOUNTABILITY PROGRAM (LEAP) COMMITTEE",
  },
  { value: "15477", label: "LEGISLATURE" },
  { value: "16152", label: "LGBTQ PEOPLE" },
  { value: "15761", label: "LIBRARIES" },
  { value: "16068", label: "LICENSE PLATES" },
  { value: "15899", label: "LICENSES AND LICENSING" },
  { value: "15526", label: "LICENSING, DEPARTMENT" },
  { value: "15839", label: "LIENS" },
  { value: "16094", label: "LIEUTENANT GOVERNOR" },
  { value: "16017", label: "LIGHTING" },
  { value: "15820", label: "LIMITED LIABILITY COMPANIES" },
  { value: "15721", label: "LIQUOR AND CANNABIS BOARD" },
  { value: "15799", label: "LITTER AND LITTERING" },
  { value: "15652", label: "LIVESTOCK" },
  { value: "15855", label: "LOANS" },
  { value: "15783", label: "LOBBYING AND LOBBYISTS" },
  { value: "15456", label: "LOCAL GOVERNMENT" },
  { value: "15754", label: "LODGING" },
  { value: "15537", label: "LONG-TERM CARE" },
  { value: "15910", label: "LOTTERY, STATE" },
  { value: "15437", label: "LOW-INCOME PERSONS" },
  { value: "15934", label: "LUNAR NEW YEAR" },
  { value: "16132", label: "MAIN STREET PROGRAM" },
  { value: "15588", label: "MANICURISTS" },
  { value: "15810", label: "MANUFACTURED AND MOBILE HOMES" },
  { value: "15691", label: "MANUFACTURING AND TECHNOLOGY" },
  { value: "15987", label: "MAPS AND MAPPING" },
  { value: "15710", label: "MARIJUANA" },
  { value: "15762", label: "MARINE WATERS, STATE" },
  { value: "15469", label: "MARRIAGE AND MARRIED PERSONS" },
  { value: "15632", label: "MEDAL OF VALOR" },
  { value: "15941", label: "MEDICAID" },
  { value: "15740", label: "MEDICAL ASSISTANTS" },
  { value: "15666", label: "MEDICAL COMMISSION" },
  { value: "15976", label: "MEDICATIONS" },
  { value: "15578", label: "MEETINGS, PUBLIC" },
  { value: "15862", label: "MEN AND BOYS" },
  { value: "15504", label: "MENTAL HEALTH" },
  { value: "15739", label: "MENTAL HEALTH COUNSELORS" },
  { value: "15914", label: "METALS" },
  { value: "15467", label: "MILITARY" },
  { value: "15541", label: "MILITARY DEPARTMENT" },
  { value: "15485", label: "MINORITIES" },
  { value: "15601", label: "MINORS" },
  { value: "16092", label: "MISSING PERSONS" },
  { value: "15983", label: "MOORAGE FACILITIES" },
  { value: "15562", label: "MOTOR VEHICLES" },
  { value: "15720", label: "MOTORCYCLES" },
  { value: "16130", label: "MUNICIPAL CORPORATIONS" },
  { value: "16032", label: "MUNICIPAL RESEARCH AND SERVICES CENTER" },
  { value: "15701", label: "MUNICIPALITIES" },
  { value: "16002", label: "MUSEUMS" },
  { value: "15827", label: "MUSIC AND MUSICIANS" },
  { value: "15606", label: "NAME CHANGES" },
  { value: "15445", label: "NAMED ACTS" },
  { value: "16083", label: "NATIONAL GUARD" },
  { value: "15978", label: "NATURAL DISASTERS" },
  { value: "15807", label: "NATURAL GAS" },
  { value: "15638", label: "NATURAL RESOURCES, DEPARTMENT" },
  { value: "15811", label: "NEWS MEDIA" },
  { value: "15879", label: "NEWSPAPERS" },
  { value: "15781", label: "NONPROFIT CORPORATIONS" },
  { value: "15571", label: "NONPROFIT ORGANIZATIONS" },
  { value: "16090", label: "NORTHWEST POWER AND CONSERVATION COUNCIL" },
  { value: "16146", label: "NOTARIES PUBLIC" },
  { value: "15917", label: "NURSES AND NURSING" },
  { value: "15859", label: "NURSING CARE QUALITY ASSURANCE COMMISSION" },
  { value: "16067", label: "NURSING, BOARD" },
  { value: "15484", label: "OBSERVANCES AND HOLIDAYS" },
  {
    value: "15659",
    label: "OCCUPATIONAL THERAPY AND OCCUPATIONAL THERAPISTS",
  },
  { value: "16133", label: "OCEAN WATERS AND RESOURCES" },
  { value: "15598", label: "OFFICIAL STATE DESIGNATIONS" },
  { value: "15616", label: "OIL AND GAS" },
  { value: "15577", label: "OPEN PUBLIC MEETINGS" },
  { value: "16129", label: "OPERATING AGENCIES" },
  { value: "15511", label: "OPIOIDS" },
  { value: "15883", label: "OREGON" },
  { value: "15674", label: "OSTEOPATHIC MEDICINE AND SURGERY" },
  { value: "16029", label: "OUTDOOR RECREATION" },
  { value: "16106", label: "OVERBURDENED COMMUNITIES" },
  { value: "15863", label: "PARAEDUCATOR BOARD" },
  { value: "15584", label: "PARAEDUCATORS" },
  { value: "16004", label: "PARENTAGE" },
  { value: "15898", label: "PARKING" },
  { value: "15748", label: "PARKS  " },
  { value: "15452", label: "PARKS AND RECREATION COMMISSION" },
  { value: "16050", label: "PAWNBROKERS" },
  { value: "15891", label: "PEDESTRIANS" },
  { value: "15680", label: "PERFORMING ARTS AND PERFORMANCE FACILITIES" },
  { value: "15681", label: "PERSONAL PROPERTY" },
  { value: "15593", label: "PEST CONTROL AND PESTICIDES" },
  { value: "15918", label: "PETS" },
  { value: "15825", label: "PHARMACIES AND PHARMACISTS" },
  { value: "15826", label: "PHARMACY BENEFIT MANAGERS" },
  { value: "16049", label: "PHARMACY QUALITY ASSURANCE COMMISSION" },
  { value: "15660", label: "PHYSICAL THERAPY AND PHYSICAL THERAPISTS" },
  { value: "16055", label: "PHYSICIAN ASSISTANTS" },
  { value: "15673", label: "PHYSICIANS AND SURGEONS" },
  { value: "16009", label: "PLUMBERS AND PLUMBING" },
  { value: "15474", label: "POLICE" },
  { value: "15834", label: "POLITICAL SUBDIVISIONS" },
  { value: "15901", label: "POLLUTION" },
  { value: "15690", label: "POLLUTION CONTROL HEARINGS BOARD" },
  { value: "15838", label: "POLLUTION LIABILITY INSURANCE AGENCY" },
  { value: "15463", label: "PORT DISTRICTS" },
  { value: "15977", label: "PRESCRIPTION DRUGS" },
  { value: "16044", label: "PRIVATE INVESTIGATORS" },
  { value: "15561", label: "PRODUCTIVITY BOARD" },
  { value: "15525", label: "PROFESSIONAL EDUCATOR STANDARDS BOARD (PESB)" },
  { value: "15523", label: "PROFESSIONS" },
  { value: "15573", label: "PROPERTY TAX" },
  { value: "15623", label: "PROSECUTING ATTORNEYS" },
  { value: "15715", label: "PROTECTION ORDERS" },
  { value: "16059", label: "PROTECTION PRODUCT GUARANTEES" },
  { value: "15670", label: "PSYCHOLOGISTS" },
  { value: "15540", label: "PUBLIC ASSISTANCE" },
  { value: "15661", label: "PUBLIC DEFENSE, OFFICE" },
  { value: "15819", label: "PUBLIC DISCLOSURE" },
  { value: "15777", label: "PUBLIC DISCLOSURE COMMISSION" },
  { value: "15519", label: "PUBLIC EMPLOYEES&#x27; BENEFITS BOARD" },
  {
    value: "15520",
    label: "PUBLIC EMPLOYEES&#x27; RETIREMENT SYSTEM (PERS)",
  },
  { value: "15532", label: "PUBLIC EMPLOYMENT AND EMPLOYEES" },
  { value: "16147", label: "PUBLIC EMPLOYMENT RELATIONS COMMISSION" },
  { value: "15486", label: "PUBLIC FACILITIES DISTRICTS" },
  { value: "15563", label: "PUBLIC FUNDS AND ACCOUNTS" },
  { value: "16057", label: "PUBLIC GUARDIANSHIP, OFFICE OF" },
  { value: "15459", label: "PUBLIC LANDS" },
  { value: "15900", label: "PUBLIC POLICY, INSTITUTE FOR" },
  { value: "15723", label: "PUBLIC RECORDS" },
  {
    value: "16030",
    label: "PUBLIC RECORDS EXEMPTIONS ACCOUNTABILITY COMMITTEE",
  },
  {
    value: "15711",
    label: "PUBLIC SAFETY EMPLOYEES&#x27; RETIREMENT SYSTEM (PSERS)",
  },
  { value: "16042", label: "PUBLIC SAFETY TELECOMMUNICATORS" },
  { value: "15871", label: "PUBLIC TRANSIT" },
  { value: "16119", label: "PUBLIC TRANSPORTATION BENEFIT AREAS" },
  { value: "15644", label: "PUBLIC UTILITIES" },
  { value: "15885", label: "PUBLIC UTILITY DISTRICTS" },
  { value: "15554", label: "PUBLIC UTILITY TAX" },
  { value: "15700", label: "PUBLIC WORKS" },
  { value: "15763", label: "PUGET SOUND" },
  { value: "16091", label: "PUGET SOUND PARTNERSHIP" },
  { value: "15462", label: "RAILROADS" },
  { value: "15501", label: "REAL ESTATE AND REAL PROPERTY" },
  { value: "15802", label: "REAL ESTATE BROKERS" },
  { value: "15722", label: "RECORDS" },
  { value: "16028", label: "RECREATION" },
  { value: "15975", label: "RECREATION AND CONSERVATION OFFICE" },
  { value: "16079", label: "RECREATIONAL VEHICLES" },
  { value: "15775", label: "RECYCLING" },
  { value: "16125", label: "REDISTRICTING" },
  { value: "16124", label: "REDISTRICTING COMMISSION" },
  { value: "15908", label: "REGIONAL TRANSIT AUTHORITIES" },
  { value: "16064", label: "REGISTER, WASHINGTON STATE (WSR)" },
  { value: "16023", label: "REGULATORY INNOVATION AND ASSISTANCE, OFFICE" },
  { value: "15656", label: "RELIGION AND RELIGIOUS ORGANIZATIONS" },
  { value: "15979", label: "RESTAURANTS" },
  { value: "15471", label: "RETIREMENT AND PENSIONS" },
  { value: "15952", label: "RETIREMENT SYSTEMS, DEPARTMENT" },
  { value: "15794", label: "REVENUE, DEPARTMENT" },
  { value: "15734", label: "REVISED CODE OF WASHINGTON" },
  { value: "15453", label: "RIVERS AND STREAMS" },
  { value: "15454", label: "ROADS AND HIGHWAYS" },
  { value: "16070", label: "ROCKS AND MINERALS" },
  { value: "15928", label: "RURAL AREAS AND RURAL DEVELOPMENT" },
  { value: "15972", label: "SALARIES" },
  { value: "15699", label: "SALES" },
  { value: "15551", label: "SALES TAX" },
  {
    value: "15579",
    label: "SCHOOL DIRECTORS&#x27; ASSOCIATION, WASHINGTON STATE",
  },
  {
    value: "15522",
    label: "SCHOOL EMPLOYEES&#x27; RETIREMENT SYSTEM (SERS)",
  },
  { value: "15447", label: "SCHOOLS AND SCHOOL DISTRICTS" },
  { value: "16027", label: "SCIENCE" },
  { value: "16114", label: "SCRAP PROCESSORS AND HULK HAULERS" },
  { value: "16126", label: "SEARCH AND RESCUE" },
  { value: "15771", label: "SECRETARY OF STATE" },
  { value: "15906", label: "SECURITIES" },
  { value: "16045", label: "SECURITY GUARDS" },
  { value: "15482", label: "SENATE RESOLUTIONS" },
  { value: "15854", label: "SENIOR CITIZENS" },
  { value: "15446", label: "SENTENCES AND SENTENCING" },
  { value: "15758", label: "SENTENCING GUIDELINES COMMISSION" },
  { value: "16060", label: "SERVICE CONTRACTS" },
  { value: "15902", label: "SEWAGE AND SEWERS" },
  { value: "16118", label: "SEX OFFENDER POLICY BOARD" },
  { value: "15613", label: "SEX OFFENSES AND OFFENDERS" },
  { value: "15861", label: "SEXUAL ORIENTATION" },
  { value: "15816", label: "SEXUALLY VIOLENT PREDATORS" },
  { value: "15534", label: "SHELLFISH" },
  {
    value: "15911",
    label: "SHERIFFS AND POLICE CHIEFS, WASHINGTON ASSOCIATION OF (WASPC)",
  },
  { value: "15764", label: "SHORELINES AND SHORELINE MANAGEMENT" },
  { value: "16099", label: "SHORELINES HEARINGS BOARD" },
  { value: "15538", label: "SOCIAL AND HEALTH SERVICES, DEPARTMENT" },
  { value: "15608", label: "SOCIAL WORKERS" },
  { value: "15935", label: "SOLAR ENERGY AND SOLAR PROJECTS" },
  { value: "15646", label: "SOLID WASTE" },
  { value: "15465", label: "SPECIAL AND SPECIAL PURPOSE DISTRICTS" },
  { value: "15612", label: "SPECIAL EDUCATION" },
  { value: "16110", label: "SPECIAL LICENSE PLATES" },
  { value: "15487", label: "SPORTS AND RECREATION" },
  { value: "15678", label: "STADIUMS AND OTHER VENUES" },
  { value: "15945", label: "STALKING" },
  { value: "15440", label: "STATE AGENCIES AND DEPARTMENTS" },
  { value: "15973", label: "STATE CAPITOL COMMITTEE" },
  { value: "15597", label: "STATE DESIGNATIONS, OFFICIAL" },
  { value: "15867", label: "STATE ENVIRONMENTAL POLICY ACT (SEPA)" },
  { value: "15812", label: "STATE FINANCE COMMITTEE" },
  { value: "15478", label: "STATE GOVERNMENT" },
  { value: "15628", label: "STATE PATROL" },
  { value: "15981", label: "STORAGE FACILITIES" },
  { value: "16136", label: "STREETS" },
  { value: "15448", label: "STUDENT ACHIEVEMENT COUNCIL (SAC)" },
  { value: "15449", label: "STUDENT FINANCIAL ASSISTANCE, OFFICE OF" },
  { value: "15514", label: "STUDIES" },
  { value: "15852", label: "SUBDIVISIONS" },
  { value: "15568", label: "SUBSTANCE ABUSE" },
  { value: "15505", label: "SUBSTANCE USE DISORDER" },
  {
    value: "15450",
    label: "SUPERINTENDENT OF PUBLIC INSTRUCTION, OFFICE (OSPI)",
  },
  { value: "15990", label: "SUPERIOR COURTS" },
  { value: "15836", label: "SUPREME COURT" },
  { value: "16154", label: "SUSTAINABLE FOOD MANAGEMENT, CENTER FOR" },
  { value: "15875", label: "TAX APPEALS, BOARD" },
  {
    value: "15438",
    label: "TAX PREFERENCES - EXEMPTIONS, CREDITS, DEDUCTIONS, DEFERRALS, ETC.",
  },
  { value: "16150", label: "TAXES - AIRCRAFT FUEL" },
  { value: "15549", label: "TAXES - BUSINESS AND OCCUPATION" },
  { value: "16120", label: "TAXES - CAPITAL GAINS" },
  { value: "15756", label: "TAXES - ESTATE" },
  { value: "15555", label: "TAXES - EXCISE" },
  { value: "15857", label: "TAXES - HAZARDOUS SUBSTANCES" },
  { value: "15890", label: "TAXES - LEASEHOLD EXCISE" },
  { value: "16112", label: "TAXES - LITTER" },
  { value: "16102", label: "TAXES - MOTOR VEHICLE FUEL" },
  { value: "15572", label: "TAXES - PROPERTY" },
  { value: "15550", label: "TAXES - PUBLIC UTILITY TAX" },
  { value: "15705", label: "TAXES - REAL ESTATE SALES EXCISE" },
  { value: "15547", label: "TAXES - SALES" },
  { value: "16127", label: "TAXES - TELEPHONE ACCESS LINE USE" },
  { value: "15848", label: "TAXES - TOBACCO PRODUCTS" },
  { value: "15548", label: "TAXES - USE" },
  { value: "15724", label: "TAXES, GENERALLY" },
  { value: "15643", label: "TEACHERS" },
  { value: "15521", label: "TEACHERS&#x27; RETIREMENT SYSTEM (TRS)" },
  { value: "15926", label: "TECHNOLOGY SERVICES BOARD" },
  { value: "15702", label: "TELECOMMUNICATIONS" },
  { value: "15642", label: "TELEMEDICINE" },
  { value: "16026", label: "TELEPHONES AND TELEPHONE COMPANIES" },
  { value: "15822", label: "TELEVISION AND TELEVISIONS" },
  { value: "15960", label: "THEATERS" },
  { value: "15830", label: "THERAPEUTIC COURTS" },
  { value: "15959", label: "TICKET SALES AND SELLERS" },
  { value: "16006", label: "TIMBER" },
  { value: "16038", label: "TIME" },
  { value: "15845", label: "TOBACCO AND TOBACCO PRODUCTS" },
  { value: "15849", label: "TOBACCO PRODUCTS TAX" },
  { value: "15860", label: "TOURISM" },
  { value: "15576", label: "TOWING AND TOW TRUCKS" },
  { value: "16000", label: "TRADE" },
  { value: "15492", label: "TRAFFIC" },
  { value: "15719", label: "TRAFFIC INFRACTIONS" },
  { value: "15489", label: "TRAFFIC OFFENSES" },
  { value: "15939", label: "TRAFFIC SAFETY COMMISSION" },
  { value: "16137", label: "TRAFFIC SAFETY EDUCATION" },
  { value: "16076", label: "TRANSGENDER PEOPLE" },
  { value: "15461", label: "TRANSPORTATION" },
  { value: "15921", label: "TRANSPORTATION COMMISSION" },
  { value: "16014", label: "TRANSPORTATION NETWORK COMPANIES" },
  { value: "15460", label: "TRANSPORTATION, DEPARTMENT" },
  { value: "15728", label: "TREASURER, STATE" },
  { value: "15543", label: "TRIBES AND TRIBAL MEMBERS" },
  { value: "15881", label: "TRUCKS" },
  { value: "15980", label: "UNCLAIMED PROPERTY" },
  { value: "15574", label: "UNEMPLOYMENT COMPENSATION" },
  { value: "15731", label: "UNIFORM COMMERCIAL CODE (UCC)" },
  { value: "15502", label: "UNIFORM LAWS" },
  { value: "15817", label: "UNIVERSITY OF WASHINGTON" },
  { value: "15552", label: "USE TAX" },
  { value: "15637", label: "UTILITIES" },
  { value: "15639", label: "UTILITIES AND TRANSPORTATION COMMISSION" },
  { value: "15631", label: "VACCINATION AND VACCINES" },
  { value: "15846", label: "VAPOR PRODUCTS" },
  { value: "16115", label: "VEHICLE WRECKERS" },
  { value: "15803", label: "VESSELS" },
  { value: "15468", label: "VETERANS" },
  { value: "15524", label: "VETERANS AFFAIRS, DEPARTMENT" },
  { value: "16056", label: "VETERINARIANS" },
  { value: "15619", label: "VICTIMS OF CRIMES" },
  { value: "15896", label: "VOCATIONAL EDUCATION" },
  {
    value: "15893",
    label:
      "VOLUNTEER FIREFIGHTERS&#x27; AND RESERVE OFFICERS&#x27; RELIEF AND PENSION SYSTEM",
  },
  { value: "15828", label: "VOLUNTEERS AND VOLUNTEERING" },
  { value: "15663", label: "VOTING AND BALLOTS" },
  { value: "15765", label: "VULNERABLE ADULTS" },
  { value: "15735", label: "WAGES" },
  { value: "15618", label: "WAGES AND HOURS" },
  { value: "15971", label: "WAGES AND SALARIES" },
  { value: "15873", label: "WAREHOUSE DISTRIBUTION CENTERS" },
  { value: "16063", label: "WASHINGTON ADMINISTRATIVE CODE (WAC)" },
  { value: "15963", label: "WASHINGTON AUTO THEFT PREVENTION AUTHORITY" },
  { value: "15995", label: "WASHINGTON HEALTH CORPS" },
  { value: "15957", label: "WASHINGTON STATE HISTORICAL SOCIETY" },
  { value: "15629", label: "WASHINGTON STATE PATROL" },
  { value: "15682", label: "WASHINGTON STATE UNIVERSITY" },
  { value: "16155", label: "WASTE REDUCTION, OFFICE OF" },
  { value: "15747", label: "WATER" },
  { value: "15792", label: "WATER POLLUTION" },
  { value: "15869", label: "WATER RIGHTS" },
  { value: "15903", label: "WATERS OF THE STATE" },
  { value: "15887", label: "WATER-SEWER DISTRICTS" },
  { value: "15507", label: "WEAPONS" },
  { value: "15843", label: "WESTERN WASHINGTON UNIVERSITY" },
  { value: "15640", label: "WILDFIRES" },
  { value: "15651", label: "WILDLIFE" },
  { value: "15508", label: "WINE AND WINERIES" },
  { value: "15969", label: "WOLVES" },
  { value: "15622", label: "WOMEN" },
  { value: "16109", label: "WOMEN&#x27;S COMMISSION" },
  { value: "15738", label: "WORKER TRAINING AND WORKFORCE NEEDS" },
  { value: "15730", label: "WORKERS&#x27; COMPENSATION" },
  {
    value: "15797",
    label: "WORKFORCE TRAINING AND EDUCATION COORDINATING BOARD",
  },
  { value: "16116", label: "WRECKERS, VEHICLE" },
];
