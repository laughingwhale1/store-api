## How to run

Before starting project, make sure you have installed locally php, composer, mysql-pdo, docker

Before you start, create .env file
```
cp .env.example .env
```

To start mysql, from root folder run
```
sudo docker compose up -d OR docker compose up -d
```

After you have your docker image build and container run, you need to start laravel api:
```
composer install
npm i
cp .env.example .env
php artisan serve
```

If you successfully launched laravel api, you can proceed to launching frontend.
For that, navigate to frontend root folder:
```
cd frontend/
```
Install dependencies and run the project:
```
npm i && npm run dev
```
Then open your browser and go to http://localhost:3000
