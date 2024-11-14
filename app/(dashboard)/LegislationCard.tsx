import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/badge';

import { TableCell, TableRow } from '@/components/ui/table';
import { Legislation } from 'app/api/types/legislation';
import { LegislationInfo } from 'app/api/types/legislationPassedLegislature';
import { BillDocuments } from 'app/store/legislaton-store';
import Link from 'next/link';

export const LegislationCard = ({ legislation, details, documents }: { legislation: LegislationInfo, details?: Legislation, documents?: BillDocuments }) => {

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
                    <Link className="text-blue-600" passHref={true} target="_blank" href={`https://fnspublic.ofm.wa.gov/FNSPublicSearch/GetPDF/${documents?.fiscalNoteUrl}`} > Fiscal Note</Link> : 'No Note'
                }
            </TableCell>

        </TableRow >
    );
}
