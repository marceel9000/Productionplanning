import React, { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { PlanningBoard } from "@/components/planning/PlanningBoard";
import { OrderList } from "@/components/planning/OrderList";
import { MachineBar } from "@/components/planning/MachineBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Workflow, Settings } from "lucide-react";

const Planning = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Produktionsplanung</h1>
            <p className="text-muted-foreground">
              Visuelle Planungstafel für optimale Produktionssteuerung
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {selectedDate.toLocaleDateString('de-DE')}
          </div>
        </div>

        <Tabs defaultValue="board" className="space-y-6">
          <TabsList>
            <TabsTrigger value="board" className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              Planungstafel
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Aufträge
            </TabsTrigger>
            <TabsTrigger value="machines" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Maschinen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="board" className="space-y-6">
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-300px)]">
              {/* Machine Resources Column */}
              <div className="col-span-2">
                <MachineBar />
              </div>
              
              {/* Main Planning Board */}
              <div className="col-span-10">
                <PlanningBoard selectedDate={selectedDate} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <OrderList />
          </TabsContent>

          <TabsContent value="machines">
            <Card>
              <CardHeader>
                <CardTitle>Maschinenübersicht</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Maschinenkapazitäten und -status werden hier angezeigt.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Planning;