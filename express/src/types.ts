export interface LegislativeDocumentReponseData {
    ArrayOfLegislativeDocument: ArrayOfLegislativeDocument
}

export interface ArrayOfLegislativeDocument {
    $: GeneratedType
    LegislativeDocument: LegislativeDocumentRaw[]
}

export interface GeneratedType {
    "xmlns:xsd": string
    "xmlns:xsi": string
    xmlns: string
}

export interface LegislativeDocumentRaw {
    Name: string[]
    ShortFriendlyName: string[]
    Biennium: string[]
    LongFriendlyName: string[]
    Description: string[]
    Type: string[]
    Class: string[]
    HtmUrl: string[]
    HtmCreateDate: string[]
    HtmLastModifiedDate: string[]
    PdfUrl: string[]
    PdfCreateDate: string[]
    PdfLastModifiedDate: string[]
    BillId: string[]
}

export interface LegislativeDocument {
    name: string
    shortFriendlyName: string
    biennium: string
    longFriendlyName: string
    description: string
    type: string
    class: string
    htmUrl: string
    htmCreateDate: string
    htmLastModifiedDate: string
    pdfUrl: string
    pdfCreateDate: string
    pdfLastModifiedDate: string
    billId: number
}