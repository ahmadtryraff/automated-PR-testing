'use client';

import { useState, useEffect } from 'react';
import Skeleton, { 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonCard, 
  SkeletonTable, 
  SkeletonSidebar, 
  SkeletonHeader 
} from '@/components/ui/skeleton';

// Example: Loading state for a user profile
export function UserProfileSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <SkeletonAvatar size="lg" />
        <div className="space-y-2">
          <Skeleton variant="rectangular" height="1.5rem" className="w-32" />
          <Skeleton variant="rectangular" height="1rem" className="w-24" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

// Example: Loading state for a dashboard
export function DashboardSkeleton() {
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

// Example: Loading state for a sidebar
export function SidebarSkeleton() {
  return <SkeletonSidebar />;
}

// Example: Loading state for a table
export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="rectangular" height="2rem" className="w-1/3" />
      <SkeletonTable rows={5} columns={4} />
    </div>
  );
}

// Example: Loading state for cards
export function CardsSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

// Example: Custom skeleton with different animations
export function CustomSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton 
        variant="rectangular" 
        height="2rem" 
        className="w-full"
        animation="pulse"
      />
      <Skeleton 
        variant="circular" 
        width={40} 
        height={40}
        animation="wave"
      />
      <Skeleton 
        variant="rounded" 
        height="1rem" 
        className="w-3/4"
        animation="none"
      />
    </div>
  );
}

// Example: Usage in a component with loading state
export function ExampleComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setData({ name: 'John Doe', email: 'john@example.com' });
    }, 2000);
  }, []);

  if (loading) {
    return <UserProfileSkeleton />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{data?.name}</h1>
      <p className="text-gray-600">{data?.email}</p>
    </div>
  );
}
