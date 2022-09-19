import { Test } from "@prisma/client";

export type TTestInsertData = Omit<Test, 'id'>;
export type TTestRecieveData =
Omit<Test, 'id' | 'teacherdisciplineId'> & {teacherId:number, disciplineId:number};
