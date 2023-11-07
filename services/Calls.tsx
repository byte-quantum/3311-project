import { Account, Transaction } from "@/app/page";

async function filterTransactionProperties(
  transaction: any
): Promise<Transaction | undefined> {
  const result = await getBankData();
  console.log(result);
  if (result) {
    console.log(result.institution_id);
    return {
      account_id: transaction.account_id,
      amount: transaction.amount,
      category: transaction.category,
      name: transaction.name,
      merchant_name: transaction.merchant_name,
      logo_url: transaction.logo_url,
      date: transaction.date,
    };
  } else {
    console.log("Failed to get transaction data");
  }
}

async function filterAccountProperties(
  account: any
): Promise<Account | undefined> {
  const result = await getBankData();
  console.log(result);
  if (result) {
    console.log(result.institution_id);
    return {
      account_id: account.account_id,
      acct_type: account.type,
      balances: {
        available: account.balances?.available || 0,
        current: account.balances?.current || 0,
      },
      balance: account.balances.available,
      name: account.name,
      bank: result.institution_name,
      bank_id: result.institution_id,
      mask: account.mask,
      acct_number: account.acct_number,
      expanded: false,
    };
  } else {
    console.log("Failed to get bank data");
  }
}

async function getBankData(): Promise<
  { institution_id: string; institution_name: string } | undefined
> {
  const response = await fetch(`http://localhost:8000/api/item/`, {
    method: "GET",
  });
  const data = await response.json();
  if (data.error != null) {
    return;
  }
  return {
    institution_id: data.institution.institution_id,
    institution_name: data.institution.name,
  };
}

export async function getData(): Promise<Account[]> {
  const response = await fetch(`http://localhost:8000/api/auth/`, {
    method: "GET",
  });
  const data = await response.json();
  if (data.error != null) {
    console.log("Failed to get accounts");
  }
  const bank_accounts: Account[] = data.accounts.map(filterAccountProperties);
  const resolvedBankAccounts: Account[] = await Promise.all(bank_accounts);

  console.log(resolvedBankAccounts);
  return resolvedBankAccounts;
}

export async function getTransactionData(): Promise<Transaction[]> {
  const response = await fetch(`http://localhost:8000/api/transactions/`, {
    method: "GET",
  });
  const data = await response.json();
  if (data.error != null) {
    console.log("Failed to get Transaction");
  }
  console.log(data);

  const transaction_history: Transaction[] = data.latest_transactions.map(
    filterTransactionProperties
  );
  const resolvedTransactionHistory: Transaction[] = await Promise.all(
    transaction_history
  );

  console.log(resolvedTransactionHistory);

  return resolvedTransactionHistory;
}
