"use client";

import { useState } from "react";
import OrderCard from "@/components/ui/dashboard/orderCard";
import { useToast } from "@/hooks/use-toast";
import DatePicker from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import useStore from '@/lib/store';

export default function PackingList() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const refreshHiddenCards = useStore((state) => state.refreshHiddenCards);

  const handleReportGeneraterBtn = async () => {
    try {
      if (!selectedDate) {
        toast({
          title: "Please select a date",
        });
        return;
      }

      const response = await fetch("/api/products/pack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: selectedDate }),
      });

      if (!response.ok) {
        toast({
          title: "Report loading failed...",
        });
        return;
      }

      const data = await response.json();

      setData(data.orders);
      setLoading(true);
    } catch (error) {
      toast({
        title: "Report loading failed...",
      });
    }
  };

  return (
    <>
      <div className="w-full">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight underline underline-offset-8">
          Product Picking List
        </h4>
        <div className="mt-3 flex flex-row">
          <DatePicker onDataChange={setSelectedDate}>
            <Button onClick={handleReportGeneraterBtn}>
              Custom Generate Report
            </Button>
          </DatePicker>
          <Button variant={"outline"} onClick={refreshHiddenCards}>Refresh</Button>
        </div>
      </div>
      <div className="w-full">
        {!isLoading && !data && (
          <p className="text-red-500 mt-2">
            No order data available for packing. Please try to generate report
            by clicking button.
          </p>
        )}
        {isLoading && data && <OrderCard orders={data}/>}
      </div>
    </>
  );
}