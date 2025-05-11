import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import userRouter from './src/routes/user';
import weatherRouter from './src/routes/weather';
import pollutionRouter from './src/routes/pollution';
import forecastRouter from "./src/routes/forecast";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

dotenv.config();

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // Update this to match your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.get("/", (req, res) =>{
    res.send("Welcome to the Weather API");
})
app.use('/users', userRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/pollution', pollutionRouter);
app.use('/api/forecast', forecastRouter);

// Logging incoming requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start server only if DB connects
const port = 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to the database successfully.');

    app.listen(port, () => {
      console.log(` Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(' Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
