import { getUnpackedSettings } from 'http2';
import supertest from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/database';
import {signInFactory, signUpFactory} from './factories/authFactory'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testa POST /signup ', () => {
  it('Deve retornar 201, se cadastrado um user no formato correto', async () => {
    const user = await signUpFactory();

    const result = await supertest(app).post('/signup').send(user);

    expect(result.status).toBe(201);
  });

  it('Deve retornar 409, ao tentar cadastrar um user que exista', async () => {
    const user = await signUpFactory();

    await supertest(app).post('/signup').send(user);
    const result = await supertest(app).post('/signup').send(user);

    expect(result.status).toBe(409);
  });

  it('Deve retornar 400, ao tentar cadastrar um user com confirmação da senha diferente da senha', async () => {
    let user = await signUpFactory();

    user.confirmPassword += "a"
     
    const result = await supertest(app).post('/signup').send(user);

    expect(result.status).toBe(400);
  });
});

describe('Testa POST /signIn ', () => {
  it('Deve retornar 200, caso email e password sejam validos', async () => {
    const user = await signUpFactory();

    const logUser = {
      email:user.email,
      password:user.password
    }

    await supertest(app).post('/signup').send(user);

    const result = await supertest(app).post('/signIn').send(logUser)
    console.log(result.body.text)

    expect(result.status).toBe(200)
    
  });

  it('Deve retornar 401, ao tentar logar um user com email ou senha incorretos', async () => {
    let user = await signInFactory();
     
    const result = await supertest(app).post('/signin').send(user);

    expect(result.status).toBe(401);
  });
});

