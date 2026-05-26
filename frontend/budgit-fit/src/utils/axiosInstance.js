// utils/axiosInstance.js
import axios from "axios";
export const BASE_URL = 'require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/IncomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(express.json());

// CORS middleware with a specific origin
const allowedOrigins = [
  "http://localhost:5173",
  "https://budget-fit-frontend-4l0v.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);  // allow REST clients, Postman etc.
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"), false);
    }
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Server upload folder
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));/api/v1';  // Backend URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;





















































// import axios from "axios";
// import { BASE_URL } from "./apiPaths";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("token");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// // Response Interceptor
// axiosInstance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       // Handle common errors globally
//       if (error.response) {
//         if (error.response.status === 401) {
//           // Redirect to login page
//           window.location.href = "/login";
//         } else if (error.response.status === 500) {
//           console.error("Server error. Please try again later.");
//         }
//       } else if (error.code === "ECONNABORTED") {
//         console.error("Request timeout. Please try again.");
//       }
  
//       return Promise.reject(error);
//     }
//   );
  
//   export default axiosInstance;
  
