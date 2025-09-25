/*
## Practice Drills
1. Add a `description` field to the `Track` model and a `completedAt` `DateTime?` field to the `Lesson` model in your `schema.prisma` file. Run `npx prisma migrate dev` to apply the changes.
2. Write a new repository function that finds all lessons with a `status` of `"completed"` and orders them by their `completedAt` date in descending order.
3. Use `prisma/seed.js` to create at least two tracks and five lessons, ensuring some are linked. Run `npx prisma db seed` to populate your database.
4. **New:** Write a repository function `createTrackWithLessons` that uses `prisma.$transaction` to create a new `Track` and an array of new `Lessons` for that track in a single, atomic operation.
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
