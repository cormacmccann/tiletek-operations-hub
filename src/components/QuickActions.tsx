
import React from 'react';
import { Plus, FileText, Package, Users, Truck, ShoppingCart } from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    {
      title: 'New Sale',
      description: 'Create invoice or POS transaction',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Add Inventory',
      description: 'Stock new products or adjust quantities',
      icon: Package,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Schedule Delivery',
      description: 'Plan delivery route and assign driver',
      icon: Truck,
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: 'New Customer',
      description: 'Add customer or company to CRM',
      icon: Users,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Generate Report',
      description: 'Sales, inventory, or delivery reports',
      icon: FileText,
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      title: 'Open POS',
      description: 'Start retail or trade counter sale',
      icon: ShoppingCart,
      color: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-4 rounded-lg transition-colors text-left group`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <action.icon className="w-5 h-5" />
              <span className="font-medium">{action.title}</span>
            </div>
            <p className="text-sm text-white/80">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
