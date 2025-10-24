function SkeletonPopularCard() {
  return (
    <div className="animate-pulse px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="size-13 rounded-lg bg-gray-200"></div>
        <div>
          <div className="mb-2 h-2.5 w-40 rounded-full bg-gray-200"></div>
          <div className="mb-2.5 h-2 max-w-[70px] rounded-full bg-gray-200"></div>
          <div className="h-2 max-w-10 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonPopularCard;
