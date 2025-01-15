import { Static, Type } from "@sinclair/typebox";

// Define a schema for adding a product to the cart
export const CartRequestSchema = Type.Object({
  productId: Type.Integer(), // ID of the product to be added
  qty: Type.Integer(), // Quantity of the product to be added
});

// Define a TypeScript type from the schema for type safety
export type CartRequestInput = Static<typeof CartRequestSchema>;

// Define a schema for editing an existing cart item
export const CartEditRequestSchema = Type.Object({
  id: Type.Integer(), // ID of the cart item to be edited
  qty: Type.Integer(), // Updated quantity for the cart item
});

// Define a TypeScript type from the schema for type safety
export type CartEditRequestInput = Static<typeof CartEditRequestSchema>;

// Define a type representing a single item in the cart
type CartLineItem = {
  id: number; // Unique ID of the cart line item
  productId: number; // ID of the associated product
  itemName: string; // Name of the product
  price: string; // Price of the product as a string (e.g., "19.99")
  qty: number; // Quantity of the product in the cart
  variant: string | null; // Product variant (e.g., size, color) or null if not applicable
  createdAt: Date; // Date when the item was added to the cart
  updatedAt: Date; // Date when the item was last updated
  availability?: number; // Optional availability status (e.g., stock level)
};

// Define an interface representing a cart with multiple line items
export interface CartWithLineItems {
  id: number; // Unique ID of the cart
  customerId: number; // ID of the customer who owns the cart
  lineItems: CartLineItem[]; // Array of line items in the cart
  createdAt: Date; // Date when the cart was created
  updatedAt: Date; // Date when the cart was last updated
}
