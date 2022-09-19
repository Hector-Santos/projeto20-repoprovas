import { prisma } from "../config/database"
import { TTestInsertData } from "../types/testsTypes"



export async function insert(testData: TTestInsertData) {
    await prisma.test.create({
        data: testData
    });
}


export async function findById(id: number) {
    const test = await prisma.test.findUnique({
        where: { id }
    }
    );
    return test
}

export async function findAll(userId: number) {
    const tests = await prisma.test.findMany({
        where: {}
    }
    );
    return tests
}

export async function findAllInTermOrder() {
    const tests = await prisma.term.findMany({
        select: {
            number: true,
            Discipline: {
                select: {
                    name: true,
                    TeacherDiscipline: {
                        select: {
                            Test: {
                                distinct: ['categoryId'],
                                select: {
                                    category: {
                                        select: {
                                            name: true,
                                            Test: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                    teacherDiscipline: {
                                                        select: { teacher: { select: { name: true } } },
                                                    }
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return tests
}



export async function findAllInTeacherOrder() {
    const tests = await prisma.teacher.findMany({
        select: {
            name: true,
            TeacherDiscipline: {
                select: {
                    Test: {
                        distinct: ['categoryId'],
                        select: {
                            category: {
                                select: {
                                    name: true,
                                    Test: {
                                        select: {
                                            name: true,
                                            teacherDiscipline: {
                                                select: {
                                                    discipline: {
                                                        select: {
                                                            name: true
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    }
                                }

                            }
                        }
                    }
                }
            }
        }
    })
    return tests
}


export async function remove(id: number) {
    const test = await prisma.test.delete({
        where: { id }
    }
    );
    return test
}