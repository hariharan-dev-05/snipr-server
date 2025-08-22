# Snipr URL Shortener

Snipr is a secure, user-based URL shortener built with Node.js, Express, MongoDB, and JWT authentication. It allows users to register, log in, shorten URLs, and manage their own links securely.

## Features

- **User Registration & Login**: Secure authentication with JWT tokens.
- **Shorten URLs**: Authenticated users can shorten any valid URL.
- **No Duplicate Short URLs**: Prevents duplicate short URLs for the same original URL per user.
- **User-Specific URLs**: Each user can view only their own shortened URLs.
- **Public Redirect**: Anyone can use a short URL to be redirected to the original URL.
- **Click Tracking**: Each redirect increments a click counter.

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user. Returns JWT token and user name.
- `POST /api/auth/login` — Log in. Returns JWT token and user name.

### URL Shortening
- `POST /api/snipr` — Shorten a URL (requires JWT in `Authorization: Bearer <token>` header).
  - Request body: `{ "originalUrl": "https://example.com" }`
  - Response: `{ message, shortUrl }`

### Get User URLs
- `GET /api/urls` — Get all URLs created by the authenticated user (requires JWT).

### Redirect
- `GET /api/:shortUrl` — Redirects to the original URL for the given short code.

## Usage

1. **Register** a user via `/api/auth/register`.
2. **Login** to get a JWT token.
3. Use the token to **shorten URLs** and **view your URLs**.
4. Share the short URL (e.g., `http://localhost:3000/api/abc123`) — anyone can use it to be redirected.

## Environment Variables
Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/snipr
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Getting Started
1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm run dev
   ```

## Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcrypt
- shortid