import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { saltrounds } from '../common';

const prisma = new PrismaClient();

const createUser = async (
  name: string,
  username: any,
  password: any,
  email: any,
  phone_no: any
) => {
  // Return the created user
  return await prisma.user.create({
    data: {
      name,
      username,
      password,
      email,
      phone_no,
    },
  });
};

class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, username, password, email, phone_no } = req.body;

      // Check if username already exists
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

      // Check if email already exists
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUsername || existingEmail) {
        return res.status(400).send({
          message: 'User with this username or email already exists',
          success: false,
          username: !existingUsername,
          email: !existingEmail,
        });
      }

      const hashedPassword = await bcrypt.hash(password, saltrounds);

      const user = await createUser(
        name,
        username,
        hashedPassword,
        email,
        phone_no
      );

      if (user) {
        res.status(201).send({
          message: 'User registered successfully',
          success: true,
          user: { name, email },
        });
      }
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Something went wrong', success: false, error: err });
    }
  }

  static async users(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).send(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send({ message: 'Error fetching users', error });
    }
  }
}

export default UserController;
