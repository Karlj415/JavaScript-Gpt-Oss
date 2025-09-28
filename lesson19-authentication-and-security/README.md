# Lesson 19 · Authentication and Security for Express APIs

> First protect the humans, then protect the data. 🔐  
> In this lesson, you’ll build bulletproof auth and security foundations for production APIs.

## Table of Contents
- [🎯 What You'll Master](#-what-youll-master)
- [🧭 AuthN vs AuthZ: Know the Difference](#-authn-vs-authz-know-the-difference)
- [🔑 Password Security: Hashing Done Right](#-password-security-hashing-done-right)
- [🎟️ JWTs and Sessions: Patterns that Scale](#️-jwts-and-sessions-patterns-that-scale)
- [🧰 Implementing Secure Auth in Express](#-implementing-secure-auth-in-express)
- [🛡️ Authorization: RBAC and beyond](#️-authorization-rbac-and-beyond)
- [🌐 CORS, Cookies, CSRF: Web Security Basics](#-cors-cookies-csrf-web-security-basics)
- [🧼 Input Validation and Sanitization](#-input-validation-and-sanitization)
- [🪖 Security Hardening for Production](#-security-hardening-for-production)

## 🎯 What You'll Master
- Correctly hash passwords and store user credentials safely
- Implement login with short-lived access tokens and refresh tokens
- Choose safe storage strategies (secure cookies vs local storage)
- Protect routes with authentication and role-based authorization
- Harden APIs against common attacks (XSS, CSRF, brute-force, injection)
- Apply security headers, CORS, rate limiting, and secret management

## 🧭 AuthN vs AuthZ: Know the Difference

- Authentication (AuthN) = Who are you?  
- Authorization (AuthZ) = What are you allowed to do?  

Typical flow: Login → Get tokens → Access protected resources → Authorization checks per route.

## 🔑 Password Security: Hashing Done Right

Never store plaintext passwords. Use battle-tested libraries.

```javascript
// Password hashing and verification
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12; // Security/performance trade-off

export async function hashPassword(plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}
```

Guidelines:
- Minimum length (12+), block common passwords, require complexity only when needed
- Always hash server-side before storage
- Never log secrets or password hashes
- Consider argon2 for stronger resistance when available

## 🎟️ JWTs and Sessions: Patterns that Scale

JWTs (JSON Web Tokens) enable stateless auth. Typical pattern:
- Access Token: short-lived (e.g., 15m). Sent in Authorization: Bearer <token>
- Refresh Token: long-lived (e.g., 7–30d). Stored securely, exchanged for new access tokens

Token storage options:
- HTTP-only Secure Cookies (recommended for web apps)
  - Pros: Not accessible to JS (mitigates XSS token theft)
  - Cons: Requires CSRF protections
- Bearer tokens in memory/localStorage
  - Pros: Simpler client-handling
  - Cons: Vulnerable to XSS if stored in localStorage

JWT claims you’ll commonly include:
- sub (subject: user id), iat (issued at), exp (expiry), scope/roles

## 🧰 Implementing Secure Auth in Express

```javascript
// auth.service.js - issuing and verifying tokens
import jwt from 'jsonwebtoken';

const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';

export function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}
```

```javascript
// auth.middleware.js - authenticate requests
export function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  if (!token) return res.status(401).json({ error: 'Missing bearer token' });
  
  try {
    const decoded = verifyAccessToken(token);
    req.user = { id: decoded.sub, roles: decoded.roles || [] };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
```

```javascript
// auth.routes.js - register, login, refresh, logout (outline)
import express from 'express';
import { hashPassword, verifyPassword } from './password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from './auth.service.js';
import { prisma } from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  const hash = await hashPassword(password);
  const user = await prisma.user.create({ data: { email, username, password: hash, role: 'STUDENT' } });
  res.status(201).json({ id: user.id, email: user.email, username: user.username });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await verifyPassword(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  
  const access = signAccessToken({ sub: user.id, roles: [user.role] });
  const refresh = signRefreshToken({ sub: user.id });
  
  // Option A: cookie storage (recommended for web)
  res.cookie('refreshToken', refresh, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  
  res.json({ accessToken: access });
});

router.post('/refresh', async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ error: 'Missing refresh token' });
  
  try {
    const decoded = verifyRefreshToken(token);
    const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user) return res.status(401).json({ error: 'User not found' });
    
    // Optional: rotation + persistence (invalidate old token id)
    const access = signAccessToken({ sub: user.id, roles: [user.role] });
    return res.json({ accessToken: access });
  } catch {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken', { path: '/auth' });
  res.status(204).end();
});

export default router;
```

## 🛡️ Authorization: RBAC and beyond

- Role-Based Access Control (RBAC): roles like STUDENT, INSTRUCTOR, ADMIN
- Attribute/Policy-based (ABAC/PBAC): decisions based on resource ownership, context, or claims

```javascript
// authorize.js - RBAC middleware
export const authorize = (...allowed) => (req, res, next) => {
  const roles = req.user?.roles || [];
  const permitted = roles.some(r => allowed.includes(r));
  if (!permitted) return res.status(403).json({ error: 'Forbidden' });
  next();
};

// Example usage
router.post('/tracks', authenticate, authorize('ADMIN', 'INSTRUCTOR'), createTrack);
```

## 🌐 CORS, Cookies, CSRF: Web Security Basics

- CORS: Configure allowed origins, methods, and credentials
- Cookies: Use httpOnly, secure, sameSite=strict
- CSRF: For cookie-based auth, protect state-changing routes using CSRF tokens or sameSite=strict and double-submit patterns

```javascript
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

app.use(helmet());
app.use(cors({ origin: ['https://app.example.com'], credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

## 🧼 Input Validation and Sanitization

Use a validation library (Joi/Zod) and centralize error handling.

```javascript
import joi from 'joi';

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required()
});

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).json({ error: 'Validation failed', details: error.details.map(d => d.message) });
  }
  next();
};
```

## 🪖 Security Hardening for Production

- Secrets management: keep JWT secrets in environment variables; rotate regularly
- Rate limit sensitive endpoints (`/auth/login`, `/auth/refresh`)
- Enforce TLS/HTTPS; reject plaintext in production
- Set security headers via Helmet; disable x-powered-by
- Log auth events (login success/failure, token refresh, logout) without leaking secrets
- Implement refresh token rotation and revocation list for compromised tokens
- Monitor OWASP API Top 10: Broken Auth, Excessive Data Exposure, etc.

---

## Exercises
All practice drills and project instructions for this lesson are in `exercises.js`.

## Watch These Videos
- Authentication Best Practices Overview (James Q Quick)
- 2021 OWASP Top Ten Overview (F5 DevCentral Community)
- JWTs Explained (Fireship)  
- OWASP API Top 10 (PortSwigger/OWASP)

## References
- OWASP Cheat Sheet: Authentication, Session Management, JWT, Password Storage
- Auth0 Docs: JWT and Best Practices
- Snyk: Node.js Security Checklist

## Reflection
- Cookies vs Local Storage: when and why?  
- Why is refresh token rotation important?  
- Difference between 401 vs 403 in practice?  
- How would you implement token revocation?

Next up: Lesson 20 adds real-time communication and deployment strategies.
