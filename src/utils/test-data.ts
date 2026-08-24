import { faker } from "@faker-js/faker";

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/** Factory functions keep specs free of hardcoded test data. */
export const buildCheckoutCustomer = (
  overrides: Partial<CheckoutCustomer> = {},
): CheckoutCustomer => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode("#####"),
  ...overrides,
});

export const credentials = {
  username: process.env.SAUCE_USERNAME ?? "standard_user",
  password: process.env.SAUCE_PASSWORD ?? "secret_sauce",
  lockedOutUsername: "locked_out_user",
};

export const products = {
  backpack: "Sauce Labs Backpack",
  bikeLight: "Sauce Labs Bike Light",
  boltShirt: "Sauce Labs Bolt T-Shirt",
};
