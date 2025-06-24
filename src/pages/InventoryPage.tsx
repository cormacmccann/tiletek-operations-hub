
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Package, Plus, Search, Filter, Calculator, BarChart3 } from 'lucide-react';
import { ProductCard } from '../components/inventory/ProductCard';
import { CoverageCalculator } from '../components/inventory/CoverageCalculator';
import { Product, CoverageCalculation } from '../types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InventoryPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  // Mock data - in real app this would come from API
  const products: Product[] = [
    {
      id: '1',
      sku: 'POR-600-OAK-001',
      barcode: '1234567890123',
      title: 'Porcelain Oak Effect Floor Tile',
      material: 'porcelain',
      finish: 'matte',
      colour: 'Oak Brown',
      pattern: 'Wood Effect',
      batchCode: 'B2024-001',
      dimensions: { width: 600, length: 600, depth: 10 },
      tileWeight: 1.2,
      tilesPerBox: 4,
      boxDimensions: { width: 62, length: 62, height: 12 },
      boxWeight: 5.2,
      coveragePerTile: 0.36,
      coveragePerBox: 1.44,
      pricing: {
        pricePerTile: 12.50,
        pricePerBox: 50.00,
        pricePerSqm: 34.72,
        costPrice: 30.00
      },
      images: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      sku: 'CER-300-WHT-002',
      barcode: '1234567890124',
      title: 'Ceramic White Subway Tile',
      material: 'ceramic',
      finish: 'gloss',
      colour: 'Pure White',
      batchCode: 'B2024-002',
      dimensions: { width: 300, length: 100, depth: 8 },
      tileWeight: 0.4,
      tilesPerBox: 20,
      boxDimensions: { width: 32, length: 22, height: 18 },
      boxWeight: 8.5,
      coveragePerTile: 0.03,
      coveragePerBox: 0.6,
      pricing: {
        pricePerTile: 2.25,
        pricePerBox: 45.00,
        pricePerSqm: 75.00,
        costPrice: 28.00
      },
      images: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const stockData = {
    '1': { totalBoxes: 25, totalTiles: 3, totalSqm: 37.08, isLowStock: false },
    '2': { totalBoxes: 8, totalTiles: 12, totalSqm: 5.16, isLowStock: true }
  };

  const handleProductEdit = (product: Product) => {
    console.log('Edit product:', product);
  };

  const handleProductView = (product: Product) => {
    setSelectedProduct(product);
    setShowCalculator(true);
  };

  const handleCalculationComplete = (calculation: CoverageCalculation) => {
    console.log('Coverage calculation:', calculation);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.batchCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Package className="w-6 h-6" />
                <h1 className="text-lg font-semibold">Inventory Management</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={() => setShowCalculator(true)} variant="outline">
                  <Calculator className="w-4 h-4 mr-2" />
                  Coverage Calculator
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-8 bg-gray-50">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="stock">Stock Levels</TabsTrigger>
                <TabsTrigger value="movements">Stock Movements</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-6">
                {showCalculator && selectedProduct && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Coverage Calculator - {selectedProduct.title}</h2>
                      <Button onClick={() => setShowCalculator(false)} variant="outline">
                        Close Calculator
                      </Button>
                    </div>
                    <CoverageCalculator
                      product={selectedProduct}
                      onCalculationComplete={handleCalculationComplete}
                    />
                  </div>
                )}

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Product Catalog</h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        stockInfo={stockData[product.id]}
                        onEdit={handleProductEdit}
                        onView={handleProductView}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stock">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-6">Stock Levels Overview</h2>
                  <div className="text-center text-gray-500 py-8">
                    Stock levels overview coming soon...
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="movements">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-6">Stock Movements</h2>
                  <div className="text-center text-gray-500 py-8">
                    Stock movements tracking coming soon...
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-6">Inventory Reports</h2>
                  <div className="text-center text-gray-500 py-8">
                    Inventory reports coming soon...
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InventoryPage;
