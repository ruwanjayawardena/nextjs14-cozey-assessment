"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";

type DatePickerProps = {
  onDataChange: (date: Date | undefined) => void;
  children?:React.ReactNode;
};

export default function DatePicker({ onDataChange, children }: DatePickerProps) {
  const [date, setDate] = useState<Date>();

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    onDataChange(date || undefined);
  };

  return (
    <div className="flex flex-row items-center">
      <div className="self-start">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Choose a report date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              toDate={new Date()}   
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
       {/* Render any children passed to the component */}
      {children && <div className="mx-2">{children}</div>}
    </div>
  );
}
