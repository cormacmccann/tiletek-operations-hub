
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { BusinessMetrics } from '../components/BusinessMetrics';
import { QuickActions } from '../components/QuickActions';
import { RecentActivity } from '../components/RecentActivity';
import { InventoryOverview } from '../components/InventoryOverview';
import { SalesOverview } from '../components/SalesOverview';
import { DeliveryStatus } from '../components/DeliveryStatus';
import { Bell, Search } from 'lucide-react';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg font-semibold">Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Sarah Wilson</span>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 space-y-4 p-8 bg-gray-50">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Good morning, Sarah
              </h1>
              <p className="text-gray-600">
                Here's what's happening at Global Tile Tek today
              </p>
            </div>

            <BusinessMetrics />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <QuickActions />
                <div className="mt-8">
                  <RecentActivity />
                </div>
              </div>
              
              <div className="space-y-8">
                <InventoryOverview />
                <SalesOverview />
                <DeliveryStatus />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
