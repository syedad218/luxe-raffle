const CartLoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-8 py-8 max-w-6xl mt-2">
      {/* Header skeleton */}
      <div className="h-8 w-64 bg-gray-200 rounded-md mb-6 animate-pulse" />

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Left column - Cart items skeletons */}
        <div className="w-full md:w-2/3">
          <ul className="space-y-6 divide-y divide-gray-100">
            {/* Generate 4 cart item skeletons */}
            {[...Array(4)].map((_, index) => (
              <li key={index} className="pt-6 first:pt-0">
                <div className="flex items-center space-x-4">
                  {/* Image skeleton */}
                  <div className="w-[100px] h-[80px] bg-gray-200 rounded-md animate-pulse" />

                  <div className="flex-grow">
                    {/* Title skeleton */}
                    <div className="h-5 w-40 bg-gray-200 rounded-md animate-pulse mb-2" />

                    {/* Description skeleton */}
                    <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-2" />

                    {/* Price skeleton */}
                    <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse mb-3" />

                    {/* Quantity controls skeleton */}
                    <div className="flex items-center space-x-2 mt-3">
                      <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse" />
                      <div className="h-4 w-8 bg-gray-200 rounded-md animate-pulse" />
                      <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse" />
                    </div>
                  </div>

                  {/* Delete button skeleton */}
                  <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column - Checkout summary skeleton */}
        <div className="w-full md:w-1/3 drop-shadow-md">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
            {/* Summary title skeleton */}
            <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-4" />

            {/* Subtotal skeleton */}
            <div className="flex justify-between mb-2">
              <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" />
            </div>

            {/* Delivery skeleton */}
            <div className="flex justify-between mb-4">
              <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              {/* Total skeleton */}
              <div className="flex justify-between mb-1">
                <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-5 w-20 bg-gray-200 rounded-md animate-pulse" />
              </div>
              {/* VAT skeleton */}
              <div className="h-3 w-24 bg-gray-200 rounded-md animate-pulse mt-1" />
            </div>

            {/* Checkout button skeleton */}
            <div className="h-12 w-full bg-gray-300 rounded-md animate-pulse" />

            {/* Payment methods skeleton */}
            <div className="mt-6">
              <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mb-3" />
              <div className="flex flex-wrap justify-between">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="h-6 w-10 bg-gray-200 rounded-md animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLoadingSkeleton;
