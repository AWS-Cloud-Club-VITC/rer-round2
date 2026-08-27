export type Category =
  | "Home"
  | "Personal Care"
  | "Fashion"
  | "Food"
  | "Electronics"
  | "Lifestyle";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: Category;
  eco: 3 | 4 | 5;
  description: string;
  materials: string[];
  impact: { co2: string; plastic: string; water: string; note: string };
  badge?: string;
  featured?: boolean;
  art: string;
  tint: string;
};

export const CATEGORIES: Array<"All" | Category> = [
  "All",
  "Home",
  "Personal Care",
  "Fashion",
  "Food",
  "Electronics",
  "Lifestyle",
];

export const PRODUCTS: Product[] = [
  {
    id: "bamboo-toothbrush",
    name: "Bamboo Toothbrush",
    tagline: "Plastic-free daily brush",
    price: 4.99,
    category: "Personal Care",
    eco: 5,
    description:
      "A compostable handle carved from fast-growing Moso bamboo, paired with soft castor-oil bristles. Replaces four plastic brushes a year without changing a thing about your routine.",
    materials: ["Moso bamboo handle", "Castor-oil bristles", "Paper wrap"],
    impact: {
      co2: "0.9 kg",
      plastic: "4 brushes",
      water: "12 L",
      note: "Handle breaks down in a home compost bin within six months.",
    },
    badge: "Best seller",
    featured: true,
    art: "toothbrush",
    tint: "mint",
  },
  {
    id: "soap-bar",
    name: "Cold-Pressed Soap Bar",
    tagline: "Zero-waste lather",
    price: 7.5,
    category: "Personal Care",
    eco: 5,
    description:
      "Cured for six weeks in small batches, this olive-and-oat bar lasts about three bottles of liquid soap and arrives wrapped in seed paper you can plant.",
    materials: ["Olive oil base", "Colloidal oats", "Plantable seed paper"],
    impact: {
      co2: "1.4 kg",
      plastic: "3 bottles",
      water: "40 L",
      note: "No water shipped means a fraction of the freight weight.",
    },
    art: "soap",
    tint: "rose",
  },
  {
    id: "steel-bottle",
    name: "Insulated Steel Bottle",
    tagline: "24 hours cold, 12 hours hot",
    price: 24,
    category: "Lifestyle",
    eco: 4,
    description:
      "Double-walled recycled steel with a bamboo cap and a powder coat that survives being dropped down a stairwell. Built to outlive several hundred single-use bottles.",
    materials: ["90% recycled steel", "Bamboo cap", "Food-grade silicone seal"],
    impact: {
      co2: "6.2 kg",
      plastic: "156 bottles",
      water: "310 L",
      note: "Break-even against single-use plastic after roughly three weeks.",
    },
    badge: "Staff pick",
    featured: true,
    art: "bottle",
    tint: "sky",
  },
  {
    id: "recycled-notebook",
    name: "Recycled Paper Notebook",
    tagline: "100% post-consumer pages",
    price: 9.75,
    category: "Lifestyle",
    eco: 4,
    description:
      "160 pages of unbleached post-consumer paper, stitched flat so the notebook actually stays open. Soy-ink printed grid, no plastic laminate on the cover.",
    materials: ["Post-consumer paper", "Soy-based ink", "Cotton thread binding"],
    impact: {
      co2: "1.1 kg",
      plastic: "0 items",
      water: "95 L",
      note: "Saves roughly 1.3 kg of virgin pulp per notebook.",
    },
    art: "notebook",
    tint: "amber",
  },
  {
    id: "cotton-tote",
    name: "Organic Cotton Tote",
    tagline: "Carries a full week of groceries",
    price: 18.5,
    category: "Fashion",
    eco: 5,
    description:
      "Heavyweight 340gsm organic canvas with reinforced base stitching and a flat internal pocket. Rain-tested, machine washable, and it folds into its own pocket.",
    materials: ["GOTS organic cotton", "Recycled cotton lining", "Metal-free dye"],
    impact: {
      co2: "2.8 kg",
      plastic: "480 bags",
      water: "220 L",
      note: "Organic cotton avoids synthetic pesticides across the whole crop.",
    },
    featured: true,
    art: "tote",
    tint: "moss",
  },
  {
    id: "sneakers",
    name: "Sustainable Sneakers",
    tagline: "Knit from recycled bottles",
    price: 89,
    category: "Fashion",
    eco: 3,
    description:
      "Uppers knit from twelve recycled PET bottles over a natural-latex sole. Broken-in from day one, and the whole shoe can be sent back to us to be re-soled.",
    materials: ["Recycled PET knit", "Natural latex sole", "Cork insole"],
    impact: {
      co2: "9.4 kg",
      plastic: "12 bottles",
      water: "640 L",
      note: "Re-soling programme extends the life of the shoe by two years.",
    },
    badge: "New",
    art: "sneaker",
    tint: "sky",
  },
  {
    id: "ocean-backpack",
    name: "Recycled Ocean Backpack",
    tagline: "22L, from coastal plastic",
    price: 74,
    category: "Fashion",
    eco: 4,
    description:
      "Woven from nylon recovered along coastlines, with a padded 16-inch laptop sleeve and YKK hardware chosen because it can be replaced rather than binned.",
    materials: ["Recovered ocean nylon", "Recycled PET lining", "Repairable hardware"],
    impact: {
      co2: "7.8 kg",
      plastic: "38 bottles",
      water: "410 L",
      note: "Each bag diverts about 1.1 kg of nylon from coastal waste.",
    },
    featured: true,
    art: "backpack",
    tint: "indigo",
  },
  {
    id: "solar-power-bank",
    name: "Solar Power Bank",
    tagline: "20,000 mAh, sun or socket",
    price: 49,
    category: "Electronics",
    eco: 4,
    description:
      "A rugged 20,000 mAh pack with a monocrystalline panel for top-ups off-grid. The cells are user-replaceable, which is rarer than it should be.",
    materials: ["Recycled ABS shell", "Monocrystalline panel", "Replaceable cells"],
    impact: {
      co2: "11.5 kg",
      plastic: "0 items",
      water: "180 L",
      note: "Replaceable cells roughly double the usable life of the pack.",
    },
    art: "powerbank",
    tint: "amber",
  },
  {
    id: "solar-lantern",
    name: "Solar Lantern",
    tagline: "Collapsible, 12-hour glow",
    price: 34,
    category: "Electronics",
    eco: 3,
    description:
      "Folds flat to the size of a coaster and inflates into a soft-diffused lantern. Eight hours of sun gives twelve hours of warm light, no batteries to throw away.",
    materials: ["Recycled TPU body", "LiFePO4 cell", "Solar panel"],
    impact: {
      co2: "5.1 kg",
      plastic: "0 items",
      water: "70 L",
      note: "Replaces kerosene lighting in our partner distribution programme.",
    },
    art: "lantern",
    tint: "amber",
  },
  {
    id: "cleaning-kit",
    name: "Plant-Based Cleaning Kit",
    tagline: "Three refillable bottles",
    price: 32,
    category: "Home",
    eco: 5,
    description:
      "Three aluminium bottles plus concentrated tablets for kitchen, glass and bathroom. Drop a tablet in, add tap water, and stop shipping water around the country.",
    materials: ["Aluminium bottles", "Plant-derived surfactants", "Compostable tablet wrap"],
    impact: {
      co2: "4.6 kg",
      plastic: "36 bottles",
      water: "0 L shipped",
      note: "Concentrated tablets cut shipping weight by about 90%.",
    },
    badge: "Refillable",
    featured: true,
    art: "cleaning",
    tint: "mint",
  },
  {
    id: "food-wraps",
    name: "Beeswax Food Wraps",
    tagline: "Set of five, one year each",
    price: 16,
    category: "Food",
    eco: 5,
    description:
      "Organic cotton infused with beeswax, jojoba oil and tree resin. Warm it in your hands and it seals around a bowl or a half-cut avocado. Refresh it in a low oven.",
    materials: ["Organic cotton", "Local beeswax", "Jojoba oil", "Tree resin"],
    impact: {
      co2: "2.2 kg",
      plastic: "120 m of cling film",
      water: "60 L",
      note: "Fully compostable once the wax has finally given up.",
    },
    art: "wraps",
    tint: "amber",
  },
  {
    id: "cutlery-set",
    name: "Bamboo Cutlery Set",
    tagline: "Pocket kit for takeaway",
    price: 12.5,
    category: "Food",
    eco: 4,
    description:
      "Fork, knife, spoon, chopsticks and a steel straw in a roll-up organic cotton sleeve that fits a jacket pocket. The set that finally makes you refuse plastic cutlery.",
    materials: ["Bamboo utensils", "Stainless steel straw", "Organic cotton sleeve"],
    impact: {
      co2: "1.8 kg",
      plastic: "300 utensils",
      water: "45 L",
      note: "Sized to actually fit in a bag, which is why it gets used.",
    },
    art: "cutlery",
    tint: "moss",
  },
];

export const FEATURED = PRODUCTS.filter((p) => p.featured);

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "eco", label: "Eco Rating" },
  { value: "name", label: "Name" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const ECO_FILTERS = [
  { value: 0, label: "All Ratings" },
  { value: 3, label: "3+ Leaves" },
  { value: 4, label: "4+ Leaves" },
  { value: 5, label: "5 Leaves" },
] as const;

export const MAX_PRICE = 100;
