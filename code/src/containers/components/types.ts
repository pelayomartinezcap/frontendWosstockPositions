export type ContainerType = {
  tag: string;
  id: string;
  dc: number;
  size: {
    length: number;
    height: number;
    width: number;
  };
  typeC: number;
  weight: number;
  status: {
    name: string;
    description: string;
  };
  stock: {
    sku: string;
    status: string;
    lot: number;
    "u/l": number;
  };
};

export const ContainerSizes = {
  created: {
      name: "Creado",
      description: "El contenedor ha sido creado en el sistema y está a la espera de información para poder ser ubicado"
  },
  available1: {
      name: "Disponible para ubicación",
      description: "El contenedor está disponible para ubicar en el silo"
  },
  available2: {
      name: "Disponible para salida",
      description: "El contenedor está disponible para poder salir del silo"
  },
  moving: {
      name: "En movimiento",
      description: "El contenedor está siendo trasladado a una posición"
  },
  error: {
      name: "En error",
      description: "El contenedor no se ha podido ubicar/evacuar"
  },
}

export type StockType = {
  sku: string;
  model: string;
  quality: string;
  colour: string;
  size: string;
  lot: string;
  family: string;
  subfamily: string;
  dateEntry: Date;
  dateOut: Date;
  Containers: ContainerType[];
};