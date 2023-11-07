import BudgetingDisplay, { Budget } from "./display";
import { getUserSession } from "@/lib/auth";

async function getBudgets(userId: string): Promise<Budget[]> {
  const request = await fetch(
    `http://3311-project.vercel.app/api/budgets/${userId}`,
    {
      cache: "no-store",
    }
  );

  if (!request.ok) {
    throw new Error("Failed to fetch budgets.");
  }

  const data = await request.json();
  return data;
}

export default async function BudgetingPage() {
  const user = await getUserSession();
  const budgets = await getBudgets(user.id);

  return <BudgetingDisplay userId={user.id} budgets={budgets} />;
}
