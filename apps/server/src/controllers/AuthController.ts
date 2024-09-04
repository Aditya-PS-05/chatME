// import { Request, Response } from "express";
// import prisma from "../config/db.config";
// import jwt from "jsonwebtoken";
// import "dotenv/config";

// interface LoginPayloadType {
//   name: string;
//   email: string;
//   image?: string;
//   provider: string;
//   oauth_id: string;
// }

// class AuthController {
//   static async login(request: Request, response: Response) {
//     try {
//       const body: LoginPayloadType = request.body;
//       let findUser = await prisma.user.findUnique({
//         where: {
//           email: body.email,
//         },
//       });

//       if (!findUser) {
//         findUser = await prisma.user.create({ data: body });
//       }

//       let JWTPayload = {
//         name: body.name,
//         email: body.email,
//         id: findUser.id,
//       };

//       const token = jwt.sign(JWTPayload, process.env.SECRET_KEY!, {
//         expiresIn: "15d",
//       });

//       return response.json({
//         message: "LoggedIn successfully",
//         user: {
//           ...findUser,
//           token: `Bearer ${token}`,
//         },
//       });
//     } catch (error) {
//       response.status(500).json({
//         message: "Something went Wrong, please try again",
//       });
//     }
//   }
// }

// export default AuthController;

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config";

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const body: LoginPayloadType = req.body;
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }
      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };
      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
        expiresIn: "365d",
      });
      return res.json({
        message: "Logged in successfully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default AuthController;
