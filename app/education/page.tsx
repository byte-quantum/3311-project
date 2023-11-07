"use client";
import { useEffect, useState } from "react";
import fintip from "@/public/financetips.svg";
import Fintip1 from "@/public/Fintip1.svg";
import Fintip2 from "@/public/Fintip2.svg";
import Fintip3 from "@/public/Fintip3.svg";
import Fintip4 from "@/public/Fintip4.svg";
import Fintip5 from "@/public/Fintip5.svg";
import Fintip6 from "@/public/Fintip6.svg";
import Fintip7 from "@/public/Fintip7.svg";
import Image from "next/image";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function EducationPage() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const track = document.getElementById("image-track");

    const handleOnDown = (e: MouseEvent | TouchEvent) => {
      setIsMouseDown(true);
      if (track) {
        track.dataset.mouseDownAt =
          e instanceof MouseEvent
            ? e.clientX.toString()
            : e.touches[0].clientX.toString();
      }
    };

    const handleOnUp = () => {
      setIsMouseDown(false);
      if (track) {
        setPrevPercentage(parseFloat(track.dataset.percentage || "0"));
      }
    };

    const handleOnMove = (e: MouseEvent | TouchEvent) => {
      if (
        !isMouseDown ||
        !track ||
        !track.dataset.mouseDownAt ||
        track.dataset.mouseDownAt === "0"
      )
        return;

      const mouseDelta =
        parseFloat(track.dataset.mouseDownAt) -
        (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX);
      const maxDelta = window.innerWidth / 2;

      const percentageDelta = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = prevPercentage + percentageDelta;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      setPercentage(nextPercentage);

      track.dataset.percentage = nextPercentage.toString();

      track.animate(
        {
          transform: `translateX(${nextPercentage}%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      const images = track.getElementsByClassName("image");
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    window.addEventListener("mousedown", handleOnDown);
    window.addEventListener("touchstart", handleOnDown);
    window.addEventListener("mouseup", handleOnUp);
    window.addEventListener("touchend", handleOnUp);
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("touchmove", handleOnMove);

    return () => {
      window.removeEventListener("mousedown", handleOnDown);
      window.removeEventListener("touchstart", handleOnDown);
      window.removeEventListener("mouseup", handleOnUp);
      window.removeEventListener("touchend", handleOnUp);
      window.removeEventListener("mousemove", handleOnMove);
      window.removeEventListener("touchmove", handleOnMove);
    };
  }, [isMouseDown, prevPercentage]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div
      className="flex flex-row absolute left-[350px] top-[120px] mx-auto h-auto w-auto gap-x-16"
      id="image-track"
      data-mouse-down-at="0"
      data-percentage={percentage}
      data-prev-percentage={prevPercentage}
    >
      <div className="mx-auto bg-slate-900 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
        <h1
          className="mx-auto text-center md-item-center font-bold text-5xl"
          style={{ marginTop: "0.5in", color: "white" }}
        >
          {" "}
          50 30 20 Rule
        </h1>
        <p
          className="mx-auto text-base text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
          style={{ margin: "1in", color: "white" }}
        >
          The 50-30-20 rule is an excellent guideline for college students
          looking to manage their finances effectively. In this approach, you
          allocate your income into three main categories. First, 50% of your
          income goes toward essential expenses, such as tuition, rent,
          groceries, and utilities. This ensures that you're covering your basic
          needs and obligations. Next, allocate 30% of your income to
          discretionary spending, which includes non-essential expenses like
          dining out, entertainment, and shopping. It's essential to strike a
          balance here, as this category allows you to enjoy your college
          experience without overspending. Finally, reserve 20% of your income
          for savings and financial goals. This part can be challenging for
          students, but it's crucial for building a financial cushion, paying
          off debt, and planning for the future. By following the 50-30-20 rule,
          college students can establish good financial habits, stay on top of
          their expenses, and work toward their financial goals, all while
          enjoying their time in school.
        </p>
        <Image
          src={Fintip1}
          alt="Fintip"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0 "
          draggable="false"
        />
      </div>
      <div className="mx-auto bg-slate-900 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
        <h1
          className="mx-auto text-center md-item-center font-bold text-5xl"
          style={{ marginTop: "0.5in", color: "white" }}
        >
          {" "}
          Opening a Student Bank Account
        </h1>
        <p
          className="mx-auto text-base text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
          style={{ margin: "1in", color: "white" }}
        >
          Choosing the right bank and opening a student account is an important
          financial decision for college students. When selecting a bank, it's
          crucial to consider factors like location, accessibility, fees, and
          account features. Look for a bank with branches and ATMs conveniently
          located near your school or residence to avoid out-of-network ATM
          fees. Many banks offer special student checking or savings accounts
          with reduced or waived fees, which can be particularly advantageous
          for students on a budget. Additionally, consider the features and
          benefits the bank offers, such as mobile banking, online account
          management, and the availability of budgeting tools. When opening a
          student account, you'll typically need to provide identification,
          proof of enrollment, and, in some cases, a small initial deposit.
          Ensure that you understand the terms and conditions of your chosen
          student account, including any minimum balance requirements, fees, and
          overdraft policies. A well-chosen student account can help you manage
          your finances effectively, access your money easily, and build a
          foundation for future financial success.
        </p>
        <Image
          src={Fintip2}
          alt="Fintip"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0"
          draggable="false"
        />
      </div>
      <div className="mx-auto bg-slate-900 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
        <h1
          className="mx-auto text-center md-item-center font-bold text-5xl"
          style={{ marginTop: "0.5in", color: "white" }}
        >
          {" "}
          Student Loans and Debt
        </h1>
        <p
          className="mx-auto text-base text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
          style={{ margin: "1in", color: "white" }}
        >
          Effectively managing student loans and debt is a critical concern for
          many college students and recent graduates. To navigate this financial
          challenge, start by gaining a comprehensive understanding of your
          loans, including their types, interest rates, and repayment terms.
          Create a suitable repayment plan, considering income-driven options
          for federal loans. Make budgeting for loan payments a priority,
          incorporating them into your monthly financial plan without straining
          your resources. Setting up automatic payments can help you save on
          interest and prevent late fees. Explore loan forgiveness programs, if
          applicable, and prioritize paying off high-interest loans. Building an
          emergency fund is essential to cover unforeseen expenses and avoid
          incurring additional debt during financial setbacks. Maintain open
          communication with your loan servicer, especially in times of
          financial hardship, to explore alternative repayment arrangements and
          prevent loan default. Consider debt reduction strategies, such as
          refinancing high-interest loans and wisely budgeting to allocate extra
          funds toward debt repayment. By following these steps, you can
          effectively handle your student loans and debt while building a solid
          financial foundation.
        </p>
        <Image
          src={Fintip3}
          alt="Fintip"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0"
          draggable="false"
        />
      </div>
      <div className="mx-auto bg-slate-900 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
        <h1
          className="mx-auto text-center md-item-center font-bold text-5xl"
          style={{ marginTop: "0.5in", color: "white" }}
        >
          {" "}
          Building good credit while in school
        </h1>
        <p
          className="mx-auto text-base text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
          style={{ margin: "1in", color: "white" }}
        >
          Building good credit while in school is an essential financial
          objective that can significantly impact your long-term financial
          well-being. To accomplish this, it's advisable to obtain a student
          credit card tailored to your needs or, if eligible, become an
          authorized user on a family member's credit card to establish your
          credit history. Practice responsible credit usage by making small,
          necessary purchases and consistently paying your bills on time, as
          payment history plays a vital role in your credit score. Furthermore,
          maintain low credit card balances and aim to keep your credit
          utilization ratio under 30% to demonstrate prudent credit management.
          To stay on track, establish a budget that ensures you can pay off your
          credit card balance in full each month, thus avoiding the accumulation
          of interest and debt. Regularly monitor your credit report to verify
          its accuracy and track your credit-building progress. Patience is key,
          as building good credit is a gradual process, but it sets the stage
          for future financial opportunities, such as access to better credit
          cards and favorable loan terms.
        </p>
        <Image
          src={Fintip4}
          alt="Fintip"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0"
          draggable="false"
        />
      </div>
      <div className="mx-auto bg-slate-900 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
        <h1
          className="mx-auto text-center md-item-center font-bold text-5xl"
          style={{ marginTop: "0.5in", color: "white" }}
        >
          {" "}
          Federal and Private Student Loans
        </h1>
        <p
          className="mx-auto text-base text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
          style={{ margin: "1in", color: "white" }}
        >
          Federal and private student loans are two primary sources of financial
          aid for college or university education. Federal student loans are
          provided by the U.S. Department of Education and typically offer more
          favorable terms and benefits. They are need-based, and the interest
          rates are usually fixed, often lower than those of private loans.
          Federal loans also offer various repayment options, including
          income-driven plans, which can be adjusted based on your income after
          graduation. Furthermore, they provide certain borrower protections,
          such as deferment, forbearance, and potential loan forgiveness
          programs for those who work in public service. In contrast, private
          student loans are offered by banks, credit unions, and other financial
          institutions. They are often credit-based, and the interest rates can
          vary widely depending on your credit score and financial history.
          Private loans typically have higher interest rates and fewer borrower
          protections than federal loans. Private loans can be a viable option
          for students who have exhausted their federal loan options or who have
          a strong credit history and can secure a more competitive interest
          rate. The choice between federal and private student loans depends on
          your individual financial situation.
        </p>
        <Image
          src={Fintip5}
          alt="Fintip"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0"
          draggable="false"
        />
      </div>

      <div className="mx-auto bg-slate-900 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
        <h1
          className="mx-auto text-center md-item-center font-bold text-5xl"
          style={{ marginTop: "0.5in", color: "white" }}
        >
          {" "}
          Building an Emergency Fund{" "}
        </h1>
        <p
          className="mx-auto text-base text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
          style={{ margin: "1in", color: "white" }}
        >
          Building an emergency fund as a student is a smart financial move that
          can provide a safety net during unexpected financial challenges. To
          achieve this, allocate a portion of your income to a dedicated savings
          account regularly, even if it's a modest amount. You can automate this
          process to make it easier and more consistent. Reducing unnecessary
          expenses by budgeting wisely, finding affordable alternatives for
          entertainment, and controlling impulse purchases can free up extra
          funds for your emergency fund. The importance of an emergency fund
          lies in its ability to shield you from the financial setbacks that
          college life can bring, such as medical expenses, car repairs, or
          unexpected bills. It provides peace of mind, ensures that you won't
          need to rely on credit cards or loans during emergencies, and sets the
          foundation for good financial habits that will serve you well beyond
          your student years.
        </p>
        <Image
          src={Fintip6}
          alt="Fintip"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0"
          draggable="false"
        />
      </div>
      <div className="mx-auto bg-slate-900 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
        <h1
          className="mx-auto text-center md-item-center font-bold text-5xl"
          style={{ marginTop: "0.5in", color: "white" }}
        >
          {" "}
          Scholarships and Grants
        </h1>
        <p
          className="mx-auto text-base text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
          style={{ margin: "1in", color: "white" }}
        >
          Scholarships and grants are invaluable resources that can
          significantly offset the cost of a college education. Scholarships are
          typically merit-based and can be awarded for academic excellence,
          athletic achievements, or specific talents. On the other hand, grants
          are usually need-based and awarded to students who demonstrate
          financial need. To apply for scholarships and grants, students should
          start by completing the Free Application for Federal Student Aid
          (FAFSA), which is the gateway to federal, state, and institutional
          aid. Additionally, they can explore numerous scholarship databases and
          grant opportunities through websites like Fastweb, Scholarships.com,
          and their college or university's financial aid office. Local
          community organizations, foundations, and employers may also offer
          scholarships and grants. It's crucial to thoroughly research and meet
          application deadlines, as the competition for these funds can be
          fierce. By diligently seeking and applying for scholarships and
          grants, students can reduce the financial burden of their education
          and make their academic aspirations more affordable and attainable.
        </p>
        <Image
          src={Fintip7}
          alt="Fintip"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0"
          draggable="false"
        />
      </div>
    </div>
  );
}
