import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "CTA - Dashboard",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
