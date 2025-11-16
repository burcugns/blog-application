# Blog Application

A full-stack blog application built with Node.js, Express, and MySQL. Users can create accounts, authenticate, and manage their blog posts with full CRUD operations.

## Features

-User authentication with JWT tokens<br>
-User registration and login<br>
-Create, read, update, and delete blog posts<br>
-Password hashing with bcrypt<br>

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend** : HTML , CSS , JavaScript
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing
- **Environment**: dotenv for configuration

## Installation

1. Clone the repository:

```bash
git clone https://github.com/burcugns/blog-application.git
cd blog-application
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=blog_db
DB_DIALECT=mysql
DB_PORT=3306
JWT_SECRET=your_secret_key_here
PORT=3306
```

4. Set up the database:

   - Create a MySQL database named `blog_db` (or use the schema.sql file):

   ```sql
   CREATE DATABASE blog_db;
   ```

   - The application will automatically create tables using Sequelize when you start the server

5. Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

To rebuild the database (drops and recreates all tables):

```bash
npm run rebuild
```

The server will start on `http://localhost:3001` (or the port specified in your `.env` file).

## Project Structure

```
blog-application/
├── config/
│   └── connection.js
├── db/
│   └── schema.sql
├── models/
│   ├── blog.js
│   ├── user.js
│   └── index.js
├── routes/
│   ├── blog.js
│   └── user.js
├── utils/
│   └── auth.js
├── public/
│   ├── assets/
│   │   ├── css/
│   │   └── js/
│   ├── blog.html
│   └── login.html
├── server.js
├── package.json
└── README.md
```
