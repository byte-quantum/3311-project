import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const entry = await prisma.budget.findMany({
    where: {
      userId: id,
    },
  });
  return NextResponse.json(entry);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;



  try {
    await prisma.budget.deleteMany({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true, message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Error deleting budgets:', error);
  }
}