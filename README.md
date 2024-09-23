# Free ticket concert app

## Project Structure

The project is divided into two main parts:

- `client/`: React frontend built with Next.js
- `server/`: NestJS backend

## Technologies Used

### Frontend (client)
- Next.js
- React
- TypeScript
- Tailwind CSS
- NextAuth.js
- Tanstack React Query
- Axios

### Backend (server)
- NestJS
- TypeScript
- Prisma (ORM)
- PostgreSQL

### DevOps
- Docker
- Docker Compose

## Setup and Local Development

1. Clone the repository:
   ```
   git clone https://github.com/chaiwattsw/datawow-assignment.git
   cd datawow-assignment
   ```

2. Install dependencies:
   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   Create a `.env` file in both the `client` and `server` directories and add the necessary environment variables.

   For client:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key_here
   API_URL=http://localhost:3001
   ```

   For server:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   ```

4. Run the application using Docker:
   ```
   docker-compose up --build
   ```

   This will start both the client and server applications, as well as a PostgreSQL database.

5. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3001)
   - Backend API: [http://localhost:3001](http://localhost:3000)

## Application Architecture

### Frontend
- `app/`: Contains the main pages of the application. Each file in this directory becomes a route.
- `_components/`: Reusable React components used throughout the application.
- `utils/`: Utility functions and custom hooks.
- `middleware.ts`: NextAuth middleware for protecting routes.

### Backend
- `src/`: Contains the source code for the NestJS application.
  - `auth/`: Authentication module for handling user login, registration, and authorization.
  - `users/`: User management module for handling user-related operations.
  - `concerts/`: Concert management module for handling concert-related operations.
  - `reservations/`: Reservation module for managing concert bookings and reservations.
- `prisma/`: Contains Prisma schema and migrations.

## Database

The application uses PostgreSQL as its database. The schema is managed using Prisma ORM.

To update the database schema:

1. Modify the `prisma/schema.prisma` file.
2. Run migrations:
   ```
   cd server
   npx prisma migrate dev
   ```

## Libraries and Packages

### Frontend
- **Next.js**: React framework for production-grade applications.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for improved developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **NextAuth.js**: Authentication solution for Next.js applications.
- **Tanstack React Query**: Powerful asynchronous state management for TS/JS, React, Solid, Vue and Svelte.
- **Axios**: Promise-based HTTP client for making API requests.

### Backend
- **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **PostgreSQL**: Powerful, open source object-relational database system.

## Running Tests

To run the unit tests:

For frontend:
```
cd client
npm run test
```

For backend:
```
cd server
npm run test
```

## Docker

The application uses Docker for containerization. The `docker-compose.yml` file in the root directory defines the services (client, server, and database).

To build and run the Docker containers:
```
docker-compose up --build
```

To stop the containers:
```
docker-compose down
```
