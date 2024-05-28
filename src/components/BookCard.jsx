import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateBook } from '../features/books/bookSlice';
import BookRating from './BookRating';
import BookModal from './BookModal';

function BookCard({ book }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    if (!book) { return null; }
    const handleShelfChange = (event) => {
        dispatch(updateBook({ book, shelf: event.target.value }));
    };
    const handleCardClick = () => {
        setShowModal(true);
    };
    return (
        <>
            <div className="rounded-lg shadow-md overflow-hidden flex flex-col card">
                <div className="h-80">
                    <img src={book.imageLinks?.thumbnail}
                        alt={book.title}
                        className="w-full object-cover h-full"
                    />
                </div>

                <div className="p-4 flex-grow">
                    <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
                    <p className="text-sm text-gray-500 mb-2"> By{" "}
                        {book.authors && Array.isArray(book.authors)
                            ? book.authors.join(", ")
                            : "Unknown Author"}</p>
                    <p className="text-sm text-gray-500 mb-2">{book.publisher}</p>
                    <p className="text-sm text-gray-500 mb-2">{book.publishedDate}</p>
                    <BookRating rating={book.averageRating} />
                </div>
                <div className="p-4 mt-auto">
                    <select
                        value={book.shelf || 'none'}
                        onChange={handleShelfChange}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                <button
                    onClick={handleCardClick}
                    className="p-2 focus:outline-none bg-lighter">
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
