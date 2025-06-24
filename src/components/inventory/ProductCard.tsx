
import React from 'react';
import { Product } from '@/types/product';
import { Package, Edit, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  stockInfo: {
    totalBoxes: number;
    totalTiles: number;
    totalSqm: number;
    isLowStock: boolean;
  };
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  stockInfo,
  onEdit,
  onView
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            {product.images.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Package className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{product.title}</h3>
            <p className="text-sm text-gray-600">SKU: {product.sku}</p>
            <p className="text-sm text-gray-600">Batch: {product.batchCode}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {product.material}
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {product.finish}
              </span>
            </div>
          </div>
        </div>
        {stockInfo.isLowStock && (
          <AlertTriangle className="w-5 h-5 text-red-500" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Dimensions</p>
          <p className="font-medium">
            {product.dimensions.width} × {product.dimensions.length} × {product.dimensions.depth}mm
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Coverage per Box</p>
          <p className="font-medium">{product.coveragePerBox}m²</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Tiles per Box</p>
          <p className="font-medium">{product.tilesPerBox}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Price per m²</p>
          <p className="font-medium">£{product.pricing.pricePerSqm.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Current Stock</h4>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-gray-600">Boxes</p>
            <p className={`font-medium ${stockInfo.isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
              {stockInfo.totalBoxes}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Loose Tiles</p>
            <p className="font-medium text-gray-900">{stockInfo.totalTiles}</p>
          </div>
          <div>
            <p className="text-gray-600">Total m²</p>
            <p className="font-medium text-gray-900">{stockInfo.totalSqm.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button onClick={() => onView(product)} variant="outline" size="sm" className="flex-1">
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
        <Button onClick={() => onEdit(product)} variant="outline" size="sm" className="flex-1">
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
    </div>
  );
};
