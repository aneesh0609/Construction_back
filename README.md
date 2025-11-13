# 🏗️ Construction Website Backend

This is the **backend server** for the Construction Website project.  
It powers the main client-facing site, the admin dashboard, and manages all APIs including projects, services, contact forms, career/job applications, and gallery features.

Built using **Node.js, Express.js, and MongoDB**, it provides a secure, scalable RESTful API layer with authentication, rate-limiting, and CORS protection for both the client and dashboard applications.

---

## ⚙️ Tech Stack

- **Backend Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Security:** Helmet, Cookie Parser, Rate Limiter, CORS  
- **Logging:** Morgan  
- **Authentication:** JWT-based login system  
- **Media Management:** Cloudinary  
- **Environment Management:** dotenv  

---

## 📁 Folder Structure


backend/
│
├── config/ # Database connection and configuration files
├── controllers/ # Business logic for each route (e.g. auth, projects, services)
├── middleware/ # Custom middleware (auth checks, error handling, etc.)
├── models/ # Mongoose models/schemas for all collections
├── routes/ # All Express route handlers
│
├── .gitignore # Files/folders ignored in version control
├── package.json # Node dependencies and scripts
├── package-lock.json # Lock file for consistent dependency installs
├── server.js # Main entry point for the backend server
└── .env.example # Example environment configuration


*/ -------------------------------------------------------------------------------------------/*

2️⃣ Install Dependencies

Run the following command to install all required dependencies:

npm install


If you face any dependency or peer-conflict issues, use:

npm install --legacy-peer-deps

*/ -------------------------------------------------------------------------------------------/*

3️⃣ Setup Environment Variables

Create a .env file inside the backend folder and configure it as shown below:

MONGO_CONS_URI=YOUR_MONGODB_CONNECTION_URI
JWT_SECRET=YOUR_JWT_SECRET_KEY

FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174

CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_SECRET

NODE_ENV=development
PORT=5000

*/ -------------------------------------------------------------------------------------------/*

4️⃣ Start the Development Server
npm start


or with nodemon (if installed globally):

nodemon server.js


Server will start on:

http://localhost:5000

*/ -------------------------------------------------------------------------------------------/*

🧩 API Routes Overview

Module	Route	Description

Auth	/api/auth	User authentication (login/signup/logout)

Projects	/api/projects	Manage construction projects

Services	/api/services	Manage services offered

Features	/api/features	List or update key construction features

Gallery	/api/gallery	Handle image uploads & management

Contact	/api/contact	Contact form submission endpoint

Careers	/api/careers	Manage career applications

Jobs	/api/jobs	Job listing management for admin panel

*/ -------------------------------------------------------------------------------------------/*


🔒 Security Features

Helmet: Protects HTTP headers.

CORS: Only allows approved frontend and dashboard URLs.

Rate Limiter: Restricts API calls to prevent abuse.

JWT Authentication: Secure user session management.

Cookie Parser: Handles cookies for sessions.


*/ -------------------------------------------------------------------------------------------/*



🌩️ Cloudinary Integration

Image uploads from the gallery, services, or project modules are stored on Cloudinary.
To use this feature, ensure your .env file has correct Cloudinary credentials:

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


*/ -------------------------------------------------------------------------------------------/*


☁️ Deployment Notes

To deploy this backend:

Set environment variables in your hosting service (e.g. Render, Railway, AWS, or your VPS).

Ensure MongoDB is accessible (Atlas recommended).

Update FRONTEND_URL and DASHBOARD_URL with your live domain URLs.


*/ -------------------------------------------------------------------------------------------/*



🧯 Troubleshooting

Issue	Possible Fix

MongoDB connection error	Check MONGO_CONS_URI in .env

CORS error	Verify frontend and dashboard URLs match environment variables

Cloudinary upload failed	Check Cloudinary credentials

Invalid token	Ensure JWT_SECRET is identical on all environments


*/ -------------------------------------------------------------------------------------------/*

👨‍💻 Developer Notes

All API routes are protected and structured via modular route files.

Use Postman for API testing (recommended).

Default response for base route (/) confirms backend is online.

🧰 Example Response

GET /api/projects

[
  {
    "_id": "6754f3...",
    "title": "Residential Villa",
    "description": "Luxury 3BHK smart home project",
    "image": "https://res.cloudinary.com/demo/image/upload/v12345/villa.jpg"
  }
]

🏁 Credits

Developed by: Aneesh Chauhan
Role: Full Stack Developer (MERN)
License: Private / Client Property


*/ -------------------------------------------------------------------------------------------/*