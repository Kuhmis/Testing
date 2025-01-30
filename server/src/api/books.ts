import { Router } from 'express';
import { Faker, de, en, fr } from '@faker-js/faker';

export const booksRouter = Router();
const locales = { en, de, fr };

function mapLanguageRegionToFakerLocale(lang: string, region: string): keyof typeof locales {
  const key = `${lang.toLowerCase()}-${region.toLowerCase()}`;

  const mappings: Record<string, keyof typeof locales> = {
    "english-us": "en",
    "german-germany": "de",
    "french-france": "fr",
  };

  return mappings[key] || "en";  // Default to English if not found
}

booksRouter.get('/', (req, res) => {
  try {
    const language = String(req.query.language || 'English');
    const region = String(req.query.region || 'US');
    const seed = Number(req.query.seed || 0);
    const page = Number(req.query.page || 1);
    const avgLikes = parseFloat(String(req.query.likes || '0'));
    const avgReviews = parseFloat(String(req.query.reviews || '0'));
    const combinedSeed = seed + page * 10000;
    const localeKey = mapLanguageRegionToFakerLocale(language, region);
    const faker = new Faker({ locale: locales[localeKey] });
    faker.seed(combinedSeed);
    const batchSize = page === 1 ? 20 : 10;
    const books = Array.from({ length: batchSize }, (_, i) => ({
      index: (page - 1) * batchSize + i + 1,
      isbn: faker.string.uuid(),
      title: faker.lorem.words(3),
      authors: faker.person.fullName(),
      publisher: faker.company.name(),
      likes: Math.round(avgLikes * faker.number.float({ min: 0, max: 2 })),
      reviewsCount: Math.round(avgReviews * faker.number.float({ min: 0, max: 2 })),
    }));

    res.json(books);
  } catch (error) {
    console.error('Error generating books:', error);
    res.status(500).json({ error: 'Failed to generate books' });
  }
});
