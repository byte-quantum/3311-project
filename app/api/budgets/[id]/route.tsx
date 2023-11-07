import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const entry = await prisma.budget.findMany({
    where: {
      id: id,
    },
  });
  return NextResponse.json(entry);
}
