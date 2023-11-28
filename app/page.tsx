"use client";
import Image from "next/image";
import chase_logo from "@/public/chase-logo.png";
// import robinhood_svg from "@/public/robinhood_svg";
import { ChevronDownIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { cn, formatMoneyUSD } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { getData } from "@/services/Calls";
import Context from "@/Context";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PiggyBankIcon } from "lucide-react";
import PlaidLinkButton from "@/services/Link";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import DisplayTransactions from "@/components/ui/transaction";

export interface BankLogo {
  name: string;
  logo_path: string;
}
export interface Bank {
  id: number;
  name: string;
  institute_id: string;
  logo: string;
  expanded: boolean;
  accounts: Account[];
}

export interface Account {
  account_id: string;
  balances: {
    available: number;
    current: number;
  };
  name: string;
  bank: string;
  bank_id: string;
  mask: string;
  acct_number: string;
  acct_type: string;
  expanded: boolean;
  balance: number;
}

export interface Transaction {
  account_id: string;
  amount: number;
  category: string[];
  name: string;
  merchant_name: string;
  logo_url: string;
  date: string;
}

export const logos: BankLogo[] = [
  {
    name: "Chase",
    logo_path: "/chase-logo.png",
  },
  {
    name: "Wells Fargo",
    logo_path: "/Wells_Fargo.png",
  },
];

const bank_accounts: Account[] = [];

const banks: Bank[] = [];

export default function Home() {
  const [showTransactions, setShowTransactions] = useState(false);
  const [getAccountID, setAccountID] = useState("");
  const [AccountsList, setAccounts] = useState<Account[]>(bank_accounts);
  const [bankList, setBanks] = useState<Bank[]>(banks);
  const handleExpand = (id: number) => {
    // const updatedAccounts = accounts.map((account) => {
    //   if (account.account_id === id) {
    //     return { ...account, expanded: !account.expanded };
    console.log("Clicked on bank with ID:", id);

    const updateBankList = bankList.map((bank) => {
      if (bank.id === id) {
        return { ...bank, expanded: !bank.expanded };
      }
      return bank;
    });
    setBanks(updateBankList);
  };

  const handleCloseModal = () => {
    setShowTransactions(false);
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

  // Retrieve Bank account info
  useEffect(() => {
    if (Context.linkSuccess) {
      getData().then((retrievedAccounts) => {
        if (retrievedAccounts) {
          const path = logos.find(
            (logo) => logo.name === retrievedAccounts[0].bank
          );

          if (Array.isArray(retrievedAccounts)) {
            AccountsList.concat(retrievedAccounts);
          } else {
            AccountsList.push(retrievedAccounts);
          }
          console.log(retrievedAccounts);
          setAccounts(AccountsList);
          console.log(AccountsList);

          const myBank: Bank = {
            id: bankList.length,
            name: retrievedAccounts[0].bank,
            institute_id: retrievedAccounts[0].bank_id,
            logo: path ? path.logo_path : "",
            expanded: false,
            accounts: retrievedAccounts,
          };

          // if (logos.some((logo) => logo.name === retrievedAccounts[0].bank)) {
          // }
          bankList.push(myBank);
          setBanks(bankList);
        }
      });
    }
  }, [Context.linkSuccess]);

  return (
    <>
      <section className="w-full max-w-6xl bg-green-700 rounded-2xl text-white mx-auto h-52 flex flex-col p-4">
        <span className="text-2xl font-bold">Progress Tracker</span>
        <div className="flex-grow" />
        <div className="mb-2">
          <span className="text-xl font-bold">{getMessage(progress)}</span>
          <Progress value={progress} className="w-full" />
        </div>
      </section>

      <section className="mt-20 flex align-center text-white w-full max-w-6xl mx-auto">
        <div>
          <span className="text-2xl font-bold">Bank Accounts</span>
          <span className="text-xl font-bold"> ({bankList.length})</span>
        </div>
        <div className="flex-grow" />
        <div className="ml-auto">
          <PlaidLinkButton />
        </div>
      </section>

      <section className="mt-4 space-y-6">
        {bankList.length === 0 ? (
          <button className="w-full max-w-6xl h-64 bg-slate-950 text-slate-800 hover:text-slate-300 mx-auto relative block rounded-lg border-2 border-dashed border-slate-900 p-12 text-center hover:border-slate-700">
            <ScaleIcon className="w-24 h-24 mx-auto" />
            <span className="mt-2 block text-sm font-semibold">
              Link a new bank account to get started!
            </span>
          </button>
        ) : (
          bankList.map((bank) => (
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
                  <Image src={bank.logo} alt="Chase" width={40} height={40} />
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
                    <div
                      key={account.account_id}
                      className="flex items-center p-4"
                    >
                      <div className="flex-grow">
                        <div className="text-lg font-semibold">
                          {account.name}
                        </div>
                        <div className="text-sm text-slate-300">
                          {"..." + account.mask}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-lg font-semibold">
                          {formatMoneyUSD(account.balance)}
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
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                  setShowTransactions(true);
                                  setAccountID(account.account_id);
                                }}
                              >
                                View Transactions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Unlink Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </section>
      {showTransactions && (
        <DisplayTransactions
          account={getAccountID}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
