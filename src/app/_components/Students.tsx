"use client"
import Image from "next/image";
import profilePic from "../_assets/images.png";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Student = {
  id: string;
  board: string;
  grade: string;
  school: string;
  user: {
    profileImage: string;
    firstName: string;
    lastName: string;
    email: string;
    clerkUserId: string;
  };
};

interface StudentsProps {
  clerkUserId: string | undefined;
}

const Students = ({ clerkUserId }: StudentsProps) => {
  const [students, setStudents] = useState<Student[]>([]);

  console.log("clerkUSERIDDDDDDD:", clerkUserId);
  const fetchStudentsPerTeacher = useCallback(async () => {
    const data = await fetch(
      `/api/fetchStudentsPerTeacher/?userClerkId=${clerkUserId}`
    );

    console.log("Called and parsing now...")
    
    if (data.ok) {
      const response = await data.json();
      console.log("response: ", response);
      const students: Student[] = response.students;
      setStudents(students);
      console.log("students: ", students);
    }

  }, [clerkUserId]);

  useEffect(() => {
    fetchStudentsPerTeacher();
  }, [fetchStudentsPerTeacher]);

  return (
    <div className="p-4 w-full space-y-4">
      {students.map((student) => (
        // Component: <StudentViewForTeacher />
        <Link
          key={student.id}
          href={{
            pathname: `/teacher/students/${student.user.firstName}-${student.user.lastName}`,
            query: { clerkUserId: student.user.clerkUserId },
          }}
          className="flex space-x-2 border border-zinc-500 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <Image
            src={
              student.user.profileImage ? student.user.profileImage : profilePic
            }
            alt={`${student.user.firstName} ${student.user.lastName}`}
            width="40"
            height="40"
            className="rounded-md"
          />
          <div className="flex flex-col items-start">
            <p>
              {student.user.firstName} {student.user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              {student.user.email}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Students;
