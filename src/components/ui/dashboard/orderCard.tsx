"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// import { useState } from "react";
import { Orders, OrderProduct, OrderLineItem, Order } from "@/lib/types";
import useStore from '@/lib/store';

export default function OrderCard({orders}: Orders | any) {

  const hiddenCards = useStore((state) => state.hiddenCards);
  const setHiddenCards = useStore((state) => state.setHiddenCards);

  // const [hiddenCards, setHiddenCards] = useState<string[]>([]);

  const handleButtonClick = (order_id:string) => {   
    setHiddenCards(order_id);
    // setHiddenCards((prevState) => [...prevState, order_id]);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {orders.map((card: Order) => (
          <Card
            key={card.order_id}
            className={`w-[350px] shadow-md rounded-lg p-6 ${
              hiddenCards.includes(card.order_id) ? "hidden" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>
                Order #{card.order_id}: {card.order_date}
              </CardTitle>
              <CardDescription>
                <div>
                  <h3 className="text-md font-semibold">Ship to</h3>
                  <div className="flex flex-col space-y-2 ml-6">
                    <p className="font-bold">{card.customer_name}</p>
                    <p>{card.shipping_address}</p>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <h2 className="mr-2">Line Items:</h2>
                <div className="ml-6">
                  {card.line_items.map((lineItem: OrderLineItem) => (
                    <div
                      key={lineItem.line_item_id}
                      className="flex flex-col space-y-2 mb-6"
                    >
                      <h3 className="text-md font-semibold">
                        {lineItem.box_name}
                      </h3>
                      <ul className="ml-6 list-disc">
                        {lineItem.products.map((product: OrderProduct) => (
                          <li key={product.product_id}>
                            {product.product_name} x{product.qty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center place-content-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-blue-500">Packing Done!</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      (Warehouse) Packing Confirmation!
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to mark this order as packed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleButtonClick(card.order_id)}>
                      Yes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
