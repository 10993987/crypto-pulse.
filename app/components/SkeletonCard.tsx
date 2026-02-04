export const SkeletonCard = () => (
    <div className="p-4 rounded-2xl bg-[#16171a] border border-gray-800 flex justify-between items-center animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            <div>
                <div className="h-5 w-24 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-12 bg-gray-800 rounded"></div>
            </div>
        </div>
        <div className="text-right">
            <div className="h-5 w-20 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-12 bg-gray-800 rounded ml-auto"></div>
        </div>
    </div>
);


