'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BillsTable } from './BillsTable';
import { useLegislationPassedLegislature } from 'app/hooks/useLegislationPassedLegislature';
import { updateLegislationPassedLegislature } from 'app/store/legislaton-store';

const LegislationPage = () => {
  const legislation = useLegislationPassedLegislature();

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
          <Button size="sm" className="h-8 gap-1" onClick={updateLegislationPassedLegislature}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Fetch
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <BillsTable
          legislation={legislation}
          offset={0}
          totalProducts={legislation.length}
        />
      </TabsContent>
    </Tabs>
  );
}

export default LegislationPage;

