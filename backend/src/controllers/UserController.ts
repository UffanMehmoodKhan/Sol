import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { saltrounds, generateCookie } from '../common';
import { sendLoginMessage } from '../middlewares/messageMiddleware';

const prisma = new PrismaClient();

const createUser = async (
  name: string,
  username: any,
  password: any,
  email: any,
  phone_no: any
) => {
  return prisma.user.create({
    data: {
      name,
      username,
      password,
      email,
      phone_no,
    },
  });
};


// Utility function to format phone number
function formatPhoneNumber(phoneNo: string): string {
  if (phoneNo.startsWith('0')) {
    return `+92${phoneNo.slice(1)}`;
  }
  return phoneNo;
}


class UserController {
  static async register(req: Request, res: Response) {

    try {
      const { name, username, password, email, phone_no } = req.body;
      console.log("Request body: ", { name, username, password, email, phone_no });

      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

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

  // static async login(req: Request, res: Response) {
  //   const { username, password } = req.body;
  //
  //   const user = await prisma.user.findUnique({
  //     where: { username },
  //   });
  //
  //   if (!user) {
  //     res.send({ success: false, message: 'User not found' });
  //   }
  //
  //   const isPasswordValid = await bcrypt.compare(password, user!.password);
  //   if (!isPasswordValid) {
  //     res.send({
  //       success: false,
  //       message: 'Invalid password',
  //       password: false,
  //     });
  //   }
  //
  //   const token = generateCookie(username);
  //
  //   res
  //     .cookie('token', token, {
  //       httpOnly: true,
  //       maxAge: 3600000,
  //       sameSite: 'strict',
  //     })
  //     .status(200)
  //     .json({ message: 'Logged in successfully', success: true, user: user });
  //
  //
  //   // Send login message
  //   await sendLoginMessage(req, res, user.phone_no);
  // }
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: 'Invalid password',
        password: false,
      });
    }

    const token = generateCookie(username);

    res
        .cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000,
          sameSite: 'strict',
        })
        .status(200)
        .json({ message: 'Logged in successfully', success: true, user });

    // Format phone number
    const formattedPhoneNo = formatPhoneNumber(user.phone_no);

    // Send login message
    await sendLoginMessage(req, res, formattedPhoneNo);
  }

}

export default UserController;
