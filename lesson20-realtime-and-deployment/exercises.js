/*
## Practice Drills
1. Add a basic Socket.IO setup to your Express server. Create a simple front-end client that connects and logs a message when another user triggers an event (e.g., completes a lesson).
2. Create a `Dockerfile` for your API project. Use a multi-stage build to keep the final image small. Build the image locally and run it to verify it works.
3. Create a basic GitHub Actions workflow (`.github/workflows/ci.yml`) that installs dependencies and runs your tests (`npm ci && npm test`) on every push to the `main` branch.
4. Implement a simple `/sse-notifications` endpoint on your Express server that sends a `message` event with the current server time to the client every 3 seconds.
*/

/*
# Capstone Project: Learning Journey Platform

**Objective:** Design, build, and deploy a full-stack application that integrates all the concepts from this course. This project is your portfolio piece.

--- 

### Core Requirements

#### 1. Backend API (Node.js & Express)
-   **Authentication:** Full JWT-based authentication with an access/refresh token pattern. Users should be able to register and log in.
-   **Authorization:** At least two user roles (e.g., `STUDENT`, `INSTRUCTOR`). Instructors should have permissions that students do not (e.g., creating courses).
-   **RESTful Resources:** Implement full CRUD APIs for at least two related resources (e.g., `Courses` and `Lessons`, or `Users` and `Progress`).
-   **Database:** Use PostgreSQL with Prisma. Your schema should include relations, indexes, and appropriate constraints.
-   **Real-time Feature:** Use WebSockets or Server-Sent Events to provide a real-time update. For example, when an instructor updates a course, all connected students viewing that course should see the update without refreshing.

#### 2. Frontend Application (Vanilla JS or a Framework)
-   **Structure:** A clean, modular structure. Can be a Single-Page Application (SPA).
-   **Functionality:**
    -   Login and registration forms.
    -   A dashboard to view and interact with the API resources (e.g., a list of courses).
    -   A view that displays real-time updates from the server.
    -   Protected routes that are only accessible after logging in.

#### 3. Deployment & DevOps
-   **Containerization:** Provide a complete, optimized, multi-stage `Dockerfile` for the backend application.
-   **CI/CD:** Create a GitHub Actions pipeline that automatically runs tests on every push. For a bonus, add a step that builds and pushes your Docker image to a registry (like Docker Hub or GitHub Container Registry).
-   **Deployment:** Deploy both your frontend and backend to a cloud platform (e.g., Render, Fly.io, Heroku, or a cloud provider like AWS/GCP/Azure). The backend should run as a container.
-   **Configuration:** The deployed application must be configured using environment variables (for database URLs, JWT secrets, etc.), not hard-coded values.

--- 

### Deliverables

1.  **A public GitHub repository** containing all your code, structured professionally (e.g., separate folders for `backend` and `frontend`).
2.  A **comprehensive `README.md`** at the root of your project. It must include:
    -   A description of the project and its features.
    -   Architectural diagrams or explanations.
    -   Instructions on how to set up and run the project locally (including database setup).
    -   A link to the live, deployed application.
3.  A **`POSTMORTEM.md`** file. This is a reflection on your project, detailing:
    -   What went well and what was challenging.
    -   Architectural decisions you made and their trade-offs.
    -   What you would do differently next time.
    -   A roadmap for future features.

This capstone project is your opportunity to demonstrate that you can not only use these technologies but can also think like a software engineer.
*/
