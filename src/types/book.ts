export interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail: string;
    };
    description?: string;
    seriesInfo?: {
      shortSeriesBookTitle?: string;
      bookSeriesTitle?: string;
    };
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
  };
}