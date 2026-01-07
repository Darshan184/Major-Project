import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

const Homepage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  // Mock data until endpoint is ready
  const orderChartData = Promise.resolve([
    { month: "January", total: 0, successful: 0 },
    { month: "February", total: 0, successful: 0 },
    { month: "March", total: 0, successful: 0 },
    { month: "April", total: 0, successful: 0 },
    { month: "May", total: 0, successful: 0 },
    { month: "June", total: 0, successful: 0 },
  ]);

  // TODO: Uncomment when endpoint is ready
  // const orderChartData = fetch(
  //   `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // ).then(async (res) => {
  //   if (!res.ok) return [];
  //   return res.json();
  // }).catch(() => []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <Suspense fallback={<div className="animate-pulse h-[200px] bg-gray-200 rounded"></div>}>
          <AppBarChart dataPromise={orderChartData} />
        </Suspense>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Popular Products" />
      </div>
    </div>
  );
};

export default Homepage;