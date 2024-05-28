import React from 'react';
import BookRating from './BookRating';
import PropTypes from 'prop-types';

const BookModal = ({ book, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="dialog p-8 rounded-lg shadow-lg max-w-3xl w-full md:w-3/4 max-h-[90vh] overflow-hidden flex flex-col relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-80 p-4 md:h-auto">
                        <img
                            src={book.imageLinks?.thumbnail}
                            alt={book.title}
                            className="w-full h-full object-cover rounded-md md:w-64"
                        />
                    </div>
                    <div className="flex-grow flex flex-col justify-center p-2 md:p-4">
                        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                        <p className="text-sm text-gray-500 mb-1">{book.subtitle}</p>
                        <p className="text-gray-700 mb-4">{book.authors?.join(', ')}</p>
                        <BookRating rating={book.averageRating} />
                    </div>
                </div>
                <div className="overflow-y-auto max-h-[calc(90vh-28rem)] w-full mt-2 md:mt-4">
                    <p className="text-gray-700 p-4">{book.description}</p>
                </div>
                <div className="mt-2 p-4">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md focus:outline-none  flex items-center bg-red-500 text-white hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

BookModal.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        publisher: PropTypes.string,
        publishedDate: PropTypes.string,
        description: PropTypes.string,
        imageLinks: PropTypes.shape({
            thumbnail: PropTypes.string
        }),
        averageRating: PropTypes.number,
        ratingsCount: PropTypes.number,
        shelf: PropTypes.string,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default BookModal;
