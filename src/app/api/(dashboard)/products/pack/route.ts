import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, PackingListReportReponse } from "@/lib/types";
import orders from "@/lib/data/orders.json";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * REstful API POST Method
 * @param request
 * @returns 
 */
export const POST = async (
  request: NextRequest
): Promise<NextResponse<PackingListReportReponse | ErrorResponse>> => {
  try {
    const { date } = await request.json();
    const selectedDate = dayjs(date).startOf("day");

    const listOfOrdersPerSelectedDate = orders.filter((order) => {
      const orderDate = dayjs(order.timestamps).startOf("day");
      return orderDate.isSame(selectedDate, "day");
    });

    return NextResponse.json<PackingListReportReponse>(
      {
        orders: listOfOrdersPerSelectedDate,
        selectedDate: date,
      },
      { status: 200 }
    );
  } catch (error) {

    console.log(`RestfullAPI POST: Packing ${error}`);
    return NextResponse.json<ErrorResponse>(
      { error: "Data fetching error!" },
      { status: 404 }
    );
  }
};