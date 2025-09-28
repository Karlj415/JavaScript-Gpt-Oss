// =============================================================================
// 🎯 PRACTICE DRILLS - Master Database Operations
// =============================================================================

/*
📝 DRILL 1: SCHEMA DESIGN AND MIGRATIONS
Objective: Learn to design, modify, and migrate database schemas safely

What You'll Learn:
- Database schema design principles
- Migration workflows and best practices
- Field types, constraints, and relationships
- Index optimization strategies

Tasks:
1. Schema Modifications:
   - Add a `description` field to the `Track` model (String, optional, Text type)
   - Add a `completedAt` field to the `Lesson` model (DateTime, optional)
   - Add a `difficulty` enum with values: BEGINNER, INTERMEDIATE, ADVANCED
   - Add a `tags` field to Track model (String array)

2. Create Your Migration:
   ```bash
   npx prisma migrate dev --name add_track_enhancements
   ```

3. Add Strategic Indexes:
   - Index on Track.difficulty for fast filtering
   - Composite index on [Track.isPublished, Track.difficulty]
   - Index on Lesson.completedAt for progress queries

4. Verify Migration:
   ```bash
   npx prisma db pull  # Verify schema matches database
   npx prisma generate # Regenerate Prisma client
   ```

Expected Schema Structure:
```prisma
model Track {
  id          String     @id @default(cuid())
  title       String
  description String?    @db.Text
  difficulty  Difficulty @default(BEGINNER)
  tags        String[]
  isPublished Boolean    @default(false)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  lessons     Lesson[]
  
  @@index([difficulty])
  @@index([isPublished, difficulty])
}

model Lesson {
  id          String    @id @default(cuid())
  title       String
  content     String    @db.Text
  duration    Int       // minutes
  order       Int
  completedAt DateTime?
  
  track       Track     @relation(fields: [trackId], references: [id])
  trackId     String
  
  @@index([completedAt])
  @@index([trackId, order])
  @@unique([trackId, order])
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```
*/

/*
📝 DRILL 2: ADVANCED QUERY PATTERNS
Objective: Master complex database queries and avoid performance pitfalls

What You'll Learn:
- Complex filtering and searching
- Aggregations and analytics queries
- N+1 problem identification and solutions
- Query optimization techniques

Tasks:
1. Implement Advanced Repository Methods:
   
   a) Smart Search Function:
   ```javascript
   async findTracksWithSearch(searchOptions) {
     const { query, difficulty, tags, includeUnpublished = false } = searchOptions;
     // Implement full-text search across title and description
     // Filter by difficulty and tags
     // Include lesson count using _count
   }
   ```
   
   b) Analytics Query:
   ```javascript
   async getTrackAnalytics() {
     // Return aggregated data:
     // - Total tracks count
     // - Average lesson count per track
     // - Distribution by difficulty level
     // - Most popular tags
   }
   ```
   
   c) User Progress Query:
   ```javascript
   async getUserProgressSummary(userId) {
     // Calculate:
     // - Total lessons completed
     // - Average completion time
     // - Progress by difficulty level
     // - Streak information
   }
   ```

2. N+1 Problem Solutions:
   - Identify N+1 problems in existing queries
   - Rewrite using `include` and `select`
   - Benchmark query performance
   - Document optimization strategies

3. Performance Testing:
   ```javascript
   // Create performance test comparing:
   // - N+1 approach vs optimized approach
   // - With 100+ tracks and 1000+ lessons
   // - Measure execution time differences
   ```
*/

/*
📝 DRILL 3: TRANSACTION MASTERY
Objective: Implement bulletproof data integrity with transactions

What You'll Learn:
- ACID properties in practice
- Interactive vs sequential transactions
- Error handling in transactions
- Business logic with data integrity

Tasks:
1. Implement Transactional Operations:
   
   a) `createTrackWithLessons` - Atomic track creation:
   ```javascript
   async createTrackWithLessons(trackData, lessonsData) {
     // Use prisma.$transaction to:
     // 1. Create the track
     // 2. Create all lessons in order
     // 3. Update any aggregated fields
     // 4. Handle validation errors properly
   }
   ```
   
   b) `enrollUserInTrack` - User enrollment system:
   ```javascript
   async enrollUserInTrack(userId, trackId) {
     // Transaction should:
     // 1. Verify track exists and is published
     // 2. Check user isn't already enrolled
     // 3. Create progress records for all lessons
     // 4. Update user statistics
   }
   ```
   
   c) `completeLesson` - Progress tracking:
   ```javascript
   async completeLesson(userId, lessonId, completionData) {
     // Atomically:
     // 1. Mark lesson as completed
     // 2. Update completion timestamp
     // 3. Calculate new progress percentages
     // 4. Check for track completion
     // 5. Update user streaks/achievements
   }
   ```

2. Error Handling Scenarios:
   - Test transaction rollback on failures
   - Handle concurrent access conflicts
   - Implement retry logic where appropriate
   - Log transaction failures properly

3. Business Logic Implementation:
   - Implement business rules within transactions
   - Ensure data consistency across related tables
   - Handle edge cases and validation
*/

