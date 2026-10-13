// Product catalogue — single source of truth for the home and shop pages.
const PRODUCTS = [
  { id: "snail-essence",      name: "Snail Mucin Repair Essence", category: "Essence",     size: "100ml", price: 2400, image: "img/products/essence-1.jpg",    badge: "Bestseller", featured: true },
  { id: "rice-essence",       name: "Rice Glow Essence",          category: "Essence",     size: "150ml", price: 2100, image: "img/products/essence-2.jpg" },
  { id: "ferment-essence",    name: "Ferment First Essence",      category: "Essence",     size: "120ml", price: 2600, image: "img/products/essence-3.jpg" },

  { id: "hyaluronic-serum",   name: "Hyaluronic Hydra Serum",     category: "Serum",       size: "30ml",  price: 2000, image: "img/products/face-serum-1.jpg", badge: "New",    featured: true },
  { id: "niacinamide-serum",  name: "Niacinamide 10% Serum",      category: "Serum",       size: "30ml",  price: 1800, image: "img/products/face-serum-2.jpg" },
  { id: "peptide-serum",      name: "Peptide Firming Serum",      category: "Serum",       size: "30ml",  price: 2700, image: "img/products/face-serum-3.jpg" },
  { id: "retinol-serum",      name: "Retinol Night Serum",        category: "Serum",       size: "30ml",  price: 2900, image: "img/products/serum-1.jpg" },
  { id: "ceramide-serum",     name: "Ceramide Barrier Serum",     category: "Serum",       size: "50ml",  price: 2300, image: "img/products/serum-2.jpg" },
  { id: "aha-serum",          name: "AHA Renewal Serum",          category: "Serum",       size: "30ml",  price: 2200, image: "img/products/serum-3.jpg" },
  { id: "vitc-serum",         name: "Vitamin C Bright Serum",     category: "Serum",       size: "30ml",  price: 2500, image: "img/products/vitamin-c-1.jpg", badge: "Bestseller" },
  { id: "vitc-drops",         name: "Vitamin C Glow Drops",       category: "Serum",       size: "20ml",  price: 2100, image: "img/products/vitamin-c-2.jpg" },
  { id: "vitc-ampoule",       name: "Vitamin C Ampoule",          category: "Serum",       size: "15ml",  price: 1900, image: "img/products/vitamin-c-3.jpg" },

  { id: "daily-moisturizer",  name: "Daily Moisture Cream",       category: "Moisturizer", size: "50ml",  price: 2500, image: "img/products/moisturizer-1.jpg", featured: true },
  { id: "gel-moisturizer",    name: "Aqua Gel Moisturizer",       category: "Moisturizer", size: "50ml",  price: 2300, image: "img/products/moisturizer-2.gif" },
  { id: "rich-cream",         name: "Rich Recovery Cream",        category: "Moisturizer", size: "50ml",  price: 2800, image: "img/products/moisturizer-3.gif" },
  { id: "eye-cream",          name: "Bright Eyes Cream",          category: "Eye Care",    size: "15ml",  price: 1900, image: "img/products/eye-cream.gif",   badge: "New" },

  { id: "spf50-sunscreen",    name: "Invisible Shield SPF 50",    category: "Sunscreen",   size: "100ml", price: 2300, image: "img/products/sunscreen-1.jpg", badge: "Bestseller", featured: true },
  { id: "spf30-fluid",        name: "Light Fluid SPF 30",         category: "Sunscreen",   size: "50ml",  price: 1900, image: "img/products/sunscreen-2.jpg" },
  { id: "mineral-sunscreen",  name: "Mineral Sun Milk SPF 50",    category: "Sunscreen",   size: "60ml",  price: 2400, image: "img/products/sunscreen-3.jpg" },
  { id: "tinted-sunscreen",   name: "Tinted Glow SPF 40",         category: "Sunscreen",   size: "50ml",  price: 2600, image: "img/products/sunscreen-4.jpg" },

  { id: "hydrating-toner",    name: "Hydrating Balance Toner",    category: "Toner",       size: "200ml", price: 1600, image: "img/products/toner-1.jpg" },
  { id: "cactus-toner",       name: "Desert Cactus Toner",        category: "Toner",       size: "120ml", price: 1800, image: "img/products/toner-2.jpg" },
  { id: "exfoliating-toner",  name: "Gentle Exfoliating Toner",   category: "Toner",       size: "150ml", price: 1700, image: "img/products/toner-3.jpg" },
];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map(p => p.category))];
