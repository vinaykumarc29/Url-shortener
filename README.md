URL Shortener

A full-stack URL Shortener application that converts long URLs into shorter, shareable links. The project uses a Next.js frontend, a FastAPI backend, and PostgreSQL for persistent data storage.

Live Demo: https://url-shortener-frontend-596g.onrender.com

Tech Stack

Frontend

- Next.js — React framework for building the user interface.

Backend

- Python — Backend programming language

- FastAPI — REST API development and request handling.

Database & Deployment

- PostgreSQL — Persistent storage for URL records.

- Neon — Managed PostgreSQL database.

Features

- Convert long URLs into short, shareable links.
- Redirect users from short links to their original URLs.
- Store URL records in PostgreSQL.
- shows the no of clicks for each url

Getting Started

Prerequisites

Install the following before running the project:

- Python 3.10 or a compatible version
- Node.js and npm
- PostgreSQL database or a Neon PostgreSQL connection

1. Clone the repository

git clone https://github.com/vinaykumarc29/Url-shortener.git
cd Url-shortener

2. Set up the backend

Navigate to the backend directory:

cd backend

Create and activate a virtual environment.

Windows:

python -m venv venv
venv\Scripts\activate

Linux/macOS:

python3 -m venv venv
source venv/bin/activate

Install the Python dependencies:

pip install -r requirements.txt

3. Configure environment variables

Create a ".env" file in the backend directory and configure the required variables.

DATABASE_URL=your_postgresql_connection_string
FRONTEND_URL=http://localhost:3000

Replace the example values with your actual database connection string and frontend origin. Keep credentials private and never commit your ".env" file.

4. Start the backend

From the "backend" directory, run:

uvicorn app.main:app --reload

The backend should now be available at:

- API: "http://localhost:8000"
- Interactive API documentation: "http://localhost:8000/docs"
- Health check: "http://localhost:8000/health"

5. Set up the frontend

Open a second terminal at the project root:

cd frontend
npm install

Create a ".env" file in the frontend directory:

NEXT_PUBLIC_API_URL=http://localhost:8000

Start the development server:

npm run dev

Open "http://localhost:3000" in your browser.

Author : VinaykumarC