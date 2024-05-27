import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, searchBooksLocal } from '../features/books/bookSlice';
import BookCard from './BookCard';
import BookCardSkeleton from './BookCardSkeleton';

function BookList() {
    const dispatch = useDispatch();
    const filteredBooks = useSelector(state => state.books.filteredBooks);
    const status = useSelector(state => state.books.status);
    const error = useSelector(state => state.books.error);
    const isLoading = status === 'loading';

    useEffect(() => {
        if (status === 'idle')
            dispatch(fetchBooks());
    }, [dispatch, status]);

    const handleSearchChange = (event) => {
        dispatch(searchBooksLocal(event.target.value));
    };

    return (
        <div className="container mx-auto">
            {/* Alert to display the errors  */}
            {status === 'failed' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
            <input
                type="text"
                placeholder="Search books..."
                onChange={handleSearchChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {isLoading ? (
                    Array.from({ length: 9 }).map((_, index) => (
                        <BookCardSkeleton key={index} />
                    ))
                ) : (
                    filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))
                )}
            </div>
        </div>
    );
}

export default BookList;
