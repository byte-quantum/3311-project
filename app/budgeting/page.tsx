import BudgetingDisplay from "./display";
import { getUserSession } from "@/lib/auth";

async function getBudgets() {
  const request = await fetch("http://3311-project.vercel.app/api/budgets", {
    cache: "no-cache",
  });

  if (!request.ok) {
    throw new Error("Failed to fetch budgets.");
  }
  return await request.json();
}

export default async function BudgetingPage() {
  const budgets = await getBudgets();
  const user = await getUserSession();
  return <BudgetingDisplay userId={user.id} budgets={budgets} />;
}
