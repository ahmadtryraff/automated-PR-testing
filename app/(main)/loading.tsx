import { Suspense } from 'react';
import Skeleton, { SkeletonSidebar, SkeletonHeader, SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';

export default function MainLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Skeleton variant="circular" width={64} height={64} />
        <div className="space-y-2">
          <Skeleton variant="rectangular" height="1.5rem" className="w-32" />
          <Skeleton variant="rectangular" height="1rem" className="w-24" />
        </div>
      </div>
    </div>
  );
}

export function MainSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<MainLoading />}>
      {children}
    </Suspense>
  );
}

export function SidebarLoading() {
  return <SkeletonSidebar />;
}

export function HeaderLoading() {
  return <SkeletonHeader />;
}

export function CardLoading() {
  return (
    <div className="space-y-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export function TableLoading() {
  return (
    <div className="space-y-4">
      <Skeleton variant="rectangular" height="2rem" className="w-1/3" />
      <SkeletonTable rows={5} columns={4} />
    </div>
  );
}

export function DashboardLoading() {
  return (
    <div className="space-y-6">
      <SkeletonHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <SkeletonTable rows={8} columns={5} />
    </div>
  );
}
