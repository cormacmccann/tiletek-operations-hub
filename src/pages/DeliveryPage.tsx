
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Truck, Plus, Search, Filter } from 'lucide-react';

const DeliveryPage = () => {
  const deliveries = [
    { id: 'DEL-001', customer: 'ABC Construction', address: '123 Main St, City', status: 'In Transit', driver: 'John Smith', date: '2024-06-24' },
    { id: 'DEL-002', customer: 'Modern Homes Ltd', address: '456 Oak Ave, Town', status: 'Scheduled', driver: 'Mike Johnson', date: '2024-06-25' },
    { id: 'DEL-003', customer: 'City Renovations', address: '789 Pine St, Village', status: 'Delivered', driver: 'Sarah Wilson', date: '2024-06-23' },
    { id: 'DEL-004', customer: 'Elite Builders', address: '321 Elm Dr, District', status: 'Pending', driver: 'Unassigned', date: '2024-06-26' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Truck className="w-6 h-6" />
                <h1 className="text-lg font-semibold">Delivery Management</h1>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span>Schedule Delivery</span>
              </button>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-8 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Deliveries</h3>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-blue-600">This week</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">In Transit</h3>
                <p className="text-2xl font-bold text-gray-900">6</p>
                <p className="text-sm text-yellow-600">Currently out</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Completed</h3>
                <p className="text-2xl font-bold text-gray-900">18</p>
                <p className="text-sm text-green-600">This week</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Pending</h3>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-red-600">Need scheduling</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Delivery Schedule</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search deliveries..."
                      className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Delivery ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Address</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Driver</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map((delivery) => (
                      <tr key={delivery.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-blue-600">{delivery.id}</td>
                        <td className="py-3 px-4">{delivery.customer}</td>
                        <td className="py-3 px-4 text-gray-600">{delivery.address}</td>
                        <td className="py-3 px-4">{delivery.driver}</td>
                        <td className="py-3 px-4 text-gray-600">{delivery.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            delivery.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            delivery.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                            delivery.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {delivery.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DeliveryPage;
