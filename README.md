# Course-crud

Server Live Link

### https://course-review-ochre.vercel.app/

## Run the server application locally

If you want to run the server locally on your computer, firstly clone this project and then run `npm install` and then run the command `npm run build` to convert the TypeScript code to JavaScript code. And start the server with `npm run start:dev` command.

## Server Documentation

- This server is created to manage users and their orders.
- New users are created here, and all users in the database can be seen.
- Also, any user can be retrieved with a specific ID.
- In this, the user can be deleted and updated.
- Here you can add the orders of that user with the ID of a user, view the orders and see the total price.

## Server API

### 1. Create a new Course

Endpoint: POST `/api/course`

### 2. Retrieve a list of all users

Endpoint: GET `/api/course`

### 3. Get Course by ID with Reviews\*\*

Endpoint: GET `/api/courses/:courseId/reviews`

### 4. Update Course information

Endpoint: PUT `/api/courses/:courseId`

### 5. Create a categories

Endpoint: POST `/api/categories`

### 6. Add New Product of Order in user

Endpoint: GET `/api/categories`

### 7. Create a reviews

Endpoint: POST `/api/reviews`

### 8. Get the Best Course Based on Average Review (Rating)

Endpoint: GET `/api/course/best`
