"use client";
import Image from "next/image";
import chase_svg from "@/public/chase-color.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export interface Bank {
  id: number;
  name: string;
  logo: string;
  accounts: Account[];
}

export interface Account {
  id: number;
  bank: string;
  acct_type: string;
  acct_number: string;
  balance: number;
  expanded: boolean;
}

export const banks: Bank[] = [
  { id: 0, name: "Chase", logo: chase_svg.src, accounts: [] },
  { id: 1, name: "Wells Fargo", logo: chase_svg.src, accounts: [] },
];

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

  // Progress words
  const thresholds = [0, 25, 50, 75, 90, 100];
  const messages = [
    "Try harder!",
    "Keep up the great work!",
    "You're doing great!",
    "Almost there! Don't give up now!",
    "You've made it!",
  ];
  const getMessage = (progress: number) => {
    const index = thresholds.findIndex((threshold) => progress < threshold);
    return messages[index - 1];
  };

  // Progress bar
  const [progress, setProgress] = useState(25);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(progress < 100 ? progress + 1 : 0);
    }, 500);
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <>
      <section className="w-full max-w-6xl bg-green-700 rounded-2xl text-white mx-auto h-52 flex flex-col p-4">
        <span className="text-2xl font-bold">Point Tracker</span>
        <div className="flex-grow" />
        <div className="mb-2">
          <span className="text-xl font-bold">{getMessage(progress)}</span>
          <Progress value={progress} className="w-full" />
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
