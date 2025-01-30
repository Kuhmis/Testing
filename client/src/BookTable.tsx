import React, { useState } from 'react';

interface Book {
  index: number;
  isbn: string;
  title: string;
  authors: string;
  publisher: string;
  likes: number;
  reviewsCount: number;
}

interface Props {
  books: Book[];
}

const BookTable: React.FC<Props> = ({ books }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#eee' }}>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Index</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>ISBN</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Authors</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Publisher</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Likes</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Reviews</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <React.Fragment key={i}>
              <tr
                onClick={() => toggleExpand(i)}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.index}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.isbn}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.title}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.authors}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.publisher}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.likes}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.reviewsCount}</td>
              </tr>
              {isExpanded && (
                <tr>
                  <td colSpan={7} style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={`https://picsum.photos/seed/${book.isbn}/100/150`}
                        alt="cover"
                      />
                      <div>
                        <h4>{book.title}</h4>
                        <p><b>Authors: </b>{book.authors}</p>
                        <p><b>Publisher: </b>{book.publisher}</p>
                        <p><b>Likes: </b>{book.likes} / <b>Reviews: </b>{book.reviewsCount}</p>
                        {Array.from({ length: book.reviewsCount }, (_, idx) => (
                          <div key={idx} style={{ marginTop: '0.5rem' }}>
                            <b>Review #{idx + 1}:</b> This is a sample review text. (You can fetch real text from your server if desired.)
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookTable;
