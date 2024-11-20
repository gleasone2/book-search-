import { Search, BookOpen, User } from 'lucide-react';

interface SearchBarProps {
  titleQuery: string;
  setTitleQuery: (query: string) => void;
  authorQuery: string;
  setAuthorQuery: (query: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchBar({ 
  titleQuery,
  setTitleQuery,
  authorQuery,
  setAuthorQuery,
  onSearch,
  loading,
}: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter exact book title..."
            className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white/80 backdrop-blur-sm"
          />
          <BookOpen className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </div>

        <div className="relative">
          <input
            type="text"
            value={authorQuery}
            onChange={(e) => setAuthorQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter author name (optional)..."
            className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white/80 backdrop-blur-sm"
          />
          <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </div>

        <button
          onClick={onSearch}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            'Searching...'
          ) : (
            <>
              <Search className="w-5 h-5" />
              Search Books
            </>
          )}
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Enter exact title and/or author name for precise results
      </p>
    </div>
  );
}