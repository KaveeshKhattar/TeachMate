/*
  Warnings:

  - You are about to drop the `Test_Tuition_Student_Info` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studentId` to the `Test_Tuition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Test_Tuition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Test_Tuition_Student_Info" DROP CONSTRAINT "Test_Tuition_Student_Info_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Test_Tuition_Student_Info" DROP CONSTRAINT "Test_Tuition_Student_Info_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Test_Tuition_Student_Info" DROP CONSTRAINT "Test_Tuition_Student_Info_testId_fkey";

-- AlterTable
ALTER TABLE "Test_Tuition" ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Test_Tuition_Student_Info";

-- AddForeignKey
ALTER TABLE "Test_Tuition" ADD CONSTRAINT "Test_Tuition_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test_Tuition" ADD CONSTRAINT "Test_Tuition_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
