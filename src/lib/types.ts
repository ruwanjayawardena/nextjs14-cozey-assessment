export type ErrorResponse = {
  error: string;
};

export type SuccessResponse = {
  success: string;
};

export type ProductsResponse = {
  products: { id: string; name: string; qty: number; }[];
};

export type PickingListReportReponse = ProductsResponse & {  
  selectedDate: string;
};

export type ReportRequest = {
  orderDate: string;
};

export type OrderProduct = {
  product_id: string;
  product_name: string;
  qty: number;
  unit_price: number;
};

export type OrderLineItem = {
  line_item_id: string;
  box_id: string;
  box_name: string;
  products: OrderProduct[];
};

export type Order = {
  order_id: string;
  order_total: number;
  order_date: string;
  timestamps: number;
  shipping_address: string;
  customer_name: string;
  customer_email: string;
  line_items: OrderLineItem[];
};

export type Orders = Order[];

export type PackingListReportReponse =  {  
  orders: Orders;
  selectedDate: string;
};
