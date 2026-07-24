"use client"

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";


export default function DateSelector() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);


  const currentDate =
    searchParams.get("date")
    ? new Date(searchParams.get("date")!)
    : new Date();



  function changeDay(amount:number){

    const newDate = new Date(currentDate);

    newDate.setDate(
      newDate.getDate() + amount
    );


    router.push(
      `/nutrition?date=${newDate.toISOString().split("T")[0]}`
    );

  }



  function formatDate(){

    return currentDate.toLocaleDateString("en-US",{
      month:"long",
      day:"numeric",
      year:"numeric"
    });

  }



  function openCalendar(){

    inputRef.current?.showPicker();

  }



  return (

    <div className="relative flex items-center justify-between rounded-card border border-border bg-surface p-card">


      <button
        onClick={()=>changeDay(-1)}
        className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-button bg-surface-light hover:bg-surface"
      >
        ←
      </button>





      <button
        onClick={openCalendar}
        className="text-center cursor-pointer"

      >

        <p className="text-sm text-text-secondary">
          Today
        </p>


        <p className="text-xl font-bold">
          {formatDate()}
        </p>


      </button>





      <button
        onClick={()=>changeDay(1)}
        className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-button bg-surface-light hover:bg-surface"
      >
        →
      </button>





      <input
        ref={inputRef}
        type="date"
        value={currentDate.toISOString().split("T")[0]}
        onChange={(e)=>{

          router.push(
            `/nutrition?date=${e.target.value}`
          );

        }}
        className="absolute opacity-0 pointer-events-none"
      />


    </div>

  );
}