# Amrita Center for Cybersecurity Systems and Networks

Official web platform for the **Amrita Center for Cybersecurity Systems and Networks, Amrita Vishwa Vidyapeetham** (`cyber-ai.amrita.edu`), designated as a **Center of Relevance and Excellence (CORE)** for Cybersecurity in India under Mission REACH, Government of India.

---

## 🏛️ System Architecture

The project is built as a complete containerized full-stack system with **React (Vite)**, **Nginx**, **Node.js (Express)**, **Prisma ORM**, and **PostgreSQL**.

```
                           +----------------------------------------+
                           |           Client (Browser)             |
                           +-------------------+--------------------+
                                               |
                                        HTTP: 80 / 8080
                                               v
                        +----------------------------------------------+
                        |                 NGINX                        |
                        |  * Static File Server (React SPA)            |
                        |  * Gzip & Caching                            |
                        |  * Security Headers                          |
                        |  * Reverse Proxy                             |
                        +----------------------+-----------------------+
                                               |
                                     location /api/ -> :5000
                                               v
                        +----------------------------------------------+
                        |            EXPRESS BACKEND                   |
                        |  * REST Endpoints (/api/contact, /api/news)  |
                        |  * Input Validation & CORS                   |
                        |  * Healthcheck (/api/health)                 |
                        +----------------------+-----------------------+
                                               |
                                      Prisma ORM Client
                                               v
                        +----------------------------------------------+
                        |            POSTGRESQL DATABASE               |
                        |  * Contact Inquiries                         |
                        |  * Newsletter Subscribers                    |
                        |  * Pre-seeded News, Projects, Whitepapers    |
                        +----------------------------------------------+
```

---

## 🚀 Quick Start with Docker Compose

To build and run all services (PostgreSQL, Prisma Backend, and Nginx Frontend) in one command:

```bash
# 1. Clone repository and navigate to root directory
cd Cyber_Security_Website

# 2. Run with Docker Compose
docker-compose up --build
```

### Accessing the Services
- **Website (Nginx + React SPA)**: [http://localhost](http://localhost) (or [http://localhost:8080](http://localhost:8080))
- **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **PostgreSQL Database**: `localhost:5432` (User: `postgres`, Password: `postgres123`, DB: `amrita_cyber_ai`)

To stop all containers:
```bash
docker-compose down
```
To stop and remove database volumes:
```bash
docker-compose down -v
```

---

## 📦 Directory Structure

```
Cyber_Security_Website/
├── docker-compose.yml              # Multi-container orchestration
├── .env.example                    # Environment variable template
├── .env                            # Local environment variables
│
├── nginx/
│   └── nginx.conf                  # Nginx configuration (reverse proxy + SPA routing)
│
├── server/                         # Backend API Service
│   ├── Dockerfile                  # Container definition for Node.js + Prisma
│   ├── docker-entrypoint.sh        # Auto-waits for Postgres, runs migrations & seed
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma           # Prisma Data Models
│   │   └── seed.js                 # Automatic database seeder
│   └── src/
│       ├── index.js                # Express app & route mounting
│       ├── prisma.js               # PrismaClient singleton
│       └── routes/
│           ├── contact.js          # POST /api/contact, GET /api/contact
│           ├── newsletter.js       # POST /api/newsletter
│           ├── news.js             # GET /api/news
│           └── projects.js         # GET /api/projects
│
└── cyber-ai-website/               # Frontend Application
    ├── Dockerfile                  # Multi-stage build (Vite build -> Nginx alpine)
    ├── nginx.conf                  # Container-specific Nginx config
    ├── package.json
    ├── vite.config.js
    └── src/                        # Complete React pages & components
        ├── App.jsx
        ├── components/             # Navbar, Footer, ScrollToTop
        └── pages/                  # Home, About, Academics, Research, Projects,
                                    # Faculty, Placements, Speakers, NewsEvents, Contact
```

---

## 🗄️ Prisma & Database Models

The PostgreSQL schema is managed declaratively via `server/prisma/schema.prisma`:

| Model | Description |
|---|---|
| `ContactSubmission` | Contact inquiries with name, email, phone, category, subject, message, and read/replied status |
| `NewsletterSubscriber` | Unique subscriber email lists for news and event releases |
| `NewsItem` | Chronological research achievements and announcements (pre-seeded) |
| `ResearchProject` | Major research initiatives (TRACK-LLM, AIoTm, SEDO, Big Data, etc.) |
| `WhitePaper` | Policy blueprints for India and the Global South |

### Useful Prisma Commands (inside `server/`)
```bash
cd server

# Generate Prisma Client
npx prisma generate

# Synchronize schema with PostgreSQL
npx prisma db push

# Open visual database browser GUI
npx prisma studio

# Run database seeder
npm run prisma:seed
```

---

## 🌐 Nginx Configuration Highlights

The Nginx server configuration (`nginx/nginx.conf`) includes:
- **Client-Side Routing Support**: `try_files $uri $uri/ /index.html;` ensures seamless navigation across React Router URLs without 404 errors.
- **Reverse Proxy**: Seamlessly proxies all `/api/*` traffic to the backend Node.js service while preserving original client headers (`Host`, `X-Real-IP`, `X-Forwarded-For`).
- **Performance**: High-efficiency Gzip compression for HTML, CSS, JavaScript, JSON, and SVG assets.
- **Cache Optimization**: 1-year immutable caching for static assets (`.js`, `.css`, fonts, images).
- **Security Headers**: Includes `X-Frame-Options`, `X-XSS-Protection`, `X-Content-Type-Options`, and `Referrer-Policy`.

---

## 💻 Local Development (Without Docker)

If you wish to run the frontend and backend independently outside Docker:

### 1. Start the Backend
```bash
cd server
npm install
npx prisma generate
# Ensure PostgreSQL is running locally with the DATABASE_URL in server/.env
npx prisma db push
npm run prisma:seed
npm run dev
```

### 2. Start the Frontend
```bash
cd cyber-ai-website
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
