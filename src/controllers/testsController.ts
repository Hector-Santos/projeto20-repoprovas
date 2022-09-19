import { Request, Response } from 'express';
import { TTestRecieveData } from '../types/testsTypes';
import { createTest as createTestService} from '../services/testsService';
import { findTest as findTestService,
         findTestsInTermOrder as findTestsInTermOrderService,
         findTestsInTeacherOrder as findTestsInTeacherOrderService,
         deleteTest as deleteTestService} from '../services/testsService';

export async function createTest(req:Request, res:Response) {
  const test:TTestRecieveData = req.body
  await createTestService(test)      
  res.sendStatus(201);
}

 export async function findTest(req:Request, res:Response) {
   const testId:number = Number(req.params.id);
   const userId:number = res.locals.id
   const test = await findTestService(testId, userId)      
   res.status(200).send(test);
 }

 export async function findTestsInTermOrder(req:Request, res:Response) {
   const tests = await findTestsInTermOrderService()      
   res.status(200).send(tests)
 }

 export async function findTestsInTeacherOrder(req:Request, res:Response) {
  const tests = await findTestsInTeacherOrderService()      
  res.status(200).send(tests)
}

 export async function deleteTest(req:Request, res:Response) {
   const testId:number = Number(req.params.id);
   const userId:number = res.locals.id
   await deleteTestService(testId, userId)      
   res.sendStatus(200);
 }