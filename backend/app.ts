// import express, { Request, Response, NextFunction } from 'express';
// import cors from 'cors';

// import dotenv from 'dotenv';
// dotenv.config();
// import createError from 'http-errors';

// import path from 'path';

// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
// import userRouter from './src/routes/user';
// import weatherRouter from './src/routes/weather';

// const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

// app.use('/users', userRouter);

// app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   res.status(err.status || 500);
//   res.render('error');
// });

// // Use the weather routes
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.originalUrl}`);
//   next();
// });

// // Use the weather routes
// app.use('/api/weather', weatherRouter);

// // Middleware to handle 404 errors
// app.use(function (req: Request, res: Response, next: NextFunction) {
//   next(createError(404));
// });

// // 404 Handler Route
// app.use(function (req: Request, res: Response, next: NextFunction) {
//   next(createError(404));
// });

// // Middleware to handle CORS
// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, // Allow credentials
// }));

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// // export default app;

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import userRouter from "./src/routes/user";
import weatherRouter from "./src/routes/weather";
import forecastRouter from "./src/routes/forecast"; // Add the forecast route

dotenv.config();

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Routes
app.use("/users", userRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/forecast", forecastRouter); // Mount the forecast route

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Middleware to handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
