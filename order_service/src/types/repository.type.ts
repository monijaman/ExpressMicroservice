import { CartLineItem } from "../db/schema";
import { CartWithLineItems } from "../dto/cartRequest.dto";

// Type for creating a cart
type CreateCart = (
  customerId: number,
  lineItem: CartLineItem
) => Promise<number>;

// Type for finding a cart
type FindCart = (id: number) => Promise<CartWithLineItems>;

// Type for updating a cart line item quantity
type UpdateCart = (id: number, qty: number) => Promise<CartLineItem>;

// Type for deleting a cart line item
type DeleteCart = (id: number) => Promise<boolean>;

// Type for clearing a cart data
type ClearCartData = (id: number) => Promise<boolean>;

// Type for finding a cart line item by product ID
type FindCartByProductId = (
  customerId: number,
  productId: number
) => Promise<CartLineItem | null>;

// CartRepositoryType defining all repository functions
export type CartRepositoryType = {
  createCart: CreateCart;
  findCart: FindCart;
  updateCart: UpdateCart;
  deleteCart: DeleteCart;
  clearCartData: ClearCartData;
  findCartByProductId: FindCartByProductId;
};
