
import React from 'react';
import { Receipt, TrendingUp } from 'lucide-react';

export const SalesOverview = () => {
  const recentSales = [
    {
      invoice: 'INV-2024-0847',
      customer: 'Bathroom World Ltd',
      amount: '€2,450',
      status: 'paid'
    },
    {
      invoice: 'INV-2024-0846',
      customer: 'City Tiles & More',
      amount: '£1,850',
      status: 'pending'
    },
    {
      invoice: 'INV-2024-0845',
      customer: 'Premium Interiors',
      amount: '€3,200',
      status: 'paid'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
        <Receipt className="w-5 h-5 text-gray-600" />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">This Month</span>
          <span className="text-sm text-green-600 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12.5%
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">€87,540</div>
        <div className="text-sm text-gray-500">£12,380 additional</div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Invoices</h3>
        <div className="space-y-3">
          {recentSales.map((sale, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{sale.invoice}</p>
                <p className="text-xs text-gray-600">{sale.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{sale.amount}</p>
                <span className={`text-xs px-2 py-1 rounded ${
                  sale.status === 'paid' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {sale.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
