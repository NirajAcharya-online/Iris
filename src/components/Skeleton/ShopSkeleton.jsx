const ShopSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm w-full">
      <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      </div>

      <div className="mt-4 h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>

      <div className="mt-3 h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>

      <div className="mt-4 flex justify-between items-center">
        <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
export default ShopSkeleton;
