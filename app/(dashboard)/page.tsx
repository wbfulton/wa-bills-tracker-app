'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BillsTable } from './BillsTable';
import { useLegislationPassedLegislature } from 'app/hooks/useLegislationPassedLegislature';
import { updateLegislationDetails, updateLegislationPassedLegislature } from 'app/store/legislaton-store';
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react';
import { useLegislationFilters } from 'app/hooks/useFilters';
import { updateLegislationFilters } from 'app/store/filters-store';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from '@/components/ui/Selector';
import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea';
import { useAsyncEffect } from 'app/hooks/useAsyncEffect';
import { useLegislationDetails } from 'app/hooks/useLegislationDetails';


const LegislationPage = () => {
  const legislation = useLegislationPassedLegislature();


  const params = useSearchParams()
  const offsetParam = params.get('offset')
  const offset = !!offsetParam ? Number(offsetParam) : 0
  const filters = useLegislationFilters();

  const bills = useMemo(() => legislation.slice(offset, offset + 20), [legislation, offset])

  useAsyncEffect(
    async () => {
      await updateLegislationDetails(filters, bills.map(bill => Number(bill.billNumber[0])));
    },
    undefined,
    [filters, bills],
  );



  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
          <TabsList className='flex w-max space-x-0.5'>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="prefiled">Prefiled</TabsTrigger>
            <TabsTrigger value="introduction">Introduction</TabsTrigger>
            <TabsTrigger value="committee">Committee</TabsTrigger>
            <TabsTrigger value="second">Second Reading</TabsTrigger>
            <TabsTrigger value="third">Third Reading</TabsTrigger>
            <TabsTrigger className="hidden sm:flex" value="governor">
              Governor
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className='h-1.5' />
        </ScrollArea>


        <div className="ml-auto flex items-center gap-2">
          <Select onValueChange={(val) => updateLegislationFilters({ biennum: val })}>
            <SelectTrigger className="h-8 gap-1">
              <SelectValue placeholder="Select a Biennum" >{filters.biennum}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Biennum</SelectLabel>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2021-22">2021-22</SelectItem>
                <SelectItem value="2019-20">2019-20</SelectItem>
                <SelectItem value="2017-18">2017-18</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => {
            updateLegislationPassedLegislature(filters)
          }}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Fetch
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <BillsTable
          legislation={bills}
          offset={offset}
          totalBills={legislation.length}
        />
      </TabsContent>
    </Tabs>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LegislationPage />
    </Suspense>
  )
};

