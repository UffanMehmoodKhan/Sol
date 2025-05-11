import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/register', async (req, res) => {
  await UserController.register(req, res);
});

router.get('/getUsers', async (req, res) => {
  await UserController.users(req, res);
});

export default router;
