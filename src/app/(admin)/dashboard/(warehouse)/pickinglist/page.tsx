"use client";

import { columns } from "@/app/(admin)/dashboard/(warehouse)/pickinglist/columns";
import { DataTable } from "@/app/(admin)/dashboard/(warehouse)/pickinglist/data-table";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function PickingList() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleReportGeneraterBtn = async () => {
    try {
      if (!selectedDate) {
        toast({
          title: "Please select a date",
        });
        return;
      }

      const response = await fetch("/api/products/pick", {
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
      setData(data.products);
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
        <div className="mt-3">
          <DatePicker onDataChange={setSelectedDate}>
            <Button onClick={handleReportGeneraterBtn}>
              Custom Generate Report
            </Button>
          </DatePicker>
        </div>
      </div>
      <div className="w-full">
        {!isLoading && !data && (
          <p className="text-red-500 mt-2">
            No product data available. Please try to generate report by clicking
            button.
          </p>
        )}
        {isLoading && data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
}
