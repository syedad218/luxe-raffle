'use client';

import React, { useState } from 'react';

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src="/api/placeholder/800/500"
              alt="Lamborghini Aventador"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gray-100 rounded-lg overflow-hidden border-2 border-black">
              <img
                src="/api/placeholder/150/100"
                alt="Thumbnail 1"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/150/100"
                alt="Thumbnail 2"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/150/100"
                alt="Thumbnail 3"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/150/100"
                alt="Thumbnail 4"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lamborghini Aventador</h1>
            <p className="text-lg text-gray-600">
              Iconic V12 powerhouse with scissor doors.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">50 €</span>
            <span className="text-gray-500">per ticket</span>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">Tickets remaining:</span>
              <span>4,212 / 8,000</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
              <div
                className="bg-black h-2.5 rounded-full"
                style={{ width: '52.65%' }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Car Specifications:</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Engine: 6.5L V12</li>
              <li>• Power: 730 HP</li>
              <li>• 0-60 mph: 2.9 seconds</li>
              <li>• Top Speed: 217 mph</li>
              <li>• Transmission: 7-speed automated manual</li>
            </ul>
          </div>

          <div className="border-t border-b py-4 my-4">
            <h3 className="font-medium mb-2">Ticket Quantity:</h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center text-xl"
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 h-10 border-t border-b border-gray-300 text-center"
              />
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center text-xl"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-black text-white py-3 px-4 font-medium rounded">
              Add to Cart
            </button>
            <button className="w-full bg-gray-200 text-gray-800 py-3 px-4 font-medium rounded">
              View Details
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Winner will be drawn once all tickets are sold</p>
            <p>Expected draw date: April 15, 2025</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          Other Luxury Cars You Might Like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Related Product 1 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-100">
              <img
                src="/api/placeholder/400/300"
                alt="Ferrari 488 GTB"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Ferrari 488 GTB</h3>
                <span className="font-bold">40 €</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                420 / 7000 tickets left
              </p>
              <p className="text-sm mb-4">
                Sleek Italian supercar with breathtaking performance.
              </p>
              <button className="w-full bg-black text-white py-2 px-4 font-medium rounded text-sm">
                View Details
              </button>
            </div>
          </div>

          {/* Related Product 2 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-100">
              <img
                src="/api/placeholder/400/300"
                alt="Rolls-Royce Phantom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Rolls-Royce Phantom</h3>
                <span className="font-bold">30 €</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                10238 / 15000 tickets left
              </p>
              <p className="text-sm mb-4">
                The epitome of luxury and comfort on wheels.
              </p>
              <button className="w-full bg-black text-white py-2 px-4 font-medium rounded text-sm">
                View Details
              </button>
            </div>
          </div>

          {/* Related Product 3 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-100">
              <img
                src="/api/placeholder/400/300"
                alt="Porsche 911 GT3 RS"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Porsche 911 GT3 RS</h3>
                <span className="font-bold">20 €</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                54 / 9000 tickets left
              </p>
              <p className="text-sm mb-4">
                Track-focused version of the iconic 911.
              </p>
              <button className="w-full bg-black text-white py-2 px-4 font-medium rounded text-sm">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
