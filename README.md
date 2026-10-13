# Clariss – Skincare E-commerce Website

A responsive front-end online store for **Clariss**, a fictional skincare brand, built with plain **HTML, CSS and JavaScript** (no frameworks).

Originally built during my Front-End Developer internship at Dominusoft Education (2024). I later refactored it with a cleaner structure, a working cart and a modern design.

**Live demo:** https://melisa-vatoci.github.io/clariss-skincare-website/

## Features

- **Shopping cart:** a slide-in drawer where you can add, remove and change quantities. It shows a live subtotal and keeps the cart saved in `localStorage`, so items stay after a page refresh.
- **Wishlist:** a heart button on every product, with a counter in the header and a "Wishlist" filter on the shop page.
- **Shop page:** live search, category filters, sorting by price or name, and an empty state when nothing matches. Filters also work from URL parameters such as `shop.html?category=Serum`.
- **Data-driven products:** all 23 products live in one JavaScript array (`js/products.js`), and both pages render their cards from it.
- **Responsive design:** a mobile-first layout built with CSS Grid and Flexbox, plus a hamburger menu on small screens.
- **Accessibility:** semantic HTML, a skip link, ARIA labels and states, keyboard focus styles, and support for `prefers-reduced-motion`.
- **Small touches:** scroll-reveal animations (`IntersectionObserver`), toast notifications, a sticky header and newsletter form validation.

## Project structure

```
├── index.html          # Home: hero, trending products, about, banners, reviews
├── shop.html           # Shop: search, filters, sorting, product grid
├── css/
│   └── style.css       # One stylesheet built on CSS custom properties
├── js/
│   ├── products.js     # Product catalogue (data)
│   ├── main.js         # Cart, wishlist, navigation, product cards, newsletter
│   └── shop.js         # Search / filter / sort logic for the shop page
└── img/                # Logo, illustrations and product photos
```

## Built with

- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, custom properties, `clamp()`, media queries)
- Vanilla JavaScript (ES6+, DOM manipulation, event delegation, `localStorage`)
- [Font Awesome](https://fontawesome.com/) icons and [Google Fonts](https://fonts.google.com/) (Cormorant Garamond and Jost)

## Run locally

```bash
git clone https://github.com/Melisa-Vatoci/clariss-skincare-website.git
cd clariss-skincare-website
```

Open `index.html` in your browser. There is nothing to build or install.

## Note

Clariss is a fictional brand created for this project. Checkout is a demo and takes no payment. Product images are used for demonstration purposes only.
