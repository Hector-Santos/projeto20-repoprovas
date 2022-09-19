import supertest from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/database';
import {testFactory} from './factories/testFactory'
import {signInFactory, signUpFactory} from './factories/authFactory'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests`;
  await prisma.$executeRaw`TRUNCATE TABLE users`

});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testa POST /tests/create ', () => {
  it('Deve retornar 201, se cadastrado um teste no formato correto', async () => {
    const user = await signUpFactory();

    const logUser = {
      email:user.email,
      password:user.password
    }

    await supertest(app).post('/signup').send(user);

    const {text:token} = await supertest(app).post('/signin').send(logUser)

    const test = await testFactory();
    
    const result = await supertest(app).post('/tests/create').send(test).set({ Authorization: token });

    expect(result.status).toBe(201);
  });

});


describe('Testa GET /tests/term ', () => {
  it('Deve retornar 200 e um array de objetos', async () => {

    const user = await signUpFactory();

    const logUser = {
      email:user.email,
      password:user.password
    }

    await supertest(app).post('/signup').send(user);

    const {text:token} = await supertest(app).post('/signIn').send(logUser)

    const test = await testFactory();
    
    await supertest(app).post('/tests/create').send(test).set({ Authorization: token });
    console.log(token)
    const result = await supertest(app).get('/tests/find/term').set({ Authorization: token });
    

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array)
  });

});

describe('Testa GET /tests/teacher ', () => {
  it('Deve retornar 200 e um array de objetos', async () => {

    const user = await signUpFactory();

    const logUser = {
      email:user.email,
      password:user.password
    }

    await supertest(app).post('/signup').send(user);

    const {text:token} = await supertest(app).post('/signIn').send(logUser)

    const test = await testFactory();
    
    await supertest(app).post('/tests/create').send(test).set({ Authorization: token });

    const result = await supertest(app).get('/tests/find/teacher').set({ Authorization: token });;
    

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array)
  });

});
