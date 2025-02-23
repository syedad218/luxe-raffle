export default function CartLoadingSkeleton() {
  return (
    <div className="rounded-lg shadow-md p-6 animate-pulse mt-1">
      {/* Title */}
      <div className="w-32 h-8 bg-gray-200 rounded mb-5" />

      {/* Cart Items */}
      <div className="mb-8 space-y-4">
        {Array.from(Array(3).keys()).map((item) => (
          <div key={item} className="flex items-center space-x-4">
            {/* Item Image */}
            <div className="w-20 h-16 bg-gray-200 rounded-md" />

            <div className="flex-grow">
              {/* Item Title */}
              <div className="w-48 h-5 bg-gray-200 rounded mb-3" />

              {/* Cart controls */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-8 h-8 bg-gray-200 rounded" />
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="w-8 h-8 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Remove Button */}
            <div className="w-9 h-9 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      <div className="flex justify-end">
        <div className="w-24 h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
