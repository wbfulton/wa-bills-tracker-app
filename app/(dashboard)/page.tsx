'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BillsTable } from './BillsTable';
import { useLegislationPassedLegislature } from 'app/hooks/useLegislationPassedLegislature';
import { updateLegislationPassedLegislature } from 'app/store/legislaton-store';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';
import { useLegislationFilters } from 'app/hooks/useFilters';
import { updateLegislationFilters } from 'app/store/filters-store';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from '@/components/ui/Selector';


const LegislationPage = () => {
  const legislation = useLegislationPassedLegislature();

  const params = useSearchParams()
  const offsetParam = params.get('offset')
  const offset = !!offsetParam ? Number(offsetParam) : 0
  const filters = useLegislationFilters();


  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Select onValueChange={(val) => updateLegislationFilters({ biennum: val })}>
            <SelectTrigger className="h-8 gap-1">
              <SelectValue placeholder="Select a Biennum" >{filters.biennum}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Biennum</SelectLabel>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2022-23">2022-23</SelectItem>
                <SelectItem value="2021-22">2021-22</SelectItem>
                <SelectItem value="2020-21">2020-21</SelectItem>
                <SelectItem value="2019-20">2019-20</SelectItem>
                <SelectItem value="2018-19">2018-19</SelectItem>
                <SelectItem value="2017-18">2017-18</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => updateLegislationPassedLegislature(filters)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Fetch
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <BillsTable
          legislation={legislation.slice(offset, offset + 20)}
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

