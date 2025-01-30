import React from 'react';

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

const BookGallery: React.FC<Props> = ({ books }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '1rem'
    }}>
      {books.map((book) => (
        <div
          key={book.index}
          style={{
            border: '1px solid #ccc',
            padding: '0.5rem',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}
        >
          <img
            src={`https://picsum.photos/seed/${book.isbn}/180/250`}
            alt="cover"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          <h4 style={{ margin: 0 }}>{book.title}</h4>
          <p style={{ margin: 0 }}>
            <b>Authors:</b> {book.authors}
          </p>
          <p style={{ margin: 0 }}>
            <b>Publisher:</b> {book.publisher}
          </p>
          <p style={{ margin: 0 }}>
            <b>Likes:</b> {book.likes}
          </p>
          <p style={{ margin: 0 }}>
            <b>Reviews:</b> {book.reviewsCount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookGallery;
