/*
  Warnings:

  - You are about to drop the column `teacherdisciplineId` on the `tests` table. All the data in the column will be lost.
  - Added the required column `teacherDisciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherdisciplineId_fkey";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "teacherdisciplineId",
ADD COLUMN     "teacherDisciplineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teacherDiscilines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
