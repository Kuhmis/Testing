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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var BookTable = function (_a) {
    var books = _a.books;
    var _b = (0, react_1.useState)(null), expandedIndex = _b[0], setExpandedIndex = _b[1];
    var toggleExpand = function (idx) {
        setExpandedIndex(expandedIndex === idx ? null : idx);
    };
    return ((0, jsx_runtime_1.jsxs)("table", __assign({ style: { width: '100%', borderCollapse: 'collapse' } }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", __assign({ style: { backgroundColor: '#eee' } }, { children: [(0, jsx_runtime_1.jsx)("th", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: "Index" })), (0, jsx_runtime_1.jsx)("th", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: "ISBN" })), (0, jsx_runtime_1.jsx)("th", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: "Title" })), (0, jsx_runtime_1.jsx)("th", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: "Authors" })), (0, jsx_runtime_1.jsx)("th", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: "Publisher" })), (0, jsx_runtime_1.jsx)("th", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: "Likes" })), (0, jsx_runtime_1.jsx)("th", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: "Reviews" }))] })) }), (0, jsx_runtime_1.jsx)("tbody", { children: books.map(function (book, i) {
                    var isExpanded = expandedIndex === i;
                    return ((0, jsx_runtime_1.jsxs)(react_1["default"].Fragment, { children: [(0, jsx_runtime_1.jsxs)("tr", __assign({ onClick: function () { return toggleExpand(i); }, style: { cursor: 'pointer' } }, { children: [(0, jsx_runtime_1.jsx)("td", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: book.index })), (0, jsx_runtime_1.jsx)("td", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: book.isbn })), (0, jsx_runtime_1.jsx)("td", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: book.title })), (0, jsx_runtime_1.jsx)("td", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: book.authors })), (0, jsx_runtime_1.jsx)("td", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: book.publisher })), (0, jsx_runtime_1.jsx)("td", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: book.likes })), (0, jsx_runtime_1.jsx)("td", __assign({ style: { border: '1px solid #ccc', padding: '8px' } }, { children: book.reviewsCount }))] })), isExpanded && ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", __assign({ colSpan: 7, style: { border: '1px solid #ccc', padding: '8px' } }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ style: { display: 'flex', alignItems: 'center', gap: '1rem' } }, { children: [(0, jsx_runtime_1.jsx)("img", { src: "https://picsum.photos/seed/".concat(book.isbn, "/100/150"), alt: "cover" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: book.title }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("b", { children: "Authors: " }), book.authors] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("b", { children: "Publisher: " }), book.publisher] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("b", { children: "Likes: " }), book.likes, " / ", (0, jsx_runtime_1.jsx)("b", { children: "Reviews: " }), book.reviewsCount] }), Array.from({ length: book.reviewsCount }, function (_, idx) { return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { marginTop: '0.5rem' } }, { children: [(0, jsx_runtime_1.jsxs)("b", { children: ["Review #", idx + 1, ":"] }), " This is a sample review text. (You can fetch real text from your server if desired.)"] }), idx)); })] })] })) })) }))] }, i));
                }) })] })));
};
exports["default"] = BookTable;
