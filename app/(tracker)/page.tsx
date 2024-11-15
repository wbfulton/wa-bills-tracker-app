import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

const LegislationPage = () => {
  return (
    <Tabs defaultValue="all">
      <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
        <TabsList className="flex w-max space-x-0.5">
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
        <ScrollBar orientation="horizontal" className="h-1.5" />
      </ScrollArea>
      <TabsContent value="all"></TabsContent>
    </Tabs>
  );
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LegislationPage />
    </Suspense>
  );
}
