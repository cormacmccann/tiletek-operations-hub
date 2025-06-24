
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Package, Plus, Search, Filter, Download, Upload, Calendar, AlertTriangle } from 'lucide-react';
import { StockTakeForm } from '../components/stocktake/StockTakeForm';
import { VarianceReport } from '../components/stocktake/VarianceReport';
import { AuditTrail } from '../components/stocktake/AuditTrail';
import { BulkUpdateModal } from '../components/stocktake/BulkUpdateModal';

const StockTakePage = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showForm, setShowForm] = useState(false);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [selectedStockTake, setSelectedStockTake] = useState(null);

  const stockTakes = [
    { 
      id: 'ST-001', 
      name: 'Q2 2024 Full Count', 
      status: 'In Progress', 
      location: 'Main Warehouse', 
      startDate: '2024-06-20',
      dueDate: '2024-06-30',
      itemsChecked: 45,
      totalItems: 150,
      variance: -2.5
    },
    { 
      id: 'ST-002', 
      name: 'Ceramic Tiles Spot Check', 
      status: 'Completed', 
      location: 'Store Front', 
      startDate: '2024-06-15',
      dueDate: '2024-06-16',
      itemsChecked: 25,
      totalItems: 25,
      variance: 1.2
    },
    { 
      id: 'ST-003', 
      name: 'Monthly Adhesives Check', 
      status: 'Overdue', 
      location: 'Main Warehouse', 
      startDate: '2024-06-01',
      dueDate: '2024-06-10',
      itemsChecked: 0,
      totalItems: 30,
      variance: 0
    }
  ];

  const tabs = [
    { id: 'current', label: 'Current Stock Takes', icon: Package },
    { id: 'variance', label: 'Variance Reports', icon: AlertTriangle },
    { id: 'audit', label: 'Audit Trail', icon: Search }
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
                <Package className="w-6 h-6" />
                <h1 className="text-lg font-semibold">Stock Take Management</h1>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowBulkUpdate(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700"
                >
                  <Upload className="w-4 h-4" />
                  <span>Bulk Update</span>
                </button>
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Stock Take</span>
                </button>
              </div>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-8 bg-gray-50">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Active Stock Takes</h3>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-blue-600">1 overdue</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Items Checked</h3>
                <p className="text-2xl font-bold text-gray-900">70</p>
                <p className="text-sm text-green-600">of 205 total</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Average Variance</h3>
                <p className="text-2xl font-bold text-gray-900">-0.8%</p>
                <p className="text-sm text-yellow-600">Last 30 days</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Next Scheduled</h3>
                <p className="text-2xl font-bold text-gray-900">Jul 1</p>
                <p className="text-sm text-purple-600">Full warehouse</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'current' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Stock Take Operations</h2>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search stock takes..."
                            className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md">
                          <Filter className="w-4 h-4" />
                          <span>Filter</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md">
                          <Download className="w-4 h-4" />
                          <span>Export</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {stockTakes.map((stockTake) => (
                        <div key={stockTake.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{stockTake.name}</h3>
                              <p className="text-gray-600 text-sm">{stockTake.location}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              stockTake.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              stockTake.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {stockTake.status}
                            </span>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{stockTake.itemsChecked}/{stockTake.totalItems}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(stockTake.itemsChecked / stockTake.totalItems) * 100}%` }}
                              ></div>
                            </div>
                            
                            <div className="flex justify-between text-sm">
                              <span>Due Date:</span>
                              <span className={stockTake.status === 'Overdue' ? 'text-red-600' : ''}>{stockTake.dueDate}</span>
                            </div>
                            
                            {stockTake.variance !== 0 && (
                              <div className="flex justify-between text-sm">
                                <span>Variance:</span>
                                <span className={stockTake.variance > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {stockTake.variance > 0 ? '+' : ''}{stockTake.variance}%
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setSelectedStockTake(stockTake)}
                              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700"
                            >
                              Continue
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'variance' && <VarianceReport />}
                {activeTab === 'audit' && <AuditTrail />}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>

      {showForm && (
        <StockTakeForm
          onClose={() => setShowForm(false)}
          onSave={(data) => {
            console.log('Stock take saved:', data);
            setShowForm(false);
          }}
        />
      )}

      {showBulkUpdate && (
        <BulkUpdateModal
          onClose={() => setShowBulkUpdate(false)}
          onSave={(data) => {
            console.log('Bulk update completed:', data);
            setShowBulkUpdate(false);
          }}
        />
      )}

      {selectedStockTake && (
        <StockTakeForm
          stockTake={selectedStockTake}
          onClose={() => setSelectedStockTake(null)}
          onSave={(data) => {
            console.log('Stock take updated:', data);
            setSelectedStockTake(null);
          }}
        />
      )}
    </SidebarProvider>
  );
};

export default StockTakePage;
