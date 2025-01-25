import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  // Creates a new product and returns it with a mock id
  create(data: Product): Promise<Product> {
    // Creating a mock product with a fixed id (123) and returning it
    const mockProduct = {
      id: 123,
      ...data, // Spread the incoming data to include the properties
    } as Product;
    return Promise.resolve(mockProduct);
  }

  // Updates an existing product and returns the updated product
  update(data: Product): Promise<Product> {
    // Simply returning the updated product
    return Promise.resolve(data as unknown as Product);
  }

  // Deletes a product by its id and returns the id
  delete(id: any): Promise<any> {
    // Resolving the id after deletion
    return Promise.resolve(id);
  }

  // Finds a list of products with pagination (limit and offset)
  find(limit: number, offset: number): Promise<Product[]> {
    // Returning an empty array for simplicity
    return Promise.resolve([]);
  }

  // Finds a single product by its id
  findOne(id: number): Promise<Product> {
    // Returning a mock product with the given id
    return Promise.resolve({ id } as unknown as Product);
  }

  // Finds products based on a list of ids (in this case, mock products)
  findStock(ids: number[]): Promise<Product[]> {
    // Mapping over the ids array to create mock products and returning them
    const mockProducts = ids.map(id => ({ id } as Product));
    return Promise.resolve(mockProducts);
  }
}
