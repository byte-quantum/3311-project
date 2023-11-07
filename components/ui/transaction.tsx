import { Transaction } from "@/app/page";
import { getTransactionData } from "@/services/Calls";
import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";

type DisplayTransactionsProps = {
  account_id: string;
};

export default function DisplayTransactions({
  account_id,
}: DisplayTransactionsProps) {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    // Use an async function inside useEffect to fetch data
    async function fetchData() {
      try {
        const retrievedTransactionList = await getTransactionData();
        if (retrievedTransactionList) {
          setTransactionList(retrievedTransactionList);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    }

    fetchData();
  }, [account_id]);

  return
}
