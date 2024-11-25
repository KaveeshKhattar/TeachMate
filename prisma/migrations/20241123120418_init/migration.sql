/*
  Warnings:

  - You are about to drop the column `subject` on the `Test_Tuition` table. All the data in the column will be lost.
  - Added the required column `syllabus` to the `Test_Tuition` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Test_Tuition_Student_Info_testId_key";

-- AlterTable
ALTER TABLE "Test_Tuition" DROP COLUMN "subject",
ADD COLUMN     "syllabus" TEXT NOT NULL;

-- AlterTable
CREATE SEQUENCE test_tuition_student_info_testid_seq;
ALTER TABLE "Test_Tuition_Student_Info" ALTER COLUMN "testId" SET DEFAULT nextval('test_tuition_student_info_testid_seq'),
ADD CONSTRAINT "Test_Tuition_Student_Info_pkey" PRIMARY KEY ("testId");
ALTER SEQUENCE test_tuition_student_info_testid_seq OWNED BY "Test_Tuition_Student_Info"."testId";
