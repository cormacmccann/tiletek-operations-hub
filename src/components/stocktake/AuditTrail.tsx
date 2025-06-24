
import React, { useState } from 'react';
import { Search, Filter, Download, User, Clock } from 'lucide-react';

export const AuditTrail = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const auditEvents = [
    {
      id: 'AUD-001',
      timestamp: '2024-06-24 14:30:25',
      user: 'Sarah Wilson',
      action: 'Stock Adjustment',
      product: 'Ceramic Floor Tiles (CFT-001)',
      details: 'Quantity adjusted from 150 to 148',
      type: 'adjustment',
      reference: 'ST-001'
    },
    {
      id: 'AUD-002',
      timestamp: '2024-06-24 14:25:10',
      user: 'John Smith',
      action: 'Sale Transaction',
      product: 'Tile Adhesive (TA-004)',
      details: 'Sold 3 units - POS Transaction #POS-045',
      type: 'sale',
      reference: 'POS-045'
    },
    {
      id: 'AUD-003',
      timestamp: '2024-06-24 13:45:15',
      user: 'System',
      action: 'Stock Received',
      product: 'Natural Stone (NS-003)',
      details: 'Received 25 units from supplier',
      type: 'receipt',
      reference: 'PO-123'
    },
    {
      id: 'AUD-004',
      timestamp: '2024-06-24 11:20:30',
      user: 'Mike Johnson',
      action: 'Project Allocation',
      product: 'Porcelain Wall Tiles (PWT-002)',
      details: 'Allocated 15 units to Project PRJ-001',
      type: 'allocation',
      reference: 'PRJ-001'
    },
    {
      id: 'AUD-005',
      timestamp: '2024-06-24 09:15:45',
      user: 'Sarah Wilson',
      action: 'Return Processing',
      product: 'Ceramic Floor Tiles (CFT-001)',
      details: 'Customer return - 2 units damaged',
      type: 'return',
      reference: 'RET-012'
    }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'sale': return '💰';
      case 'receipt': return '📦';
      case 'adjustment': return '⚖️';
      case 'allocation': return '🔧';
      case 'return': return '↩️';
      default: return '📝';
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-green-100 text-green-800';
      case 'receipt': return 'bg-blue-100 text-blue-800';
      case 'adjustment': return 'bg-yellow-100 text-yellow-800';
      case 'allocation': return 'bg-purple-100 text-purple-800';
      case 'return': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = selectedFilter === 'all' 
    ? auditEvents 
    : auditEvents.filter(event => event.type === selectedFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Inventory Audit Trail</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search audit logs..."
              className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-md"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Activities</option>
            <option value="sale">Sales</option>
            <option value="receipt">Receipts</option>
            <option value="adjustment">Adjustments</option>
            <option value="allocation">Allocations</option>
            <option value="return">Returns</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-900">247</div>
          <div className="text-sm text-gray-600">Total Events</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">156</div>
          <div className="text-sm text-gray-600">Sales</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">45</div>
          <div className="text-sm text-gray-600">Receipts</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">28</div>
          <div className="text-sm text-gray-600">Adjustments</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">18</div>
          <div className="text-sm text-gray-600">Allocations</div>
        </div>
      </div>

      {/* Audit Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{getActionIcon(event.type)}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{event.action}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">#{event.reference}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{event.product}</p>
                  <p className="text-sm text-gray-500 mb-3">{event.details}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{event.user}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
