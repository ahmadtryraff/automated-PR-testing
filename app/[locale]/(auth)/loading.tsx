import Skeleton, { SkeletonTitle, SkeletonParagraph, SkeletonAvatar, SkeletonInput, SkeletonButton } from '@/components/ui/skeleton';

export default function AuthLoading() {
  return (
    <div className='flex h-full flex-col px-6 lg:px-11 lg:py-6'>
      {/* Header skeleton */}
      <div className='mx-auto flex w-full items-center justify-between gap-6 pb-3.5 pt-2.5 lg:py-0'>
        <Skeleton variant="rectangular" width="40px" height="40px" className="rounded" />
      </div>
      
      {/* Content skeleton */}
      <div className='flex flex-1 flex-col full-height justify-center'>
        <div className='mx-auto flex w-full max-w-[392px] flex-col gap-6 md:translate-x-1.5'>
          <div className="space-y-6">
            {/* Logo skeleton */}
            <div className="flex flex-col items-center gap-2">
              <SkeletonAvatar size="large" />
              <div className="space-y-2 text-center">
                <SkeletonTitle width="200px" />
                <SkeletonParagraph rows={1} width="250px" />
              </div>
            </div>
            
            {/* Divider skeleton */}
            <Skeleton variant="rectangular" height="1px" className="w-full" />
            
            {/* Form fields skeleton */}
            <div className="space-y-4">
              <div className="space-y-2">
                <SkeletonTitle width="80px" />
                <SkeletonInput size="default" />
              </div>
              <div className="space-y-2">
                <SkeletonTitle width="70px" />
                <SkeletonInput size="default" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton variant="circular" width="16px" height="16px" />
                  <SkeletonTitle width="120px" />
                </div>
                <SkeletonTitle width="100px" />
              </div>
              <SkeletonButton size="default" block />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer skeleton */}
      <div className='-mx-2 mt-auto flex items-center justify-between gap-4 pb-4 lg:mx-0 lg:pb-0'>
        <SkeletonTitle width="120px" />
        <SkeletonButton size="small" />
      </div>
    </div>
  );
}
