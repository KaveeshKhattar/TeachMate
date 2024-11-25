"use client";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import Student from "./student/page";
import Teacher from "./teacher/page";

export default function Home() {
  const { user } = useUser();
  const [role, setRole] = useState(null);

  const fetchRole = useCallback(async () => {
    if (!user?.id) return;

    try {
      console.log("fetching role for user: ", user?.id);
      const response = await fetch(`/api/check-role/?userClerkId=${user?.id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch role: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("role fetched: ", data.role);
      setRole(data.role);
    } catch (error) {
      console.error("Error fetching role:", error);
      return null;
    }
  }, [user?.id]);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  console.log("role in parent : ", role);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full m-4">
        {role === null && <p>Welcome to TeachMate!</p>}

        {role === "STUDENT" && user?.id && <Student clerkUserId={user.id} />}

        {role === "TEACHER" && user?.id && <Teacher clerkUserId={user.id} />}
      </div>
    </>
  );
}
