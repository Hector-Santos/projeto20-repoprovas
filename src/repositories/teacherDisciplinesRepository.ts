import { prisma } from "../config/database"
import {TTestInsertData} from "../types/testsTypes"



export async function insert(testData: TTestInsertData) {
    await prisma.test.create({
        data: testData
    });
  }

 export async function findByTeacherAndDisciplineId(teacherId:number, disciplineId:number) {
   const teacherDiscipline = await prisma.teacherDiscipline.findUnique({
     where :{teacherId_disciplineId:{
       teacherId, disciplineId
     }}
  })
    return teacherDiscipline
  }

   export async function findById(id:number) {
    const test = await prisma.test.findUnique({
        where :{id}
     }
     );
     return test
   }

   export async function findAll(userId:number) {
    const tests = await prisma.test.findMany({
        where :{}
     }
     );
     return tests
   }

   export async function remove(id:number) {
    const test = await prisma.test.delete({
        where :{id}
     }
     );
     return test
   }