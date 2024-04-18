# How run application

1. Build backend app
    ```sh
    git clone https://github.com/gorskimarcin96/sf_travel ../sf_travel && cd ../sf_travel/docker && cp .env.dist .env && docker-compose up -d && docker-compose exec backend ./bin/console doctrine:migration:migrate -n  
    ``` 
2. Build fronted app
    ```sh
   rm -rf dist/ && rm -rf node_modules/ && docker-compose -f docker/docker-compose.yml down -v && docker-compose -f docker/docker-compose.yml build --no-cache && docker-compose -f docker/docker-compose.yml up -d
    ```
3. [Open app from this link.](http://localhost:81/)
