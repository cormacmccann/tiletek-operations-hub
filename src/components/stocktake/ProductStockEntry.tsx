
import React, { useState } from 'react';
import { Package, MapPin, AlertTriangle, Check } from 'lucide-react';

interface ProductStockEntryProps {
  product: {
    id: string;
    name: string;
    sku: string;
    expectedQty: number;
    actualQty: number;
    location: string;
  };
  onUpdate: (id: string, actualQty: number) => void;
}

export const ProductStockEntry: React.FC<ProductStockEntryProps> = ({ product, onUpdate }) => {
  const [actualQty, setActualQty] = useState(product.actualQty);
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const variance = actualQty - product.expectedQty;
  const variancePercent = product.expectedQty > 0 ? ((variance / product.expectedQty) * 100).toFixed(1) : '0';

  const handleSave = () => {
    onUpdate(product.id, actualQty);
    setIsEditing(false);
  };

  const getVarianceColor = () => {
    if (variance === 0) return 'text-green-600';
    if (Math.abs(variance) <= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getVarianceIcon = () => {
    if (variance === 0) return <Check className="w-4 h-4 text-green-600" />;
    return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600 text-sm">SKU: {product.sku}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <MapPin className="w-3 h-3" />
              <span>{product.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getVarianceIcon()}
          <span className={`text-sm font-medium ${getVarianceColor()}`}>
            {variance > 0 ? '+' : ''}{variance} ({variancePercent}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Quantity
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
            {product.expectedQty}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Actual Quantity
          </label>
          {isEditing ? (
            <input
              type="number"
              value={actualQty}
              onChange={(e) => setActualQty(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <div 
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              {actualQty}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Variance
          </label>
          <div className={`px-3 py-2 border border-gray-200 rounded-md font-medium ${getVarianceColor()}`}>
            {variance > 0 ? '+' : ''}{variance}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add notes about this variance..."
          />
        </div>
      )}

      {isEditing && (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={() => {
              setActualQty(product.actualQty);
              setIsEditing(false);
              setNotes('');
            }}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
