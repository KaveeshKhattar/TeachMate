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

export default function TestTuition() {

    // const chartData = [
    //     { month: "January", desktop: 80, mobile: 80 },
    //     { month: "February", desktop: 70, mobile: 200 },
    //     { month: "March", desktop: 78, mobile: 120 },
    //     { month: "April", desktop: 85, mobile: 190 },
    //     { month: "May", desktop: 84, mobile: 130 },
    //     { month: "June", desktop: 76, mobile: 140 },
    //   ];

      const chartDataNew = [
        { month: "5/1/24", desktop: 80},
        { month: "8/1/24", desktop: 70},
        { month: "23/1/24", desktop: 78},
        { month: "12/2/24", desktop: 85 },
        { month: "24/2/24", desktop: 84 },
        { month: "12/3/24", desktop: 76 },
        { month: "24/2/24", desktop: 84 },
        { month: "12/3/24", desktop: 76 },
        { month: "24/2/24", desktop: 84 },
        { month: "12/3/24", desktop: 76 },
        { month: "24/2/24", desktop: 84 },
        { month: "12/3/24", desktop: 76 },
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
          <CardTitle>Tests (at Tuition)</CardTitle>
          <CardDescription>
            Performance in the tests conducted at tuition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartDataNew}>
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
          <Button variant="outline">View Test Details</Button>
        </CardFooter>
      </Card>
    </>
  );
}
