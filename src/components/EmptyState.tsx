import { Book } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="text-center text-gray-500 mt-12 flex flex-col items-center">
      <Book className="w-20 h-20 mb-4 text-indigo-200" />
      <p className="text-lg">Enter a book title or author to search</p>
      <p className="text-sm text-gray-400 mt-2">For best results, include both title and author</p>
    </div>
  );
}