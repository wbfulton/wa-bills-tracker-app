'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { LegislationInfo } from 'app/api/types/legislationPassedLegislature';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LegislationCard } from './LegislationCard';
import { useLegislationFilters } from 'app/hooks/useFilters';
import { useLegislationDetails } from 'app/hooks/useLegislationDetails';
import { useMemo } from 'react';

export function BillsTable({
  legislation,
  offset,
  totalBills
}: {
  legislation: LegislationInfo[];
  offset: number;
  totalBills: number;
}) {
  let router = useRouter();
  let billsPerPage = 20;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset + billsPerPage}`, { scroll: false });
  }

  const filters = useLegislationFilters();
  const detailsMap = useLegislationDetails();




  return (
    <Card>
      <CardHeader>
        <CardTitle>Passed Legislation</CardTitle>
        <CardDescription>
          {`Legislation passed legislature for ${filters.biennum}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                Biennum
              </TableHead>
              <TableHead >Name</TableHead>
              <TableHead>Desc</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Agency</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {legislation.map((leg) => (
              <LegislationCard key={leg.billNumber[0]} legislation={leg} details={detailsMap.get(Number(leg.billNumber[0]))} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {totalBills === 0 ? offset : offset + 1}-{Math.min(offset + billsPerPage, totalBills)}
            </strong>{' '}
            of <strong>{totalBills}</strong> bills
          </div>
          <div className="flex">
            {offset !== 0 &&
              <Button
                formAction={prevPage}
                variant="ghost"
                size="sm"
                type="submit"
                disabled={offset === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Prev
              </Button>
            }
            {offset + billsPerPage <= totalBills &&
              <Button
                formAction={nextPage}
                variant="ghost"
                size="sm"
                type="submit"
                disabled={offset + billsPerPage > totalBills}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            }
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}

