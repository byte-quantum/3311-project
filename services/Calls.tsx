import { Account } from "@/app/page";

function filterAccountProperties(account: any): Account {
  return {
    account_id: account.account_id,
    balances: {
      available: account.balances?.available || 0,
      current: account.balances?.current || 0,
    },
    name: account.name,
    bank: account.bank,
    mask: account.mask,
    acct_number: account.acct_number,
    expanded: false,
  };
}

export async function getData(): Promise<Account[] | undefined> {
  const response = await fetch(`http://localhost:8000/api/auth/`, {
    method: "GET",
  });
  //console.log(response);
  const data = await response.json();
  if (data.error != null) {
    return;
  }
  console.log(data.accounts);
  const bank_accounts: Account[] = data.accounts.map(filterAccountProperties);
  console.log(bank_accounts);
  return bank_accounts;
}
