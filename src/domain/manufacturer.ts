export type Manufacturer = {
  manufacturer: CreateManufacturerInput;
};

export type CreateManufacturerInput = {
  name: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
  website: string;
};
