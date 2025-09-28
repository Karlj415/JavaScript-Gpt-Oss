// =============================================================================
// 🎯 PRACTICE DRILLS - Secure Auth & API Hardening
// =============================================================================

/*
📝 DRILL 1: SIGNUP & LOGIN (FOUNDATIONS)
Objective: Build secure registration and login endpoints

What You'll Learn:
- Password hashing and verification
- Basic auth flows with clear error handling
- Safe response design (no secret leakage)

Tasks:
1) POST /auth/register
   - Validate body: { email, username, password }
   - Hash password with bcrypt (>=12 rounds)
   - Store user with role = STUDENT (default)
   - Return 201 with public fields only

2) POST /auth/login
   - Validate body: { email, password }
   - Verify password
   - Issue accessToken (15m) and refreshToken (7d)
   - Store refreshToken as httpOnly, secure cookie (path=/auth)
   - Return 200 with { accessToken }

3) Security Notes
   - On invalid credentials, always send generic message
   - Do not reveal if email exists
   - Rate limit /auth/login (e.g., 5/min per IP)
*/

/*
📝 DRILL 2: AUTHENTICATION MIDDLEWARE & PROTECTED ROUTES
Objective: Protect endpoints using access tokens

What You'll Learn:
- Bearer token parsing
- Centralized 401 handling
- Attaching user to req

Tasks:
1) Middleware authenticate
   - Parse Authorization: Bearer <token>
   - Verify with JWT_ACCESS_SECRET
   - Attach req.user = { id, roles }

2) GET /profile
   - Return the authenticated user's profile
   - 401 on missing/invalid token

3) Logging
   - Log auth failures with ip and userAgent (no secrets)
*/

/*
📝 DRILL 3: REFRESH TOKENS & ROTATION
Objective: Implement refresh flow safely

What You'll Learn:
- Refresh token verification
- Token rotation best practices
- Revocation lists (blacklist/whitelist)

Tasks:
1) POST /auth/refresh
   - Read refreshToken from cookie
   - Verify with JWT_REFRESH_SECRET
   - Optional: persist refresh tokens with unique id (jti)
   - Rotate: issue new refresh token, invalidate old
   - Return new accessToken

2) POST /auth/logout
   - Invalidate refresh token (delete/revoke)
   - Clear cookie
   - Return 204

3) Optional Advanced
   - Track deviceId / lastUsedAt for each refresh token
   - Allow selective logout per device
*/

/*
📝 DRILL 4: AUTHORIZATION (RBAC)
Objective: Gate actions based on roles

What You'll Learn:
- Role checks
- Resource ownership checks (optional)

Tasks:
1) authorize(...roles)
   - Return 403 if req.user.roles has no intersection

2) Apply to routes
   - POST /api/tracks → INSTRUCTOR or ADMIN only
   - DELETE /api/tracks/:id → ADMIN or track owner

3) Tests
   - Student forbidden to create tracks (403)
   - Instructor allowed (201)
*/

/*
📝 DRILL 5: HARDENING CHECKLIST
Objective: Add essential safeguards to your server

What You'll Learn:
- Practical security middleware
- Input validation
- CORS and cookie safety

Tasks:
- Add helmet()
- Configure CORS with origin allowlist and credentials
- Add express-rate-limit to /auth routes
- Enforce JSON body size limits
- Validate inputs (Joi/Zod) for all auth routes
- Set cookie flags: httpOnly, secure, sameSite=strict
*/

/*
📝 DRILL 6: TESTING AUTH FLOWS WITH SUPERTEST
Objective: Write end-to-end tests for auth

What You'll Learn:
- Testing login/refresh/authorization
- Using cookies in tests

Tasks:
- Test /auth/login: success + failure
- Test protected route: 401 without token, 200 with token
- Test refresh flow: expired access → refresh → new access
- Test RBAC: student forbidden on instructor route
*/

// =============================================================================
// 🎨 PROJECT: Secure Learning Tracker API
// =============================================================================

/*
🎯 GOAL
Upgrade the Lesson 17/18 API to production-grade security with complete authentication, authorization, and hardening.

🔩 STACK
- bcryptjs for password hashing
- jsonwebtoken for access/refresh tokens
- helmet for security headers
- express-rate-limit for brute-force protection
- cors for controlled cross-origin access

📁 STEP 1: PRISMA SCHEMA

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String
  role      Role     @default(STUDENT)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  refreshTokens RefreshToken[]
}

enum Role {
  STUDENT
  INSTRUCTOR
  ADMIN
}

model RefreshToken {
  id         String   @id @default(cuid())
  token      String   @unique
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId     String
  deviceId   String?
  createdAt  DateTime @default(now())
  revokedAt  DateTime?
  lastUsedAt DateTime?
  
  @@index([userId])
}
```

Run migrations and generate client.

📦 STEP 2: ROUTES

- POST /auth/register → Create user (hash password)
- POST /auth/login → Issue access + refresh token (cookie)
- POST /auth/refresh → Rotate refresh token, new access token
- POST /auth/logout → Revoke refresh token, clear cookie
- GET /profile → Authenticated user info
- POST /api/tracks → Auth + authorize(INSTRUCTOR, ADMIN)

🧱 STEP 3: MIDDLEWARE

- authenticate: Verify access token (Authorization: Bearer)
- authorize(...roles): RBAC check
- request limiter: /auth routes stricter
- helmet + cors: app-level security

🧪 STEP 4: TESTS (Supertest + Vitest)

- Register + Login happy path
- Login failure (wrong password)
- Access protected route (401 → then 200 with token)
- Refresh flow returns new access token
- RBAC: STUDENT forbidden to create track (403)

📜 STEP 5: ENV & SECRETS

Add to .env (do not commit secrets):
```
JWT_ACCESS_SECRET=replace-with-strong-secret
JWT_REFRESH_SECRET=replace-with-strong-secret
ACCESS_TTL=15m
REFRESH_TTL=7d
COOKIE_DOMAIN=localhost
```

🧯 STEP 6: HARDENING
- Set cookie flags: httpOnly, secure, sameSite=strict
- Limit JSON body size: app.use(express.json({ limit: '10kb' }))
- Normalize error responses (no stack traces in prod)
- Log auth events without exposing secrets
- Consider refresh token rotation + database revocation

📌 DELIVERABLES
- Updated schema and migration
- Working auth routes and middleware
- Hardened app configuration
- Passing auth tests
*/

// --- Starter Code (src/api/auth/auth.middleware.js) ---
/*
import jwt from 'jsonwebtoken';
import { prisma } from '../../db.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [, token] = authHeader.split(' ');
  if (!token) return res.status(401).json({ error: 'Missing bearer token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authorize = (allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
*/
