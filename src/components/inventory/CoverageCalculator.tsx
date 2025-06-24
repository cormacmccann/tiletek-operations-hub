
import React, { useState, useCallback } from 'react';
import { Product, CoverageCalculation } from '@/types/product';
import { Calculator, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CoverageCalculatorProps {
  product: Product;
  onCalculationComplete: (calculation: CoverageCalculation) => void;
}

export const CoverageCalculator: React.FC<CoverageCalculatorProps> = ({
  product,
  onCalculationComplete
}) => {
  const [dimensions, setDimensions] = useState({
    length: 0,
    width: 0,
    shape: 'rectangle' as const
  });
  const [wastagePercentage, setWastagePercentage] = useState(10);
  const [calculation, setCalculation] = useState<CoverageCalculation | null>(null);

  const calculateCoverage = useCallback(() => {
    const baseArea = dimensions.length * dimensions.width;
    const totalArea = baseArea * (1 + wastagePercentage / 100);
    const tilesNeeded = Math.ceil(totalArea / product.coveragePerTile);
    const boxesNeeded = Math.ceil(tilesNeeded / product.tilesPerBox);
    const estimatedCost = boxesNeeded * product.pricing.pricePerBox;

    const newCalculation: CoverageCalculation = {
      roomDimensions: dimensions,
      wastagePercentage,
      totalArea,
      tilesNeeded,
      boxesNeeded,
      estimatedCost
    };

    setCalculation(newCalculation);
    onCalculationComplete(newCalculation);
  }, [dimensions, wastagePercentage, product, onCalculationComplete]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Coverage Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="length">Room Length (m)</Label>
            <Input
              id="length"
              type="number"
              step="0.1"
              value={dimensions.length || ''}
              onChange={(e) => setDimensions(prev => ({ ...prev, length: parseFloat(e.target.value) || 0 }))}
              placeholder="Enter length"
            />
          </div>

          <div>
            <Label htmlFor="width">Room Width (m)</Label>
            <Input
              id="width"
              type="number"
              step="0.1"
              value={dimensions.width || ''}
              onChange={(e) => setDimensions(prev => ({ ...prev, width: parseFloat(e.target.value) || 0 }))}
              placeholder="Enter width"
            />
          </div>

          <div>
            <Label htmlFor="shape">Room Shape</Label>
            <Select value={dimensions.shape} onValueChange={(value: any) => setDimensions(prev => ({ ...prev, shape: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="l-shape">L-Shape</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="wastage">Wastage Percentage</Label>
            <Input
              id="wastage"
              type="number"
              value={wastagePercentage}
              onChange={(e) => setWastagePercentage(parseInt(e.target.value) || 10)}
              placeholder="10"
            />
          </div>

          <Button onClick={calculateCoverage} className="w-full">
            Calculate Coverage
          </Button>
        </div>

        {calculation && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-gray-900">Calculation Results</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Area:</span>
                <span className="font-medium">{(dimensions.length * dimensions.width).toFixed(2)}m²</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">With Wastage:</span>
                <span className="font-medium">{calculation.totalArea.toFixed(2)}m²</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tiles Needed:</span>
                <span className="font-medium">{calculation.tilesNeeded}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Boxes Required:</span>
                <span className="font-medium flex items-center">
                  <Package className="w-4 h-4 mr-1" />
                  {calculation.boxesNeeded}
                </span>
              </div>
              
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-900 font-medium">Estimated Cost:</span>
                <span className="font-bold text-lg">£{calculation.estimatedCost.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-3">
              Based on {product.tilesPerBox} tiles per box, {product.coveragePerBox}m² coverage per box
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
