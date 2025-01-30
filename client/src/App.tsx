import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CSVLink } from 'react-csv';
import BookTable from './BookTable';
import BookGallery from './BookGallery';

interface Book {
  index: number;
  isbn: string;
  title: string;
  authors: string;
  publisher: string;
  likes: number;
  reviewsCount: number;
}

function App() {
  const [language, setLanguage] = useState('English');
  const [region, setRegion] = useState('US');
  const [seed, setSeed] = useState(0);
  const [likes, setLikes] = useState(5);
  const [reviews, setReviews] = useState(5);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'gallery'>('table');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books', {
          params: { language, region, seed, likes, reviews, page },
        });

        setBooks((prevBooks) => [...prevBooks, ...response.data]);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [language, region, seed, likes, reviews, page]);

  const fetchMoreBooks = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Book Store Tester</h1>

      {/* Controls */}
      <div>
        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English (US)</option>
          <option value="German">German (Germany)</option>
          <option value="French">French (France)</option>
        </select>

        <label>Seed:</label>
        <input type="number" value={seed} onChange={(e) => setSeed(Number(e.target.value))} />

        <label>Likes:</label>
        <input type="range" min="0" max="10" step="0.1" value={likes} onChange={(e) => setLikes(parseFloat(e.target.value))} />

        <label>Reviews:</label>
        <input type="number" min="0" max="10" step="0.1" value={reviews} onChange={(e) => setReviews(parseFloat(e.target.value))} />

        <button onClick={() => setSeed(Math.floor(Math.random() * 10000))}>Random Seed</button>

        <button onClick={() => setViewMode(viewMode === 'table' ? 'gallery' : 'table')}>
          {viewMode === 'table' ? 'Switch to Gallery View' : 'Switch to Table View'}
        </button>
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll dataLength={books.length} next={fetchMoreBooks} hasMore={true} loader={<h4>Loading...</h4>}>
        {viewMode === 'table' ? <BookTable books={books} /> : <BookGallery books={books} />}
      </InfiniteScroll>

      {/* CSV Export */}
      <CSVLink data={books} filename="books.csv">
        <button>Export to CSV</button>
      </CSVLink>
    </div>
  );
}

export default App;
