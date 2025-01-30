"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = require("express");
const faker_1 = require("@faker-js/faker");
exports.booksRouter = (0, express_1.Router)();
const locales = { en: faker_1.en, de: faker_1.de, fr: faker_1.fr };
exports.booksRouter.get('/', (req, res) => {
    // Extract query params
    const language = String(req.query.language || 'English');
    const region = String(req.query.region || 'US');
    const seed = Number(req.query.seed || 0);
    const page = Number(req.query.page || 1);
    const avgLikes = parseFloat(String(req.query.likes || '0'));
    const avgReviews = parseFloat(String(req.query.reviews || '0'));
    // Combine seed + page => stable generation
    const combinedSeed = seed + page * 10000;
    // Decide on locale from language+region
    const localeKey = mapLanguageRegionToFakerLocale(language, region);
    const faker = new faker_1.Faker({ locale: locales[localeKey] });
    // Set seed for stable results
    faker.seed(combinedSeed);
    // First page => 20 records, subsequent => 10
    const batchSize = page === 1 ? 20 : 10;
    // Calculate offset for index
    const offset = page === 1 ? 0 : 20 + (page - 2) * 10;
    const books = Array.from({ length: batchSize }, (_, i) => {
        const index = offset + i + 1;
        const isbn = faker.string.numeric(13);
        const title = faker.lorem.words({ min: 2, max: 5 });
        const authorsCount = faker.number.int({ min: 1, max: 2 });
        const authors = Array.from({ length: authorsCount }, () => faker.person.fullName()).join(', ');
        const publisher = faker.company.name();
        const likes = randomFractionalCount(avgLikes);
        const reviewsCount = randomFractionalCount(avgReviews);
        return {
            index,
            isbn,
            title,
            authors,
            publisher,
            likes,
            reviewsCount,
        };
    });
    res.json(books);
});
// Map language/region to a faker locale
function mapLanguageRegionToFakerLocale(lang, region) {
    if (lang.toLowerCase().includes('english') && region.toLowerCase().includes('us')) {
        return 'en';
    }
    else if (lang.toLowerCase().includes('german') && region.toLowerCase().includes('de')) {
        return 'de';
    }
    else if (lang.toLowerCase().includes('french') && region.toLowerCase().includes('fr')) {
        return 'fr';
    }
    return 'en';
}
// If avg=3.7 => 70% chance 4, 30% chance 3
function randomFractionalCount(avg) {
    if (avg === 0)
        return 0;
    const floorVal = Math.floor(avg);
    const frac = avg - floorVal;
    return Math.random() < frac ? floorVal + 1 : floorVal;
}
