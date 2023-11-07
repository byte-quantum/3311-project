import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch Budgets (/api/budgets/)
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const budgets = await prisma.budget.findMany({
    where: {
      userId: params.userId,
    },
  });
  return NextResponse.json(budgets);
}

// Create Budget (/api/budgets/)
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.budget.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}
