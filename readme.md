## Requirements

- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)

## Setup

1. Clone the repository. `git clone https://github.com/bug-king-solver/react_laravel`.
2. Start the containers by running `docker compose up -d` in the project root.
3. Install the composer packages by running `docker exec assignment01-laravel composer install`.
4. Create database schemas `docker exec assignment01-laravel php artisan migrate:refresh`.
5. Create faker data `docker exec assignment01-laravel php artisan db:seed`.
6. Access the Laravel instance on `http://localhost:5173` (If there is a "Permission denied" error, run `docker-compose exec laravel chown -R www-data storage`).

Note that the changes you make to local files will be automatically reflected in the container.

## Persistent database

If you want to make sure that the data in the database persists even if the database container is deleted, add a file named `docker-compose.override.yml` in the project root with the following contents.

```
version: "3.7"

services:
  mysql:
    volumes:
    - mysql:/var/lib/mysql

volumes:
  mysql:
```

Then run the following.

```
docker-compose stop \
  && docker-compose rm -f mysql \
  && docker-compose up -d
```
