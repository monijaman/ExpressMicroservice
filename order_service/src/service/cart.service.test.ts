import * as Repository from "../repository/cart.repository";

import { CreateCart } from "../service/cart.service";

describe("cartService", () => {
  it("should return correct data while creating cart", async () => {
    const mockCart = {
      productId: 2,
      qty: 2,
      customerId: 1,
    };

    // Mock the createCart method to return a fake cart ID
    jest
      .spyOn(Repository.CartRepository, "createCart")
      .mockImplementationOnce(() => Promise.resolve(1));

    // Call the service method
    const res = await CreateCart(mockCart, Repository.CartRepository);

    // Assert the result
    expect(res).toEqual(1); // Expect the returned cart ID to be 1
  });
});
