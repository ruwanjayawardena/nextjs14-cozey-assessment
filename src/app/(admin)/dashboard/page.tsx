import DashboardCard from "@/components/ui/dashboard/dashboardCard";

export default function Dashboard() {
  
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-2 p-8 items-center justify-items-center place-items-center text-center">
        <DashboardCard
          path="pickinglist"
          title="Product Packing List"
          module="Warehouse"
        />
        <DashboardCard
          path="packinglist"
          title="Product Packing List"
          module="Warehouse"
        />
      </div>
    </>
  );
}
