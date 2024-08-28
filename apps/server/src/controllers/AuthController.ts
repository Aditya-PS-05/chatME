import { Request, Response } from "express";
import prisma from "../config/db.config";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface LoginPayloadType {
  name: string;
  email: string;
  image: string;
  provider: string;
  oauth_id: string;
}

class AuthController {
  static async login(request: Request, response: Response) {
    try {
      const body: LoginPayloadType = request.body;
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({ data: body });
      }

      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };

      const token = jwt.sign(JWTPayload, process.env.SECRET_KEY!, {
        expiresIn: "15d",
      });

      return response.status(200).json({
        message: "LoggedIn successfully",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      response.status(500).json({
        message: "Something went Wrong",
      });
    }
  }
}

export default AuthController;
