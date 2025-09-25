# Lesson 19 · Authentication and Security

Security is non-negotiable. Today I’ll teach you how to authenticate users, authorize actions, and defend your applications against common attacks using modern, battle-tested patterns.

## Objectives
- Distinguish between Authentication (AuthN) and Authorization (AuthZ).
- Implement secure password handling using `bcrypt`.
- Issue and verify JWTs, including the Access Token / Refresh Token pattern.
- Understand the security trade-offs of storing tokens (Cookies vs. Local Storage).
- Protect routes with authentication and authorization middleware.
- Mitigate common vulnerabilities by explaining CORS and using security headers.

## Lesson Narrative

### 1. Authentication vs. Authorization
- **Authentication (AuthN):** "Who are you?" This is the process of verifying a user's identity, typically with a username and password. The outcome is a decision: authenticated or not.
- **Authorization (AuthZ):** "What are you allowed to do?" This process happens *after* authentication. It checks if an authenticated user has permission to access a specific resource or perform an action.

### 2. Secure Password Handling
Never, ever store plaintext passwords. Passwords must be **hashed** and **salted**. A library like `bcrypt` does this for you automatically.

- **Hashing:** A one-way function that turns a password into a fixed-length, irreversible string.
- **Salting:** `bcrypt` automatically generates a random salt for each password before hashing. This ensures that two identical passwords will result in two different hashes, preventing rainbow table attacks.

```javascript
import bcrypt from "bcrypt";
const saltRounds = 12; // A higher number is more secure but slower

// To hash a new password:
const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

// To verify a login attempt:
const isValid = await bcrypt.compare(loginPassword, hashedPassword);
```

### 3. Stateless Authentication with JWTs
JSON Web Tokens (JWTs) allow you to create authenticated sessions without storing session data on the server.

#### The Refresh Token Pattern
Storing a short-lived access token is good, but asking the user to log in every 15 minutes is a bad user experience. The standard solution is the **Access Token / Refresh Token** pattern.

1.  **Login:** User logs in. The server issues two tokens:
    -   An **Access Token** (short-lived, e.g., 15 minutes). This is sent with every API request.
    -   A **Refresh Token** (long-lived, e.g., 7 days). This is stored securely (e.g., in an HTTP-only cookie) and is used only to get a new access token.
2.  **API Request:** The client sends the Access Token in the `Authorization` header.
3.  **Token Expiration:** When the Access Token expires, the API returns a `401 Unauthorized` error.
4.  **Token Refresh:** The client detects the 401, sends its Refresh Token to a special `/auth/refresh` endpoint. The server validates the refresh token and, if valid, issues a new Access Token.

#### Storing JWTs: Cookies vs. Local Storage
- **HTTP-Only Cookies:** The token is stored in a cookie that cannot be accessed by client-side JavaScript. This makes it immune to XSS attacks where a script tries to steal the token. However, it can be vulnerable to Cross-Site Request Forgery (CSRF) attacks, which requires you to implement CSRF protection.
- **Local Storage:** The token is stored in the browser's local storage. This is easy to implement but is vulnerable to XSS attacks. If a malicious script runs on your site, it can read and steal the token.

**Recommendation:** For web applications, secure, HTTP-only cookies are generally the preferred method for storing refresh tokens.

### 4. Authorization Middleware
Authorization middleware runs after authentication and checks if the authenticated user has the required permissions.

```javascript
// Middleware to check for required roles
export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    // Assumes a previous middleware has attached the user object to req
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

// Usage in a router
router.post('/tracks', authenticate, authorize(['ADMIN', 'INSTRUCTOR']), tracksController.create);
```

### 5. Understanding CORS
**C**ross-**O**rigin **R**esource **S**haring is a browser security feature that blocks a web page from making requests to a different domain than the one that served the page. The `cors` Express middleware adds HTTP headers to your server's response that tell the browser it's okay to allow these cross-origin requests.

```javascript
import cors from 'cors';

// Allow requests from a specific origin
app.use(cors({ origin: 'https://my-frontend-app.com' }));
```

### 6. Other Essential Defenses
- **Helmet:** The `helmet` middleware adds various security-related HTTP headers to protect against common attacks like clickjacking and XSS.
- **Rate Limiting:** Use `express-rate-limit` on authentication routes and other sensitive endpoints to prevent brute-force attacks.
- **Input Validation:** Always validate and sanitize all user input on the server side, even if you have client-side validation.

## Exercises

All practice drills and project instructions for this lesson can be found in the `exercises.js` file in this directory.

## Watch These Videos
- [Authentication Best Practices Overview (James Q Quick)](https://www.youtube.com/watch?v=iARfpJaaP8M)
- [2021 OWASP Top Ten Overview (F5 DevCentral Community)](https://www.youtube.com/watch?v=uu7o6hEswVQ)

## References
- OWASP Cheat Sheet Series: [Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- Auth0 Docs: [JSON Web Tokens](https://auth0.com/docs/secure/tokens/json-web-tokens)
- Node.js Security Checklist (by Snyk): [https://snyk.io/learn/node-js-security/](https://snyk.io/learn/node-js-security/)

## Reflection
- What are the pros and cons of storing a JWT in local storage versus an HTTP-only cookie?
- Why is the refresh token pattern necessary for a good user experience?
- Explain the difference between a 401 Unauthorized and a 403 Forbidden response.

Lesson 20 wraps the course with real-time communication and deployment strategies.