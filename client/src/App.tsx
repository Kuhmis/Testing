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
  // user controls
  const [language, setLanguage] = useState('English');
  const [region, setRegion] = useState('US');
  const [seed, setSeed] = useState('123');
  const [avgLikes, setAvgLikes] = useState(3.7);
  const [avgReviews, setAvgReviews] = useState(0.5);

  // data
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // view mode: table or gallery
  const [viewMode, setViewMode] = useState<'table' | 'gallery'>('table');

  useEffect(() => {
    // whenever these inputs change, reset and load page=1
    setPage(1);
    setBooks([]);
    setHasMore(true);
    loadBooks(1, true);
    // eslint-disable-next-line
  }, [language, region, seed, avgLikes, avgReviews]);

  const loadBooks = async (pageToLoad: number, isFirst: boolean) => {
    try {
      const { data } = await axios.get<Book[]>('/api/books', {
        params: {
          language,
          region,
          seed,
          likes: avgLikes,
          reviews: avgReviews,
          page: pageToLoad,
        },
      });
      if (isFirst) {
        setBooks(data);
      } else {
        setBooks((prev) => [...prev, ...data]);
      }
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    }
  };

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadBooks(nextPage, false);
  };

  const generateRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000000).toString();
    setSeed(randomSeed);
  };

  return (
    <div style={{ margin: '1rem' }}>
      <h1>Fake Book Generator</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="German">German</option>
            <option value="French">French</option>
          </select>
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Region:
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="US">US</option>
            <option value="DE">DE</option>
            <option value="FR">FR</option>
          </select>
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Seed:
          <input value={seed} onChange={(e) => setSeed(e.target.value)} />
          <button onClick={generateRandomSeed} style={{ marginLeft: '0.5rem' }}>
            Random
          </button>
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Avg Likes ({avgLikes}):
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={avgLikes}
            onChange={(e) => setAvgLikes(parseFloat(e.target.value))}
          />
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Avg Reviews:
          <input
            type="number"
            step="0.1"
            style={{ width: '4rem' }}
            value={avgReviews}
            onChange={(e) => setAvgReviews(parseFloat(e.target.value))}
          />
        </label>

        <button
          style={{ marginLeft: '1rem' }}
          onClick={() => setViewMode(viewMode === 'table' ? 'gallery' : 'table')}
        >
          Toggle {viewMode === 'table' ? 'Gallery' : 'Table'} View
        </button>

        <CSVLink
          data={books}
          filename="books.csv"
          style={{ marginLeft: '1rem', textDecoration: 'none', border: '1px solid #ccc', padding: '0.4rem' }}
        >
          Export to CSV
        </CSVLink>
      </div>

      <InfiniteScroll
        dataLength={books.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more books.</p>}
      >
        {viewMode === 'table' ? (
          <BookTable books={books} />
        ) : (
          <BookGallery books={books} />
        )}
      </InfiniteScroll>
    </div>
  );
}

export default App;
