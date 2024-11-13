import { Badge } from '@/components/ui/badge';

import { TableCell, TableRow } from '@/components/ui/table';
import { Legislation } from 'app/api/types/legislation';
import { LegislationInfo } from 'app/api/types/legislationPassedLegislature';

export const LegislationCard = ({ legislation, details }: { legislation: LegislationInfo, details?: Legislation }) => {
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
        </TableRow>
    );
}
