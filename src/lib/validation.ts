import Joi from "joi";
import { NextResponse, type NextRequest } from "next/server";

type ReportRequest = {
  date: Date;
};

// Define a schema for validating the request
export const productReportRequestSchema = Joi.object({
    date: Joi.date().max("now").required(),
  });

const validateProductReportRequest = (data: ReportRequest) => {
    const { error, value } = productReportRequestSchema.validate(data, {
      abortEarly: false,
    });
  
    if (error) {
      throw new Error(error.details.map((err) => err.message).join(", "));
    }
    return value; // Returns sanitized data
  }

export default async function validate(request: NextRequest){
    try {

        const pathname = request.nextUrl.pathname
        const requestBody = await request.json();
    
        // Check if the request is for the products API and is a POST request
        if (pathname.startsWith('/api/products') && request.method === 'POST') {
    
          validateProductReportRequest(requestBody);
    
          const sanitizedRequest = new Request(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(requestBody),
          });

          return NextResponse.next({
            request: sanitizedRequest,
          });
        }   
      // Allow the request to continue
      return NextResponse.next();
    
      } catch (err) {
        throw new Error(String(err));
      } 
}


