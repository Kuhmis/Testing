import { Router } from 'express';
import { faker } from '@faker-js/faker';

export const booksRouter = Router();

booksRouter.get('/', (req, res) => {
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
  const locale = mapLanguageRegionToFakerLocale(language, region);
  faker.locale = locale;

  // Set seed for stable results
  faker.seed(combinedSeed);

  // First page => 20 records, subsequent => 10
  const batchSize = page === 1 ? 20 : 10;
  // Calculate offset for index
  //   Page 1 => indexes 1..20
  //   Page 2 => indexes 21..30, etc.
  const offset = page === 1 ? 0 : 20 + (page - 2) * 10;

  const books = Array.from({ length: batchSize }, (_, i) => {
    const index = offset + i + 1;
    const isbn = faker.random.numeric(13);
    const title = faker.lorem.words({ min: 2, max: 5 });
    const authorsCount = faker.datatype.number({ min: 1, max: 2 });
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
function mapLanguageRegionToFakerLocale(lang: string, region: string): string {
  // Super simplified
  if (lang.toLowerCase().includes('english') && region.toLowerCase().includes('us')) {
    return 'en_US';
  } else if (lang.toLowerCase().includes('german') && region.toLowerCase().includes('de')) {
    return 'de';
  } else if (lang.toLowerCase().includes('french') && region.toLowerCase().includes('fr')) {
    return 'fr';
  }
  // fallback
  return 'en';
}

// If avg=3.7 => 70% chance 4, 30% chance 3
function randomFractionalCount(avg: number): number {
  if (avg === 0) return 0;
  const floorVal = Math.floor(avg);
  const frac = avg - floorVal;
  return Math.random() < frac ? floorVal + 1 : floorVal;
}