/*
📝 DRILL 4: DATABASE SEEDING AND TESTING
Objective: Create robust data seeding and testing strategies

What You'll Learn:
- Database seeding best practices
- Test database setup and teardown
- Factory pattern for test data
- Data fixtures and scenarios

Tasks:
1. Enhanced Seeding System:
   
   Create `prisma/seed.js` with:
   ```javascript
   // Seed realistic data:
   // - 5+ instructors with different specialties
   // - 20+ tracks across all difficulty levels
   // - 100+ lessons with varied content
   // - 50+ users with realistic progress
   // - Relationships that make sense
   ```

2. Test Data Factories:
   ```javascript
   // Create factory functions for:
   export const createTestUser = (overrides = {}) => ({ /* user data */ });
   export const createTestTrack = (authorId, overrides = {}) => ({ /* track data */ });
   export const createTestLesson = (trackId, order, overrides = {}) => ({ /* lesson data */ });
   ```

3. Database Testing Strategy:
   ```javascript
   // Implement test helpers:
   export const setupTestDb = async () => { /* reset db */ };
   export const cleanupTestDb = async () => { /* cleanup */ };
   export const seedMinimalData = async () => { /* basic test data */ };
   ```

4. Realistic Data Scenarios:
   - Create data that represents real usage patterns
   - Include edge cases (empty tracks, incomplete progress)
   - Test with sufficient data volume
   - Validate all relationships work correctly

5. Run Your Seeding:
   ```bash
   npm run db:reset  # Reset and seed
   npm run db:seed   # Just seed
   npx prisma studio # Visual verification
   ```
*/

// =============================================================================
// 🔧 HELPER UTILITIES FOR PRACTICE DRILLS
// =============================================================================

/*
// Database connection utility
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Performance testing utility
export const benchmark = async (name, operation) => {
  console.time(name);
  const result = await operation();
  console.timeEnd(name);
  return result;
};

// Query explanation utility (PostgreSQL)
export const explainQuery = async (query) => {
  const explanation = await prisma.$queryRaw`EXPLAIN ANALYZE ${query}`;
  console.log('Query Plan:', explanation);
};

// Sample usage in your tests:
// const tracks = await benchmark('N+1 Problem', async () => {
//   return await badQuery(); // Your N+1 query
// });
// 
// const optimizedTracks = await benchmark('Optimized Query', async () => {
//   return await goodQuery(); // Your optimized query
// });
*/

/*
## Project: Persistent Learning Tracker

**Objective:** Refactor the Express API from Lesson 17 to replace the in-memory data store with a persistent PostgreSQL database managed by Prisma.

**Instructions:**
1.  **Prisma Setup:**
    -   In your existing project, install Prisma: `npm install prisma @prisma/client`.
    -   Initialize Prisma: `npx prisma init --datasource-provider postgresql`.
    -   Set up your `.env` file with the `DATABASE_URL`.
    -   Define the `Track` and `Lesson` models in `prisma/schema.prisma` as shown in the README.

2.  **Migration and Seeding:**
    -   Run your initial migration: `npx prisma migrate dev --name init`.
    -   Create a `prisma/seed.js` file to populate your database with some initial tracks and lessons.

3.  **Refactor Repository Layer:**
    -   Rewrite your `tracks.repository.js` file. Instead of manipulating an in-memory array, it should now import and use the `PrismaClient`.
    -   Implement all the repository methods (`findAll`, `findById`, `create`, etc.) using Prisma Client queries (`prisma.track.findMany`, `prisma.track.create`, etc.).

4.  **Solve an N+1 Problem:**
    -   In your `GET /api/tracks` controller, ensure that when you fetch all tracks, you also fetch their associated lessons in a single query. Use Prisma's `include` option to achieve this.

5.  **Add a Transactional Endpoint:**
    -   Create a new endpoint, e.g., `POST /api/tracks/:trackId/lessons/batch`, that accepts an array of new lessons.
    -   In the repository, implement the corresponding function using `prisma.$transaction` to ensure that either all lessons are added or none are.

6.  **Validation:**
    -   Add database-level validation using Prisma schema attributes (e.g., `@db.VarChar(255)`).
    -   Ensure your API-level validation (e.g., in a middleware) still runs before hitting the database.

7.  **Testing:**
    -   This is advanced, but consider how you would adapt your integration tests. A common strategy is to have a separate test database and a script that resets it before each test run.
*/

// --- Starter Code (src/api/tracks/tracks.repository.js) ---
/*
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const repository = {
  // Example of a refactored method
  async findAll() {
    // TODO: Solve the N+1 problem by including lessons in this query.
    return prisma.track.findMany({ 
      include: { lessons: true } 
    });
  },

  async findById(id) {
    // TODO: Implement using prisma.track.findUnique
    return prisma.track.findUnique({ where: { id } });
  },

  async create(trackData) {
    // TODO: Implement using prisma.track.create
    return prisma.track.create({ data: trackData });
  },

  async createTrackWithLessons(trackData, lessonsData) {
    // TODO: Implement using prisma.$transaction
    return prisma.$transaction(async (tx) => {
      const newTrack = await tx.track.create({ data: trackData });
      const lessons = await tx.lesson.createMany({
        data: lessonsData.map(lesson => ({ ...lesson, trackId: newTrack.id }))
      });
      return { newTrack, lessons };
    });
  }
};
*/
