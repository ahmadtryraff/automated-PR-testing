import Skeleton, { SkeletonTable } from '@/components/ui/skeleton';

export default function OrdersLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton variant="rectangular" height="2rem" className="w-48" />
          <Skeleton variant="rectangular" height="1rem" className="w-64" />
        </div>
        <Skeleton variant="rectangular" height="2.5rem" className="w-32" />
      </div>
      
      {/* Filters */}
      <div className="flex gap-4">
        <Skeleton variant="rectangular" height="2.5rem" className="w-48" />
        <Skeleton variant="rectangular" height="2.5rem" className="w-32" />
        <Skeleton variant="rectangular" height="2.5rem" className="w-32" />
      </div>
      
      {/* Table */}
      <div className="border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height="1.5rem" className="flex-1" />
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="p-4">
              <div className="flex space-x-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} variant="rectangular" height="1rem" className="flex-1" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
