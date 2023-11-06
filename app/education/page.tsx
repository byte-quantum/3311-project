"use client";
import { useEffect, useState } from "react";
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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const track = document.getElementById("image-track");

    const handleOnDown = (e: MouseEvent | TouchEvent) => {
      setIsMouseDown(true);
      if (track) {
        track.dataset.mouseDownAt = e instanceof MouseEvent ? e.clientX.toString() : e.touches[0].clientX.toString();
      }
    };

    const handleOnUp = () => {
      setIsMouseDown(false);
      if (track) {
        setPrevPercentage(parseFloat(track.dataset.percentage || "0"));
      }
    };

    const handleOnMove = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown || !track || !track.dataset.mouseDownAt || track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX);
      const maxDelta = window.innerWidth / 2;

      const percentageDelta = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = prevPercentage + percentageDelta;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      setPercentage(nextPercentage);

      track.dataset.percentage = nextPercentage.toString();

      track.animate(
        {
          transform: `translateX(${nextPercentage}%)`
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
    <>
      <div className="flex flex-row absolute left-[500px] top-[147px] mx-auto h-auto w-auto gap-x-16 left-500 " id="image-track" data-mouse-down-at="0" data-percentage={percentage} data-prev-percentage={prevPercentage}>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110" title="Fintip Image">
          <h1 className="mb-4 mx-auto text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-whiter">We invest in the world's potential</h1>
          <p className="mx-auto text-base text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
          We are a team of passionate investors, 
          engineers, and designers that believe in the power of the stock market. 
          We are here to help you learn how to invest and grow your wealth.</p>
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0 " draggable="false" />
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" draggable="false"/>
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" draggable="false" />
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" draggable="false"/>
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" draggable="false"/>
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" draggable="false"/>
        </div>
        <div className="mx-auto bg-red-400 w-[1045px] h-[677px] rounded-3xl relative transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
          <Image src={fintip} alt="Fintip" layout="fill" objectFit="cover" className="rounded-3xl transiton-opacity ease-out-in duration-700 hover:opacity-0" draggable="false" />
        </div>

      </div>
    </>
  );
}
