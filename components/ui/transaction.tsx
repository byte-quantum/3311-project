import { Transaction } from "@/app/page";
import { getTransactionData } from "@/services/Calls";
import React, { CSSProperties, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Table } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import BarLoader from "react-spinners/BarLoader";

type DisplayTransactionsProps = {
  account_id: string;
  onClose: () => void;
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

export default function DisplayTransactions({
  account_id,
  onClose,
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

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 " />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed  top-[50%] left-[50%] max-h-[150vh] w-[95vw] max-w-[800px]
  overflow-y-auto translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex flex-col items-center"
        >
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Transaction Details
          </Dialog.Title>
          <div className="flex-grow flex flex-col">
            {transactionList.length === 0 ? (
              // Render loading spinner while waiting for data
              <div className="flex-grow">
                <BarLoader
                  color={"black"}
                  loading={true}
                  cssOverride={override}
                  width={600}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <Table.Root variant="surface" className="flex-grow">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell className="border-b border-r border-gray-300 gap-x-4">
                      Date
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="border-b border-r border-gray-300 gap-x-4">
                      Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="border-b border-r border-gray-300 gap-x-4">
                      Type
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="border-b border-gray-300 gap-x-4">
                      Amount
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                {transactionList.map((transaction, index) => (
                  <Table.Row key={index} className="border-b border-gray-300">
                    <Table.RowHeaderCell className="border-r">
                      {transaction.date}
                    </Table.RowHeaderCell>
                    <Table.Cell className="border-r">
                      {transaction.name}
                    </Table.Cell>
                    <Table.Cell className="border-r">
                      {transaction.category[0]}
                    </Table.Cell>
                    <Table.Cell>${transaction.amount}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Root>
            )}
          </div>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={closeModal}
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Close
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              onClick={closeModal}
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
