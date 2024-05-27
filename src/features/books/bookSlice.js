import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAll, get, search, update } from './../../BooksApi';

const initialState = {
    books: [],
    filteredBooks: [],
    searchTerm: '',
    status: 'idle',
    error: '',
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', getAll);
export const searchBooks = createAsyncThunk('books/searchBooks', (query) => search(query, 10));
export const fetchBook = createAsyncThunk('books/fetchBook', get);
export const updateBook = createAsyncThunk('books/updateBook', ({ book, shelf }) => update(book, shelf));
export const resetError = createAsyncThunk('books/resetError', () => { 
    initialState.error = '';
    initialState.status = 'idle';
});

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        searchBooksLocal(state, action) {
            state.searchTerm = action.payload.toLowerCase();
            state.filteredBooks = state.books.filter(book =>
                book.title.toLowerCase().includes(state.searchTerm)
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
            .addCase(searchBooks.fulfilled, (state, action) => {
                state.filteredBooks = action.payload;
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
                if (!newShelf) {
                    return;
                }
                state.books = state.books.map((book) => {
                    if (book.id === updatedBookId) {
                        return { ...book, shelf: newShelf };
                    }
                    return book;
                });
                state.filteredBooks = state.books.filter(book =>
                    book.title.toLowerCase().includes(state.searchTerm)
                );
            });
    },
});

export const { searchBooksLocal } = bookSlice.actions;
export default bookSlice.reducer;
