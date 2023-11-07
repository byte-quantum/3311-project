import BudgetingDisplay from "./display";

async function getBudgets() {
  const request = await fetch("http://3311-project.vercel.app/api/budget", {
    cache: "no-cache",
  });

  if (!request.ok) {
    throw new Error("Failed to fetch budgets.");
  }
  return await request.json();
}

export default async function BudgetingPage() {
  const budgets = await getBudgets();
  return <BudgetingDisplay budgets={budgets} />;
}
