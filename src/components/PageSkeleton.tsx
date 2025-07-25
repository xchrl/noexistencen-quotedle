import { Skeleton } from "./ui/skeleton";

export default function PageSkeleton() {
  return (
    <>
      {/* InfoCard skeleton version */}
      <div className="md:w-1/2">
        <div className="bg-background/80 border border-red-400 rounded-xl shadow-lg p-8 flex flex-col gap-6">
          <Skeleton className="w-[150px] h-[16px] self-center" />
          <div className="flex flex-col gap-4 text-lg text-center">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Skeleton className="w-[100px] h-[16px]" />
              <span className="px-2 py-1 rounded-sm bg-secondary">
                <Skeleton className="w-[25px] h-[25px]" />
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Skeleton className="w-[100px] h-[16px]" />
              <span className="px-2 py-1 rounded-sm bg-secondary">
                <Skeleton className="w-[25px] h-[25px]" />
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Skeleton className="w-[100px] h-[16px]" />
              <span className="px-2 py-1 rounded-sm bg-secondary">
                <Skeleton className="w-[75px] h-[25px]" />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* QuoteCard skeleton version */}
      <div className="md:w-1/2">
        <div className="bg-background/80 border border-red-400 rounded-xl shadow-lg p-8 w-full flex flex-col gap-6">
          <Skeleton className="w-1/3 h-[16px] mx-auto" />
          <div className="bg-secondary/90 rounded-lg p-6 text-xl text-center font-medium border border-neutral-700 mb-2">
            <Skeleton className="w-1/3 h-[16px] mx-auto" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Skeleton className="w-full py-6 mx-auto" />
            <Skeleton className="w-full py-6 mx-auto" />
            <Skeleton className="w-full py-6 mx-auto" />
            <Skeleton className="w-full py-6 mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
