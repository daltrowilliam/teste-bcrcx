import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../business/entities/User";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness = new UserBusiness(
   new IdGenerator(),
   new HashManager,
   new Authenticator(),
   new UserDatabase()
);

export class UserController {
   async signup(req: Request, res: Response) {
      try {

         const input: UserInputDTO = {
            username: req.body.username,
            password: req.body.password
         }

         const token = await userBusiness.createUser(input);

         res.status(200).send({token });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

   async login(req: Request, res: Response) {

      try {

         const loginData: LoginInputDTO = {
            username: req.body.username,
            password: req.body.password
         };

         const token = await userBusiness.login(loginData);
        
         res.status(200).send({ token });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

}