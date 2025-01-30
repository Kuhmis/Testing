"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const books_1 = require("./api/books");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Enable CORS for dev
app.use((0, cors_1.default)());
// Serve the client/build if it exists (production scenario)
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
// Our API
app.use('/api/books', books_1.booksRouter);
// Fallback to index.html (for client routing in production)
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/build/index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
