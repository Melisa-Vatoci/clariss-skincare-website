// Shared behaviour for every page: navigation, cart, wishlist, newsletter.

const formatPrice = value => `${value.toLocaleString("en-US")} ALL`;
const findProduct = id => PRODUCTS.find(p => p.id === id);

/* ---------- Persistent storage (cart + wishlist) ---------- */

const storage = {
  read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable (private mode) — state lives for this page only */
    }
  },
};

const cart = {
  items: storage.read("clariss-cart", {}), // { productId: quantity }

  add(id, qty = 1) {
    this.items[id] = (this.items[id] || 0) + qty;
    this.save();
  },
  setQty(id, qty) {
    if (qty <= 0) delete this.items[id];
    else this.items[id] = qty;
    this.save();
  },
  count() {
    return Object.values(this.items).reduce((sum, qty) => sum + qty, 0);
  },
  total() {
    return Object.entries(this.items).reduce(
      (sum, [id, qty]) => sum + (findProduct(id)?.price || 0) * qty, 0);
  },
  clear() {
    this.items = {};
    this.save();
  },
  save() {
    storage.write("clariss-cart", this.items);
    renderCart();
  },
};

const wishlist = {
  ids: new Set(storage.read("clariss-wishlist", [])),

  toggle(id) {
    this.ids.has(id) ? this.ids.delete(id) : this.ids.add(id);
    storage.write("clariss-wishlist", [...this.ids]);
    updateBadges();
    document.dispatchEvent(new CustomEvent("wishlist:change"));
    return this.ids.has(id);
  },
  has(id) {
    return this.ids.has(id);
  },
};

/* ---------- Product card ---------- */

function productCard(product) {
  const liked = wishlist.has(product.id);
  return `
    <article class="product-card reveal">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <button class="wish-btn ${liked ? "is-active" : ""}" data-wish="${product.id}"
                aria-pressed="${liked}" aria-label="Save ${product.name} to wishlist">
          <i class="fa-${liked ? "solid" : "regular"} fa-heart"></i>
        </button>
      </div>
      <div class="product-body">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-meta">
          <span class="product-price">${formatPrice(product.price)}</span>
          <span class="product-size">${product.size}</span>
        </div>
        <button class="btn btn-primary btn-block" data-add="${product.id}">
          <i class="fa-solid fa-bag-shopping"></i> Add to cart
        </button>
      </div>
    </article>`;
}

/* ---------- Cart drawer ---------- */

function mountCartDrawer() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="overlay" data-close-cart hidden></div>
    <aside class="cart-drawer" id="cart-drawer" aria-label="Shopping cart" aria-hidden="true">
      <header class="cart-header">
        <h2>Your cart</h2>
        <button class="icon-btn" data-close-cart aria-label="Close cart">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </header>
      <div class="cart-items" id="cart-items"></div>
      <footer class="cart-footer">
        <div class="cart-total"><span>Subtotal</span><strong id="cart-total">0 ALL</strong></div>
        <p class="cart-note">Free delivery on orders over 5,000 ALL</p>
        <button class="btn btn-primary btn-block" id="checkout-btn">Checkout</button>
      </footer>
    </aside>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>
  `);
}

function renderCart() {
  const list = document.getElementById("cart-items");
  if (!list) return;

  const entries = Object.entries(cart.items).filter(([id]) => findProduct(id));
  list.innerHTML = entries.length
    ? entries.map(([id, qty]) => {
        const p = findProduct(id);
        return `
          <div class="cart-item">
            <img src="${p.image}" alt="">
            <div class="cart-item-info">
              <h3>${p.name}</h3>
              <span>${p.size} · ${formatPrice(p.price)}</span>
              <div class="qty">
                <button data-qty="${id}" data-delta="-1" aria-label="Decrease quantity">−</button>
                <span>${qty}</span>
                <button data-qty="${id}" data-delta="1" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <button class="icon-btn remove-btn" data-remove="${id}" aria-label="Remove ${p.name}">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>`;
      }).join("")
    : `<div class="cart-empty">
         <i class="fa-solid fa-bag-shopping"></i>
         <p>Your cart is empty.</p>
         <a href="shop.html" class="btn btn-outline">Browse products</a>
       </div>`;

  document.getElementById("cart-total").textContent = formatPrice(cart.total());
  document.getElementById("checkout-btn").disabled = entries.length === 0;
  updateBadges();
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("is-open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "false");
  document.querySelector(".overlay").hidden = false;
  document.body.classList.add("no-scroll");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("is-open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "true");
  document.querySelector(".overlay").hidden = true;
  document.body.classList.remove("no-scroll");
}

function updateBadges() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = cart.count();
    el.hidden = cart.count() === 0;
  });
  document.querySelectorAll("[data-wish-count]").forEach(el => {
    el.textContent = wishlist.ids.size;
    el.hidden = wishlist.ids.size === 0;
  });
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

/* ---------- Scroll reveal ---------- */

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

function observeReveals(root = document) {
  root.querySelectorAll(".reveal:not(.is-visible)").forEach(el => {
    revealObserver ? revealObserver.observe(el) : el.classList.add("is-visible");
  });
}

/* ---------- Page wiring ---------- */

document.addEventListener("DOMContentLoaded", () => {
  mountCartDrawer();
  renderCart();

  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  menu?.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));

  // Header shadow once the page scrolls
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Featured products on the home page
  const featured = document.getElementById("featured-grid");
  if (featured) {
    featured.innerHTML = PRODUCTS.filter(p => p.featured).map(productCard).join("");
  }

  // One delegated listener handles every product / cart button
  document.addEventListener("click", event => {
    const target = event.target.closest("button, a");
    if (!target) return;

    if (target.dataset.add) {
      cart.add(target.dataset.add);
      showToast(`${findProduct(target.dataset.add).name} added to cart`);
    } else if (target.dataset.wish) {
      const liked = wishlist.toggle(target.dataset.wish);
      target.classList.toggle("is-active", liked);
      target.setAttribute("aria-pressed", liked);
      target.querySelector("i").className = `fa-${liked ? "solid" : "regular"} fa-heart`;
    } else if (target.dataset.qty) {
      const id = target.dataset.qty;
      cart.setQty(id, cart.items[id] + Number(target.dataset.delta));
    } else if (target.dataset.remove) {
      cart.setQty(target.dataset.remove, 0);
    } else if (target.hasAttribute("data-open-cart")) {
      openCart();
    } else if (target.id === "checkout-btn") {
      cart.clear();
      closeCart();
      showToast("Thank you! This is a demo store, so no payment was taken.");
    }
  });
  document.addEventListener("click", event => {
    if (event.target.closest("[data-close-cart]")) closeCart();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCart();
  });

  // Newsletter
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const input = form.querySelector("input[type=email]");
      if (!input.checkValidity()) {
        showToast("Please enter a valid email address.");
        input.focus();
        return;
      }
      form.reset();
      showToast("Thanks for subscribing! 💙");
    });
  });

  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
  observeReveals();
});
