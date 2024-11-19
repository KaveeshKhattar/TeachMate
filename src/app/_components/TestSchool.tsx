"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function TestSchool() {
  const [testName, setTestName] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [date, setDate] = useState("");
  const [marksScored, setMarksScored] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const isBeforeToday = (selectedDate: string) => {
    const today = new Date();
    const selected = new Date(selectedDate);

    return selected < today;
  };

  const { user } = useUser(); // Get the Clerk user ID

  const handleSubmit = async () => {

    try {
      const response = await fetch("/api/schoolTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          testName,
          syllabus,
          date,
          marksScored: isBeforeToday(date) ? marksScored : null,
          totalMarks,
        }),
      });

      if (response.ok) {
        console.log("Creation was a success");
      } else {
        console.log("Creation was a fail");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = [
    { month: "January", desktop: 80, mobile: 80 },
    { month: "February", desktop: 70, mobile: 200 },
    { month: "March", desktop: 78, mobile: 120 },
    { month: "April", desktop: 85, mobile: 190 },
    { month: "May", desktop: 84, mobile: 130 },
    { month: "June", desktop: 76, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <>
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle>Tests (at School)</CardTitle>
          <CardDescription>
            Performance in the tests conducted at school.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Test</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Test (School)</DialogTitle>
                <DialogDescription>
                  Add a school test that was, or is yet to be conducted. Click
                  save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Test Name
                  </Label>
                  <Input
                    id="name"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="syllabus" className="text-right">
                    Syllabus
                  </Label>
                  <Input
                    id="syllabus"
                    value={syllabus}
                    onChange={(e) => setSyllabus(e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="col-span-3"
                  />
                </div>

                {isBeforeToday(date) && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="marksScored" className="text-right">
                      Marks Scored
                    </Label>
                    <Input
                      id="marksScored"
                      value={marksScored}
                      onChange={(e) => setMarksScored(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                )}

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="totalMarks" className="text-right">
                    Total Marks
                  </Label>
                  <Input
                    id="totalMarks"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSubmit}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Link href="/student/school-test">
            <Button variant="outline">View Details</Button>
          </Link>
          
        </CardFooter>
      </Card>
    </>
  );
}
