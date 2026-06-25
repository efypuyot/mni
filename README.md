# MNI stands for My name is...?

MNI is a small Laravel + React application for collecting names. The home page renders a React form, stores submitted first and last names through a Laravel API, and shows the newest saved entries first.

## Deliverables

- Shared Git Repository: [https://github.com/efypuyot/mni](https://github.com/efypuyot/mni)
- Static IP Deployment: [http://136.116.176.106](http://136.116.176.106/)

The application is deployed live on a GCP VM instance and is fully working as of writing.

## Stack

- Laravel 13
- PHP 8.3+
- React 19
- Vite 8
- Tailwind CSS 4 tooling
- Laravel Sanctum
- Pest

## Features

- Add a person's first and last name from the web UI.
- Persist names in the `people` table.
- List saved names from newest to oldest.
- Show toast notifications for loading, success, and error states.

## Requirements

- PHP 8.3 or newer
- Composer
- Node.js and npm
- PostgreSQL, matching the default `.env.example` database configuration

## Setup

Install PHP and JavaScript dependencies:

```bash
composer install
npm install
```

Create your environment file and application key:

```bash
cp .env.example .env
php artisan key:generate
```

Update `.env` with your local database credentials. The default database connection is PostgreSQL:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=mni
DB_USERNAME=postgres
DB_PASSWORD=asdfghjkl
```

Run the migrations:

```bash
php artisan migrate
```

You can also run the project's setup script, which installs dependencies, prepares `.env`, runs migrations, and builds frontend assets:

```bash
composer run setup
```

## Development

Start the Laravel server, queue listener, log tailer, and Vite dev server together:

```bash
composer run dev
```

Or run the services separately:

```bash
php artisan serve
npm run dev
```

Then open the Laravel app in your browser, usually at:

```text
http://127.0.0.1:8000
```

## API

The React frontend uses these API routes:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/people` | Return all saved people, newest first. |
| `POST` | `/api/people` | Save a person with `first_name` and `last_name`. |

Example POST body:

```json
{
  "first_name": "Ada",
  "last_name": "Lovelace"
}
```

## Testing and Formatting

Run the test suite:

```bash
php artisan test --compact
```

Format PHP changes with Laravel Pint:

```bash
vendor/bin/pint --dirty --format agent
```

Build production frontend assets:

```bash
npm run build
```
