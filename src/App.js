import BookList from './components/BookList';

function App() {
  return (
    <div className="container mx-auto">
      <header className="text-white p-4 m-4 rounded-lg bg-red-500">
        <h1 className="text-3xl font-bold">Books</h1>
      </header>
      <div className="px-5">
        <BookList />
      </div>
    </div>
  );
}

export default App;
