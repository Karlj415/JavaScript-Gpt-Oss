/*
## Practice Drills
1. Implement signup (`/auth/register`) and login (`/auth/login`) endpoints. On successful login, return both an access token (expires in 15 minutes) and a refresh token (expires in 7 days).
2. Create an authentication middleware that verifies the access token. Protect a new `/profile` route with it. If the token is missing or invalid, return a `401 Unauthorized` error.
3. Add the `express-rate-limit` middleware to the `/auth/login` route to prevent brute-force attacks (e.g., max 5 requests per minute).
4. Outline the database schema and API endpoints you would need to implement a secure password reset feature. Consider token storage, expiration, and how to prevent token reuse.
*/

/*
## Project: Secure Learning Tracker API

**Objective:** Extend the Learning Tracker API with a complete, secure authentication and authorization system using JWTs and the refresh token pattern.

**Instructions:**
1.  **Dependencies:**
    -   Install `bcrypt`, `jsonwebtoken`, `express-rate-limit`, `helmet`, and `cors`.

2.  **User Model:**
    -   Update your `schema.prisma` to include a `User` model.
    -   It must have `email` (unique), `password` (will store the hash), and `role` (e.g., an enum of `STUDENT`, `INSTRUCTOR`, `ADMIN`).
    -   Also add a `RefreshToken` model to securely store issued refresh tokens and associate them with a user.

3.  **Authentication Routes (`/auth`):**
    -   `POST /auth/register`: Hash the incoming password with `bcrypt` and create a new user.
    -   `POST /auth/login`: Find the user, compare the password with `bcrypt.compare()`. If valid, generate and return a short-lived **access token** and a long-lived **refresh token**. Store the refresh token in your database.
    -   `POST /auth/refresh`: Accept a refresh token. Validate it against the database. If valid, issue a new access token.
    -   `POST /auth/logout`: Invalidate the provided refresh token in the database.

4.  **Middleware:**
    -   **Authentication (`auth.middleware.js`):** Create a middleware that reads the `Authorization: Bearer <token>` header, verifies the access token using `jsonwebtoken`, finds the user in the database, and attaches the user object to `req.user`.
    -   **Authorization:** Create a middleware `authorize(roles)` that checks if `req.user.role` is in the allowed `roles` array.
    -   **Security Stack:** In `app.js`, apply `helmet()`, `cors()`, and rate limiting to your application or specific routes.

5.  **Protect Routes:**
    -   Apply the authentication middleware to all routes except `/auth`.
    -   Apply the authorization middleware to specific routes. For example, only an `INSTRUCTOR` or `ADMIN` should be able to create a new track (`POST /api/tracks`).

6.  **Testing:**
    -   Write integration tests for the login flow.
    -   Write a test for a protected endpoint, first without a token (expect 401), then with a valid token (expect 200).
    -   Write a test to ensure a `STUDENT` cannot access an `INSTRUCTOR`-only route (expect 403).
*/

// --- Starter Code (src/api/auth/auth.middleware.js) ---
/*
import jwt from 'jsonwebtoken';
import { prisma } from '../../db.js'; // Assuming you have a prisma client export

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or malformed header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // TODO: Verify the token using jwt.verify and your JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // TODO: Find the user in the database based on the decoded payload (e.g., userId)
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // TODO: Attach the user object to the request
    req.user = user;
    next();
  } catch (error) {
    // This will catch expired tokens, invalid signatures, etc.
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }
    next();
  };
};
*/
