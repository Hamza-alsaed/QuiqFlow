# Chat Microservice

A simple chat microservice built with Node.js, Express, Sequelize (PostgreSQL), Redis, and OpenAI API for message translation.

## Features

- **Authentication**: Register and login users with JWT
- **CRUD APIs**:
  - `/users` - Create, read, update, delete users
  - `/rooms` - Manage chat rooms
  - `/messages` - Send and fetch messages
- **Translation**: `/translate` endpoint using OpenAI
- **Caching**: Redis caching for recent messages
- **Configuration**: Singleton pattern for DB and config management
- **API Prefix**: All routes prefixed via API_PREFIX constant (e.g. /api/v1)

## Environment Variables

Create a `.env` file in the root:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=chatapp
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

## Setup 

Install dependencies:

bash
Copy code
npm install
Start PostgreSQL and Redis (Docker recommended):

Start PostgreSQL and Redis (Docker recommended):

bash

docker run --name chat-redis -p 6379:6379 -d redis

docker run --name chat-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=chatapp -p 5432:5432 -d postgres
Run migrations (Sequelize / Umzug):

Run migrations:

bash

npx sequelize-cli db:migrate

Start the server:

bash

npm run dev

## API Endpoints

Auth:
POST /api/v1/auth/register

POST /api/v1/auth/login

Users:
POST /api/v1/users – Public (signup)

GET /api/v1/users – Protected

GET /api/v1/users/:id – Protected

PUT /api/v1/users/:id – Protected

DELETE /api/v1/users/:id – Protected

Rooms:
POST /api/v1/rooms – Protected

GET /api/v1/rooms – Protected

GET /api/v1/rooms/:id – Protected

PUT /api/v1/rooms/:id – Protected

DELETE /api/v1/rooms/:id – Protected

Messages:
POST /api/v1/messages – Protected

GET /api/v1/messages/room/:roomId – Protected

Translate:

POST /api/v1/translate

Body:

json
{
  "text": "Hello",
  "lang": "es"
}

## Notes
Authentication middleware (authenticateJWT) is applied to all protected routes (/users, /rooms, /messages).

Passwords now require minimum length validation.

Circular imports in models resolved with interfaces instead of require().

Redis caching stores recent messages for 60 seconds.

OpenAI translation requires a valid OPENAI_API_KEY.

