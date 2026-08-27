export const IMPACT_STATS = [
  {
    id: "co2",
    value: 24580,
    suffix: " kg",
    label: "CO₂ Saved",
    detail: "Equivalent to taking 12 cars off the road for a year.",
    progress: 78,
  },
  {
    id: "plastic",
    value: 18420,
    suffix: "",
    label: "Plastic Items Replaced",
    detail: "Single-use items swapped for something that lasts.",
    progress: 64,
  },
  {
    id: "orders",
    value: 7250,
    suffix: "",
    label: "Sustainable Purchases",
    detail: "Every order is offset and shipped plastic-free.",
    progress: 85,
  },
  {
    id: "rating",
    value: 92,
    suffix: "%",
    label: "Average Eco Rating",
    detail: "Across all 12 products currently in the catalogue.",
    progress: 92,
  },
] as const;

export const FAQS = [
  {
    q: "What makes a product sustainable?",
    a: "We look at the whole life of the product, not just the marketing copy. A listing has to clear four gates: materials that are renewable, recycled or recyclable; a factory that can show us its labour and emissions records; packaging with no single-use plastic; and a realistic end-of-life path, whether that is composting, recycling or a repair programme. If a product fails one gate, it does not go on the shelf.",
  },
  {
    q: "How are Eco Ratings calculated?",
    a: "Every product gets a score out of five leaves, averaged from four equally weighted pillars: carbon footprint across manufacture and freight, material sourcing, packaging waste, and durability or repairability. Three leaves is a genuinely better choice than the mainstream alternative. Five leaves means the product is close to the best that currently exists in its category. Hover any leaf badge to see the breakdown behind that score.",
  },
  {
    q: "How does EcoMart reduce waste?",
    a: "Orders ship in recycled kraft boxes with paper tape and no plastic void fill. We batch shipments by region to cut freight, run a refill programme for anything that comes in a bottle, and take back worn-out products from eleven of our brands for re-soling, re-waxing or recycling. Last year that kept 18,420 single-use items out of circulation.",
  },
  {
    q: "Are the products ethically sourced?",
    a: "Yes. Every brand we stock signs a supplier code covering living wages, safe working conditions and no forced or child labour, and we ask for third-party audit documentation before the first order. Around a third of our makers are small cooperatives, which is why some products restock slowly. We would rather wait than switch to a factory we cannot verify.",
  },
  {
    q: "What is your returns and repair policy?",
    a: "Thirty days to change your mind, and the return label is prepaid and carbon-offset. Beyond that we would rather repair than replace, so anything that fails through normal use gets fixed or re-made at no cost for two years. Returned items in good condition are resold through our Second Life shelf rather than being destroyed.",
  },
] as const;

export const IMPACT_PILLARS = [
  { label: "Carbon footprint", detail: "Manufacture, freight and last-mile delivery." },
  { label: "Material sourcing", detail: "Renewable, recycled or certified-organic inputs." },
  { label: "Packaging waste", detail: "Plastic-free, recycled and recyclable packaging." },
  { label: "Durability", detail: "How long it lasts and whether it can be repaired." },
] as const;
