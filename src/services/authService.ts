import { findByEmail} from "../repositories/usersRepository";
import { LogUserData } from "../types/usersTypes";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export async function login(userData: LogUserData){

  const user = await findByEmail(userData.email)
	if(!user) throw {type: 'not_found', message: 'a user with the provided email could not be found'}

  const correctPassword = bcrypt.compareSync(userData.password, user.password);
  if(!correctPassword) throw {type: 'unauthorized', message: 'the provided password is incorrect'}

  const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';
  const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

  const payload = {
    id: user.id
  };

  const jwtConfig = {
    expiresIn: EXPIRES_IN
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
}
