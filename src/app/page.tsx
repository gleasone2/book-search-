'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import EmptyState from '@/components/EmptyState';
import { BookData } from '@/types/book';
import toast from 'react-hot-toast';

export default function Home() {
  const [titleQuery, setTitleQuery] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!titleQuery.trim() && !authorQuery.trim()) {
      toast.error('Please enter a title or author');
      return;
    }
    
    setLoading(true);
    try {
      // Construct query with both title and author if provided
      const titlePart = titleQuery.trim() ? `intitle:"${titleQuery.trim()}"` : '';
      const authorPart = authorQuery.trim() ? `inauthor:"${authorQuery.trim()}"` : '';
      const query = [titlePart, authorPart].filter(Boolean).join('+');
      
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=3&orderBy=relevance&printType=books`
      );
      const data = await response.json();
      setBooks(data.items || []);
      
      if (!data.items?.length) {
        toast.error('No exact matches found. Try refining your search.');
      }
    } catch (error) {
      toast.error('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <Header />
        <SearchBar 
          titleQuery={titleQuery}
          setTitleQuery={setTitleQuery}
          authorQuery={authorQuery}
          setAuthorQuery={setAuthorQuery}
          onSearch={searchBooks}
          loading={loading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {books.length === 0 && !loading && <EmptyState />}
      </div>
    </main>
  );
}