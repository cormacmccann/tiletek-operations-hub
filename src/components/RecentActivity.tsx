
import React from 'react';
import { Clock, Package, Receipt, Truck, Users } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    {
      type: 'sale',
      title: 'New invoice created',
      description: 'Invoice #INV-2024-0847 for Bathroom World Ltd - €2,450',
      time: '5 minutes ago',
      icon: Receipt,
      color: 'text-blue-600'
    },
    {
      type: 'inventory',
      title: 'Stock level alert',
      description: 'Porcelain Marble Tiles (60x60cm) running low - 12 units remaining',
      time: '12 minutes ago',
      icon: Package,
      color: 'text-orange-600'
    },
    {
      type: 'delivery',
      title: 'Delivery completed',
      description: 'Order #ORD-2024-1156 delivered to City Center Project',
      time: '25 minutes ago',
      icon: Truck,
      color: 'text-green-600'
    },
    {
      type: 'customer',
      title: 'New customer registered',
      description: 'Premium Interiors Ltd added to CRM system',
      time: '1 hour ago',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      type: 'inventory',
      title: 'Stock received',
      description: 'Delivery of 500 units Italian Ceramic Tiles received',
      time: '2 hours ago',
      icon: Package,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
