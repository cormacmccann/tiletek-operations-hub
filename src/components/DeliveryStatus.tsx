
import React from 'react';
import { Truck, MapPin, Clock } from 'lucide-react';

export const DeliveryStatus = () => {
  const deliveries = [
    {
      id: 'DEL-2024-0234',
      customer: 'Luxury Bathrooms Ltd',
      location: 'Manchester City Center',
      status: 'en-route',
      eta: '14:30',
      driver: 'Mike Johnson'
    },
    {
      id: 'DEL-2024-0235',
      customer: 'Home Design Studio',
      location: 'Liverpool Docks',
      status: 'loading',
      eta: '16:00',
      driver: 'Sarah Mitchell'
    },
    {
      id: 'DEL-2024-0236',
      customer: 'Premium Tiles Co',
      location: 'Birmingham Central',
      status: 'scheduled',
      eta: '09:00',
      driver: 'David Brown'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-route':
        return 'bg-blue-100 text-blue-700';
      case 'loading':
        return 'bg-orange-100 text-orange-700';
      case 'scheduled':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Delivery Status</h2>
        <Truck className="w-5 h-5 text-gray-600" />
      </div>
      
      <div className="space-y-4">
        {deliveries.map((delivery, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">{delivery.id}</span>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(delivery.status)}`}>
                {delivery.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{delivery.customer}</p>
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{delivery.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>ETA: {delivery.eta}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">Driver: {delivery.driver}</p>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
        View All Deliveries
      </button>
    </div>
  );
};
