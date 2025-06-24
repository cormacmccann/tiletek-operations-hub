
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Package, Plus, Search, Filter } from 'lucide-react';

const InventoryPage = () => {
  const inventoryItems = [
    { id: 1, name: 'Ceramic Floor Tiles', category: 'Tiles', stock: 150, unit: 'sqm', price: 25.99, status: 'In Stock' },
    { id: 2, name: 'Porcelain Wall Tiles', category: 'Tiles', stock: 75, unit: 'sqm', price: 35.50, status: 'Low Stock' },
    { id: 3, name: 'Natural Stone', category: 'Stone', stock: 200, unit: 'sqm', price: 45.00, status: 'In Stock' },
    { id: 4, name: 'Tile Adhesive', category: 'Adhesives', stock: 50, unit: 'bags', price: 15.99, status: 'In Stock' },
    { id: 5, name: 'Grout Sealer', category: 'Sealers', stock: 12, unit: 'bottles', price: 8.50, status: 'Critical' },
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
                <h1 className="text-lg font-semibold">Inventory Management</h1>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-8 bg-gray-50">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Inventory Items</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search inventory..."
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
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Item Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Unit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{item.name}</td>
                        <td className="py-3 px-4 text-gray-600">{item.category}</td>
                        <td className="py-3 px-4">{item.stock}</td>
                        <td className="py-3 px-4 text-gray-600">{item.unit}</td>
                        <td className="py-3 px-4">${item.price}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                            item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
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

export default InventoryPage;
