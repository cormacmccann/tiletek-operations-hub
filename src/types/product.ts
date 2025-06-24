
export interface Product {
  id: string;
  sku: string;
  barcode?: string;
  title: string;
  material: TileMaterial;
  finish: TileFinish;
  colour: string;
  pattern?: string;
  batchCode: string;
  dimensions: {
    width: number; // mm
    length: number; // mm
    depth: number; // mm
  };
  tileWeight: number; // kg
  tilesPerBox: number;
  boxDimensions: {
    width: number; // cm
    length: number; // cm
    height: number; // cm
  };
  boxWeight: number; // kg
  coveragePerTile: number; // m²
  coveragePerBox: number; // m²
  pricing: {
    pricePerTile: number;
    pricePerBox: number;
    pricePerSqm: number;
    costPrice: number;
  };
  images: string[];
  installationGuides?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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

export type TileFinish = 
  | 'matte'
  | 'gloss'
  | 'anti-slip'
  | 'textured'
  | 'polished'
  | 'honed'
  | 'brushed'
  | 'rustic';

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
