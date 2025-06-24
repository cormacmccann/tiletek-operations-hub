
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Users, Plus, Search, Filter } from 'lucide-react';

const CRMPage = () => {
  const customers = [
    { id: 1, name: 'ABC Construction', contact: 'John Doe', email: 'john@abc.com', phone: '+1 234-567-8901', status: 'Active', lastOrder: '2024-06-20' },
    { id: 2, name: 'Modern Homes Ltd', contact: 'Jane Smith', email: 'jane@modern.com', phone: '+1 234-567-8902', status: 'Active', lastOrder: '2024-06-18' },
    { id: 3, name: 'City Renovations', contact: 'Mike Johnson', email: 'mike@city.com', phone: '+1 234-567-8903', status: 'Active', lastOrder: '2024-06-15' },
    { id: 4, name: 'Elite Builders', contact: 'Sarah Wilson', email: 'sarah@elite.com', phone: '+1 234-567-8904', status: 'Inactive', lastOrder: '2024-05-10' },
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
                <Users className="w-6 h-6" />
                <h1 className="text-lg font-semibold">Customer Management</h1>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span>Add Customer</span>
              </button>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-8 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Customers</h3>
                <p className="text-2xl font-bold text-gray-900">142</p>
                <p className="text-sm text-blue-600">+12 this month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Active Customers</h3>
                <p className="text-2xl font-bold text-gray-900">128</p>
                <p className="text-sm text-green-600">90% active</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">New Leads</h3>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-yellow-600">This week</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Order Value</h3>
                <p className="text-2xl font-bold text-gray-900">$1,850</p>
                <p className="text-sm text-purple-600">+5% vs last month</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Customer Directory</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search customers..."
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Company Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Contact Person</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Last Order</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{customer.name}</td>
                        <td className="py-3 px-4">{customer.contact}</td>
                        <td className="py-3 px-4 text-blue-600">{customer.email}</td>
                        <td className="py-3 px-4 text-gray-600">{customer.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{customer.lastOrder}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {customer.status}
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

export default CRMPage;
