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
- **API Prefix**: Centralized route prefix constants

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
Setup
Install dependencies:

bash
Copy code
npm install
Start PostgreSQL and Redis (Docker recommended):

bash
Copy code
docker run --name chat-redis -p 6379:6379 -d redis
docker run --name chat-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=chatapp -p 5432:5432 -d postgres
Run migrations (Sequelize / Umzug):

bash
Copy code
npx sequelize-cli db:migrate
Start the server:

bash
Copy code
npm run dev
API Endpoints
Auth
POST /api/v1/auth/register

POST /api/v1/auth/login

Users
POST /api/v1/users

GET /api/v1/users

GET /api/v1/users/:id

PUT /api/v1/users/:id

DELETE /api/v1/users/:id

Rooms
POST /api/v1/rooms

GET /api/v1/rooms

GET /api/v1/rooms/:id

PUT /api/v1/rooms/:id

DELETE /api/v1/rooms/:id

Messages
POST /api/v1/messages

GET /api/v1/messages/room/:roomId

Translate
POST /api/v1/translate

Body:

json
Copy code
{
  "text": "Hello",
  "lang": "es"
}
Notes
Make sure users and rooms exist before sending messages to avoid foreign key errors.

Redis caching stores recent messages for 60 seconds.

OpenAI translation requires a valid OPENAI_API_KEY.