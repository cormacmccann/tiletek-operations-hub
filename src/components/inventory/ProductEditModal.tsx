
import React, { useState } from 'react';
import { Product, TileMaterial, TileFinish } from '@/types/product';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Upload, Plus } from 'lucide-react';

interface ProductEditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: '',
      sku: '',
      barcode: '',
      title: '',
      material: 'porcelain',
      finish: 'matte',
      colour: '',
      pattern: '',
      batchCode: '',
      dimensions: { width: 0, length: 0, depth: 0 },
      tileWeight: 0,
      tilesPerBox: 1,
      boxDimensions: { width: 0, length: 0, height: 0 },
      boxWeight: 0,
      coveragePerTile: 0,
      coveragePerBox: 0,
      pricing: {
        pricePerTile: 0,
        pricePerBox: 0,
        pricePerSqm: 0,
        costPrice: 0
      },
      images: [],
      installationGuides: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0] as keyof Product],
            [keys[1]]: value
          }
        };
      }
      return prev;
    });
  };

  const handleSave = () => {
    // Calculate derived values
    const updatedFormData = {
      ...formData,
      coveragePerTile: (formData.dimensions.width * formData.dimensions.length) / 1000000, // Convert mm² to m²
      coveragePerBox: ((formData.dimensions.width * formData.dimensions.length) / 1000000) * formData.tilesPerBox,
      updatedAt: new Date()
    };

    // Calculate pricing per square meter if not set
    if (updatedFormData.coveragePerBox > 0) {
      updatedFormData.pricing.pricePerSqm = updatedFormData.pricing.pricePerBox / updatedFormData.coveragePerBox;
    }

    onSave(updatedFormData);
    onClose();
  };

  const materials: TileMaterial[] = [
    'porcelain', 'ceramic', 'vinyl', 'natural-stone', 'laminate', 
    'engineered-wood', 'luxury-vinyl', 'mosaic'
  ];

  const finishes: TileFinish[] = [
    'matte', 'gloss', 'anti-slip', 'textured', 'polished', 'honed', 'brushed', 'rustic'
  ];

  const productTypes = [
    { value: 'tile', label: 'Tile/Flooring' },
    { value: 'bath', label: 'Bath/Sanitaryware' },
    { value: 'adhesive', label: 'Adhesive/Glue' },
    { value: 'accessory', label: 'Accessory' },
    { value: 'tool', label: 'Tool' },
    { value: 'trim', label: 'Trim/Profile' }
  ];

  // Determine product type based on material or other properties
  const getProductType = () => {
    if (formData.material && materials.includes(formData.material)) return 'tile';
    if (formData.title.toLowerCase().includes('bath')) return 'bath';
    if (formData.title.toLowerCase().includes('adhesive') || formData.title.toLowerCase().includes('glue')) return 'adhesive';
    return 'accessory';
  };

  const [productType, setProductType] = useState(getProductType());

  const renderTileFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="material">Material</Label>
          <Select value={formData.material} onValueChange={(value) => handleInputChange('material', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              {materials.map(material => (
                <SelectItem key={material} value={material}>
                  {material.charAt(0).toUpperCase() + material.slice(1).replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="finish">Finish</Label>
          <Select value={formData.finish} onValueChange={(value) => handleInputChange('finish', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select finish" />
            </SelectTrigger>
            <SelectContent>
              {finishes.map(finish => (
                <SelectItem key={finish} value={finish}>
                  {finish.charAt(0).toUpperCase() + finish.slice(1).replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="width">Width (mm)</Label>
          <Input
            type="number"
            value={formData.dimensions.width}
            onChange={(e) => handleInputChange('dimensions.width', Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="length">Length (mm)</Label>
          <Input
            type="number"
            value={formData.dimensions.length}
            onChange={(e) => handleInputChange('dimensions.length', Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="depth">Depth (mm)</Label>
          <Input
            type="number"
            value={formData.dimensions.depth}
            onChange={(e) => handleInputChange('dimensions.depth', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tileWeight">Weight per Tile (kg)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.tileWeight}
            onChange={(e) => handleInputChange('tileWeight', Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="tilesPerBox">Tiles per Box</Label>
          <Input
            type="number"
            value={formData.tilesPerBox}
            onChange={(e) => handleInputChange('tilesPerBox', Number(e.target.value))}
          />
        </div>
      </div>
    </>
  );

  const renderGeneralProductFields = () => (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="width">Width (mm)</Label>
          <Input
            type="number"
            value={formData.dimensions.width}
            onChange={(e) => handleInputChange('dimensions.width', Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="length">Length (mm)</Label>
          <Input
            type="number"
            value={formData.dimensions.length}
            onChange={(e) => handleInputChange('dimensions.length', Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="depth">Height/Depth (mm)</Label>
          <Input
            type="number"
            value={formData.dimensions.depth}
            onChange={(e) => handleInputChange('dimensions.depth', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="itemWeight">Weight per Item (kg)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.tileWeight}
            onChange={(e) => handleInputChange('tileWeight', Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="itemsPerBox">Items per Box/Pack</Label>
          <Input
            type="number"
            value={formData.tilesPerBox}
            onChange={(e) => handleInputChange('tilesPerBox', Number(e.target.value))}
          />
        </div>
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="productType">Product Type</Label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      {productTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      value={formData.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      placeholder="e.g., POR-600-OAK-001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      value={formData.barcode || ''}
                      onChange={(e) => handleInputChange('barcode', e.target.value)}
                      placeholder="Product barcode"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Product name/title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="colour">Colour</Label>
                    <Input
                      value={formData.colour}
                      onChange={(e) => handleInputChange('colour', e.target.value)}
                      placeholder="e.g., Oak Brown"
                    />
                  </div>
                  <div>
                    <Label htmlFor="batchCode">Batch Code</Label>
                    <Input
                      value={formData.batchCode}
                      onChange={(e) => handleInputChange('batchCode', e.target.value)}
                      placeholder="e.g., B2024-001"
                    />
                  </div>
                </div>

                {formData.pattern !== undefined && (
                  <div>
                    <Label htmlFor="pattern">Pattern/Design</Label>
                    <Input
                      value={formData.pattern || ''}
                      onChange={(e) => handleInputChange('pattern', e.target.value)}
                      placeholder="e.g., Wood Effect"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {productType === 'tile' ? renderTileFields() : renderGeneralProductFields()}

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="boxWidth">Box Width (cm)</Label>
                    <Input
                      type="number"
                      value={formData.boxDimensions.width}
                      onChange={(e) => handleInputChange('boxDimensions.width', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="boxLength">Box Length (cm)</Label>
                    <Input
                      type="number"
                      value={formData.boxDimensions.length}
                      onChange={(e) => handleInputChange('boxDimensions.length', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="boxHeight">Box Height (cm)</Label>
                    <Input
                      type="number"
                      value={formData.boxDimensions.height}
                      onChange={(e) => handleInputChange('boxDimensions.height', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="boxWeight">Box Weight (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.boxWeight}
                    onChange={(e) => handleInputChange('boxWeight', Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pricePerItem">Price per {productType === 'tile' ? 'Tile' : 'Item'} (£)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.pricing.pricePerTile}
                      onChange={(e) => handleInputChange('pricing.pricePerTile', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerBox">Price per Box/Pack (£)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.pricing.pricePerBox}
                      onChange={(e) => handleInputChange('pricing.pricePerBox', Number(e.target.value))}
                    />
                  </div>
                </div>

                {productType === 'tile' && (
                  <div>
                    <Label htmlFor="pricePerSqm">Price per m² (£)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.pricing.pricePerSqm}
                      onChange={(e) => handleInputChange('pricing.pricePerSqm', Number(e.target.value))}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="costPrice">Cost Price (£)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.pricing.costPrice}
                    onChange={(e) => handleInputChange('pricing.costPrice', Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload images or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img src={image} alt={`Product ${index + 1}`} className="w-full h-24 object-cover rounded" />
                        <button className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Installation Guides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Installation Guide
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {product ? 'Update Product' : 'Create Product'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
