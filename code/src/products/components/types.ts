export type Product = {
  id: string;
  name: string;
};

export type Positions = {
  id: string;
  name: string;
  state: string;
  disabled: boolean;
  isRack: boolean;
  isTower: boolean;
  rackPosition?: object;
  towerPosition?: object;
};
