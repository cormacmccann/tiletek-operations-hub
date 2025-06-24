
import React, { useState } from 'react';
import { X, Scan, Package, MapPin, Calendar, Save } from 'lucide-react';
import { ProductStockEntry } from './ProductStockEntry';

interface StockTakeFormProps {
  stockTake?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const StockTakeForm: React.FC<StockTakeFormProps> = ({ stockTake, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: stockTake?.name || '',
    location: stockTake?.location || 'Main Warehouse',
    type: stockTake?.type || 'full',
    startDate: stockTake?.startDate || new Date().toISOString().split('T')[0],
    dueDate: stockTake?.dueDate || '',
    notes: stockTake?.notes || ''
  });

  const [activeSection, setActiveSection] = useState('details');
  const [scanMode, setScanMode] = useState(false);
  const [scannedCode, setScannedCode] = useState('');

  const products = [
    { id: 'P001', name: 'Ceramic Floor Tiles', sku: 'CFT-001', expectedQty: 150, actualQty: 148, location: 'A1-B2' },
    { id: 'P002', name: 'Porcelain Wall Tiles', sku: 'PWT-002', expectedQty: 75, actualQty: 75, location: 'A2-C1' },
    { id: 'P003', name: 'Natural Stone', sku: 'NS-003', expectedQty: 200, actualQty: 205, location: 'B1-A3' },
    { id: 'P004', name: 'Tile Adhesive', sku: 'TA-004', expectedQty: 50, actualQty: 47, location: 'C1-B1' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleScan = () => {
    // Simulate barcode scanning
    const mockBarcodes = ['CFT-001', 'PWT-002', 'NS-003', 'TA-004'];
    const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
    setScannedCode(randomBarcode);
    setScanMode(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">
              {stockTake ? 'Edit Stock Take' : 'New Stock Take'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Navigation Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200">
            <nav className="p-4 space-y-2">
              <button
                onClick={() => setActiveSection('details')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeSection === 'details' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Details</span>
                </div>
              </button>
              <button
                onClick={() => setActiveSection('items')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeSection === 'items' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Items ({products.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveSection('scan')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeSection === 'scan' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Scan className="w-4 h-4" />
                  <span>Barcode Scan</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === 'details' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Take Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Q2 2024 Full Count"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Main Warehouse">Main Warehouse</option>
                      <option value="Store Front">Store Front</option>
                      <option value="External Storage">External Storage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="full">Full Stock Take</option>
                      <option value="spot">Spot Check</option>
                      <option value="category">Category Count</option>
                      <option value="cycle">Cycle Count</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes or instructions..."
                  />
                </div>
              </form>
            )}

            {activeSection === 'items' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Stock Items</h3>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Add Item
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      Import CSV
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {products.map((product) => (
                    <ProductStockEntry
                      key={product.id}
                      product={product}
                      onUpdate={(id, actualQty) => {
                        console.log(`Updated ${id} to ${actualQty}`);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'scan' && (
              <div>
                <div className="text-center py-12">
                  <Scan className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Barcode Scanner</h3>
                  <p className="text-gray-600 mb-6">
                    Scan product barcodes to quickly update stock levels
                  </p>
                  
                  {scanMode ? (
                    <div className="bg-gray-100 p-8 rounded-lg mb-6">
                      <div className="animate-pulse text-blue-600 mb-4">
                        Scanning for barcode...
                      </div>
                      <button 
                        onClick={handleScan}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Simulate Scan
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setScanMode(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Start Scanning
                    </button>
                  )}

                  {scannedCode && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <p className="text-green-800">
                        Scanned: <strong>{scannedCode}</strong>
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        Product found and ready for count update
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            <span>Save Stock Take</span>
          </button>
        </div>
      </div>
    </div>
  );
};
