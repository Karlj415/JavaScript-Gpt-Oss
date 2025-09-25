# Lesson 18 · Data Persistence

Today I’ll teach you how to connect your Node.js applications to a persistent database. We’ll compare database paradigms, model our data, and use a modern Object-Relational Mapper (ORM) to interact with it safely and efficiently.

## Objectives
- Understand the trade-offs between SQL and NoSQL databases.
- Model data relationships in a Prisma schema.
- Run migrations to keep your database schema in sync with your application.
- Understand and prevent the N+1 query problem with eager loading.
- Ensure data integrity across multiple operations using transactions.
- Understand the purpose of database indexes and connection pooling.

## Lesson Narrative

### 1. Choosing a Database: SQL vs. NoSQL
- **Relational (SQL) - e.g., PostgreSQL, MySQL:** Data is stored in tables with a predefined schema. Enforces data integrity through constraints. Uses SQL (Structured Query Language). Excellent for applications with complex relationships and where data consistency is critical.
- **NoSQL - e.g., MongoDB, DynamoDB:** Data is often stored in flexible-schema documents (like JSON). Scales horizontally more easily. A good fit for unstructured data, high-volume reads/writes, or when development speed is prioritized over strict structure.

We will use **PostgreSQL** with **Prisma**, a modern ORM, to learn structured data modeling.

### 2. The N+1 Query Problem
A common performance pitfall with ORMs. Imagine you fetch 10 tracks, then loop through them, fetching the lessons for each track inside the loop. This results in 1 (for the tracks) + 10 (one for each track's lessons) = **11** total queries.

**Solution: Eager Loading.** You tell the ORM to fetch the related data in the initial query. Prisma's `include` option does exactly this, typically by constructing a single, more efficient SQL join.

```javascript
// BAD: N+1 Problem
// const tracks = await prisma.track.findMany();
// for (const track of tracks) {
//   track.lessons = await prisma.lesson.findMany({ where: { trackId: track.id } });
// }

// GOOD: Eager Loading with `include`
const tracksWithLessons = await prisma.track.findMany({
  include: { lessons: true }, // Fetches tracks and their lessons in one go
});
```

### 3. Ensuring Data Integrity with Transactions
What if you need to perform several related database operations, and one fails? A **transaction** is an all-or-nothing wrapper. If any operation inside the transaction fails, the database automatically rolls back all previous operations within it.

Use `prisma.$transaction` to ensure a new track and its first lesson are created together, or not at all.

```javascript
const [newTrack, newLesson] = await prisma.$transaction([
  prisma.track.create({ data: { name: 'New Track' } }),
  prisma.lesson.create({ data: { title: 'First Lesson', trackId: 1 } }) // This would fail if trackId is needed before creation
]);

// A better approach for dependent writes:
const newTrackWithLesson = await prisma.track.create({
  data: {
    name: 'New Track',
    lessons: {
      create: [{ title: 'First Lesson' }]
    }
  }
});
```

### 4. Modeling and Migrating with Prisma
Prisma provides a declarative schema (`schema.prisma`) for modeling your data.

```prisma
// prisma/schema.prisma
model Track {
  id        String   @id @default(uuid())
  name      String   @unique
  createdAt DateTime @default(now())
  lessons   Lesson[]
}

model Lesson {
  id       String  @id @default(uuid())
  title    String
  track    Track   @relation(fields: [trackId], references: [id])
  trackId  String  @index // Explicitly add an index for faster lookups
}
```
- **Migrations:** When you change your schema, run `npx prisma migrate dev --name <migration_name>`. Prisma generates the SQL needed to update your database schema without losing data.
- **Indexes:** An index (`@id`, `@unique`, `@index`) is a special lookup table that the database can use to speed up data retrieval. Foreign keys (like `trackId`) are excellent candidates for indexes.

### 5. The Prisma Client
After migrating, run `npx prisma generate`. This command reads your schema and generates a fully type-safe database client in `node_modules/@prisma/client`.

- **Connection Pooling:** The `PrismaClient` instance manages a pool of database connections for you. This is much more efficient than creating a new connection for every query.
- **Usage:** Create a single, shared instance of `PrismaClient` for your application.

```javascript
// src/db.js
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

// src/api/tracks/tracks.repository.js
import { prisma } from '../../db.js';

export const repository = {
  findAll: () => prisma.track.findMany(),
};
```

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [SQL vs NoSQL Explained](https://www.youtube.com/watch?v=ZS_kXvOeQ5Y)
- [Learn Prisma In 60 Minutes (Web Dev Simplified)](https://www.youtube.com/watch?v=RebA5J-rlwg)

## References
- Prisma Docs: [Transactions](https://www.prisma.io/docs/concepts/components/prisma-client/transactions)
- Prisma Docs: [Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)
- The Twelve-Factor App: [Backing Services](https://12factor.net/backing-services)

## Reflection
- Explain the N+1 problem in your own words. Why is it a performance issue?
- When would you absolutely need to use a database transaction?
- How does a schema migration workflow benefit a team of developers?

Lesson 19 adds authentication, authorization, and security practices to protect your API.