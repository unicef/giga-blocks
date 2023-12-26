## Description

Repo for Giga NFT2 project backend, made using nestjs.

## Installation

```bash
$ yarn install
```

## Configuration

```bash
#For env files
$ cp .env.example .env
$ cp .env.test.example .env.test
```

```bash
#For database and redis for linux system
$ sudo service postgresql start
$ sudo service redis-server start
```

Get the Email host from google by going to setting then security then to app passwords and generate a password for the app.
And update .env file with:
EMAIL_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_ADDRESS=<Your-email-address>
EMAIL_PASSWORD=<Generated-as-app-password>

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Testing API Endpoints

1. Visit the url shown in the terminal >>> http://localhost:3333/api/docs for more details

2. Send otp to the User

![Send OTP](./images/send-otp.png)

4. Login

![Login](./images/login.png)

5. Use the Access token from Above to access protected route

![Delete User Protected Route](./images/delete-user.png)

6. Refresh the token

![Refresh](./images/refresh-token.png)

## License

Nest is [MIT licensed](LICENSE).
