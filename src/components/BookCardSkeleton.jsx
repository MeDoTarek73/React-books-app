import React from 'react';

const BookCardSkeleton = () => (
    <div className="bg-light rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-400"></div>
        <div className="p-4">
            <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-400 rounded mb-2"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2"></div>
        </div>
    </div>
);

export default BookCardSkeleton;
