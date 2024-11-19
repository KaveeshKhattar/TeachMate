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

export default function Home() {
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
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Tests (at Tuition)</CardTitle>
            <CardDescription>
              Performance in the tests conducted at tuition.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
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
            <Button variant="outline">View Upcoming Tests</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px] mt-4">
          <CardHeader>
            <CardTitle>Tests (at School)</CardTitle>
            <CardDescription>
              Performance in the tests conducted at school.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
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
            <Button>Add Test</Button>
          </CardFooter>
        </Card>
        Welcome to TeachMate!
      </div>
    </>
  );
}
