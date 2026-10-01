export type Tag = "sin-tacc" | "vegano" | "con-alcohol" | "sin-lactosa" | "favorito";

export type CategoryId =
  | "desayuno"
  | "tostones-ensaladas"
  | "sandwiches"
  | "pasteleria"
  | "laminados"
  | "tortas"
  | "cafe"
  | "sin-cafe"
  | "frios-jugos"
  | "mocktails"
  | "con-alcohol"
  | "adicionales";

export type Modifier = {
  label: string;
  price: number;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  /** Variantes de precio (ej: 1 taza / 2 tazas). */
  variants?: { label: string; price: number }[];
  description?: string;
  /** Se muestra al expandir la tarjeta. */
  ingredients?: string[];
  modifiers?: Modifier[];
  tags?: Tag[];
  image?: string;
  /** Sin imagen propia: se usa la de la categoría. */
  imageOptional?: boolean;
};

export type Category = {
  id: CategoryId;
  name: string;
  short: string;
  /** Descripción corta que se ve bajo el título de la sección. */
  blurb?: string;
  /** Nota global de la categoría (tostados sin TACC, etc). */
  note?: string;
  image: string;
  accent: string;
  items: MenuItem[];
};

const SIN_TACC_PAN = 2500;

export const CATEGORIES: Category[] = [
  {
    id: "desayuno",
    name: "Desayuno & Merienda",
    short: "Desayuno",
    blurb: "Todo sale con nuestros panes del día. Los desayunos no incluyen bebida.",
    note: `Adicional pan sin TACC: $${SIN_TACC_PAN.toLocaleString("es-AR")}`,
    image: "/img/brunch-01.jpg",
    accent: "#c98b3f",
    items: [
      {
        id: "tostadas",
        name: "Tostadas",
        price: 12500,
        description: "Variedad de nuestros panes + 2 dips a elección.",
        ingredients: [
          "Queso crema",
          "Mermelada casera",
          "Manteca de maní",
          "Dulce de leche",
        ],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        tags: ["vegano"],
        image: "/img/brunch-06.jpg",
      },
      {
        id: "yogurt-griego",
        name: "Yogurt griego",
        price: 15000,
        description: "Con granola casera, banana, frutos rojos y miel.",
        ingredients: ["Yogurt griego", "Granola casera", "Banana", "Frutos rojos", "Miel"],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        tags: ["vegano"],
        image: "/img/brunch-08.jpg",
      },
      {
        id: "acai-bowl",
        name: "Acai bowl",
        price: 17500,
        description: "Con granola casera, banana, frutos rojos y miel.",
        ingredients: ["Acai", "Granola casera", "Banana", "Frutos rojos", "Miel"],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        tags: ["vegano", "sin-lactosa"],
        image: "/img/brunch-09.jpg",
      },
      {
        id: "plato-de-frutas",
        name: "Plato de frutas",
        price: 13000,
        description: "Frutas de estación, frutos secos, manteca de maní y miel.",
        ingredients: ["Frutas de estación", "Frutos secos", "Manteca de maní", "Miel"],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        tags: ["vegano", "sin-lactosa", "sin-tacc"],
        image: "/img/brunch-07.jpg",
      },
      {
        id: "huevos-revueltos",
        name: "Huevos revueltos",
        price: 15000,
        description:
          "Tostadas, huevos revueltos, palta, panceta, tomates asados & dip de queso crema.",
        ingredients: [
          "Tostadas",
          "Huevos revueltos",
          "Palta",
          "Panceta",
          "Tomates asados",
          "Dip de queso crema",
        ],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        tags: ["favorito"],
        image: "/img/brunch-04.jpg",
      },
      {
        id: "pancakes",
        name: "Pancakes",
        price: 17000,
        description: "Con Nutella, banana, frutilla, salsa de chocolate y miel.",
        ingredients: ["Pancakes", "Nutella", "Banana", "Frutilla", "Salsa de chocolate", "Miel"],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        image: "/img/brunch-03.jpg",
      },
      {
        id: "tostadas-francesas",
        name: "Tostadas francesas",
        price: 18000,
        description:
          "Pan brioche con queso crema, frutas frescas de estación, coulis de frutos rojos y miel.",
        ingredients: [
          "Pan brioche",
          "Queso crema",
          "Frutas frescas de estación",
          "Coulis de frutos rojos",
          "Miel",
        ],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        image: "/img/brunch-02.jpg",
      },
    ],
  },
  {
    id: "tostones-ensaladas",
    name: "Tostones, Ensaladas & Chipás",
    short: "Tostones & Ensaladas",
    blurb: "Masa madre, vegetales de estación y muchoverde.",
    note: "Todos los tostones y sandwiches se pueden pedir en pan de chipá (sin gluten) por +$3.200. Todos los panes salen tostados con manteca, excepto el sánguche vegano.",
    image: "/img/brunch-01.jpg",
    accent: "#7f8c4a",
    items: [
      {
        id: "toston-palta",
        name: "De palta",
        price: 15000,
        description:
          "Pan integral de masa madre, queso crema, palta, alcaparras, reducción de aceto, mix de semillas.",
        ingredients: [
          "Pan integral de masa madre",
          "Queso crema",
          "Palta",
          "Alcaparras",
          "Reducción de aceto",
          "Mix de semillas",
        ],
        modifiers: [{ label: "Pan de chipá (sin gluten)", price: 3200 }],
        tags: ["favorito"],
        image: "/img/brunch-05.jpg",
      },
      {
        id: "toston-tueste",
        name: "Tueste",
        price: 16000,
        description:
          "Pan integral de masa madre, rúcula, queso brie, frutilla, miel & garrapiñada de semilla de zapallo.",
        ingredients: [
          "Pan integral de masa madre",
          "Rúcula",
          "Queso brie",
          "Frutilla",
          "Miel",
          "Garrapiñada de semilla de zapallo",
        ],
        modifiers: [{ label: "Pan de chipá (sin gluten)", price: 3200 }],
        image: "/img/sandwich-01.jpg",
      },
      {
        id: "toston-fungi",
        name: "Fungi",
        price: 16500,
        description:
          "Pan integral de masa madre, paté de hongos de pino, portobellos salteados, cherrys confitados, garrapiñada de semillas de zapallo y flores de albahaca.",
        ingredients: [
          "Pan integral de masa madre",
          "Paté de hongos de pino",
          "Portobellos salteados",
          "Cherrys confitados",
          "Garrapiñada de semillas de zapallo",
          "Flores de albahaca",
        ],
        modifiers: [{ label: "Pan de chipá (sin gluten)", price: 3200 }],
        image: "/img/sandwich-03.jpg",
      },
      {
        id: "ensalada-clasica",
        name: "Ensalada clásica",
        price: 9500,
        description:
          "Mix de verdes, vegetales asados, tomate cherry asado, palta, reducción de aceto & almendras.",
        ingredients: [
          "Mix de verdes",
          "Vegetales asados",
          "Tomate cherry asado",
          "Palta",
          "Reducción de aceto",
          "Almendras",
        ],
        modifiers: [{ label: "+ Pollo a la plancha", price: 4500 }],
        tags: ["vegano", "sin-lactosa"],
        image: "/img/salad-02.jpg",
      },
      {
        id: "ensalada-cesar",
        name: "Ensalada césar",
        price: 15000,
        description:
          "Colchón de lechuga, pollo grillado, crutones, queso reggianito y salsa césar.",
        ingredients: ["Lechuga", "Pollo grillado", "Crutones", "Queso reggianito", "Salsa césar"],
        image: "/img/salad-05.jpg",
      },
      {
        id: "chipa-clasico",
        name: "Chipá clásico",
        price: 4200,
        ingredients: ["Harina de mandioca", "Queso", "Orégano", "Morrón en conserva"],
        tags: ["sin-tacc", "favorito"],
        image: "/img/bakery-08.jpg",
      },
      {
        id: "tostado-chipa",
        name: "Tostado pan de chipá",
        price: 17000,
        description: "Jamón, queso, pesto de albahaca y pesto de tomates secos.",
        ingredients: [
          "Pan de chipá",
          "Jamón",
          "Queso",
          "Pesto de albahaca",
          "Pesto de tomates secos",
        ],
        tags: ["sin-tacc"],
        image: "/img/sandwich-02.jpg",
      },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches & Tostados",
    short: "Sandwiches",
    blurb: "Todos vienen con papas asadas y dip de alioli de morrones.",
    note: `Adicional pan sin TACC: $${SIN_TACC_PAN.toLocaleString("es-AR")}`,
    image: "/img/sandwich-01.jpg",
    accent: "#b06a3b",
    items: [
      {
        id: "tapa-de-asado",
        name: "Tapa de asado",
        price: 18500,
        description:
          "Pan pletzalej, tapa de asado en cocción lenta, BBQ homemade y cebollas moradas encurtidas.",
        ingredients: [
          "Pan pletzalej",
          "Tapa de asado en cocción lenta",
          "BBQ homemade",
          "Cebollas moradas encurtidas",
        ],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        tags: ["favorito"],
        image: "/img/sandwich-01.jpg",
      },
      {
        id: "sandwich-de-brie",
        name: "De brie",
        price: 16500,
        description: "Ciabatta, rúcula, tomates secos, queso brie y mermelada de morrones y aceto.",
        ingredients: [
          "Ciabatta",
          "Rúcula",
          "Tomates secos",
          "Queso brie",
          "Mermelada de morrones y aceto",
        ],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        image: "/img/sandwich-03.jpg",
      },
      {
        id: "pollo-teriyaki",
        name: "De pollo teriyaki",
        price: 19000,
        description:
          "Pan de campo, pollo en salsa teriyaki, lechuga, palta, tomates secos, queso tybo, queso reggianito.",
        ingredients: [
          "Pan de campo",
          "Pollo en salsa teriyaki",
          "Lechuga",
          "Palta",
          "Tomates secos",
          "Queso tybo",
          "Queso reggianito",
        ],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        tags: ["favorito"],
        image: "/img/sandwich-02.jpg",
      },
      {
        id: "de-albondigas",
        name: "De albóndigas",
        price: 23000,
        description: "Baguetín de leche, albóndigas, salsa de tomate casera y queso gratinado.",
        ingredients: ["Baguetín de leche", "Albondigas", "Salsa de tomate casera", "Queso gratinado"],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        image: "/img/sandwich-04.jpg",
      },
      {
        id: "sandwich-clasico",
        name: "Clásico",
        price: 20000,
        description: "Baguetín rústico, jamón crudo, queso y tomates secos.",
        ingredients: ["Baguetín rústico", "Jamón crudo", "Queso", "Tomates secos"],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        image: "/img/sandwich-05.jpg",
      },
      {
        id: "focaccia",
        name: "Sandwich de focaccia",
        price: 20500,
        description:
          "Focaccia decorada con cherrys y parmesano, dambo, panceta ahumada, morrón asado, pesto de albahaca y oliva.",
        ingredients: [
          "Focaccia con cherrys y parmesano",
          "Dambo",
          "Panceta ahumada",
          "Morrón asado",
          "Pesto de albahaca y oliva",
        ],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        image: "/img/sandwich-02.jpg",
      },
      {
        id: "sandwich-de-atun",
        name: "Sandwich de atún",
        price: 23000,
        description:
          "Pan brioche, rúcula, lomito de atún, yogurt griego, salsa agridulce de mostaza de dijon y miel.",
        ingredients: [
          "Pan brioche",
          "Rúcula",
          "Lomito de atún",
          "Yogurt griego",
          "Mostaza de dijon",
          "Miel",
        ],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        image: "/img/sandwich-03.jpg",
      },
      {
        id: "wrap-pollo-cesar",
        name: "Wrap de pollo césar",
        price: 18000,
        description: "Tortilla, pollo grillado, lechuga, reggianito, salsa césar.",
        ingredients: ["Tortilla", "Pollo grillado", "Lechuga", "Queso reggianito", "Salsa césar"],
        image: "/img/sandwich-04.jpg",
      },
      {
        id: "wrap-falafel",
        name: "Wrap de falafel",
        price: 17000,
        description:
          "Tortilla, falafel, mix de verduritas, rúcula, salsa agridulce de mostaza de dijon y miel.",
        ingredients: [
          "Tortilla",
          "Falafel",
          "Mix de verduritas",
          "Rúcula",
          "Mostaza de dijon",
          "Miel",
        ],
        tags: ["vegano"],
        image: "/img/sandwich-05.jpg",
      },
      {
        id: "porcion-papas",
        name: "Porción de papas asadas",
        price: 5500,
        description: "Papas asadas con dip de alioli de morrones.",
        tags: ["vegano", "sin-lactosa"],
        image: "/img/sides-01.jpg",
      },
      {
        id: "tostado-jamon-y-queso",
        name: "Jamón y queso",
        price: 14000,
        description: "Pan de campo, jamón cocido natural, queso tybo y manteca.",
        ingredients: ["Pan de campo", "Jamón cocido natural", "Queso tybo", "Manteca"],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        tags: ["favorito"],
        image: "/img/sandwich-01.jpg",
      },
      {
        id: "tostado-lomito-cheddar",
        name: "Lomito ahumado y queso cheddar",
        price: 12500,
        description: "Pan de papa, lomo ahumado y queso cheddar.",
        ingredients: ["Pan de papa", "Lomo ahumado", "Queso cheddar"],
        modifiers: [{ label: "Adicional pan sin TACC", price: SIN_TACC_PAN }],
        image: "/img/sandwich-02.jpg",
      },
    ],
  },
  {
    id: "pasteleria",
    name: "Pastelería & Galletas",
    short: "Pastelería",
    blurb: "Horneamos todos los días. Si hay línea, hay algo para llevar.",
    image: "/img/bakery-06.jpg",
    accent: "#9c6b4a",
    items: [
      {
        id: "cookie-frambuesa",
        name: "Cookie de frambuesa",
        price: 5200,
        description: "Con chocolate blanco.",
        tags: ["favorito"],
        image: "/img/bakery-06.jpg",
      },
      {
        id: "cookie-doble-choco",
        name: "Cookie doble choco",
        price: 5300,
        description: "Con trozos de choco amargo y choco con leche.",
        image: "/img/bakery-07.jpg",
      },
      {
        id: "cookie-clasica",
        name: "Cookie clásica",
        price: 5500,
        description: "Vainilla y trozos de chocolate.",
        image: "/img/bakery-09.jpg",
      },
      {
        id: "cookie-red-velvet",
        name: "Cookie red velvet",
        price: 5800,
        description: "Con frosting.",
        image: "/img/bakery-08.jpg",
      },
      {
        id: "cookie-triple-choco",
        name: "Cookie triple choco",
        price: 5000,
        image: "/img/bakery-06.jpg",
      },
      {
        id: "cookie-choco-almendras",
        name: "Cookie de choco con almendras",
        price: 7200,
        description: "Rellena con Nutella.",
        image: "/img/bakery-07.jpg",
      },
      {
        id: "cookie-pistacho",
        name: "Cookie pistacho",
        price: 7000,
        image: "/img/bakery-09.jpg",
      },
      {
        id: "budin-limon",
        name: "Budín de limón y amapola",
        price: 7000,
        image: "/img/dessert-08.jpg",
      },
      {
        id: "budin-banana",
        name: "Budín de banana, chocolate y nuez",
        price: 7000,
        description: "Vegan.",
        tags: ["vegano"],
        image: "/img/dessert-07.jpg",
      },
      {
        id: "alfajor-mar-del-plata",
        name: "Alfajor Mar del Plata",
        price: 7300,
        description: "Chocolate y dulce de leche.",
        tags: ["favorito"],
        image: "/img/dessert-05.jpg",
      },
      {
        id: "alfajor-frambuesa",
        name: "Alfajor con corazón de frambuesa",
        price: 7600,
        description: "Chocolate, dulce de leche y corazón de frambuesa.",
        image: "/img/dessert-06.jpg",
      },
      {
        id: "alfajor-sin-tacc",
        name: "Alfajor Mar del Plata — Sin TACC",
        price: 6300,
        tags: ["sin-tacc"],
        image: "/img/dessert-05.jpg",
      },
      {
        id: "alfajor-pistacho-sin-tacc",
        name: "Alfajor pistacho y frutos rojos — Sin TACC",
        price: 6800,
        tags: ["sin-tacc"],
        image: "/img/dessert-06.jpg",
      },
      {
        id: "cookie-ny-sin-tacc",
        name: "Cookie NY — Sin TACC",
        price: 6600,
        tags: ["sin-tacc"],
        image: "/img/dessert-04.jpg",
      },
    ],
  },
  {
    id: "laminados",
    name: "Laminados",
    short: "Laminados",
    blurb: "Recién horneados, recién hechos.",
    note: "Agregado opcional para laminados: dulce de leche o Nutella +$3.500",
    image: "/img/bakery-01.jpg",
    accent: "#c08a4a",
    items: [
      {
        id: "medialuna",
        name: "Medialuna",
        price: 3300,
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        tags: ["favorito"],
        image: "/img/bakery-01.jpg",
      },
      {
        id: "fosforito",
        name: "Fosforito",
        price: 4200,
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        image: "/img/bakery-02.jpg",
      },
      {
        id: "croissant",
        name: "Croissant",
        price: 5000,
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        image: "/img/bakery-03.jpg",
      },
      {
        id: "roll-de-canela",
        name: "Roll de canela",
        price: 6100,
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        image: "/img/bakery-04.jpg",
      },
      {
        id: "medialuna-jamon-y-queso",
        name: "Medialuna de jamón & queso",
        price: 9000,
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        image: "/img/bakery-05.jpg",
      },
      {
        id: "medialuna-tomate-y-queso",
        name: "Medialuna de tomate & queso",
        price: 9000,
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        image: "/img/bakery-05.jpg",
      },
      {
        id: "fosforito-jamon-y-queso",
        name: "Fosforito jamón y queso",
        price: 9200,
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        image: "/img/bakery-02.jpg",
      },
      {
        id: "fosforito-capresse",
        name: "Fosforito capresse",
        price: 9200,
        description: "Tomate, albahaca y queso crema.",
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        tags: ["vegano"],
        image: "/img/bakery-02.jpg",
      },
      {
        id: "croissant-palta",
        name: "Croissant palta",
        price: 12000,
        description: "Palta, queso crema y alcaparras.",
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        image: "/img/bakery-03.jpg",
      },
      {
        id: "croissant-jamon-y-queso",
        name: "Croissant jamón & queso",
        price: 13000,
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        image: "/img/bakery-03.jpg",
      },
      {
        id: "croissant-tomate-y-queso",
        name: "Croissant tomate & queso",
        price: 13000,
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        image: "/img/bakery-03.jpg",
      },
      {
        id: "croissant-crudo",
        name: "Croissant crudo",
        price: 16000,
        description:
          "Jamón crudo, brie, rúcula, tomates secos, aceto & garrapiñada de semillas de zapallo.",
        modifiers: [{ label: "Agregado (DDL o Nutella)", price: 3500 }],
        tags: ["favorito"],
        image: "/img/bakery-04.jpg",
      },
    ],
  },
  {
    id: "tortas",
    name: "Tortas & Tartas",
    short: "Tortas",
    blurb: "Porciones generosas, servidas con un café de especialidad de la casa.",
    image: "/img/dessert-01.jpg",
    accent: "#a85f7a",
    items: [
      {
        id: "carrot-cake",
        name: "Carrot cake",
        price: 11000,
        description: "Tarta especiada de zanahorias con frutos secos y frosting de queso crema.",
        ingredients: ["Zanahoria especiada", "Frutos secos", "Frosting de queso crema"],
        image: "/img/dessert-01.jpg",
      },
      {
        id: "cheesecake",
        name: "Cheesecake",
        price: 12500,
        description: "Cheesecake clásico con coulis frutal.",
        ingredients: ["Base de galletitas", "Queso crema", "Coulis frutal"],
        tags: ["favorito"],
        image: "/img/dessert-02.jpg",
      },
      {
        id: "key-lime-pie",
        name: "Key lime pie",
        price: 13500,
        description: "Base de galletitas caseras, cremoso de lima y crema batida.",
        ingredients: ["Base de galletitas caseras", "Cremoso de lima", "Crema batida"],
        image: "/img/dessert-03.jpg",
      },
      {
        id: "torta-oreo",
        name: "Torta Oreo",
        price: 16000,
        description:
          "Base de chocolate con capas de Oreo y crema de dulce de leche, decorado con ganache de choco blanco, dulce de leche y Oreos.",
        ingredients: ["Base de chocolate", "Capas de Oreo", "Crema de dulce de leche", "Ganache de choco blanco"],
        image: "/img/dessert-04.jpg",
      },
      {
        id: "torta-bruce",
        name: "Bruce",
        price: 16500,
        description: "Bizcocho de chocolate, ganache de choco y dulce de leche.",
        ingredients: ["Bizcocho de chocolate", "Ganache de chocolate", "Dulce de leche"],
        image: "/img/dessert-05.jpg",
      },
    ],
  },
  {
    id: "cafe",
    name: "Café",
    short: "Café",
    blurb: "Blend de la casa, specialty coffee. Tueste propio en Caballito.",
    image: "/img/espresso-01.jpg",
    accent: "#885e2e",
    items: [
      {
        id: "espresso",
        name: "Espresso (30ml)",
        price: 4400,
        description: "Un shot de nuestro blend de la casa, intenso.",
        tags: ["favorito"],
        image: "/img/espresso-01.jpg",
      },
      {
        id: "doppio",
        name: "Doppio (60ml)",
        price: 4700,
        description: "Doble shot, intensidad y cremosidad.",
        image: "/img/espresso-06.jpg",
      },
      {
        id: "lungo",
        name: "Lungo",
        price: 4700,
        description: "Un shot de espresso con base de agua en jarrito.",
        image: "/img/espresso-07.jpg",
      },
      {
        id: "cortado-a-lo-tueste",
        name: "Cortado a lo Tueste",
        price: 4800,
        description: "Un shot de nuestro café con leche y una espuma increíble. Sale en vasito.",
        tags: ["favorito"],
        image: "/img/espresso-04.jpg",
      },
      {
        id: "americano-doble",
        name: "Americano doble shot",
        price: 5000,
        description: "Una doble carga de espresso con base de agua a 80°, así lo tomamos acá.",
        image: "/img/espresso-08.jpg",
      },
      {
        id: "cappuccino",
        name: "Cappuccino",
        price: 5900,
        description: "Un espresso con leche y espuma, en una taza mediana, dulce y cremoso.",
        image: "/img/coffee-01.jpg",
      },
      {
        id: "latte",
        name: "Latte",
        price: 6100,
        description: "Un espresso con leche emulsionada en taza grande, más leche que café.",
        image: "/img/coffee-02.jpg",
      },
      {
        id: "flat-white",
        name: "Flat white",
        price: 6300,
        description: "Para los amantes del cortado doble, doble espresso con leche, un viaje de ida.",
        image: "/img/coffee-03.jpg",
      },
      {
        id: "latte-vainilla",
        name: "Latte de vainilla / caramelo / hazelnut",
        price: 6700,
        variants: [
          { label: "Vainilla", price: 6700 },
          { label: "Caramelo", price: 6700 },
          { label: "Hazelnut", price: 6700 },
        ],
        image: "/img/coffee-04.jpg",
      },
      {
        id: "mocha",
        name: "Mocha",
        price: 6800,
        description: "Gotas de chocolate semiamargo, café y leche.",
        image: "/img/coffee-05.jpg",
      },
      {
        id: "mocha-blanco",
        name: "Mocha blanco",
        price: 6800,
        description: "Doble shot de espresso, leche condensada y leche.",
        image: "/img/coffee-06.jpg",
      },
      {
        id: "pistacho-toffee-latte",
        name: "Latte de pistacho / toffee",
        price: 7500,
        variants: [
          { label: "Pistacho", price: 7500 },
          { label: "Toffee", price: 7500 },
        ],
        tags: ["favorito"],
        image: "/img/coffee-07.jpg",
      },
      {
        id: "filtrado-casa",
        name: "Filtrado de la casa",
        price: 7000,
        description:
          "Molemos granos especialmente para preparar en el método que elijas o te recomendemos en barra: V60, Chemex o Aeropress.",
        variants: [
          { label: "1 taza — 200ml", price: 7000 },
          { label: "2 tazas — 450ml", price: 8000 },
        ],
        tags: ["favorito", "sin-lactosa"],
        image: "/img/coffee-08.jpg",
      },
      {
        id: "iced-americano",
        name: "Iced americano",
        price: 5300,
        image: "/img/espresso-09.jpg",
      },
      {
        id: "tonic-espresso",
        name: "Tonic espresso",
        price: 5800,
        image: "/img/drink-01.jpg",
      },
      {
        id: "lemon-americano",
        name: "Lemon americano",
        price: 6000,
        image: "/img/drink-02.jpg",
      },
      {
        id: "iced-capu",
        name: "Iced capu",
        price: 6100,
        image: "/img/coffee-09.jpg",
      },
      {
        id: "iced-latte",
        name: "Iced latte",
        price: 6300,
        tags: ["favorito"],
        image: "/img/coffee-04.jpg",
      },
      {
        id: "iced-flat-white",
        name: "Iced flat white",
        price: 6500,
        image: "/img/coffee-03.jpg",
      },
      {
        id: "iced-latte-sabores",
        name: "Iced latte caramelo / vainilla / hazelnut",
        price: 6900,
        variants: [
          { label: "Caramelo", price: 6900 },
          { label: "Vainilla", price: 6900 },
          { label: "Hazelnut", price: 6900 },
        ],
        image: "/img/coffee-04.jpg",
      },
      {
        id: "iced-mocha",
        name: "Iced mocha",
        price: 7000,
        image: "/img/coffee-05.jpg",
      },
      {
        id: "iced-latte-pistacho-toffee",
        name: "Iced latte pistacho / toffee",
        price: 7700,
        variants: [
          { label: "Pistacho", price: 7700 },
          { label: "Toffee", price: 7700 },
        ],
        image: "/img/coffee-07.jpg",
      },
      {
        id: "iced-matcha",
        name: "Iced matcha",
        price: 8500,
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-08.jpg",
      },
      {
        id: "strawberry-matcha",
        name: "Strawberry matcha",
        price: 9400,
        tags: ["favorito", "vegano", "sin-lactosa"],
        image: "/img/drink-09.jpg",
      },
    ],
  },
  {
    id: "sin-cafe",
    name: "Sin Café · Tés",
    short: "Sin café",
    blurb: "Para los que no son cafeteros, pero igual se quedan.",
    note: "Tés opcionales con leche: jarrita +$1.300 | taza grande +$1.500",
    image: "/img/drink-03.jpg",
    accent: "#6b8f7a",
    items: [
      {
        id: "babyccino",
        name: "Babyccino",
        price: 4100,
        description:
          "Para peques y no tanto, leche emulsionada endulzada con vainilla y decorada con malvaviscos y cacao.",
        image: "/img/drink-04.jpg",
      },
      {
        id: "choco-caliente",
        name: "Choco caliente",
        price: 6000,
        description: "Preparado con chocolate semiamargo y leche emulsionada.",
        tags: ["favorito"],
        image: "/img/drink-05.jpg",
      },
      {
        id: "choco-blanco-caliente",
        name: "Choco blanco caliente",
        price: 6000,
        description: "Un choco caliente pero más dulce y delicioso.",
        image: "/img/drink-05.jpg",
      },
      {
        id: "chai-latte",
        name: "Chai latte",
        price: 6000,
        description:
          "Té negro especiado (canela, cardamomo, jengibre, clavo) con leche emulsionada.",
        ingredients: ["Té negro", "Canela", "Cardamomo", "Jengibre", "Clavo", "Leche emulsionada"],
        image: "/img/drink-06.jpg",
      },
      {
        id: "golden-milk",
        name: "Golden milk",
        price: 6000,
        description: "Con cúrcuma y especias, combinada con leche emulsionada.",
        ingredients: ["Cúrcuma", "Especias", "Leche emulsionada"],
        image: "/img/drink-06.jpg",
      },
      {
        id: "choco-chai",
        name: "Choco chai",
        price: 6000,
        description: "Cacao, canela, jengibre, pimienta y clavo en polvo.",
        image: "/img/drink-06.jpg",
      },
      {
        id: "pink-latte",
        name: "Pink latte",
        price: 6000,
        description: "Leche de coco, remolacha y vainilla.",
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-07.jpg",
      },
      {
        id: "indian-chai",
        name: "Indian chai",
        price: 6000,
        description: "Canela, jengibre, clavo y pimienta en polvo.",
        image: "/img/drink-06.jpg",
      },
      {
        id: "matcha-latte",
        name: "Matcha latte",
        price: 8300,
        description: "Té verde concentrado antioxidante con leche emulsionada.",
        tags: ["favorito"],
        image: "/img/drink-08.jpg",
      },
      {
        id: "te-english-breakfast",
        name: "English breakfast",
        price: 4600,
        modifiers: [{ label: "Con leche (jarrita)", price: 1300 }],
        tags: ["sin-lactosa"],
        image: "/img/drink-03.jpg",
      },
      {
        id: "te-matcha-green-mint",
        name: "Matcha green mint",
        price: 4600,
        modifiers: [{ label: "Con leche (jarrita)", price: 1300 }],
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-03.jpg",
      },
      {
        id: "te-be-relax",
        name: "Be relax",
        price: 4600,
        modifiers: [{ label: "Con leche (jarrita)", price: 1300 }],
        tags: ["sin-lactosa"],
        image: "/img/drink-03.jpg",
      },
      {
        id: "te-chai",
        name: "Té chai",
        price: 4600,
        modifiers: [{ label: "Con leche (jarrita)", price: 1300 }],
        tags: ["sin-lactosa"],
        image: "/img/drink-06.jpg",
      },
    ],
  },
  {
    id: "frios-jugos",
    name: "Fríos & Jugos",
    short: "Fríos & jugos",
    blurb: "Exprimidos del día, licuados sin culpa.",
    image: "/img/drink-02.jpg",
    accent: "#c07a4a",
    items: [
      {
        id: "agua",
        name: "Agua con gas o sin gas",
        price: 3000,
        tags: ["vegano", "sin-lactosa", "sin-tacc"],
        image: "/img/drink-01.jpg",
      },
      {
        id: "gaseosa",
        name: "Gaseosa",
        price: 3800,
        tags: ["vegano", "sin-lactosa", "sin-tacc"],
        image: "/img/drink-01.jpg",
      },
      {
        id: "jugo-de-naranja",
        name: "Jugo de naranja",
        price: 5300,
        description: "Exprimido del día.",
        tags: ["vegano", "sin-lactosa", "favorito"],
        image: "/img/drink-02.jpg",
      },
      {
        id: "pomelada",
        name: "Pomelada con romero",
        price: 5800,
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-03.jpg",
      },
      {
        id: "limonada-menta-jengibre",
        name: "Limonada con menta y jengibre",
        price: 6000,
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-04.jpg",
      },
      {
        id: "choco-fria",
        name: "Choco fría",
        price: 6300,
        description: "Chocolate semiamargo y leche emulsionada.",
        image: "/img/drink-05.jpg",
      },
      {
        id: "licuado-de-banana",
        name: "Licuado de banana",
        price: 6500,
        tags: ["sin-lactosa", "sin-tacc"],
        image: "/img/drink-07.jpg",
      },
      {
        id: "pink-limo",
        name: "Pink limo",
        price: 6800,
        description: "Limonada de frutos rojos.",
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-09.jpg",
      },
      {
        id: "licuado-de-frutilla",
        name: "Licuado de frutilla",
        price: 8000,
        tags: ["sin-lactosa", "sin-tacc"],
        image: "/img/drink-09.jpg",
      },
    ],
  },
  {
    id: "mocktails",
    name: "Mocktails",
    short: "Mocktails",
    blurb: "Tragos sin alcohol, cero resignación.",
    image: "/img/drink-03.jpg",
    accent: "#7f9a6b",
    items: [
      {
        id: "iced-shaken-hibiscus",
        name: "Iced shaken hibiscus & lemon tea",
        price: 6500,
        description: "Agua de jamaica shakeada con almíbar de limón.",
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-03.jpg",
      },
      {
        id: "ginger-mojito",
        name: "Ginger mojito",
        price: 6500,
        description: "Jugo de lima, syrup de jengibre, hojas de menta y kombucha.",
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-04.jpg",
      },
      {
        id: "anana-lima-sparkling",
        name: "Ananá & lima sparkling",
        price: 6500,
        description: "Jugo de ananá, jugo de lima, almíbar simple y agua tónica.",
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-01.jpg",
      },
      {
        id: "iced-tea-rose",
        name: "Iced tea rose",
        price: 6500,
        description: "Té de frutos rojos, jugo de naranja, frutos rojos frescos.",
        tags: ["vegano", "sin-lactosa"],
        image: "/img/drink-09.jpg",
      },
      {
        id: "maracuya-fresh",
        name: "Maracuyá fresh",
        price: 6500,
        description: "Maracuyá, syrup de jengibre y menta.",
        tags: ["vegano", "sin-lactosa", "favorito"],
        image: "/img/drink-04.jpg",
      },
    ],
  },
  {
    id: "con-alcohol",
    name: "Con Alcohol",
    short: "Con alcohol",
    blurb: "Para cerrar el día como corresponde.",
    image: "/img/drink-01.jpg",
    accent: "#a2603a",
    items: [
      {
        id: "aperol-de-la-casa",
        name: "Aperol de la casa",
        price: 7000,
        tags: ["con-alcohol", "favorito"],
        image: "/img/drink-01.jpg",
      },
      {
        id: "gin-tonic",
        name: "Gin tonic",
        price: 7000,
        tags: ["con-alcohol"],
        image: "/img/drink-01.jpg",
      },
      {
        id: "espresso-martini",
        name: "Espresso martini",
        price: 7000,
        tags: ["con-alcohol", "favorito"],
        image: "/img/drink-01.jpg",
      },
      {
        id: "vermu-con-soda",
        name: "Vermú con soda / tónica",
        price: 7000,
        tags: ["con-alcohol"],
        image: "/img/drink-01.jpg",
      },
    ],
  },
  {
    id: "adicionales",
    name: "Adicionales",
    short: "Adicionales",
    blurb: "Sumale lo que falta.",
    image: "/img/sides-01.jpg",
    accent: "#885e2e",
    items: [
      { id: "add-tomate", name: "Tomate", price: 1000, tags: ["vegano", "sin-lactosa"] },
      {
        id: "add-tomates-secos",
        name: "Tomates secos / mermelada / queso crema",
        price: 1500,
        tags: ["vegano"],
      },
      {
        id: "add-huevos-queso-cheddar-jamon",
        name: "Huevos / queso / cheddar / jamón",
        price: 2800,
      },
      { id: "add-lomito", name: "Lomito", price: 3200 },
      { id: "add-palta", name: "Palta", price: 3500, tags: ["vegano", "sin-lactosa"] },
      { id: "add-jamon-crudo", name: "Jamón crudo", price: 4000 },
      { id: "add-shot-cafe", name: "Extra shot de café", price: 1500, tags: ["sin-lactosa"] },
      { id: "add-leche-almendras", name: "Leche de almendras", price: 1800, tags: ["vegano"] },
      {
        id: "add-leche-mani-coco",
        name: "Leche vegetal de maní y coco",
        price: 1800,
        tags: ["vegano"],
      },
    ],
  },
];

export const ALL_ITEMS: { item: MenuItem; category: Category }[] = CATEGORIES.flatMap(
  (category) => category.items.map((item) => ({ item, category })),
);

export const TAG_LABELS: Record<Tag, string> = {
  "sin-tacc": "Sin TACC",
  vegano: "Vegano",
  "con-alcohol": "Con alcohol",
  "sin-lactosa": "Sin lactosa",
  favorito: "Favorito",
};

export const TAG_FILTERS: { id: Tag; label: string }[] = [
  { id: "sin-tacc", label: "Sin TACC" },
  { id: "vegano", label: "Vegano" },
  { id: "sin-lactosa", label: "Sin lactosa" },
  { id: "con-alcohol", label: "Con alcohol" },
  { id: "favorito", label: "Favoritos" },
];

export const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.id, c]));

export function formatPrice(value: number) {
  return `$${value.toLocaleString("es-AR")}`;
}

export function searchIndex(item: MenuItem, category: Category) {
  return [item.name, item.description ?? "", category.name, ...(item.ingredients ?? []), ...(item.modifiers ?? []).map((m) => m.label)]
    .join(" ")
    .toLowerCase();
}
