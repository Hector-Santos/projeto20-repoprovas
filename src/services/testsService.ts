import { insert,
         findById as findTestById, 
         remove,
         findAllInTermOrder, findAllInTeacherOrder} from "../repositories/testsRepository";
import { TTestInsertData, TTestRecieveData } from "../types/testsTypes";
import { findByTeacherAndDisciplineId } from "../repositories/teacherDisciplinesRepository";




export async function createTest(testData: TTestRecieveData){
  const teacherDiscipline = await findByTeacherAndDisciplineId(testData.teacherId, testData.disciplineId)
  if(!teacherDiscipline)
  throw {type: 'not_found', message: 'there is no corelation between the provided ids'}

  const test:TTestInsertData = {
    teacherDisciplineId: teacherDiscipline.id,
    name: testData.name,
    pdfUrl:testData.pdfUrl,
    categoryId: testData.categoryId
  }
  await insert(test)
}


export async function findTest(testId: number, userId:number){

  const test = await findTestById(testId)
	if(!test)
  throw {type: 'not_found',
         message: 'a test with the provided id could not be found'}

  return test
  
}

export async function findTestsInTermOrder(){
const testsInOrder:Object = await findAllInTermOrder()
return testsInOrder
}

export async function findTestsInTeacherOrder(){
  const testsInOrder:Object = await findAllInTeacherOrder()
  return testsInOrder
  }

export async function deleteTest(testId: number, userId:number){

  const test = await findTestById(testId)
	if(!test)
  throw {type: 'not_found',
         message: 'a test with the provided id could not be found'}

  await remove(testId)
}

