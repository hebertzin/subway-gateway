export type Manufacturer = {
  manufacturer: ManufacturerCreateInput;
};

export type ManufacturerCreateInput = {
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
