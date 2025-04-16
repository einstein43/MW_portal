# MW Portal

## Development Setup with Docker

This project uses Docker and Docker Compose to create a consistent development environment with MySQL, a TypeScript API, and a Next.js frontend.

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Getting Started

1. Clone the repository
2. Run the setup script:

```bash
# On Windows
.\start-dev.bat

# On Linux/Mac
chmod +x ./start-dev.sh && ./start-dev.sh
```

This will start three Docker containers:

- **MySQL Database**: Available on `localhost:3306`
  - Database: `mw_portal`
  - Username: `mw_user`
  - Password: `mw_password`
- **API Server**: Available on `http://localhost:3002`
- **Web Application**: Available on `http://localhost:3000`

### Useful Commands

- **View logs**: `docker-compose logs -f`
- **Stop all containers**: `docker-compose down`
- **Rebuild containers**: `docker-compose build`
- **Start containers after stopping**: `docker-compose up -d`

### Development Workflow

1. The API uses Prisma ORM to interact with the MySQL database
2. Changes to the database schema should be made in `api/prisma/schema.prisma`
3. After modifying the schema, run migrations with:
   ```bash
   cd api && npx prisma migrate dev --name your_migration_name
   ```
4. The frontend connects to the API using the axios library

### Default Users

The system is initialized with a default admin user:
- Email: `admin@example.com`
- Password: `admin123`