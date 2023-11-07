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

interface Budget {
  id: number;
  income: number;
  housing: number;
  food: number;
  phone: number;
}

const FormSchema = z.object({
  income: z.string().min(2, {
    message: "Income must be at least 2 characters.",
  }),
  housing: z.string().min(2, {
    message: "Housing must be at least 2 characters.",
  }),
  food: z.string().min(2, {
    message: "Food must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  }),
});

export default function BudgetingDisplay({ budgets }: { budgets: Budget[] }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        <Image src={chart} alt="Chart" width={500} height={500} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="text-white grid grid-cols-2 gap-4 mt-8 max-w-2xl pb-6"
          >
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Income</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$1200"
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
            <Button type="submit" className="w-64 mt-8">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
