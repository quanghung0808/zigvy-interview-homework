# ZigTask API

## Project Overview
ZigTask API is a NestJS-based backend providing authentication, user management, and task CRUD operations for the ZigTask application. It supports JWT-based auth, real-time updates via WebSockets, and push notifications for tasks due soon. Data is stored in MongoDB.

## Setup & Run Instructions 

### Prerequisites
- Node.js v20+
- MongoDB (local, cloud, or Docker)

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy the example environment file and update with your MongoDB URI and JWT secret:
```bash
cp .env-example .env
```

### 3. Set up the Database

#### a) Local MongoDB
- Install MongoDB Community Edition: https://www.mongodb.com/try/download/community
- Start MongoDB locally (default URI: `mongodb://localhost:27017/zigtask`)
- Update your `.env` file with the local URI.

#### b) MongoDB Atlas (Cloud)
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a new cluster and database (e.g., `zigtask`)
- Whitelist your IP and create a database user
- Get your connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/zigtask?retryWrites=true&w=majority`)
- Update your `.env` file with the Atlas URI.

#### c) Docker
- If you have Docker installed, you can run MongoDB with:
```bash
docker run --name zigtask-mongo -p 27017:27017 -d mongo:latest
```
- The default URI will be `mongodb://localhost:27017/zigtask`
- Update your `.env` file accordingly.

### 4. Start the development server
```bash
npm run start:dev
```
- API runs at http://localhost:3000
- Swagger docs: http://localhost:3000/api-docs

### 5. Run tests
```bash
npm test
```

### 6. Lint & Build
```bash
npm run lint
npm run build
```

## Decisions & Trade-offs
- **Database:** Chose MongoDB with Mongoose for its flexible schema, rapid prototyping, and easy integration with NestJS. This allows for quick iteration and is well-suited for document-based data like tasks and users.
- **Authentication:** Used JWT for stateless, scalable authentication, making it easy to secure APIs and integrate with frontend/mobile clients.
- **Real-time Updates:** Leveraged NestJS Gateway and Socket.IO for real-time task updates and notifications, providing a responsive user experience.
- **Push Notifications:** Implemented a custom scheduler for push notifications about tasks due soon, as NestJS v11 had compatibility issues with @nestjs/schedule.
- **Validation:** Used class-validator for robust DTO validation, ensuring data integrity and clear error messages.
- **Testing:** Adopted Jest for both unit and e2e tests to ensure code quality and reliability.
- **CI/CD:** Designed with CI/CD in mind, using scripts and configuration that support automated linting, testing, and building.
- **Trade-off:** Chose MongoDB over SQL for speed and flexibility, at the cost of some transactional guarantees and relational features.

## Swagger/OpenAPI Spec
- API documentation available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)