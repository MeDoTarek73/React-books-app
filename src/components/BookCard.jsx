import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateBook } from '../features/books/bookSlice';
import BookRating from './BookRating';
import { useState } from 'react';
import BookModal from './BookModal';

function BookCard({ book }) {
    
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    if (!book) { return null; }

    const handleShelfChange = (event) => {
        dispatch(updateBook({ book, shelf: event.target.value }));
    };

    const handleShelfRemove = () => {
        dispatch(updateBook({ book, shelf: 'None' }));
    }

    const handleCardClick = () => {
        setShowModal(true);
    };
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <img src={book.imageLinks?.thumbnail}
                    alt={book.title}
                    className="w-full object-cover h-60 image-rendering-crisp-edges"
                />

                <div className="p-4 flex-grow">
                    <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">{book.authors.join(', ')}</p>
                    <p className="text-sm text-gray-500 mb-2">{book.publisher}</p>
                    <p className="text-sm text-gray-500 mb-2">{book.publishedDate}</p>
                    <BookRating rating={book.averageRating} />
                </div>
                <div className="bg-gray-100 p-4 mt-auto">
                    <select
                        value={book.shelf || 'none'}
                        onChange={handleShelfChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                    </select>
                </div>
                <button
                    onClick={handleShelfRemove}
                    className="bg-red-200 text-gray-800 p-2 hover:bg-gray-300 focus:outline-none">
                    Remove
                </button>
                <button
                    onClick={handleCardClick}
                    className="bg-gray-200 text-gray-800 p-2 rounded-b-md hover:bg-gray-300 focus:outline-none">
                    Read Book Details
                </button>
            </div>
            <BookModal book={book} isOpen={showModal} onClose={() => setShowModal(false)} />
        </>

    );
}

BookCard.propTypes = {
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
};

export default BookCard;
