import { User } from "@prisma/client";

export type CreateUserData = Omit<User, 'id'> & {confirmPassword: string }
export type LogUserData = Omit<User, 'id'>