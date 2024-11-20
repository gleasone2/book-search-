import React, { useState } from 'react';
import { Search, Book, Copy, Library } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=9`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      toast.error('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyBookInfo = (book: BookData) => {
    const info = `Title: ${book.volumeInfo.title}
Author(s): ${book.volumeInfo.authors?.join(', ') || 'Unknown'}
Published: ${book.volumeInfo.publishedDate || 'Unknown'}`;
    
    navigator.clipboard.writeText(info);
    toast.success('Book information copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Toaster position="top-center" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Library className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Search</h1>
          <p className="text-gray-600">Search for books and easily copy their information</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
                placeholder="Search for books..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={searchBooks}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {book.volumeInfo.title}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      By {book.volumeInfo.authors?.join(', ') || 'Unknown'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Published: {book.volumeInfo.publishedDate || 'Unknown'}
                    </p>
                  </div>
                  {book.volumeInfo.imageLinks?.thumbnail && (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                      alt={book.volumeInfo.title}
                      className="w-20 h-28 object-cover rounded-md ml-4"
                    />
                  )}
                </div>
                <button
                  onClick={() => copyBookInfo(book)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy Info
                </button>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-8 flex flex-col items-center">
            <Book className="w-16 h-16 mb-4 text-gray-300" />
            <p>Search for books to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;