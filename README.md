# AI Job Search Platform (Microservices Backend)

Beginner-friendly Node.js + Express + MongoDB backend.

## Architecture

```
Client
  -> API Gateway (JWT check, proxy)
      -> Auth Service
      -> User Service
      -> Resume Service
      -> Job Service
      -> Interview Service
      -> Notification Service
```

## Services and ports

| Service | Port | Database |
|---|---|---|
| API Gateway | 8000 | - |
| Auth Service | 8001 | auth_db |
| User Service | 8002 | user_db |
| Resume Service | 8003 | resume_db |
| Job Service | 8004 | job_db |
| Interview Service | 8005 | interview_db |
| Notification Service | 8006 | notification_db |

## How to run locally (without Docker)

1. Start MongoDB and Redis.
2. Copy each service `.env` and fill API keys.
3. In every service folder run:

```bash
npm install
npm run dev
```

Start API Gateway last.

## How to run with Docker

```bash
docker compose up --build
```

Gateway URL: `http://localhost:6000`

## Auth flow

1. Register or login through gateway public routes.
2. Access token is returned in the response body.
3. Refresh token is stored in MongoDB and in an HTTP-only cookie.
4. Protected routes send: `Authorization: Bearer <accessToken>`
5. Gateway verifies the token and forwards `x-user-id` to services.

## Main API routes (through gateway)

### Auth
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- POST `/api/v1/auth/logout`
- POST `/api/v1/auth/refresh`

### User
- GET `/api/v1/users/profile`
- PUT `/api/v1/users/profile`

### Resume
- POST `/api/v1/resumes/upload`
- GET `/api/v1/resumes`
- GET `/api/v1/resumes/:id`
- DELETE `/api/v1/resumes/:id`
- POST `/api/v1/resumes/:id/analyze`
- POST `/api/v1/resumes/:id/ats-score`
- POST `/api/v1/resumes/:id/compare-jd`
- POST `/api/v1/resumes/:id/improve`

### Jobs
- GET `/api/v1/jobs/search`
- POST `/api/v1/jobs`
- POST `/api/v1/jobs/save`
- GET `/api/v1/jobs/saved`
- POST `/api/v1/jobs/apply`
- GET `/api/v1/jobs/applied`
- POST `/api/v1/jobs/recommend`
- POST `/api/v1/jobs/skill-gap`
- POST `/api/v1/jobs/rank`

### Interviews
- POST `/api/v1/interviews/start`
- POST `/api/v1/interviews/:id/continue`
- POST `/api/v1/interviews/:id/end`
- GET `/api/v1/interviews`
- GET `/api/v1/interviews/:id`

### Notifications
- GET `/api/v1/notifications`
- POST `/api/v1/notifications/email`
- POST `/api/v1/notifications/job-alert`
- POST `/api/v1/notifications/interview-reminder`
