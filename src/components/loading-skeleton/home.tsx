export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from(Array(8).keys()).map((item) => (
        <div
          key={item}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Image */}
          <div className="w-full h-48 object-cover bg-gray-200 mb-1" />

          <div className="p-4">
            {/* Title and price flex */}
            <div className="flex justify-between items-center mb-3">
              <div className="w-32 h-6 bg-gray-200 rounded" />
              <div className="w-12 h-6 bg-gray-200 rounded" />
            </div>

            {/* Tickets counter */}
            <div className="w-40 h-4 bg-gray-200 rounded mb-3" />

            {/* Description */}
            <div className="w-full h-8 bg-gray-200 rounded mb-7" />

            {/* Buttons */}
            <div className="flex justify-between gap-4 mb-1">
              <div className="w-1/3 h-9 bg-gray-200 rounded" />
              <div className="w-1/3 h-9 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
