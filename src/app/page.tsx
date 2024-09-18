"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter();

  const routeTo = () => {
    router.push("/dashboard");
  };

  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-8 p-8 items-center justify-items-center place-items-center">
      <div className="flex flex-row justify-center items-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Cozey Test Assessment
        </h2>
        <Image
          className="dark:invert ml-4"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={90}
          height={50}
          priority
        />
      </div>
      <Button onClick={routeTo}>Go to Dashboard</Button>
    </div>
  );
}
