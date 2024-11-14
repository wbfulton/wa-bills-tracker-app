import { Badge } from '@/components/ui/badge';

import { TableCell, TableRow } from '@/components/ui/table';
import { LegislationDetailed } from 'app/api/types/legislationDetailed';
import { LegislationInfo } from 'app/api/types/legislationPassedLegislature';
import { BillDocuments } from 'app/store/legislaton-store';
import Link from 'next/link';

// Original Agency
const OriginalAgencyUrlMap: { [key: string]: string } = {
    "House": "House",
    "Senate": "Senate"
}

// Legislation Type
const BillTypeUrlMap: { [key: string]: string } = {
    "Bill": "Bills",
    "Senate": "Senate%20Bills",
    "Concurrent Resolution": "Concurrent%20Resolutions",
    "Joint Memorial": "Joint%20Memorials",
    "Joint Resolution": "Joint%20Resolutions",
    "Resolution": "Resolutions"
}

// Legislation Type
const BillTypePDFDash = new Set([
    "Joint Memorial",
    "Resolution"
])

export const LegislationCard = ({ legislation, details, documents }: { legislation: LegislationInfo, details?: LegislationDetailed, documents?: BillDocuments }) => {

    return (
        <TableRow>
            <TableCell className="font-medium">{legislation.biennium}</TableCell>
            <TableCell className="font-medium">{legislation.billId}</TableCell>
            <TableCell className="font-medium">{details?.shortDescription ?? 'N/A'}</TableCell>
            <TableCell>
                <Badge variant="outline" className="capitalize">
                    {legislation.active ? 'Active' : 'Inactive'}
                </Badge>
            </TableCell>
            <TableCell className="font-medium">{legislation.originalAgency}</TableCell>
            <TableCell className="font-medium">{legislation.shortLegislationType[0].longLegislationType}</TableCell>
            <TableCell className="font-medium">
                {!!documents?.fiscalNoteUrl ?
                    <Link className="text-blue-600" passHref={true} target="_blank" href={`https://fnspublic.ofm.wa.gov/FNSPublicSearch/GetPDF/${documents?.fiscalNoteUrl}`} >Fiscal Note</Link> : 'No Note'
                }
            </TableCell>
            <TableCell className="font-medium">
                {!!details?.originalAgency && details?.shortLegislationType[0].longLegislationType[0] && details?.billNumber[0] ?
                    <Link className="text-blue-600" passHref={true} target="_blank" href={`https://lawfilesext.leg.wa.gov/Biennium/${details?.biennium}/Pdf/Bills/${OriginalAgencyUrlMap[details?.originalAgency]}%20${BillTypeUrlMap[details?.shortLegislationType[0].longLegislationType[0]]}/${details?.billNumber[0]}${BillTypePDFDash.has(details?.shortLegislationType[0].longLegislationType[0]) ? '-' : ''}.pdf`} >Full Text</Link>
                    : 'No Text'}
            </TableCell>

        </TableRow >
    );
}
