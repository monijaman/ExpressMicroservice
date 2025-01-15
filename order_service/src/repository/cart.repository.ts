import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { CartLineItem, cartLineItems, carts } from "../db/schema";
import { CartWithLineItems } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../types/repository.type";
import { NotFoundError } from "../utils";

// ✅ Create Cart
const createCart = async (
  customerId: number,
  { itemName, price, productId, qty, variant }: CartLineItem
): Promise<number> => {
  const result = await DB.insert(carts)
    .values({
      customerId: customerId,
    })
    .returning()
    .onConflictDoUpdate({
      target: carts.customerId,
      set: { updatedAt: new Date() },
    });

  const [{ id }] = result;

  if (id > 0) {
    await DB.insert(cartLineItems).values({
      cartId: id,
      productId: productId,
      itemName: itemName,
      price: price,
      qty: qty,
      variant: variant,
    });
  }
  return id;
};

// ✅ Find Cart
const findCart = async (id: number): Promise<CartWithLineItems> => {
  const cart = await DB.query.carts.findFirst({
    where: (carts, { eq }) => eq(carts.customerId, id),
    with: {
      lineItems: true,
    },
  });

  if (!cart) {
    throw new NotFoundError("Cart not found");
  }

  return cart;
};

// ✅ Update Cart
const updateCart = async (id: number, qty: number): Promise<CartLineItem> => {
  const [cartLineItem] = await DB.update(cartLineItems)
    .set({
      qty: qty,
    })
    .where(eq(cartLineItems.id, id))
    .returning();

  if (!cartLineItem) {
    throw new NotFoundError(`Cart Line Item with ID ${id} not found`);
  }

  return cartLineItem;
};

// ✅ Delete Cart
const deleteCart = async (id: number): Promise<boolean> => {
  const result = await DB.delete(cartLineItems)
    .where(eq(cartLineItems.id, id))
    .returning();

  return result.length > 0;
};

// ✅ Clear Cart Data
const clearCartData = async (id: number): Promise<boolean> => {
  const result = await DB.delete(carts).where(eq(carts.id, id)).returning();

  return result.length > 0;
};

// ✅ Find Cart by Product ID
const findCartByProductId = async (
  customerId: number,
  productId: number
): Promise<CartLineItem | null> => {
  const cart = await DB.query.carts.findFirst({
    where: (carts, { eq }) => eq(carts.customerId, customerId),
    with: {
      lineItems: true,
    },
  });

  if (!cart) {
    throw new NotFoundError(`Cart for Customer ID ${customerId} not found`);
  }

  const lineItem = cart.lineItems.find((item) => item.productId === productId);

  return lineItem ?? null;
};

// ✅ Export Cart Repository
export const CartRepository: CartRepositoryType = {
  createCart,
  findCart,
  updateCart,
  deleteCart,
  clearCartData,
  findCartByProductId,
};
