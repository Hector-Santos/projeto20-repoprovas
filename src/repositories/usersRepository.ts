import { prisma } from "../config/database"
import {LogUserData} from "../types/usersTypes"


export async function insert(userData: LogUserData) {
   const user = await prisma.user.create({
        data: userData
    });
    return user
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

