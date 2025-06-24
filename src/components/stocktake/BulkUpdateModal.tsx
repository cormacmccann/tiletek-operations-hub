
import React, { useState } from 'react';
import { X, Upload, Download, Check, AlertTriangle } from 'lucide-react';

interface BulkUpdateModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export const BulkUpdateModal: React.FC<BulkUpdateModalProps> = ({ onClose, onSave }) => {
  const [updateMethod, setUpdateMethod] = useState('csv');
  const [csvData, setCsvData] = useState('');
  const [preview, setPreview] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const sampleData = `SKU,Product Name,Actual Quantity,Notes
CFT-001,Ceramic Floor Tiles,148,Slight damage to 2 units
PWT-002,Porcelain Wall Tiles,75,
NS-003,Natural Stone,205,Overstock from recent delivery
TA-004,Tile Adhesive,47,3 units used for sample displays`;

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvData(text);
        parseAndPreview(text);
      };
      reader.readAsText(file);
    }
  };

  const parseAndPreview = (data: string) => {
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1);
    
    const parsed = rows.map((row, index) => {
      const values = row.split(',');
      return {
        rowNumber: index + 2,
        sku: values[0],
        productName: values[1],
        actualQuantity: parseInt(values[2]) || 0,
        notes: values[3] || ''
      };
    });

    // Validate data
    const newErrors: string[] = [];
    parsed.forEach((row) => {
      if (!row.sku) newErrors.push(`Row ${row.rowNumber}: Missing SKU`);
      if (!row.productName) newErrors.push(`Row ${row.rowNumber}: Missing Product Name`);
      if (isNaN(row.actualQuantity)) newErrors.push(`Row ${row.rowNumber}: Invalid quantity`);
    });

    setErrors(newErrors);
    setPreview(parsed);
  };

  const handleDownloadTemplate = () => {
    const element = document.createElement('a');
    const file = new Blob([sampleData], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = 'stock_take_template.csv';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSave = () => {
    if (errors.length === 0 && preview.length > 0) {
      onSave({ updates: preview, method: updateMethod });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Upload className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Bulk Stock Update</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Update Method Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Update Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => setUpdateMethod('csv')}
                className={`p-4 border-2 rounded-lg cursor-pointer ${
                  updateMethod === 'csv' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Upload className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium">CSV Upload</h4>
                    <p className="text-sm text-gray-600">Upload a CSV file with stock updates</p>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => setUpdateMethod('manual')}
                className={`p-4 border-2 rounded-lg cursor-pointer ${
                  updateMethod === 'manual' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-medium">Manual Entry</h4>
                    <p className="text-sm text-gray-600">Enter quantities manually</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {updateMethod === 'csv' && (
            <div className="space-y-6">
              {/* CSV Upload Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">CSV File Upload</h3>
                  <button
                    onClick={handleDownloadTemplate}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Template</span>
                  </button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Upload your CSV file</p>
                    <p className="text-gray-600">
                      File should contain: SKU, Product Name, Actual Quantity, Notes
                    </p>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCsvUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-4"
                    />
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h4 className="font-medium text-red-800">Validation Errors</h4>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preview Table */}
              {preview.length > 0 && errors.length === 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Preview Updates</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        {preview.length} items ready for update
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">SKU</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Product Name</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-600">Actual Quantity</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preview.map((row, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="py-3 px-4 font-medium">{row.sku}</td>
                            <td className="py-3 px-4">{row.productName}</td>
                            <td className="py-3 px-4 text-right">{row.actualQuantity}</td>
                            <td className="py-3 px-4 text-gray-600">{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {updateMethod === 'manual' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Manual Quantity Entry</h3>
              <p className="text-gray-600 mb-6">
                This feature allows you to quickly update multiple items without uploading a file.
                Use the main stock take interface for detailed manual entry.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  Return to the main stock take interface to enter quantities manually for each product.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={updateMethod === 'csv' && (errors.length > 0 || preview.length === 0)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Apply Updates
          </button>
        </div>
      </div>
    </div>
  );
};
