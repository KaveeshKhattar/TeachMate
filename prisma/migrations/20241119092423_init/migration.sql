-- CreateTable
CREATE TABLE "Test_Tuition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "marks_scored" INTEGER NOT NULL,
    "total_marks" INTEGER NOT NULL,

    CONSTRAINT "Test_Tuition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test_Tuition_Student_Info" (
    "testId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Test_School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "syllabus" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "marks_scored" INTEGER NOT NULL,
    "total_marks" INTEGER NOT NULL,
    "test_status" BOOLEAN NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Test_School_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_Tuition_Student_Info_testId_key" ON "Test_Tuition_Student_Info"("testId");

-- CreateIndex
CREATE UNIQUE INDEX "Test_Tuition_Student_Info_teacherId_key" ON "Test_Tuition_Student_Info"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Test_Tuition_Student_Info_studentId_key" ON "Test_Tuition_Student_Info"("studentId");

-- AddForeignKey
ALTER TABLE "Test_Tuition_Student_Info" ADD CONSTRAINT "Test_Tuition_Student_Info_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test_Tuition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test_Tuition_Student_Info" ADD CONSTRAINT "Test_Tuition_Student_Info_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test_Tuition_Student_Info" ADD CONSTRAINT "Test_Tuition_Student_Info_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test_School" ADD CONSTRAINT "Test_School_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
