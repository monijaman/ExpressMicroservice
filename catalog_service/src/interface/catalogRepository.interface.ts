import { Product } from "../models/product.model";

// Interface for the Catalog Repository that defines methods for CRUD operations
export interface ICatalogRepository {
  // Creates a new product with the given data and returns the created product
  create(data: Product): Promise<Product>;

  // Updates an existing product and returns the updated product
  update(data: Product): Promise<Product>;

  // Deletes a product by its id (no return value is specified, but it should resolve with the id or a confirmation)
  delete(id: any): Promise<void>;

  // Finds and returns a list of products based on pagination (limit and offset)
  find(limit: number, offset: number): Promise<Product[]>;

  // Finds a single product by its id and returns it
  findOne(id: number): Promise<Product>;

  // Finds and returns multiple products based on a list of ids
  findStock(ids: number[]): Promise<Product[]>;
}
