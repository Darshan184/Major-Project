import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { OrderType, ProductsType } from "@repo/types";
import { auth } from "@clerk/nextjs/server";

const CardList = async ({ title }: { title: string }) => {
  let products: ProductsType = [];
  let orders: OrderType[] = [];

  const { getToken } = await auth();
  const token = await getToken();

  try {
    if (title === "Popular Products") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?limit=5&popular=true`
      );

      if (response.ok) {
        const data = await response.json();
        products = Array.isArray(data) ? data : [];
      }
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders?limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        orders = Array.isArray(data) ? data : [];
      }
    }
  } catch (error) {
    console.error(`Error fetching ${title}:`, error);
  }

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {title === "Popular Products" ? (
          products.length > 0 ? (
            products.map((item) => (
              <Card
                key={item.id}
                className="flex-row items-center justify-between gap-4 p-4"
              >
                <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={
                      Object.values(item.images as Record<string, string>)[0] ||
                      ""
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-0">${item.price}K</CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No products available
            </div>
          )
        ) : orders.length > 0 ? (
          orders.map((item) => (
            <Card
              key={item._id}
              className="flex-row items-center justify-between gap-4 p-4"
            >
              <CardContent className="flex-1 p-0">
                <CardTitle className="text-sm font-medium">
                  {item.email}
                </CardTitle>
                <Badge variant="secondary">{item.status}</Badge>
              </CardContent>
              <CardFooter className="p-0">${item.amount / 100}</CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No orders yet
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;