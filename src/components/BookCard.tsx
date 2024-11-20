import { Copy, ExternalLink } from 'lucide-react';
import { BookData } from '@/types/book';
import toast from 'react-hot-toast';

interface BookCardProps {
  book: BookData;
}

export default function BookCard({ book }: BookCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  const getSeries = (book: BookData) => {
    const seriesInfo = book.volumeInfo.seriesInfo;
    if (!seriesInfo?.bookSeriesTitle) return null;
    return seriesInfo.bookSeriesTitle;
  };

  const getGoodreadsUrl = () => {
    const identifiers = book.volumeInfo.industryIdentifiers;
    if (!identifiers) return null;

    // Prefer ISBN_13, fallback to ISBN_10
    const isbn = identifiers.find(id => id.type === 'ISBN_13')?.identifier ||
                identifiers.find(id => id.type === 'ISBN_10')?.identifier;

    return isbn ? `https://www.goodreads.com/book/isbn/${isbn}` : null;
  };

  const copyBookInfo = () => {
    const series = getSeries(book);
    const goodreadsUrl = getGoodreadsUrl();
    
    const info = `Title: ${book.volumeInfo.title}
Author(s): ${book.volumeInfo.authors?.join(', ') || 'Unknown'}
Published: ${formatDate(book.volumeInfo.publishedDate)}${series ? `\nSeries: ${series}` : ''}${goodreadsUrl ? `\nGoodreads: ${goodreadsUrl}` : ''}`;
    
    navigator.clipboard.writeText(info);
    toast.success('Book information copied to clipboard!');
  };

  const series = getSeries(book);
  const goodreadsUrl = getGoodreadsUrl();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-indigo-50">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {book.volumeInfo.imageLinks?.thumbnail && (
            <img
              src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
              alt={book.volumeInfo.title}
              className="w-24 h-36 object-cover rounded-lg shadow-md"
            />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
              {book.volumeInfo.title}
            </h3>
            <p className="text-gray-600 mb-1 text-sm">
              By {book.volumeInfo.authors?.join(', ') || 'Unknown'}
            </p>
            <p className="text-gray-500 text-sm mb-1">
              Published: {formatDate(book.volumeInfo.publishedDate)}
            </p>
            {series && (
              <p className="text-indigo-600 text-sm font-medium mb-1">
                Series: {series}
              </p>
            )}
            {goodreadsUrl && (
              <a
                href={goodreadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                View on Goodreads
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
        <button
          onClick={copyBookInfo}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy Info
        </button>
      </div>
    </div>
  );
}