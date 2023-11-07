"use server";
import { revalidatePath } from "next/cache";

export async function refreshBudgets() {
  revalidatePath("/budgeting");
}
