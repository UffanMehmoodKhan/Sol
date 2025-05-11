import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
import createError from 'http-errors';

import path from 'path';

import cookieParser from 'cookie-parser';
import logger from 'morgan';
import userRouter from './src/routes/user';
import weatherRouter from './src/routes/weather';
import pollutionRouter from './src/routes/pollution';


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', userRouter);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Use the weather routes
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Use the weather routes
app.use('/api/weather', weatherRouter);

// Use Air Pollution API route
app.use('/api/pollution', pollutionRouter);

// Middleware to handle 404 errors
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// 404 Handler Route
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});


// Middleware to handle CORS
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials
}));


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// export default app;
