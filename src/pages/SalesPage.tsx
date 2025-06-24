
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Receipt, Plus, Search, Filter } from 'lucide-react';

const SalesPage = () => {
  const salesData = [
    { id: 'INV-001', customer: 'ABC Construction', date: '2024-06-24', amount: 2450.00, status: 'Paid' },
    { id: 'INV-002', customer: 'Modern Homes Ltd', date: '2024-06-23', amount: 1890.50, status: 'Pending' },
    { id: 'INV-003', customer: 'City Renovations', date: '2024-06-22', amount: 3200.00, status: 'Paid' },
    { id: 'INV-004', customer: 'Elite Builders', date: '2024-06-21', amount: 1650.75, status: 'Overdue' },
    { id: 'INV-005', customer: 'Design Studio Pro', date: '2024-06-20', amount: 975.00, status: 'Paid' },
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
                <Receipt className="w-6 h-6" />
                <h1 className="text-lg font-semibold">Sales & Invoicing</h1>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span>New Invoice</span>
              </button>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-8 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Sales</h3>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
                <p className="text-sm text-green-600">+15% this month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Invoices</h3>
                <p className="text-2xl font-bold text-gray-900">$3,240</p>
                <p className="text-sm text-yellow-600">5 invoices</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Overdue</h3>
                <p className="text-2xl font-bold text-gray-900">$1,650</p>
                <p className="text-sm text-red-600">2 invoices</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">This Month</h3>
                <p className="text-2xl font-bold text-gray-900">$8,900</p>
                <p className="text-sm text-blue-600">12 invoices</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Invoices</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search invoices..."
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Invoice ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-blue-600">{invoice.id}</td>
                        <td className="py-3 px-4">{invoice.customer}</td>
                        <td className="py-3 px-4 text-gray-600">{invoice.date}</td>
                        <td className="py-3 px-4 font-medium">${invoice.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {invoice.status}
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

export default SalesPage;
