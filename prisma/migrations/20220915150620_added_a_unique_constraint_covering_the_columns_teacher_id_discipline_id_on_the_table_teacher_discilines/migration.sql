/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,disciplineId]` on the table `teacherDiscilines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teacherDiscilines_teacherId_disciplineId_key" ON "teacherDiscilines"("teacherId", "disciplineId");
