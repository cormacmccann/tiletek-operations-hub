
import React from 'react';
import { TrendingUp, TrendingDown, Package, Receipt, Truck, Users } from 'lucide-react';

export const BusinessMetrics = () => {
  const metrics = [
    {
      title: 'Today\'s Sales',
      value: '€12,847',
      change: '+8.2%',
      trend: 'up',
      icon: Receipt,
      color: 'blue'
    },
    {
      title: 'Inventory Value',
      value: '£284,562',
      change: '+2.1%',
      trend: 'up',
      icon: Package,
      color: 'green'
    },
    {
      title: 'Active Deliveries',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: Truck,
      color: 'orange'
    },
    {
      title: 'Customer Orders',
      value: '156',
      change: '-3.2%',
      trend: 'down',
      icon: Users,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      orange: 'bg-orange-100 text-orange-700',
      purple: 'bg-purple-100 text-purple-700'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(metric.color)}`}>
              <metric.icon className="w-6 h-6" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{metric.change}</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
          <p className="text-gray-600 text-sm">{metric.title}</p>
        </div>
      ))}
    </div>
  );
};
