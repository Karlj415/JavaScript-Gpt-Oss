# Lesson 18 · Data Persistence: Giving Your APIs Memory

> **From Temporary to Permanent** 💾
> Transform your in-memory APIs into production-ready applications with persistent data storage that survives server restarts and scales with your users.

## Table of Contents
- [🎯 What You'll Master](#-what-youll-master)
- [🧠 Understanding Data Persistence](#-understanding-data-persistence)
- [🔍 Choosing Your Database](#-choosing-your-database)
- [🏗️ Prisma: Your Database Superhero](#️-prisma-your-database-superhero)
- [📋 Data Modeling Like a Pro](#-data-modeling-like-a-pro)
- [🚀 Database Operations Mastery](#-database-operations-mastery)
- [⚡ Performance Optimization](#-performance-optimization)
- [🔒 Data Integrity & Transactions](#-data-integrity--transactions)
- [🛠️ Development Workflow](#️-development-workflow)
- [🌍 Production Considerations](#-production-considerations)

## 🎯 What You'll Master

By the end of this lesson, you'll confidently build applications that:
- Store and retrieve data that persists between server restarts
- Choose the right database for different use cases
- Design efficient data models with proper relationships
- Optimize database queries for performance
- Handle data integrity with transactions
- Migrate database schemas safely in production

## 🧠 Understanding Data Persistence

### The Problem with In-Memory Storage

**Real-World Analogy: Sticky Notes vs Filing Cabinet**

Imagine your API's data as information you need to store:
- **In-Memory (Sticky Notes)** 🗳️ = Fast to access, but lost when you leave the office (server restart)
- **Database (Filing Cabinet)** 🗄️ = Takes slightly longer to access, but permanently stored and organized

```javascript
// In-Memory Storage (Lesson 17)
let users = []; // ❌ Lost when server restarts
users.push({ name: 'Alice', email: 'alice@example.com' });

// Persistent Storage (Lesson 18)
const user = await prisma.user.create({ // ✅ Survives server restarts
  data: { name: 'Alice', email: 'alice@example.com' }
});
```

### Why Persistence Matters

```javascript
// Without Persistence:
// 1. Server restarts → All data lost 💥
// 2. Multiple servers → Each has different data 🤔
// 3. Data analytics → Impossible to track trends 📊
// 4. User experience → "Where did my data go?" 😢

// With Persistence:
// 1. Server restarts → Data remains safe ✅
// 2. Multiple servers → All share same database 🌐
// 3. Data analytics → Historical data available 📈
// 4. User experience → "My data is always here!" 😊
```

## 🔍 Choosing Your Database

### The Database Landscape

**Real-World Analogy: Storage Solutions**

```javascript
// Think of databases like different storage solutions:

// SQL Databases = Traditional Filing System 📋
// - Everything has its place (schema)
// - Relationships between files (foreign keys)
// - Strict organization rules (constraints)
// - Perfect for: Financial records, user accounts, inventory

const sqlExample = {
  users: [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ],
  orders: [
    { id: 1, userId: 1, amount: 99.99, status: 'completed' },
    { id: 2, userId: 2, amount: 149.99, status: 'pending' }
  ]
};

// NoSQL Databases = Flexible Storage Boxes 📦
// - Any shape items fit (flexible schema)
// - Self-contained boxes (documents)
// - Easy to add more boxes (horizontal scaling)
// - Perfect for: Content management, real-time data, rapid prototyping

const noSqlExample = {
  user: {
    _id: 'user123',
    name: 'Alice',
    email: 'alice@example.com',
    profile: {
      avatar: 'https://...',
      preferences: {
        theme: 'dark',
        notifications: true
      }
    },
    recentOrders: [
      { amount: 99.99, date: '2024-01-15' },
      { amount: 149.99, date: '2024-01-20' }
    ]
  }
};
```

### Decision Matrix: SQL vs NoSQL

```javascript
// Use SQL (PostgreSQL/MySQL) when:
const sqlUseCases = {
  dataStructure: 'Well-defined relationships',
  consistency: 'ACID compliance required',
  queries: 'Complex joins and aggregations',
  examples: [
    'E-commerce platforms',
    'Financial systems',
    'User management',
    'Inventory tracking'
  ],
  advantages: [
    'Strong consistency',
    'Mature ecosystem',
    'Powerful query language',
    'Data integrity guarantees'
  ]
};

// Use NoSQL (MongoDB/DynamoDB) when:
const noSqlUseCases = {
  dataStructure: 'Flexible, document-based',
  scaling: 'Horizontal scaling needed',
  development: 'Rapid prototyping',
  examples: [
    'Content management systems',
    'Real-time analytics',
    'IoT data collection',
    'Social media feeds'
  ],
  advantages: [
    'Schema flexibility',
    'Horizontal scaling',
    'Developer-friendly',
    'High performance for simple queries'
  ]
};

// For Learning: We'll use PostgreSQL + Prisma
// Why? Best of both worlds - SQL power with modern tooling
```

## 🏗️ Prisma: Your Database Superhero

### What is Prisma?

**Real-World Analogy: Universal Translator + Personal Assistant**

Think of Prisma as your multilingual assistant who:
- **Translates** your JavaScript into SQL automatically 🌐
- **Prevents mistakes** with type safety 🛡️
- **Organizes everything** with migrations 📝
- **Optimizes performance** with intelligent queries ⚡

```javascript
// Without Prisma (Raw SQL) - Error Prone:
const users = await db.query(`
  SELECT u.*, p.avatar, p.bio 
  FROM users u 
  LEFT JOIN profiles p ON u.id = p.user_id 
  WHERE u.email = $1
`, [email]); // 😰 SQL injection risk, typos possible

// With Prisma - Type Safe & Clean:
const user = await prisma.user.findUnique({
  where: { email },
  include: { profile: true } // 😊 Auto-completion, type safety
});
```

### Setting Up Your Database Environment

```bash
# Step 1: Install Prisma
npm install prisma @prisma/client

# Step 2: Initialize Prisma
npx prisma init --datasource-provider postgresql

# Step 3: Set up PostgreSQL (choose one option)

# Option A: Local PostgreSQL (Mac)
brew install postgresql
brew services start postgresql
createdb learning_tracker

# Option B: Docker (Any OS)
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=dev123 \
  -e POSTGRES_DB=learning_tracker \
  -p 5432:5432 -d postgres:15

# Option C: Cloud Database (Neon, Supabase, etc.)
# Get connection string from provider
```

### Environment Configuration

```bash
# .env file
DATABASE_URL="postgresql://username:password@localhost:5432/learning_tracker"

# For development with Docker:
DATABASE_URL="postgresql://postgres:dev123@localhost:5432/learning_tracker"

# For production (example with Neon):
DATABASE_URL="postgresql://user:pass@db.region.neon.tech/dbname?sslmode=require"
```

## 📋 Data Modeling Like a Pro

### Understanding Relationships

**Real-World Analogy: Family Tree + Library System**

```javascript
// Think of data relationships like real-world connections:

// One-to-Many: One Author → Many Books
// One-to-One: One Person → One Passport  
// Many-to-Many: Many Students ↔ Many Courses
```

### Complete Prisma Schema Example

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User model - The account holder
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String   // Hashed password
  
  // Profile information
  firstName String?
  lastName  String?
  avatar    String?
  bio       String?  @db.Text
  
  // Account status
  isActive  Boolean  @default(true)
  role      Role     @default(STUDENT)
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relationships
  tracks    Track[]  // User can create many tracks
  progress  LessonProgress[] // User progress on lessons
  
  @@map("users") // Table name in database
}

// Track model - Learning courses
model Track {
  id          String   @id @default(cuid())
  title       String
  description String?  @db.Text
  difficulty  Difficulty @default(BEGINNER)
  
  // Content organization
  tags        String[] // Array of strings
  estimatedHours Int   @default(1)
  isPublished Boolean  @default(false)
  
  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relationships
  author      User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId    String
  lessons     Lesson[] // Track has many lessons
  
  @@map("tracks")
  @@index([authorId]) // Speed up queries by author
  @@index([difficulty, isPublished]) // Speed up filtering
}

// Lesson model - Individual learning units
model Lesson {
  id          String   @id @default(cuid())
  title       String
  content     String   @db.Text
  videoUrl    String?
  duration    Int      // Duration in minutes
  order       Int      // Lesson order within track
  
  // Content flags
  isPreview   Boolean  @default(false)
  isPublished Boolean  @default(false)
  
  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relationships
  track       Track    @relation(fields: [trackId], references: [id], onDelete: Cascade)
  trackId     String
  progress    LessonProgress[] // User progress on this lesson
  
  @@map("lessons")
  @@index([trackId, order]) // Speed up ordered queries
  @@unique([trackId, order]) // Ensure unique order per track
}

// Progress tracking - Many-to-Many through table
model LessonProgress {
  id          String   @id @default(cuid())
  
  // Progress data
  completed   Boolean  @default(false)
  completedAt DateTime?
  timeSpent   Int      @default(0) // Time in minutes
  score       Float?   // Quiz/assessment score
  
  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relationships (composite key)
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  lesson      Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  lessonId    String
  
  @@map("lesson_progress")
  @@unique([userId, lessonId]) // One progress record per user per lesson
  @@index([userId]) // Speed up user progress queries
}

// Enums for type safety
enum Role {
  STUDENT
  INSTRUCTOR
  ADMIN
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

### Schema Design Best Practices

```prisma
// 1. Use meaningful field types
model User {
  email     String   @unique // Unique constraint
  bio       String?  @db.Text // Longer text
  age       Int      @db.SmallInt // Smaller integer
  salary    Decimal  @db.Money // Financial data
  avatar    String   @db.VarChar(255) // Limited length
}

// 2. Add helpful indexes
model Post {
  title     String
  content   String   @db.Text
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@index([published, createdAt]) // Common query pattern
  @@index([title(ops: raw("gin_trgm_ops"))], type: Gin) // Full-text search
}

// 3. Use cascading deletes wisely
model Track {
  lessons Lesson[] // When track deleted, lessons auto-deleted
}

model Lesson {
  track   Track @relation(fields: [trackId], references: [id], onDelete: Cascade)
  trackId String
}

// 4. Validate data at database level
model User {
  email String @unique
  age   Int    @db.SmallInt
  
  @@check(age >= 13) // Database-level validation
}
```

## 🚀 Database Operations Mastery

### CRUD Operations with Prisma

```javascript
// src/repositories/userRepository.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  // CREATE - Add new user
  async create(userData) {
    return await prisma.user.create({
      data: {
        email: userData.email,
        username: userData.username,
        password: userData.hashedPassword, // Already hashed
        firstName: userData.firstName,
        lastName: userData.lastName
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        createdAt: true
        // Exclude password from response
      }
    });
  },
  
  // READ - Find users with various filters
  async findMany(options = {}) {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      isActive = true,
      includeProgress = false
    } = options;
    
    const where = {
      isActive,
      ...(role && { role }),
      ...(search && {
        OR: [
          { username: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } }
        ]
      })
    };
    
    const include = {
      ...(includeProgress && {
        progress: {
          include: {
            lesson: {
              include: {
                track: { select: { title: true } }
              }
            }
          }
        }
      })
    };
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include,
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          role: true,
          createdAt: true,
          progress: includeProgress
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);
    
    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  },
  
  // READ - Find single user
  async findById(id, includeRelations = false) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        ...(includeRelations && {
          tracks: {
            select: {
              id: true,
              title: true,
              difficulty: true,
              estimatedHours: true,
              isPublished: true,
              _count: { select: { lessons: true } }
            }
          },
          progress: {
            where: { completed: true },
            include: {
              lesson: {
                select: { title: true, duration: true }
              }
            }
          }
        })
      }
    });
  },
  
  // UPDATE - Modify user data
  async update(id, updateData) {
    return await prisma.user.update({
      where: { id },
      data: {
        ...(updateData.firstName && { firstName: updateData.firstName }),
        ...(updateData.lastName && { lastName: updateData.lastName }),
        ...(updateData.avatar && { avatar: updateData.avatar }),
        ...(updateData.bio && { bio: updateData.bio }),
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        updatedAt: true
      }
    });
  },
  
  // DELETE - Remove user (soft delete)
  async softDelete(id) {
    return await prisma.user.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date()
      },
      select: { id: true, isActive: true }
    });
  },
  
  // DELETE - Permanently remove user and all related data
  async hardDelete(id) {
    // Cascade deletes will handle related records automatically
    return await prisma.user.delete({
      where: { id },
      select: { id: true }
    });
  },
  
  // UTILITY - Check if user exists
  async exists(identifier) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      },
      select: { id: true }
    });
    
    return !!user;
  }
};
```

### Advanced Query Patterns

```javascript
// Complex filtering and aggregation
export const analyticsRepository = {
  async getTrackStatistics() {
    return await prisma.track.aggregate({
      _count: { id: true },
      _avg: { estimatedHours: true },
      _max: { estimatedHours: true },
      _min: { estimatedHours: true }
    });
  },
  
  async getPopularTracks(limit = 10) {
    return await prisma.track.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        author: {
          select: { username: true, firstName: true, lastName: true }
        },
        _count: {
          select: {
            lessons: true
          }
        }
      },
      where: {
        isPublished: true
      },
      orderBy: {
        lessons: {
          _count: 'desc'
        }
      },
      take: limit
    });
  },
  
  async getUserProgress(userId) {
    const progress = await prisma.lessonProgress.groupBy({
      by: ['userId'],
      where: { userId },
      _count: {
        id: true
      },
      _sum: {
        timeSpent: true
      },
      _avg: {
        score: true
      }
    });
    
    const completedLessons = await prisma.lessonProgress.count({
      where: { userId, completed: true }
    });
    
    return {
      totalLessons: progress[0]?._count.id || 0,
      completedLessons,
      totalTimeSpent: progress[0]?._sum.timeSpent || 0,
      averageScore: progress[0]?._avg.score || 0
    };
  }
};
```

## ⚡ Performance Optimization

### The Dreaded N+1 Problem

**Real-World Analogy: Inefficient Shopping Trip**

Imagine you need to buy ingredients for 10 different recipes:

```javascript
// ❌ N+1 Problem = 10 separate trips to the grocery store
const tracks = await prisma.track.findMany(); // 1 query
for (const track of tracks) {
  // This creates 1 query per track = N queries
  track.lessons = await prisma.lesson.findMany({ 
    where: { trackId: track.id } 
  });
}
// Total: 1 + N queries (if N=100 tracks, that's 101 database queries!)

// ✅ Efficient Solution = One big shopping trip with a list
const tracksWithLessons = await prisma.track.findMany({
  include: { lessons: true } // 1 optimized query with JOIN
});
// Total: 1 query regardless of how many tracks!
```

### Smart Query Strategies

```javascript
// 1. Use select to fetch only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    username: true,
    email: true
    // Don't fetch password, bio, etc. if not needed
  }
});

// 2. Use include for related data
const trackWithEverything = await prisma.track.findUnique({
  where: { id: trackId },
  include: {
    lessons: {
      select: {
        id: true,
        title: true,
        duration: true,
        order: true
      }
    },
    author: {
      select: {
        username: true,
        firstName: true,
        lastName: true
      }
    },
    _count: {
      select: {
        lessons: true // Just count, don't fetch all
      }
    }
  }
});

// 3. Use pagination for large datasets
const paginatedUsers = await prisma.user.findMany({
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { createdAt: 'desc' }
});

// 4. Use indexes for faster filtering
// In your schema.prisma:
// @@index([email, isActive]) // Fast lookup for active users by email

// 5. Batch operations instead of loops
// ❌ Slow - Multiple queries
for (const lessonData of lessonsToCreate) {
  await prisma.lesson.create({ data: lessonData });
}

// ✅ Fast - Single query
await prisma.lesson.createMany({
  data: lessonsToCreate
});
```

### Database Indexing Strategy

```prisma
// Common indexing patterns in your schema
model User {
  email     String   @unique // Automatic index
  username  String   @unique // Automatic index
  isActive  Boolean
  role      Role
  createdAt DateTime @default(now())
  
  // Custom indexes for common query patterns
  @@index([isActive, role]) // Fast filtering by status and role
  @@index([createdAt]) // Fast sorting by creation date
}

model Track {
  title       String
  difficulty  Difficulty
  isPublished Boolean
  tags        String[]
  authorId    String
  
  @@index([isPublished, difficulty]) // Fast filtering published tracks by difficulty
  @@index([authorId]) // Fast lookup of tracks by author
  @@index([tags], type: Gin) // Full-text search on tags (PostgreSQL)
}

model Lesson {
  trackId String
  order   Int
  
  @@index([trackId, order]) // Fast ordered retrieval of track lessons
  @@unique([trackId, order]) // Ensure unique order per track
}
```

## 🔒 Data Integrity & Transactions

### Understanding Transactions

**Real-World Analogy: Bank Transfer**

When you transfer money between bank accounts:
- Step 1: Deduct from Account A
- Step 2: Add to Account B

If Step 1 succeeds but Step 2 fails, you lose money! Transactions ensure both happen or neither happens.

```javascript
// Database Transaction Example: Creating Track with Lessons
export const trackService = {
  async createTrackWithLessons(trackData, lessonsData) {
    // Everything inside this transaction succeeds together or fails together
    return await prisma.$transaction(async (tx) => {
      // Step 1: Create the track
      const track = await tx.track.create({
        data: {
          title: trackData.title,
          description: trackData.description,
          difficulty: trackData.difficulty,
          authorId: trackData.authorId
        }
      });
      
      // Step 2: Create all lessons for this track
      const lessons = await tx.lesson.createMany({
        data: lessonsData.map((lesson, index) => ({
          title: lesson.title,
          content: lesson.content,
          duration: lesson.duration,
          order: index + 1,
          trackId: track.id // Use the newly created track ID
        }))
      });
      
      // Step 3: Update track with lesson count
      const updatedTrack = await tx.track.update({
        where: { id: track.id },
        data: {
          // Could add a lessonCount field here
        },
        include: {
          lessons: true
        }
      });
      
      return updatedTrack;
      
      // If ANY step fails, ALL steps are automatically rolled back
    });
  },
  
  // Interactive transaction for complex business logic
  async enrollUserInTrack(userId, trackId) {
    return await prisma.$transaction(async (tx) => {
      // Check if track exists and is published
      const track = await tx.track.findUnique({
        where: { id: trackId },
        include: { lessons: true }
      });
      
      if (!track || !track.isPublished) {
        throw new Error('Track not available for enrollment');
      }
      
      // Check if user is already enrolled
      const existingProgress = await tx.lessonProgress.findFirst({
        where: {
          userId,
          lesson: { trackId }
        }
      });
      
      if (existingProgress) {
        throw new Error('User already enrolled in this track');
      }
      
      // Create progress records for all lessons
      const progressRecords = track.lessons.map(lesson => ({
        userId,
        lessonId: lesson.id,
        completed: false
      }));
      
      await tx.lessonProgress.createMany({
        data: progressRecords
      });
      
      return {
        message: 'Successfully enrolled in track',
        trackId,
        lessonsCount: track.lessons.length
      };
    });
  }
};
```

### ACID Properties Explained

```javascript
// ACID = Atomicity, Consistency, Isolation, Durability

const acidExample = {
  // A - Atomicity: All or nothing
  atomicity: 'Either ALL operations in transaction succeed, or ALL are rolled back',
  
  // C - Consistency: Database rules are never broken
  consistency: 'Foreign key constraints, unique constraints, and check constraints are always enforced',
  
  // I - Isolation: Transactions don\'t interfere with each other
  isolation: 'Concurrent transactions see consistent data, no dirty reads',
  
  // D - Durability: Completed transactions are permanent
  durability: 'Once committed, data survives system crashes and restarts'
};
```

## 🛠️ Development Workflow

### Schema Migrations

**Real-World Analogy: Home Renovations**

Database migrations are like home renovation plans:
- You can't just tear down walls randomly
- Changes must be planned and reversible
- Everyone needs to follow the same plan

```bash
# Development workflow with Prisma migrations

# 1. Modify your schema.prisma file
# Add new field: bio String? @db.Text

# 2. Create migration
npx prisma migrate dev --name add_user_bio
# This generates SQL migration files automatically

# 3. Migration files are created in prisma/migrations/
# 20241201120000_add_user_bio/
# └── migration.sql

# 4. View the generated SQL
cat prisma/migrations/20241201120000_add_user_bio/migration.sql
-- AlterTable
-- ALTER TABLE "users" ADD COLUMN "bio" TEXT;

# 5. Apply to production
npx prisma migrate deploy
```

### Database Seeding

```javascript
// prisma/seed.js - Populate database with test data
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  // Create test users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        email: 'alice@example.com',
        username: 'alice',
        password: await bcrypt.hash('password123', 12),
        firstName: 'Alice',
        lastName: 'Johnson',
        role: 'INSTRUCTOR'
      }
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        email: 'bob@example.com',
        username: 'bob',
        password: await bcrypt.hash('password123', 12),
        firstName: 'Bob',
        lastName: 'Smith',
        role: 'STUDENT'
      }
    })
  ]);
  
  console.log(`✅ Created ${users.length} users`);
  
  // Create sample tracks with lessons
  const track = await prisma.track.create({
    data: {
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming',
      difficulty: 'BEGINNER',
      estimatedHours: 10,
      tags: ['javascript', 'programming', 'web'],
      isPublished: true,
      authorId: users[0].id, // Alice is the instructor
      lessons: {
        create: [
          {
            title: 'Variables and Data Types',
            content: 'Learn about let, const, var and primitive types...',
            duration: 45,
            order: 1,
            isPublished: true
          },
          {
            title: 'Functions and Scope',
            content: 'Understanding function declarations, expressions...',
            duration: 60,
            order: 2,
            isPublished: true
          },
          {
            title: 'Arrays and Objects',
            content: 'Working with complex data structures...',
            duration: 50,
            order: 3,
            isPublished: true
          }
        ]
      }
    },
    include: {
      lessons: true
    }
  });
  
  console.log(`✅ Created track "${track.title}" with ${track.lessons.length} lessons`);
  
  // Create sample progress for Bob
  await prisma.lessonProgress.create({
    data: {
      userId: users[1].id, // Bob
      lessonId: track.lessons[0].id, // First lesson
      completed: true,
      completedAt: new Date(),
      timeSpent: 45,
      score: 95.5
    }
  });
  
  console.log('✅ Created sample progress data');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🏁 Seeding completed!');
  });
```

```json
// package.json - Add seeding script
{
  "scripts": {
    "db:seed": "node prisma/seed.js",
    "db:reset": "npx prisma migrate reset && npm run db:seed",
    "db:studio": "npx prisma studio"
  },
  "prisma": {
    "seed": "node prisma/seed.js"
  }
}
```

### Prisma Studio - Visual Database Browser

```bash
# Launch Prisma Studio - Visual database editor
npx prisma studio

# Opens browser at http://localhost:5555
# Features:
# - View all your data in tables
# - Edit records directly
# - Test queries visually
# - Perfect for development and debugging
```

## 🌍 Production Considerations

### Connection Pooling

```javascript
// src/lib/prisma.js - Singleton pattern for connection pooling
import { PrismaClient } from '@prisma/client';

// Global variable to prevent multiple instances in development
const globalForPrisma = globalThis;

// Create single instance with connection pooling
export const prisma = globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
```

### Environment-Specific Configurations

```bash
# .env.development
DATABASE_URL="postgresql://postgres:dev123@localhost:5432/learning_tracker_dev"
DIRECT_URL="postgresql://postgres:dev123@localhost:5432/learning_tracker_dev"

# .env.test
DATABASE_URL="postgresql://postgres:test123@localhost:5432/learning_tracker_test"
DIRECT_URL="postgresql://postgres:test123@localhost:5432/learning_tracker_test"

# .env.production
DATABASE_URL="postgresql://user:password@prod-server:5432/learning_tracker_prod?sslmode=require&connection_limit=5"
DIRECT_URL="postgresql://user:password@prod-server:5432/learning_tracker_prod?sslmode=require"
```

### Database Backup and Recovery

```bash
# Backup commands
postgres_backup() {
  local date=$(date +"%Y%m%d_%H%M%S")
  pg_dump $DATABASE_URL > "backup_${date}.sql"
  echo "Backup created: backup_${date}.sql"
}

# Restore from backup
postgres_restore() {
  psql $DATABASE_URL < $1
  echo "Database restored from $1"
}

# Automated backup script for production
#!/bin/bash
# crontab: 0 2 * * * /path/to/backup_script.sh
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="/backups/db_backup_${DATE}.sql"

pg_dump $DATABASE_URL > $BACKUP_FILE
if [ $? -eq 0 ]; then
    echo "Database backup successful: $BACKUP_FILE"
    # Upload to S3 or other cloud storage
    aws s3 cp $BACKUP_FILE s3://your-backup-bucket/
else
    echo "Database backup failed" >&2
    exit 1
fi
```

---

## 🎯 Exercises Preview

**Practice Drills:** Master database operations
1. **Schema Design** - Create comprehensive data models with relationships
2. **Migration Practice** - Add fields, indexes, and constraints safely  
3. **Query Optimization** - Solve N+1 problems and optimize performance
4. **Transaction Handling** - Implement atomic operations for data integrity

**Main Project: Persistent Learning Tracker**
Transform your Lesson 17 API into a database-powered application:
- 🗃️ Replace in-memory storage with PostgreSQL + Prisma
- 📊 Add user progress tracking and analytics
- 🔄 Implement transactional enrollment system
- ⚡ Optimize queries for production performance
- 🧪 Create comprehensive test database setup

All detailed instructions and starter code are in `exercises.js` →

---

## 📺 Watch These Videos
- [SQL vs NoSQL Databases Explained](https://youtu.be/ZS_kXvOeQ5Y) - Comprehensive comparison
- [Prisma Crash Course](https://youtu.be/RebA5J-rlwg) - Complete tutorial by Web Dev Simplified  
- [Database Design Fundamentals](https://youtu.be/ztHopE5Wnpc) - Relational database principles
- [N+1 Problem Explained](https://youtu.be/uCbFMZYQbxE) - Performance optimization strategies

## 📚 References & Resources

**Official Documentation**
- [Prisma Documentation](https://www.prisma.io/docs/) - Complete ORM guide
- [PostgreSQL Manual](https://www.postgresql.org/docs/) - Database reference
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) - Schema syntax guide

**Best Practices & Patterns**
- [Database Design Principles](https://www.database-design.com/) - Normalization and relationships
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization) - Performance optimization
- [The Twelve-Factor App](https://12factor.net/backing-services) - Production considerations

**Tools & Extensions**
- [Prisma Studio](https://www.prisma.io/studio) - Visual database browser
- [PostgreSQL Tools](https://www.postgresql.org/download/) - Database administration
- [DB Diagram](https://dbdiagram.io/) - Visual schema design

---

## 🤔 Reflection Questions

**Database Design**
1. Why is it important to normalize database schemas? When might you denormalize?
2. How do you decide between one-to-many and many-to-many relationships?
3. What's the trade-off between adding database constraints vs application validation?

**Performance & Optimization**
4. Explain the N+1 problem in your own words. Why is it a performance killer?
5. When should you add database indexes? What are the trade-offs?
6. How does connection pooling improve application performance?

**Data Integrity & Transactions**
7. When would you absolutely need to use a database transaction?
8. What happens if a transaction fails halfway through?
9. How do database migrations help teams work together?

**Production Readiness**
10. What database backup strategy would you implement for a production app?
11. How would you handle database schema changes with zero downtime?
12. What monitoring would you add to detect database performance issues?

---

> **Coming Next: Lesson 19 - Authentication & Security** 🔐  
> Protect your data-driven APIs with professional authentication, authorization, and security practices.

**Your Data Persistence Foundation is Complete! 🎆**

You now understand:
- SQL vs NoSQL database selection criteria
- Professional data modeling with Prisma
- Query optimization and performance tuning  
- Transaction handling for data integrity
- Production database management workflows
- Migration strategies and backup procedures

These skills transform your APIs from prototypes into production-ready applications that can handle real user data safely and efficiently!
