import Skeleton, { SkeletonTitle, SkeletonParagraph, SkeletonAvatar, SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';

export default function MainLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Animated Logo Loader */}
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-lg animate-bounce flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded animate-ping"></div>
          </div>
        </div>
        <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-ping opacity-20"></div>
      </div>
    </div>
  );
}
