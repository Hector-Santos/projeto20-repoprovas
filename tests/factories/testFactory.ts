import { faker } from '@faker-js/faker';

export async function testFactory() {
  return {
    name: faker.name.firstName(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    teacherId: 1,
    disciplineId:1
  };
}






