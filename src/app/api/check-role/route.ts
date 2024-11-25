import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userClerkId = searchParams.get("userClerkId");
    console.log("userClerkId:", userClerkId?.trim());
    const user = await prisma.user.findFirst({
        where: { clerkUserId: userClerkId?.trim() ?? undefined },
    });
    console.log("user: ", user);
    return NextResponse.json({ role: user?.role || null }, { status: 200 });
}