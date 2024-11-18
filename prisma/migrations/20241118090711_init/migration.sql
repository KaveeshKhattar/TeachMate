/*
  Warnings:

  - A unique constraint covering the columns `[teacherId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacherId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_teacherId_key" ON "Student"("teacherId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
