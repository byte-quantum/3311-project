"use client";
import fintip from "@/public/financetips.svg";
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
  return (
    <>
      <div className="flex flex-row absolute left-[300px] top-[147px] mx-auto h-auto w-auto gap-x-16 left-500 ">
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110  ">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" />
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" />
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" />
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" />
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" />
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" />
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" />
        </div>

      </div>
    </>
  );
}
