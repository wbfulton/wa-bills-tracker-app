import { Badge } from '@/components/ui/badge';

import { TableCell, TableRow } from '@/components/ui/table';
import { LegislationInfo } from 'app/api/types/legislationPassedLegislature';

export const LegislationCard = ({ legislation }: { legislation: LegislationInfo }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{legislation.Biennium}</TableCell>
            <TableCell className="font-medium">{legislation.BillId}</TableCell>
            <TableCell>
                <Badge variant="outline" className="capitalize">
                    {legislation.Active ? 'Active' : 'Inactive'}
                </Badge>
            </TableCell>
            <TableCell className="font-medium">{legislation.OriginalAgency}</TableCell>
            <TableCell className="font-medium">{legislation.ShortLegislationType[0].LongLegislationType}</TableCell>
            <TableCell className="font-medium">{legislation.DisplayNumber}</TableCell>

        </TableRow>
    );
}
