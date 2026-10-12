# URL Shortener

A full-stack URL Shortener application that converts long URLs into shorter, shareable links. The project uses a **Next.js** frontend, a **FastAPI** backend, and **PostgreSQL** for persistent data storage.

**Live Demo:** [https://url-shortener.vinaykumarc.dev](https://url-shortener.vinaykumarc.dev)

---

## Tech Stack

### Frontend

- **Next.js** — React framework for building the user interface.

### Backend

- **Python** — Backend programming language.
- **FastAPI** — REST API development and request handling.

### Database

- **PostgreSQL** — Persistent storage for URL records.
- **Neon** — Managed PostgreSQL database.

---

## Features

- Convert long URLs into short, shareable links.
- Redirect users from short links to their original URLs.
- Store URL records in PostgreSQL.
- Track the number of clicks for each URL.

---

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/` | Check whether the API is running. |
| GET | `/health` | Check the health status of the backend. |
| POST | `/api/urls/` | Create a short URL. |
| GET | `/api/urls/` | Retrieve URLs, with optional search support. |
| DELETE | `/api/urls/{url_id}` | Delete a URL by its ID. |
| GET | `/{short_code}` | Redirect to the original URL. |
| GET | `/docs` | Interactive Swagger API documentation. |

---

## Getting Started

### Prerequisites

Install the following before running the project:

- Python 3.10 or later
- Node.js and npm
- PostgreSQL database or a Neon PostgreSQL connection

### 1. Clone the Repository

```bash
git clone https://github.com/vinaykumarc29/Url-shortener.git
cd Url-shortener
```

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment.

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/macOS:**

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL=your_postgresql_connection_string
FRONTEND_URL=http://localhost:3000
```

Replace the database URL with your actual PostgreSQL connection string. Keep your credentials private and never commit your `.env` file.

### 4. Run the Backend

From the `backend` directory, run:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

- **API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs
- **Health Check:** http://localhost:8000/health

### 5. Set Up the Frontend

Open a second terminal at the project root:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Author : **VinaykumarC**
