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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var axios_1 = __importDefault(require("axios"));
var react_infinite_scroll_component_1 = __importDefault(require("react-infinite-scroll-component"));
var react_csv_1 = require("react-csv");
var BookTable_1 = __importDefault(require("./BookTable"));
var BookGallery_1 = __importDefault(require("./BookGallery"));
function App() {
    var _this = this;
    // user controls
    var _a = (0, react_1.useState)('English'), language = _a[0], setLanguage = _a[1];
    var _b = (0, react_1.useState)('US'), region = _b[0], setRegion = _b[1];
    var _c = (0, react_1.useState)('123'), seed = _c[0], setSeed = _c[1];
    var _d = (0, react_1.useState)(3.7), avgLikes = _d[0], setAvgLikes = _d[1];
    var _e = (0, react_1.useState)(0.5), avgReviews = _e[0], setAvgReviews = _e[1];
    // data
    var _f = (0, react_1.useState)([]), books = _f[0], setBooks = _f[1];
    var _g = (0, react_1.useState)(1), page = _g[0], setPage = _g[1];
    var _h = (0, react_1.useState)(true), hasMore = _h[0], setHasMore = _h[1];
    // view mode: table or gallery
    var _j = (0, react_1.useState)('table'), viewMode = _j[0], setViewMode = _j[1];
    (0, react_1.useEffect)(function () {
        // whenever these inputs change, reset and load page=1
        setPage(1);
        setBooks([]);
        setHasMore(true);
        loadBooks(1, true);
        // eslint-disable-next-line
    }, [language, region, seed, avgLikes, avgReviews]);
    var loadBooks = function (pageToLoad, isFirst) { return __awaiter(_this, void 0, void 0, function () {
        var data_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get('/api/books', {
                            params: {
                                language: language,
                                region: region,
                                seed: seed,
                                likes: avgLikes,
                                reviews: avgReviews,
                                page: pageToLoad
                            }
                        })];
                case 1:
                    data_1 = (_a.sent()).data;
                    if (isFirst) {
                        setBooks(data_1);
                    }
                    else {
                        setBooks(function (prev) { return __spreadArray(__spreadArray([], prev, true), data_1, true); });
                    }
                    if (data_1.length === 0) {
                        setHasMore(false);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    setHasMore(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var fetchMoreData = function () {
        var nextPage = page + 1;
        setPage(nextPage);
        loadBooks(nextPage, false);
    };
    var generateRandomSeed = function () {
        var randomSeed = Math.floor(Math.random() * 1000000).toString();
        setSeed(randomSeed);
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { margin: '1rem' } }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Fake Book Generator" }), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { marginBottom: '1rem' } }, { children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Language:", (0, jsx_runtime_1.jsxs)("select", __assign({ value: language, onChange: function (e) { return setLanguage(e.target.value); } }, { children: [(0, jsx_runtime_1.jsx)("option", __assign({ value: "English" }, { children: "English" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "German" }, { children: "German" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "French" }, { children: "French" }))] }))] }), (0, jsx_runtime_1.jsxs)("label", __assign({ style: { marginLeft: '1rem' } }, { children: ["Region:", (0, jsx_runtime_1.jsxs)("select", __assign({ value: region, onChange: function (e) { return setRegion(e.target.value); } }, { children: [(0, jsx_runtime_1.jsx)("option", __assign({ value: "US" }, { children: "US" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "DE" }, { children: "DE" })), (0, jsx_runtime_1.jsx)("option", __assign({ value: "FR" }, { children: "FR" }))] }))] })), (0, jsx_runtime_1.jsxs)("label", __assign({ style: { marginLeft: '1rem' } }, { children: ["Seed:", (0, jsx_runtime_1.jsx)("input", { value: seed, onChange: function (e) { return setSeed(e.target.value); } }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: generateRandomSeed, style: { marginLeft: '0.5rem' } }, { children: "Random" }))] })), (0, jsx_runtime_1.jsxs)("label", __assign({ style: { marginLeft: '1rem' } }, { children: ["Avg Likes (", avgLikes, "):", (0, jsx_runtime_1.jsx)("input", { type: "range", min: "0", max: "10", step: "0.1", value: avgLikes, onChange: function (e) { return setAvgLikes(parseFloat(e.target.value)); } })] })), (0, jsx_runtime_1.jsxs)("label", __assign({ style: { marginLeft: '1rem' } }, { children: ["Avg Reviews:", (0, jsx_runtime_1.jsx)("input", { type: "number", step: "0.1", style: { width: '4rem' }, value: avgReviews, onChange: function (e) { return setAvgReviews(parseFloat(e.target.value)); } })] })), (0, jsx_runtime_1.jsxs)("button", __assign({ style: { marginLeft: '1rem' }, onClick: function () { return setViewMode(viewMode === 'table' ? 'gallery' : 'table'); } }, { children: ["Toggle ", viewMode === 'table' ? 'Gallery' : 'Table', " View"] })), (0, jsx_runtime_1.jsx)(react_csv_1.CSVLink, __assign({ data: books, filename: "books.csv", style: { marginLeft: '1rem', textDecoration: 'none', border: '1px solid #ccc', padding: '0.4rem' } }, { children: "Export to CSV" }))] })), (0, jsx_runtime_1.jsx)(react_infinite_scroll_component_1["default"], __assign({ dataLength: books.length, next: fetchMoreData, hasMore: hasMore, loader: (0, jsx_runtime_1.jsx)("h4", { children: "Loading..." }), endMessage: (0, jsx_runtime_1.jsx)("p", { children: "No more books." }) }, { children: viewMode === 'table' ? ((0, jsx_runtime_1.jsx)(BookTable_1["default"], { books: books })) : ((0, jsx_runtime_1.jsx)(BookGallery_1["default"], { books: books })) }))] })));
}
exports["default"] = App;
