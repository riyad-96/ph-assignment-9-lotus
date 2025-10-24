function SkeletonAllAppSection() {
  return (
    <>
      <div className="h-12 animate-pulse rounded-lg bg-gray-200"></div>
      <div className="flex gap-2">
        <div className="h-7 flex-1 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-7 flex-1 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-7 flex-1 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-7 flex-1 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-7 flex-1 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-7 flex-1 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-7 flex-1 animate-pulse rounded-full bg-gray-200"></div>
      </div>

      <div className="grid min-h-[350px] grid-cols-2 sm:grid-cols-3 md:min-h-[600px] md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3 p-3">
            <div className="mb-4 aspect-square animate-pulse rounded-2xl bg-gray-200"></div>
            <div className="h-3 max-w-[150px] rounded-full bg-gray-200"></div>
            <div className="h-3 max-w-[70px] rounded-full bg-gray-200"></div>
            <div className="h-3 max-w-10 rounded-full bg-gray-200"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SkeletonAllAppSection;
