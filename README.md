## User Management System
a RESTful API that allows users to create, retrieve, update, and delete data on a PostgreSQL database.

## Getting Started
clone the Repo 
```bash
git clone git@github.com:sgatana/user-management-system.git
```
Install packages using:
```bash
npm i / npm install
# or
yarn / yarn install
```
Create `.env` file and add variables defined in the `.env.example` file

create postgres db
- if you don't have postgres installed, download it [here](https://www.postgresql.org/) 



Run the development server using:
```bash
npm run dev
# or
yarn dev
```
- An admin user will be created to allow you interact with `protected /users routes`
- dev server generates swagger documentation for all defined routes and can be accessed at [http://localhost:8000/docs](http://localhost:8000/docs)
    -   to generate swagger documentation separately, run `npm run swagger` or `yarn swagger`

- Open [http://localhost:8000](http://localhost:8000) on your postman or API platform of your choice 

## Endpoints
- user Management endpoints (`/api/v1/users`)   
    -  user management endpoints are protected routes. One need to provide Bearer token in the authorization headers in order to interact with them
- user login endpoints (`/api/v1/auth/login`)   
    -  allow user to login and generate access token to be used when interacting with `user management endpoints`.

## Folder Structure
- The API uses src directory
- Endpoints are defined in the `src/routes directory`

## Libraries

*N.B check `package.json` file to all packages used by the API*
