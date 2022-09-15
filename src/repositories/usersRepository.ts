import { prisma } from "../config/database"
import {LogUserData} from "../types/usersTypes"


export async function insert(userData: LogUserData) {
    await prisma.user.create({
        data: userData
    });
  }


  export async function findByEmail(email:string) {
   const user = await prisma.user.findUnique({
       where :{email}
    }
    );
    return user
  }

  export async function findById(id:number) {
    const user = await prisma.user.findUnique({
        where :{id}
     }
     );
     return user
   }

