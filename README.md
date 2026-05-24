# Learning Platform Server

This is the Express backend for the Learning Platform application. It provides authentication, role-based course management, file upload support, and course APIs for the React frontend.

## Features

- JWT-based authentication and protected routes
- Role-based access control for students, teachers, and admins
- Course creation, update, deletion, and enrollment
- File upload support for course materials using Multer
- Cloudinary integration if configured, with local upload fallback
- Static serving of uploaded media from `/uploads`

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in `server/` with the following values:

   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

   - Cloudinary values are optional.
   - If Cloudinary is not configured, uploads are stored locally in the `server/uploads` folder.

3. Start the server in development mode:

   ```bash
   npm run dev
   ```

4. Start the server in production mode:

   ```bash
   npm start
   ```

## API Base URL

The server runs on:

```text
http://localhost:5000
```

The main course API is available at:

```text
http://localhost:5000/api/courses
```

## Scripts

- `npm run dev` - start the server with Nodemon for local development
- `npm start` - run the server with Node

## Notes

- Make sure the client is pointed at the backend URL via `REACT_APP_BACKEND_URL`.
- Uploaded files are served from `/uploads` when Cloudinary is not enabled.
- If you change the server port, update the client `.env` accordingly.
