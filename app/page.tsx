"use client";
import Image from "next/image";
import chase_svg from "@/public/chase-color.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Account {
  id: number;
  bank: string;
  acct_type: string;
  acct_number: string;
  balance: number;
  expanded: boolean;
}

export const bank_accounts: Account[] = [
  {
    id: 1,
    bank: "Chase",
    acct_type: "Checking",
    acct_number: "1234",
    balance: 1000,
    expanded: false,
  },
  {
    id: 2,
    bank: "Chase",
    acct_type: "Checking",
    acct_number: "1234",
    balance: 1000,
    expanded: false,
  },
];

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>(bank_accounts);
  const handleExpand = (id: number) => {
    const updatedAccounts = accounts.map((account) => {
      if (account.id === id) {
        return { ...account, expanded: !account.expanded };
      }
      return account;
    });
    setAccounts(updatedAccounts);
  };

  return (
    <>
      <section className="w-full max-w-6xl bg-green-700 rounded-2xl text-white mx-auto h-52">
        <div className="p-4">
          <span className="text-2xl font-bold">Point Tracker</span>
        </div>
      </section>

      <section className="mt-32 space-y-6">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={cn(
              account.expanded ? "h-64" : undefined,
              "w-full max-w-6xl bg-slate-800 rounded-2xl text-white mx-auto"
            )}
          >
            <div
              className={cn(
                account.expanded ? "border-b border-slate-700" : undefined
              )}
            >
              <div className="flex items-center p-4">
                <Image src={chase_svg} alt="Chase" width={40} height={40} />
                <div className="ml-4">
                  <div className="text-lg font-semibold">{account.bank}</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => {
                    handleExpand(account.id);
                  }}
                >
                  {account.expanded ? (
                    <ChevronDownIcon className="w-6 h-6 transform rotate-180" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
