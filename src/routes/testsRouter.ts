import express from 'express';
import { createTest, deleteTest, findTest, findTestsInTermOrder, findTestsInTeacherOrder } from '../controllers/testsController';
import { validate } from '../middlewares/validationMiddleware';
import { testSchema } from '../schemas/testsSchema';
import { verifyToken } from '../middlewares/authMiddleware';

const testsRouter = express.Router();
testsRouter.post("/tests/create", (req, res, next) => validate(req, res, next, testSchema), verifyToken, createTest);
testsRouter.get("/tests/find/term", verifyToken, findTestsInTermOrder);
testsRouter.get("/tests/find/teacher", verifyToken, findTestsInTeacherOrder);
testsRouter.get("/tests/find/:id", verifyToken, findTest);
testsRouter.delete("/tests/delete/:id", verifyToken, deleteTest);


export default testsRouter