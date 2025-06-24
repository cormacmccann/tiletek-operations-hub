
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { ShoppingCart, Plus, Search } from 'lucide-react';

const POSPage = () => {
  const [cartItems, setCartItems] = useState([]);
  
  const products = [
    { id: 1, name: 'Ceramic Floor Tiles', price: 25.99, category: 'Tiles' },
    { id: 2, name: 'Porcelain Wall Tiles', price: 35.50, category: 'Tiles' },
    { id: 3, name: 'Natural Stone', price: 45.00, category: 'Stone' },
    { id: 4, name: 'Tile Adhesive', price: 15.99, category: 'Adhesives' },
    { id: 5, name: 'Grout Sealer', price: 8.50, category: 'Sealers' },
    { id: 6, name: 'Spacers', price: 3.25, category: 'Tools' },
  ];

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1, id: Date.now() }]);
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center space-x-4">
              <ShoppingCart className="w-6 h-6" />
              <h1 className="text-lg font-semibold">Point of Sale</h1>
            </div>
          </header>
          
          <main className="flex-1 flex bg-gray-50">
            <div className="flex-1 p-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
                    <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{product.category}</p>
                    <p className="font-bold text-lg mb-3">${product.price}</p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-80 bg-white border-l border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Current Sale</h2>
              
              <div className="space-y-3 mb-6">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No items in cart</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
                
                <button 
                  disabled={cartItems.length === 0}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Complete Sale
                </button>
                
                <button 
                  onClick={() => setCartItems([])}
                  className="w-full mt-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default POSPage;
