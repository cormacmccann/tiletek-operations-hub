
import React from 'react';
import { Package, AlertTriangle, TrendingUp } from 'lucide-react';

export const InventoryOverview = () => {
  const stockAlerts = [
    {
      product: 'Marble Tiles 60x60',
      current: 12,
      minimum: 50,
      status: 'critical'
    },
    {
      product: 'Ceramic Floor Tiles',
      current: 28,
      minimum: 25,
      status: 'low'
    },
    {
      product: 'Bathroom Wall Tiles',
      current: 15,
      minimum: 30,
      status: 'critical'
    }
  ];

  const topProducts = [
    { name: 'Porcelain Tiles', value: '€45,230', trend: '+12%' },
    { name: 'Ceramic Flooring', value: '€38,150', trend: '+8%' },
    { name: 'Bathroom Suites', value: '€29,680', trend: '+15%' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Inventory Overview</h2>
        <Package className="w-5 h-5 text-gray-600" />
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Stock Alerts</h3>
        <div className="space-y-3">
          {stockAlerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.product}</p>
                  <p className="text-xs text-red-600">
                    {alert.current} units (min: {alert.minimum})
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                {alert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Top Performing Products</h3>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-900">{product.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">{product.value}</span>
                <span className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {product.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
