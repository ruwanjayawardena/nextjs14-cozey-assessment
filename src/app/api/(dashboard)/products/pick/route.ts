import { NextRequest, NextResponse } from "next/server";
import {
  ProductsResponse,
  PickingListReportReponse,
  ErrorResponse,
  Orders,
} from "@/lib/types";
import orders from "@/lib/data/orders.json";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Picking List Generator
 * @param productPickList 
 * @returns 
 */
const pickingListGenerator = async (productPickList: Orders) => {
  try {
    const pick: ProductsResponse = {
      products: [],
    };

    productPickList.forEach((order) => {
      order.line_items.forEach((lineItem) => {
        lineItem.products.forEach((product) => {
          //if product already exists in the picking list, increment the quantity
          if (pick.products.some((p) => p.id === product.product_id)) {
            const index = pick.products.findIndex(
              (p) => p.id === product.product_id
            );
            pick.products[index].qty += product.qty;
            return;
          }

          //otherwise, add the product to the picking list
          pick.products.push({
            id: product.product_id,
            name: product.product_name,
            qty: product.qty,
          });
        });
      });
    });

    return pick;
  } catch (error) {
    throw new Error(`pickingListGenerator Fn: ${error}`);
  }
};

/**
 * RESTful API POST Method
 * @param request 
 * @returns 
 */
export const POST = async (
  request: NextRequest
): Promise<NextResponse<ProductsResponse | ErrorResponse>> => {
  try {
    const { date } = await request.json();
    const selectedDate = dayjs(date).startOf("day");

    const listOfOrdersPerSelectedDate = orders.filter((order) => {
      const orderDate = dayjs(order.timestamps).startOf("day");
      return orderDate.isSame(selectedDate, "day");
    });

    const pickingList = await pickingListGenerator(listOfOrdersPerSelectedDate);

    return NextResponse.json<PickingListReportReponse>(
      {
        products: pickingList.products,
        selectedDate: date,
      },
      { status: 200 }
    );
  } catch (error) {

    console.log(`RestfullAPI POST: Picking ${error}`);
    return NextResponse.json<ErrorResponse>(
      { error: 'Data fetching error!' },
      { status: 404 }
    );
  }
};