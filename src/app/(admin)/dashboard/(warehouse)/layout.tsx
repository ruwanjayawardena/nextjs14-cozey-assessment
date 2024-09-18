import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTA - Warehouse",
};

export default function WarehouseModLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 grid-rows-1 w-full px-24 py-8 h-screen place-items-start text-sky-950">
      <div className="flex flex-col gap-8 w-full">{children}</div>
    </div>
  );
}
