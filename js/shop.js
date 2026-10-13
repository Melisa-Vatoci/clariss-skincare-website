// Shop page: search, category filter, wishlist filter and sorting.

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const state = {
    query: params.get("q") || "",
    category: CATEGORIES.includes(params.get("category")) ? params.get("category") : "All",
    wishlistOnly: params.has("wishlist"),
    sort: "featured",
  };

  const grid = document.getElementById("shop-grid");
  const count = document.getElementById("result-count");
  const empty = document.getElementById("empty-state");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const filters = document.getElementById("filters");

  search.value = state.query;
  if (params.has("search")) search.focus();

  filters.innerHTML =
    CATEGORIES.map(c => `<button class="chip" data-category="${c}">${c}</button>`).join("") +
    `<button class="chip" data-wishlist><i class="fa-regular fa-heart"></i> Wishlist</button>`;

  const sorters = {
    featured: () => 0,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name),
  };

  function render() {
    const q = state.query.trim().toLowerCase();
    const results = PRODUCTS
      .filter(p => state.category === "All" || p.category === state.category)
      .filter(p => !state.wishlistOnly || wishlist.has(p.id))
      .filter(p => !q || `${p.name} ${p.category}`.toLowerCase().includes(q))
      .sort(sorters[state.sort]);

    grid.innerHTML = results.map(productCard).join("");
    count.textContent = `${results.length} product${results.length === 1 ? "" : "s"}`;
    empty.hidden = results.length > 0;

    filters.querySelectorAll("[data-category]").forEach(chip =>
      chip.classList.toggle("is-active", !state.wishlistOnly && chip.dataset.category === state.category));
    filters.querySelector("[data-wishlist]").classList.toggle("is-active", state.wishlistOnly);

    observeReveals(grid);
  }

  filters.addEventListener("click", event => {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    if (chip.hasAttribute("data-wishlist")) {
      state.wishlistOnly = !state.wishlistOnly;
      state.category = "All";
    } else {
      state.wishlistOnly = false;
      state.category = chip.dataset.category;
    }
    render();
  });

  search.addEventListener("input", () => {
    state.query = search.value;
    render();
  });

  sort.addEventListener("change", () => {
    state.sort = sort.value;
    render();
  });

  document.getElementById("reset-filters").addEventListener("click", () => {
    Object.assign(state, { query: "", category: "All", wishlistOnly: false });
    search.value = "";
    render();
  });

  // Keep the wishlist view in sync when a product is un-liked
  document.addEventListener("wishlist:change", () => {
    if (state.wishlistOnly) render();
  });

  render();
});
