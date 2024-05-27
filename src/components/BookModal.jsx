import React from 'react';
import BookRating from './BookRating';

const BookModal = ({ book, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full md:w-3/4 max-h-[90vh] overflow-hidden flex flex-col">
                <img
                    src={book.imageLinks?.thumbnail}
                    alt={book.title}
                    className="w-full h-80 object-cover rounded-md mb-4"
                />
                <div className="mb-2">
                    <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                    <p className="text-sm text-gray-500 mb-1">{book.subtitle}</p>
                    <p className="text-gray-700 mb-4">{book.authors?.join(', ')}</p>
                    <BookRating rating={book.averageRating} />
                </div>
                <div className="overflow-y-auto max-h-[calc(90vh-18rem)] flex-grow">
                    <div className="flex flex-col space-y-4">
                        <p className="text-gray-700">{book.description}</p>
                    </div>
                </div>
                <div className="mt-4 p-4">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookModal;
