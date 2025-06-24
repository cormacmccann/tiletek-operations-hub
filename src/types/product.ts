export interface Product {
  id: string;
  sku: string;
  barcode?: string;
  title: string;
  material: TileMaterial | ProductMaterial;
  finish: TileFinish | ProductFinish;
  colour: string;
  pattern?: string;
  batchCode: string;
  dimensions: {
    width: number; // mm
    length: number; // mm
    depth: number; // mm
  };
  tileWeight: number; // kg (can represent weight per item for non-tiles)
  tilesPerBox: number; // can represent items per box/pack for non-tiles
  boxDimensions: {
    width: number; // cm
    length: number; // cm
    height: number; // cm
  };
  boxWeight: number; // kg
  coveragePerTile: number; // m² (for tiles) or area/volume per item
  coveragePerBox: number; // m² (for tiles) or total area/volume per box
  pricing: {
    pricePerTile: number; // price per individual item
    pricePerBox: number; // price per box/pack
    pricePerSqm: number; // price per square meter (for tiles)
    costPrice: number;
  };
  images: string[];
  installationGuides?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  productType?: 'tile' | 'bath' | 'adhesive' | 'accessory' | 'tool' | 'trim';
  description?: string;
  specifications?: Record<string, any>; // Flexible specs for different product types
}

export type TileMaterial = 
  | 'porcelain'
  | 'ceramic'
  | 'vinyl'
  | 'natural-stone'
  | 'laminate'
  | 'engineered-wood'
  | 'luxury-vinyl'
  | 'mosaic';

export type ProductMaterial = 
  | 'acrylic'
  | 'steel'
  | 'cast-iron'
  | 'fiberglass'
  | 'stone-resin'
  | 'polymer'
  | 'epoxy'
  | 'cement-based'
  | 'silicone'
  | 'plastic'
  | 'metal'
  | 'glass'
  | 'composite';

export type TileFinish = 
  | 'matte'
  | 'gloss'
  | 'anti-slip'
  | 'textured'
  | 'polished'
  | 'honed'
  | 'brushed'
  | 'rustic';

export type ProductFinish = 
  | 'glossy'
  | 'satin'
  | 'textured'
  | 'smooth'
  | 'rough'
  | 'brushed'
  | 'polished'
  | 'powder-coated'
  | 'chrome'
  | 'stainless'
  | 'painted';

export interface StockLocation {
  id: string;
  name: string;
  type: 'warehouse' | 'van' | 'shop-floor' | 'display';
  address?: string;
}

export interface StockItem {
  productId: string;
  locationId: string;
  boxes: number;
  looseTiles: number;
  totalSqm: number;
  reservedBoxes: number;
  reservedTiles: number;
  damageCount: number;
  sampleCount: number;
  lastUpdated: Date;
}

export interface StockMovement {
  id: string;
  productId: string;
  locationId: string;
  type: 'sale' | 'return' | 'adjustment' | 'sample' | 'damage' | 'delivery' | 'transfer';
  boxes: number;
  tiles: number;
  reason: string;
  staffMember: string;
  timestamp: Date;
  orderId?: string;
}

export interface CoverageCalculation {
  roomDimensions: {
    length: number;
    width: number;
    shape: 'rectangle' | 'l-shape' | 'custom';
  };
  wastagePercentage: number;
  totalArea: number;
  tilesNeeded: number;
  boxesNeeded: number;
  estimatedCost: number;
}
