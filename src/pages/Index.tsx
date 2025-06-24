
import React from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { BusinessMetrics } from '../components/BusinessMetrics';
import { QuickActions } from '../components/QuickActions';
import { RecentActivity } from '../components/RecentActivity';
import { InventoryOverview } from '../components/InventoryOverview';
import { SalesOverview } from '../components/SalesOverview';
import { DeliveryStatus } from '../components/DeliveryStatus';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
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
    </div>
  );
};

export default Index;
