"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";




export default function Navbar() {
    const router = useRouter();

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-start text-2xl font-semibold whitespace-nowrap dark:text-white">
          Dashboard
        </div>
        <div className="flex items-end">
          <Button variant={"outline"} onClick={() => router.push('./')}>Back</Button>
        </div>
      </div>
    </nav>
  );
}
