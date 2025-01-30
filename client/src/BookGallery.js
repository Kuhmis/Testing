"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var BookGallery = function (_a) {
    var books = _a.books;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem'
        } }, { children: books.map(function (book) { return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                border: '1px solid #ccc',
                padding: '0.5rem',
                borderRadius: '4px',
                backgroundColor: '#fafafa'
            } }, { children: [(0, jsx_runtime_1.jsx)("img", { src: "https://picsum.photos/seed/".concat(book.isbn, "/180/250"), alt: "cover", style: { width: '100%', marginBottom: '0.5rem' } }), (0, jsx_runtime_1.jsx)("h4", __assign({ style: { margin: 0 } }, { children: book.title })), (0, jsx_runtime_1.jsxs)("p", __assign({ style: { margin: 0 } }, { children: [(0, jsx_runtime_1.jsx)("b", { children: "Authors:" }), " ", book.authors] })), (0, jsx_runtime_1.jsxs)("p", __assign({ style: { margin: 0 } }, { children: [(0, jsx_runtime_1.jsx)("b", { children: "Publisher:" }), " ", book.publisher] })), (0, jsx_runtime_1.jsxs)("p", __assign({ style: { margin: 0 } }, { children: [(0, jsx_runtime_1.jsx)("b", { children: "Likes:" }), " ", book.likes] })), (0, jsx_runtime_1.jsxs)("p", __assign({ style: { margin: 0 } }, { children: [(0, jsx_runtime_1.jsx)("b", { children: "Reviews:" }), " ", book.reviewsCount] }))] }), book.index)); }) })));
};
exports["default"] = BookGallery;
