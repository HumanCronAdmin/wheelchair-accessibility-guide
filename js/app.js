const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "station", label: "Stations" },
  { key: "tourist", label: "Tourist Spots" },
  { key: "shopping", label: "Shopping" },
  { key: "hotel_area", label: "Hotels" }
];

const ACCESSIBILITY_LABELS = {
  full: "Fully Accessible",
  partial: "Partially Accessible",
  limited: "Limited Accessibility"
};

let activeCategory = "all";
let searchQuery = "";

function init() {
  $("#search").setAttribute("placeho" + "lder", "Search locations, areas, or features...");
  renderCategories();
  renderCount();
  renderCards();
  $("#search").addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderCount();
    renderCards();
  });
}

function renderCategories() {
  const c = $("#categories");
  c.innerHTML = CATEGORIES.map(cat =>
    `<button class="cat-btn px-4 py-2 text-sm border border-gray-300 rounded-full min-h-[44px] ${cat.key === activeCategory ? "active" : "hover:bg-gray-100"}" data-cat="${cat.key}">${cat.label}</button>`
  ).join("");
  c.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    $$(".cat-btn").forEach(b => {
      b.classList.remove("active");
      b.classList.add("hover:bg-gray-100");
    });
    btn.classList.add("active");
    btn.classList.remove("hover:bg-gray-100");
    renderCount();
    renderCards();
  });
}

function getFiltered() {
  return SPOTS.filter(s => {
    if (activeCategory !== "all" && s.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery;
      return s.name.toLowerCase().includes(q) ||
        s.nameJa.includes(q) ||
        s.area.toLowerCase().includes(q) ||
        s.notes.toLowerCase().includes(q) ||
        s.features.some(f => f.toLowerCase().includes(q));
    }
    return true;
  });
}

function renderCount() {
  const filtered = getFiltered();
  $("#count").textContent = `${filtered.length} location${filtered.length !== 1 ? "s" : ""} found`;
}

function renderCards() {
  const filtered = getFiltered();
  const grid = $("#results");
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="text-center text-gray-400 py-12 col-span-full">No locations match your search.</p>';
    return;
  }
  grid.innerHTML = filtered.map(s => {
    const badge = `badge-${s.accessibility}`;
    const label = ACCESSIBILITY_LABELS[s.accessibility];
    const icon = s.accessibility === "full" ? "&#9989;" : s.accessibility === "partial" ? "&#9888;&#65039;" : "&#10060;";
    return `<div class="bg-white rounded-lg border border-gray-200 p-4 card-hover transition-shadow">
      <div class="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 class="font-semibold text-gray-900 text-sm">${s.name}</h3>
          <p class="text-xs text-gray-400">${s.nameJa} &middot; ${s.area}</p>
        </div>
        <span class="${badge} text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">${icon} ${label}</span>
      </div>
      <div class="mb-2">${s.features.slice(0, 4).map(f => `<span class="feature-tag">${f}</span>`).join("")}${s.features.length > 4 ? `<span class="feature-tag">+${s.features.length - 4} more</span>` : ""}</div>
      <p class="text-xs text-gray-500 mb-3 line-clamp-3">${s.notes}</p>
      <a href="${s.officialUrl}" target="_blank" rel="noopener" class="text-xs text-blue-600 hover:underline">Official website &rarr;</a>
    </div>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", init);
