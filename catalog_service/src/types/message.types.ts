export type OrderLineItemType = {
  id: number;
  productId: number;
  qty: number;
};

export interface orderWithLineItems {
  id?: NumberConstructor;
  orderNumber: number;
  orderItems: OrderLineItemType[];
}
