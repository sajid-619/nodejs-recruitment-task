# Node.js recruitment task

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

## Run locally

1. Clone this repository
2. Go to the repository file

```
cd ./netguru-recruitment-task
```

3. Provide .env file inside root directory

```
DB_URI=your mongoDB URI
JWT_SECRET=your JWT secret key
```

4. Compose your environment with docker

```

docker-compose up -d

```

By default the auth service will start on port `3000` but you can override
the default value by setting the `APP_PORT` env var

```

APP_PORT=8081 

```

To stop the authorization service run

```

docker-compose down

```

# Endpoints

App provides two endpoints `/auth` and `/movies`

## /auth example request

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running of the default port `3000`.

Request

```

curl --location --request POST '0.0.0.0:8081/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
"username": "basic-thomas",
"password": "sR-\_pcoow-27-6PAwCD8"
}'

```

Response

```

{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}

```

## /movies example request

To add movie to database call that endpoint for example using `Postman` app. Service is still running on post `8081`

First of all, add header to your API call

```
Authorization: Bearer <token>
```

Request

```
  "query": 'Spider-man'
```

Response

```
{
    "_id": "60eeb19ed4523c8fceadb627",
    "Title": "Spider-Man",
    "Released": "2002-05-03T00:00:00.000Z",
    "Genre": "Action, Adventure, Sci-Fi",
    "Director": "Sam Raimi"
}
```

# Users

1. `Basic` user

Basic user is limited to add 5 movies per month

```

username: 'basic-thomas'
password: 'sR-\_pcoow-27-6PAwCD8'

```

1. `Premium` user

```

username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'

```

## Token payload

Decoding the auth token will give you access to basic information about the
user including its role.

```

{
"userId": 123,
"name": "Basic Thomas",
"role": "basic",
"iat": 1606221838,
"exp": 1606223638,
"iss": "https://www.netguru.com/",
"sub": "123"
}

```