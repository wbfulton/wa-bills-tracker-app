'use client'

// MAKE SERVER COMPONENT

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/Selector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLegislationFilters } from 'app/hooks/useFilters';
import { useLegislationPassedLegislature } from 'app/hooks/useLegislationPassedLegislature';
import { PlusCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { BillsTable } from './BillsTable';


const LegislationPage = () => {
  const legislation = useLegislationPassedLegislature();


  const params = useSearchParams()
  const offsetParam = params.get('offset')
  const offset = !!offsetParam ? Number(offsetParam) : 0
  const filters = useLegislationFilters();

  const bills = useMemo(() => legislation.slice(offset, offset + 20), [legislation, offset])

  // useAsyncEffect(
  //   async () => {
  //     await updateLegislationDetails(filters, bills.map(bill => Number(bill.billNumber[0])));
  //   },
  //   undefined,
  //   [filters, bills],
  // );



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
          <Select onValueChange={(val) => { }}>
            <SelectTrigger className="h-8 gap-1">
              <SelectValue placeholder="Select a Biennium" >{filters.biennium}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Biennium</SelectLabel>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2021-22">2021-22</SelectItem>
                <SelectItem value="2019-20">2019-20</SelectItem>
                <SelectItem value="2017-18">2017-18</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => {
            // updateLegislationPassedLegislature(filters)
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

