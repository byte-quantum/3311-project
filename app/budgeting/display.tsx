"use client";
import chart from "@/public/doughnut_chart.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { refreshBudgets } from "./refresh";
import { ChevronRight } from "lucide-react";
import {Doughnut} from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface Budget {
  id: number;
  name: string;
  income: number;
  housing: number;
  food: number;
  phone: number;
}

const FormSchema = z.object({
  name: z.string().min(0, {
    message: "Name must be at least 0 characters.",
  }),
  income: z.string().min(0, {
    message: "Income must be at least 0 characters.",
  }),
  housing: z.string().min(0, {
    message: "Housing must be at least 0 characters.",
  }),
  food: z.string().min(0, {
    message: "Food must be at least 0 characters.",
  }),
  phone: z.string().min(0, {
    message: "Phone must be at least 0 characters.",
  }),
});

export default function BudgetingDisplay({
  userId,
  budgets,
}: {
  userId: string;
  budgets: Budget[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [chartData, setChartData] = useState( [0, 0, 0]);


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const request = await fetch("http://localhost:3000/api/budgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        income: data.income,
        housing: data.housing,
        food: data.food,
        phone: data.phone,
        userId: userId,
      }),
    });

    if (request.ok) {
      const newChartData = [Number(data.housing), Number(data.food), Number(data.phone)];
      setChartData(newChartData);
      sessionStorage.setItem("chartData", JSON.stringify(newChartData));
      refreshBudgets();
      toast({
        title: "Success!",
        description: "Your budget has been saved.",
      });
    } else {
      toast({
        title: "Oops!",
        description: "Your budget could not be saved.",
      });
    }
  }

  const handleButtonClick = (budgetData:number[]) => {
    setChartData(budgetData);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center p-50" >
      <Doughnut 
          className="max-w-2xl aspect-square"
          data={{
            labels: ['Housing', 'Food', 'Phone'],
            datasets: [
              {
                
                label: 'Budget',
                data: chartData,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 205, 86)',
                  'rgb(54, 162, 235)',
                ],
                hoverOffset: 35,
                
              },
            ],

          }}
        />
        <div className="flex flex-row space-x-6 mt-4"> {/* Add margin-top */}
          <div className="flex flex-col text-white">
            <span className="text-2xl font-medium">Saved budgets</span>
            <span>Click on any saved budget below to view and edit.</span>
            {budgets.length === 0 ? (
              <p className="text-white mt-8">You have no saved budgets.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {budgets.map((budget) => (
                  <div key={budget.id}>
                    <Button
                      variant="outline"
                      className="w-64 bg-slate-950 border-slate-900 hover:border-slate-800 hover:bg-slate-950 hover:text-white flex flex-row"
                      onClick={() => handleButtonClick([budget.housing, budget.food, budget.phone])}
                    >
                      {budget.name}
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-slate-950 border-slate-950 hover:border-slate-800 hover:bg-slate-900 hover:text-white"
                        asChild
                      >
                        <ChevronRight className="h-6 w-6 ml-auto" />
                      </Button>
                    </Button>
                    
                  </div>
                ))}
              </div>
            )}



            
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="text-white grid grid-cols-2 gap-4 mt-8 max-w-2xl pb-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Budget name"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormDescription>
                      This is a name for your budget.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Income</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$800"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your monthly estimated income.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="housing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Housing</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$600"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your monthly housing payment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="food"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$150"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your monthly food budget.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$60"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your monthly phone budget.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                type="submit"
                className="w-full mt-8 bg-slate-950 border-slate-900 hover:border-slate-800 hover:bg-slate-950 hover:text-white"
              >
                Save budget
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
