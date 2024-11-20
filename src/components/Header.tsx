import { Library } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <Library className="w-12 h-12 text-indigo-600" />
      </div>
      <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Book Search
      </h1>
      <p className="text-gray-600 text-lg">Search for books and easily copy their information</p>
    </div>
  );
}