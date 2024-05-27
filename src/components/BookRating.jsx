import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const BookRating = ({ rating }) => {
    const validRating = typeof rating === 'number' && rating >= 0 ? rating : 0;
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="mt-2 flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <StarIcon
                    key={i}
                    className="h-5 w-5 text-yellow-500"
                />
            ))}
            {hasHalfStar && (
                <StarIcon
                    className="h-5 w-5 text-yellow-500"
                    style={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}
                />
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <StarIcon
                    key={i + fullStars + (hasHalfStar ? 1 : 0)}
                    className="h-5 w-5 text-gray-300"
                />
            ))}
        </div>
    );
};

export default BookRating;
