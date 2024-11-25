"use client"; // Client-side rendering
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

type TuitionTest = {
    id: string;
    name: string;
    syllabus: string;
    date: Date;
    marks_scored: number;
    total_marks: number;
    student_id: number;
    status: "pending" | "completed";
};


export default function TuitionTest() {
    const [testName, setTestName] = useState("");
    const [syllabus, setSyllabus] = useState("");
    const [date, setDate] = useState("");
    const [marksScored, setMarksScored] = useState("");
    const [totalMarks, setTotalMarks] = useState("");

    const { user } = useUser();
    const [tests, setTests] = useState<TuitionTest[]>([]);
    const searchParams = useSearchParams()
    const clerkUserId = searchParams.get('clerkUserId')
    console.log("clerk USER Id for all tuition tests search: ", clerkUserId);

    const isBeforeToday = (selectedDate: string) => {
        const today = new Date();
        const selected = new Date(selectedDate);

        return selected < today;
    };

    const fetchTests = useCallback(async () => {
        if (!clerkUserId) {
            console.error("User is not available");
            return;
        }

        try {
            const response = await fetch(`/api/tuitionTest?userId=${clerkUserId}`, {
                method: "GET", // Use GET request here
                headers: {
                    "Content-Type": "application/json", // optional
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTests(data); // Set the data to state
                console.log("Tests fetched successfully for the child page: ", data);
            } else {
                console.error("Failed to fetch tests");
            }
        } catch (error) {
            console.error("Error fetching tests:", error);
        }
    }, [clerkUserId]);

    // useEffect to handle the asynchronous fetch
    useEffect(() => {
        fetchTests();
    }, [fetchTests, clerkUserId]); // Trigger fetch when user.id is available

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/tuitionTest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: clerkUserId,
                    teacherId: user?.id,
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

    const handleDelete = async (testId: string) => {
        try {
            const response = await fetch("/api/tuitionTest", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    testId: testId,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Test deleted successfully:", data);
                fetchTests(); // Refresh tests after deletion
            } else {
                console.error("Failed to delete test");
            }
        } catch (error) {
            console.error("Error deleting test:", error);
        }
    };

    return (
        <div>
            <ul>
                {tests.length > 0 ? (
                    tests.map((test) => (
                        <div
                            className="flex flex-col justify-center items-center mb-4"
                            key={test.id}
                        >
                            <Card className="w-[350px]">
                                <CardHeader>
                                    <CardTitle>{test.name}</CardTitle>
                                    <CardDescription>Test (School)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <p>Syllabus: {test.syllabus}</p>
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            <p>Date: {new Date(test.date).toLocaleDateString()}</p>
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            Marks Scored: {test.marks_scored}
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            Total Marks: {test.total_marks}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(test.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Update Test</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Add Test (Tuition)</DialogTitle>
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

                                </CardFooter>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p className="flex items-center justify-center mt-8">
                        No tests found
                    </p>
                )}
            </ul>
        </div>
    );
}
