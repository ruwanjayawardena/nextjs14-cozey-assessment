"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type DashboardCardProps = {
  path: string;
  title: string;
  module: string;
};

export default function DashboardCard({ path, title, module }: DashboardCardProps) {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`dashboard/${path}`)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{module}</CardDescription>
      </CardHeader>
    </Card>
  );
}
