"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Teacher {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
}

export default function UnSafePage() {
  const { user } = useUser();
  const [role, setRole] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [board, setBoard] = useState<string>("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    // Fetch teacher data from the API
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers");
        if (!response.ok) {
          throw new Error(`Failed to fetch teachers: ${response.statusText}`);
        }
        const data: Teacher[] = await response.json();

        // Set the data in state
        setTeachers(data);
        console.log("Teachers fetched:", data);
      } catch (error) {
        // Log the error if the fetch fails or if the response is invalid
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleUpdate = () => {
    const metadata: Record<string, string | number> = {};

    // Add additional fields for students if role is "STUDENT"
    if (role === "STUDENT") {
      metadata.role = "STUDENT";
      metadata.grade = grade;
      metadata.school = school;
      metadata.board = board;
      metadata.teacher_id = value;
    } else {
      metadata.role = "TEACHER";
    }

    user
      ?.update({
        unsafeMetadata: metadata,
      })
      .then(() => {
        console.log("User updated with unsafe metadata");
      })
      .catch((err: Error) => {
        console.error("Error updating user:", err);
      });
  };

  return (
    <div className="p-4">
      <div className="mt-4">
        <select
          name="role"
          id="role"
          onChange={(event) => setRole(event.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Select Role</option>
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
        </select>
      </div>

      {/* Additional Inputs for Students */}
      {role === "STUDENT" && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="School"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Board"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            className="border p-2 rounded-md w-full"
          />

          <div className="mt-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value ? (
                    <div className="flex items-center">
                      <Image
                        src={
                          teachers.find(
                            (teacher) => teacher.user.id.toString() === value
                          )?.user.imageUrl || ""
                        }
                        alt={
                          teachers.find(
                            (teacher) => teacher.user.id.toString() === value
                          )?.user.firstName || "Teacher"
                        }
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <span>
                        {
                          teachers.find(
                            (teacher) => teacher.user.id.toString() === value
                          )?.user.firstName
                        }{" "}
                        {
                          teachers.find(
                            (teacher) => teacher.user.id.toString() === value
                          )?.user.lastName
                        }
                      </span>
                    </div>
                  ) : (
                    "Select a teacher..."
                  )}

                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search teacher..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No teacher found.</CommandEmpty>
                    <CommandGroup>
                      {teachers.map((teacher) => (
                        <CommandItem
                          key={teacher.user.id}
                          value={teacher.user.id.toString()}
                          onSelect={(currentValue) => {
                            // Set the selected teacher's ID in the value state
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {/* Display teacher's name */}
                          <Image
                            src={teacher.user.imageUrl}
                            alt={teacher.user.firstName}
                            width={20}
                            height={20}
                          />
                          {`${teacher.user.firstName} ${teacher.user.lastName}`}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === teacher.user.id.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      <button
        onClick={handleUpdate}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md"
      >
        Update User Info
      </button>
    </div>
  );
}
