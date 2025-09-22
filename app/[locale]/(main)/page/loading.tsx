import Skeleton, { SkeletonCard } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome section */}
      <div className="space-y-2">
        <Skeleton variant="rectangular" height="2rem" className="w-1/3" />
        <Skeleton variant="rectangular" height="1rem" className="w-1/2" />
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg">
            <Skeleton variant="rectangular" height="1rem" className="w-1/2 mb-2" />
            <Skeleton variant="rectangular" height="2rem" className="w-3/4" />
          </div>
        ))}
      </div>
      
      {/* Recent activity */}
      <div className="space-y-4">
        <Skeleton variant="rectangular" height="1.5rem" className="w-1/4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1 space-y-1">
                <Skeleton variant="rectangular" height="1rem" className="w-3/4" />
                <Skeleton variant="rectangular" height="0.75rem" className="w-1/2" />
              </div>
              <Skeleton variant="rectangular" height="1rem" className="w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
