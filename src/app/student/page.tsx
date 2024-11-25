"use client";
import PaymentCard from "../_components/PaymentCard";
import TestSchool from "../_components/TestSchool";
import TestTuition from "../_components/TestTuition";

interface StudentProps {
  clerkUserId: string;
}

const Student: React.FC<StudentProps> = ({ clerkUserId }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full m-4">
        <TestTuition clerkUserId={clerkUserId} />
        <TestSchool clerkUserId={clerkUserId}/>
        <PaymentCard clerkUserId={clerkUserId}/>
      </div>
    </>
  );
}

export default Student;