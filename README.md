# How run application

1. Build backend app
    ```sh
    git clone https://github.com/gorskimarcin96/sf_travel ../sf_travel && cd ../sf_travel/docker && cp .env.dist .env && docker-compose up -d && docker-compose exec backend ./bin/console doctrine:migration:migrate -n  
    ``` 
2. Build fronted app
    ```sh
    cd docker && cp .env.dist .env && docker-compose up -d
    ```
3. [Open app from this link.](http://localhost:81/)
