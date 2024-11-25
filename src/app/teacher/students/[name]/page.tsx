"use client"
import PaymentCard from "@/app/_components/PaymentCard";
import TestSchool from "@/app/_components/TestSchool";
import TestTuition from "@/app/_components/TestTuition";
import { useSearchParams } from "next/navigation";

export default async function StudentViewForTeacher() {

  const searchParams = useSearchParams();
  const clerkUserId = searchParams.get('clerkUserId');

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full m-4">
        {clerkUserId && <TestTuition clerkUserId={clerkUserId} />}
        {clerkUserId && <TestSchool clerkUserId={clerkUserId} />}
        {clerkUserId && <PaymentCard clerkUserId={clerkUserId} />}
      </div>
    </>
  );
}
