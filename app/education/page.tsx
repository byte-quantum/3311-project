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
      <div className="w-[1045px] h-[677px] mx-auto relative">  {/* this is a container */}
        <div className="w-[1045px] h-[677px] bg-white rounded-3xl"> {/* card with infromation */}
          <h1 className="text-4xl font-bold text-center pt-8">Finance Tips</h1>  {/* Header for the information */}
        </div>
        <div className={`w-[1045px] h-[677px] opacity-100 transiton-opacity ease-out-in duration-700 hover:opacity-0 rounded-3xl absolute top-0 left-0`}> {/*Transition betweet card 2 and card 1*/}
          <Image src={fintip} alt="Fintip" objectFit="cover" className="rounded-3xl w-[1045px] h-[677px] "/> {/*image to attact the viewer*/}
        </div>
      </div>
    </>
  );
}
