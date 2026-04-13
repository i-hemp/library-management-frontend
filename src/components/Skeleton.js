import React from 'react';

const Skeleton = ({ className }) => {
    return (
        <div className={`animate-pulse bg-gray-300 rounded ${className}`}></div>
    );
};

export const CardSkeleton = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <div className="flex gap-2 mt-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    );
};

export const StatsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto px-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                    <Skeleton className="h-4 w-24 mb-4 bg-white/20" />
                    <Skeleton className="h-10 w-16 bg-white/30" />
                </div>
            ))}
        </div>
    );
};

export default Skeleton;
