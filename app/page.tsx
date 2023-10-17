"use client";
import Image from "next/image";
import chase_svg from "@/public/chase-color.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export interface Bank {
  id: number;
  name: string;
  logo: string;
  expanded: boolean;
  accounts: Account[];
}

export interface Account {
  id: number;
  bank: string;
  acct_type: string;
  acct_number: string;
  balance: number;
}

export const bank_accounts: Account[] = [
  {
    id: 1,
    bank: "Chase",
    acct_type: "Total Checking",
    acct_number: "1234",
    balance: 1000,
  },
  {
    id: 2,
    bank: "Chase",
    acct_type: "Compound Savings",
    acct_number: "8521",
    balance: 1000,
  },
];

export const banks: Bank[] = [
  {
    id: 0,
    name: "Chase",
    logo: chase_svg.src,
    expanded: false,
    accounts: [bank_accounts[0], bank_accounts[1]],
  },
  {
    id: 1,
    name: "Wells Fargo",
    logo: chase_svg.src,
    expanded: false,
    accounts: [],
  },
];

export default function Home() {
  const [bankList, setBanks] = useState<Bank[]>(banks);
  const handleExpand = (id: number) => {
    console.log("Clicked on bank with ID:", id);

    const updateBankList = bankList.map((bank) => {
      if (bank.id === id) {
        return { ...bank, expanded: !bank.expanded };
      }
      return bank;
    });
    setBanks(updateBankList);
  };

  useEffect(() => {
    console.log("Bank list updated:", bankList);
  }, [bankList]);

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
    }, 50);
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

      <section className="mt-20 flex align-center text-white w-full max-w-6xl mx-auto">
        <div>
          <span className="text-2xl font-bold">Accounts</span>
          <span className="text-xl font-bold"> ({bankList.length})</span>
        </div>
        <div className="flex-grow" />
        <div className="ml-auto">
          <Button>Link Account</Button>
          {/* TODO: Add plaid popup here */}
        </div>
      </section>

      <section className="mt-4 space-y-6">
        {bankList.map((bank) => (
          <div
            key={bank.id}
            className={cn(
              bank.expanded ? "h-full" : undefined,
              "w-full max-w-6xl bg-slate-900 rounded-2xl text-white mx-auto"
            )}
          >
            <div
              className={cn(
                bank.expanded ? "border-b border-slate-800" : undefined
              )}
            >
              <div className="flex items-center p-4">
                <Image src={chase_svg} alt="Chase" width={40} height={40} />
                <div className="ml-4">
                  <div className="text-lg font-semibold">{bank.name}</div>
                </div>
                <div className="flex-grow" />
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-white text-sm">
                    {bank.accounts.length} accounts
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto hover:bg-slate-800 hover:text-white"
                    onClick={() => {
                      handleExpand(bank.id);
                    }}
                  >
                    {bank.expanded ? (
                      <ChevronDownIcon className="w-6 h-6 transform rotate-180" />
                    ) : (
                      <ChevronDownIcon className="w-6 h-6" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div>
              {bank.expanded &&
                bank.accounts.map((account) => (
                  <div key={account.id} className="flex items-center p-4">
                    <div className="flex-grow">
                      <div className="text-lg font-semibold">
                        {account.acct_type}
                      </div>
                      <div className="text-sm text-slate-300">
                        {account.acct_number}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-lg font-semibold">
                        ${account.balance}
                      </div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-slate-950 hover:text-white"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              View Transactions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Unlink Account</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
