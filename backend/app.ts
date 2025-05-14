import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { authMiddleware } from './src/middlewares/authMiddleware';
import userRouter from './src/routes/user';
import weatherRouter from './src/routes/weather';
import pollutionRouter from './src/routes/pollution';
import forecastRouter from './src/routes/forecast';

import { PrismaClient } from '@prisma/client';
import jwt, {JwtPayload} from "jsonwebtoken";
const prisma = new PrismaClient();

dotenv.config();

const app = express();

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

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
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.get('/',(req, res) => {
  res.send('Welcome to the Weather API');
});

app.get('/verify', (req: AuthenticatedRequest,
                    res: Response,) => {

  const token = req.cookies.token;

  if (!token) {
    res.status(401).send({ message: 'Unauthorized: No token provided' , success: false});
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    res.status(200).send({message: 'Authorized: Token Provided', success: true});
  } catch (err) {
    res.status(401).send({ message: 'Invalid token' , success: false});
  }
})
app.use('/users', userRouter);
app.use('/api/weather', authMiddleware, weatherRouter);
app.use('/api/pollution', authMiddleware, pollutionRouter);
app.use('/api/forecast', authMiddleware, forecastRouter);

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
