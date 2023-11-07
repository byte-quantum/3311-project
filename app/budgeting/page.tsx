import BudgetingDisplay from "./display";
import { getUserSession } from "@/lib/auth";

async function getBudgets({ userId }: { userId: string }) {
  const request = await fetch(
    `http://3311-project.vercel.app/api/budgets/${userId}`,
    {
      cache: "no-cache",
    }
  );

  if (!request.ok) {
    throw new Error("Failed to fetch budgets.");
  }
  return await request.json();
}

export default async function BudgetingPage() {
  const user = await getUserSession();
  const budgets = await getBudgets(user.id);

  return <BudgetingDisplay userId={user.id} budgets={budgets} />;
}
