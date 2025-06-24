
import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, TrendingUp, Download } from 'lucide-react';

export const VarianceReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const varianceData = [
    { 
      product: 'Ceramic Floor Tiles', 
      sku: 'CFT-001', 
      expected: 150, 
      actual: 148, 
      variance: -2, 
      value: -50.00,
      lastCount: '2024-06-20',
      frequency: 3
    },
    { 
      product: 'Natural Stone', 
      sku: 'NS-003', 
      expected: 200, 
      actual: 205, 
      variance: 5, 
      value: 225.00,
      lastCount: '2024-06-20',
      frequency: 1
    },
    { 
      product: 'Tile Adhesive', 
      sku: 'TA-004', 
      expected: 50, 
      actual: 47, 
      variance: -3, 
      value: -47.97,
      lastCount: '2024-06-20',
      frequency: 2
    },
  ];

  const totalVarianceValue = varianceData.reduce((sum, item) => sum + item.value, 0);
  const criticalVariances = varianceData.filter(item => Math.abs(item.variance) >= 3).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Variance Analysis</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Variance Value</h3>
              <p className={`text-2xl font-bold ${totalVarianceValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                £{Math.abs(totalVarianceValue).toFixed(2)}
              </p>
            </div>
            {totalVarianceValue >= 0 ? (
              <TrendingUp className="w-8 h-8 text-green-600" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-600" />
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Critical Variances</h3>
              <p className="text-2xl font-bold text-red-600">{criticalVariances}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-600">Average Accuracy</h3>
            <p className="text-2xl font-bold text-gray-900">92.5%</p>
          </div>
        </div>
      </div>

      {/* Variance Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Variance Details</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">SKU</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Expected</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Actual</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Variance</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Value Impact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Last Count</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {varianceData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.product}</td>
                  <td className="py-3 px-4 text-gray-600">{item.sku}</td>
                  <td className="py-3 px-4 text-right">{item.expected}</td>
                  <td className="py-3 px-4 text-right">{item.actual}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${
                      item.variance > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.variance > 0 ? '+' : ''}{item.variance}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${
                      item.value >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      £{Math.abs(item.value).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.lastCount}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.frequency <= 1 ? 'bg-green-100 text-green-800' :
                      item.frequency <= 2 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.frequency}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
