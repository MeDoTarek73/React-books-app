// BookList.jsx (Revised)

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, searchBooksLocal, searchBooks } from '../features/books/bookSlice';
import BookCard from './BookCard';
import BookCardSkeleton from './BookCardSkeleton';
import SearchTabs from './SearchTabs';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

function BookList() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.books.status);
    const error = useSelector(state => state.books.error);
    const hasFetched = useSelector(state => state.books.hasFetched);
    const searchedBooks = useSelector(state => state.books.searchedBooks);
    const isLoading = status === 'loading';

    const [activeTab, setActiveTab] = useState('myReads');
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        if (status === 'idle')
            dispatch(fetchBooks());
    }, [dispatch, status]);

    const handleMyReadsSearchChange = (event) => {
        setSearchTerm(event.target.value);
        dispatch(searchBooksLocal(event.target.value));
    };

    const handleOnlineSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchOnlineBooks = async () => {
        if (searchTerm.length > 0) {
            dispatch(searchBooks(searchTerm));
        }
    };



    const handleTabChange = (tab) => {
        setSearchTerm('');
        setActiveTab(tab);
    };

    const groupedBooks = useSelector(state => Array.isArray(state.books.filteredBooks) ? state.books.filteredBooks : [])
        .reduce((acc, book) => { // Check if filteredBooks is an array
            const shelf = book.shelf || 'none';
            acc[shelf] = acc[shelf] || [];
            acc[shelf].push(book);
            return acc;
        }, {});
    const shelves = ['currentlyReading', 'wantToRead', 'read'];
    const ShelfNames = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read',
        none: 'None',
    };

    return (
        <div className="container mx-auto">

            <SearchTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === 'myReads' && (
                <>
                    <input
                        type="text"
                        placeholder="Search books..."
                        onChange={handleMyReadsSearchChange}
                        className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {status === 'failed' && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}
                    {shelves.map((shelf) => {
                        const booksInShelf = groupedBooks[shelf] || [];
                        if (booksInShelf.length > 0 || isLoading) {
                            return (
                                <div key={shelf} className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 p-2 rounded-t-md">
                                        {ShelfNames[shelf]}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {isLoading && !hasFetched ? (
                                            Array.from({ length: 3 }).map((_, index) => (
                                                <BookCardSkeleton key={'skeleton_' + index} />
                                            ))
                                        ) : (
                                            booksInShelf.map((book) => (
                                                <BookCard key={book.id} book={book} />
                                            ))
                                        )}
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </>
            )}

            {activeTab === 'online' && (
                <div>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Search online..."
                            value={searchTerm}
                            onChange={handleOnlineSearchChange}
                            className="w-full p-2 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <button
                            onClick={searchOnlineBooks}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                        >
                            Search
                        </button>
                    </div>
                    {searchedBooks.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {searchedBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-8">
                            <MagnifyingGlassIcon className="w-16 h-16 text-gray-200 my-6" />
                            <p className="text-gray-500 text-lg">Search to find a book</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default BookList;
