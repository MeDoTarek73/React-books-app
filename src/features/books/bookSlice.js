import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAll, get, search, update } from './../../BooksApi';

const initialState = {
    books: [],
    searchedBooks: [],
    filteredBooks: [],
    searchTerm: '',
    status: 'idle',
    error: '',
    searchError: '',
    isOnlineSearchLoading: false,
    hasFetched: false,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', getAll);
export const searchBooks = createAsyncThunk('books/searchBooks', (query) => search(query, 10));
export const fetchBook = createAsyncThunk('books/fetchBook', get);
export const updateBook = createAsyncThunk('books/updateBook', ({ book, shelf }) => update(book, shelf));

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        searchBooksLocal(state, action) {
            state.filteredBooks = state.books.filter(book =>
                book.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = action.payload;
                state.filteredBooks = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                const updatedBookId = action.meta.arg.book.id;
                let newShelf = null;
                for (const [shelf, bookIds] of Object.entries(action.payload)) {
                    if (bookIds.includes(updatedBookId)) {
                        newShelf = shelf;
                        break;
                    }
                }
                const bookExists = state.books.some(book => book.id === updatedBookId);
                state.books = state.books.map((book) =>
                    book.id === updatedBookId ? { ...book, shelf: newShelf } : book
                );
                if (!bookExists) {
                    const newBook = { ...action.meta.arg.book, shelf: newShelf };
                    state.books.push(newBook);
                }
                state.searchedBooks = state.searchedBooks.map((book) =>
                    book.id === updatedBookId ? { ...book, shelf: newShelf } : book
                );
                console.log(newShelf);
                if (newShelf === "None") {
                    state.books = state.books.filter(book => book.id !== updatedBookId);
                    state.filteredBooks = state.searchedBooks.filter(book => book.id !== updatedBookId);
                }
                state.filteredBooks = state.books.filter(book =>
                    book.title.toLowerCase().includes(state.searchTerm)
                );
            })
            .addCase(searchBooks.pending, (state) => {
                state.isOnlineSearchLoading = true;
                state.searchedBooks = [];
            })
            .addCase(searchBooks.fulfilled, (state, action) => {
                state.isOnlineSearchLoading = false;
                if (action.payload.error) {
                    state.searchError = action.payload.error.message;
                    return;
                } else {
                    state.searchError = '';
                    state.searchedBooks = action.payload.map(book => ({
                        ...book,
                        authors: Array.isArray(book.authors) ? book.authors : [],
                    }));
                }
            })
            .addCase(searchBooks.rejected, (state, action) => {
                state.isOnlineSearchLoading = false;
                state.searchError = action.error.message;
            });
    },
});

export const { searchBooksLocal } = bookSlice.actions;
export default bookSlice.reducer;
