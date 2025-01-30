import express from 'express';
import path from 'path';
import cors from 'cors';
import { booksRouter } from './api/books';

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for dev
app.use(cors());

// Serve the client/build if it exists (production scenario)
app.use(express.static(path.join(__dirname, '../../client/build')));

// Our API
app.use('/api/books', booksRouter);

// Fallback to index.html (for client routing in production)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
