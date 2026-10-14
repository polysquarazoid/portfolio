const portfolio = {
  "pixel-art": [["Crystal Caverns", "assets/pixel-art/crystal-caverns.png"], ["Dinoland", "assets/pixel-art/dinoland.png"], ["Fossil Frights", "assets/pixel-art/fossil-frights-logo.png"], ["Fossil Heists", "assets/pixel-art/fossil-heists-logo.png"], ["Fossil Frights · Holiday", "assets/pixel-art/fossil-frights-holiday.png"], ["Fossil Frights · Halloween Alt", "assets/pixel-art/fossil-frights-halloween-alt.png"], ["Fossil Frights · Halloween", "assets/pixel-art/fossil-frights-halloween.png"], ["Fossil Frights Icon", "assets/pixel-art/fossil-frights-icon.png"], ["Ghost Town", "assets/pixel-art/ghost-town.png"], ["Zeronia", "assets/pixel-art/zeronia-logo.png"], ["Kasino", "assets/pixel-art/kasino-logo.png"], ["Magma Mines", "assets/pixel-art/magma-mines-logo.png"], ["Pirate Cove", "assets/pixel-art/pirate-cove-logo.png"], ["Skeleton Chest", "assets/pixel-art/skeleton-chest.png"], ["Victory", "assets/pixel-art/victory-logo.png"], ["Pixel Art Brushes", "assets/pixel-art/pixel-art-brushes.png"], ["You're Fired", "assets/pixel-art/youre-fired.png"]],
  models: [["Balloons", "assets/models/balloons.png"], ["Burger", "assets/models/burger.png"], ["Carnivorous Flytrap", "assets/models/carnivorous-flytrap.png"], ["Computer", "assets/models/computer.png"], ["Cotton Candy Machine", "assets/models/cotton-candy-machine.png"], ["Ghost Forcefield", "assets/models/ghost-forcefield-chaos.png"], ["Gold Shark", "assets/models/gold-shark.png"], ["Loot Bag", "assets/models/loot-bag.png"], ["Large Monstera", "assets/models/monstera-large.png"], ["Monstera", "assets/models/monstera.png"], ["Plesiosaur Plushie", "assets/models/plesiosaur-plushie.png"], ["Reptiles", "assets/models/reptiles-2.png"], ["Safe", "assets/models/safe.png"], ["Screw Shell", "assets/models/screw-shell.png"], ["Security Panel", "assets/models/security-panel-alert.png"], ["Super Fern", "assets/models/super-fern.png"], ["Swinging Axe", "assets/models/swinging-axe.png"], ["Antigravity Trap", "assets/models/trap-antigravity.png"], ["Treasure Chest", "assets/models/treasure-chest.png"], ["T-Rex Plushie", "assets/models/t-rex-plushie.png"], ["T-Rex Skull", "assets/models/t-rex-skull.png"], ["Velociraptor Hoverboard", "assets/models/velociraptor-plushie-on-hoverboard.png"], ["Wet Floor Sign", "assets/models/wet-floor-sign.png"]],
  textures: [["Cubeworld Texture Pack", "assets/textures/cubeworld-texture-pack.jpg"], ["Fossil Frights Museum Map", "assets/textures/fossil-frights-museum-map.png"]],
  renders: [["Fossil Frights · Splash Art", "assets/renders/fossil-frights-splash-art.jpg"], ["Villager Park · Autumn", "assets/renders/villager-park-autumn.jpg"], ["Villager Park · Castle Dusk", "assets/renders/villager-park-castle-dusk.jpg"], ["Villager Park · Castle", "assets/renders/villager-park-castle.jpg"], ["Villager Park · Plainsboro", "assets/renders/villager-park-plainsboro.jpg"]],
  videos: [["Fossil Frights", "assets/videos/fossil-frights-video-thumbnail.jpg", "l8Zh0ztY92s"], ["Heists", "assets/videos/fossil-heists-video-thumbnail.jpg", "9ccj6D9mVdQ"]],
  "web-design": [["Atlas Cleaner", "assets/web-design/atlas-cleaner.jpg", null, "https://zeroniaserver.github.io/atlas-cleaner/"], ["Zeronia · Run Breakdown", "assets/web-design/zeronia-run-breakdown.jpg", null, "https://zeronia.org"]],
};
const portfolioItems = Object.entries(portfolio).flatMap(([category, items]) => items.map((item, index) => ({ category, index, item })));

const gallery = document.querySelector('[data-gallery="work"]');
const lightbox = document.querySelector("[data-lightbox]");
const lightboxStage = document.querySelector("[data-lightbox-stage]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxCount = document.querySelector("[data-lightbox-count]");
const nav = document.querySelector("[data-section-nav]");
const navLinks = [...nav.querySelectorAll("a")];
const navIndicator = document.querySelector("[data-nav-indicator]");
let activeGallery = [];
let activeIndex = 0;

const featuredTiles = {
  "Crystal Caverns": { size: 3, frameRatio: 1.2 },
  Dinoland: { size: 3, frameRatio: 2.1 },
  "Fossil Frights": { size: 3, frameRatio: 1.65 },
  "Fossil Heists": { size: 2, frameRatio: 1.8 },
  "Fossil Frights · Holiday": { size: 2, frameRatio: 1.9 },
  "Fossil Frights · Halloween Alt": { size: 2, frameRatio: 1.9 },
  "Fossil Frights · Halloween": { size: 2, frameRatio: 1.9 },
};

function getTileSpec(title, category, ratio) {
  const featured = featuredTiles[title];
  if (featured) return featured;

  if (category === "pixel-art") return { size: ratio < 1.2 ? 1 : 2 };
  if (category === "models") return { size: ratio > 1.3 ? 2 : 1 };
  if (category === "textures") return { size: ratio > 1.8 ? 3 : 2 };
  if (category === "renders") return { size: ratio > 1.7 ? 3 : 2 };
  if (category === "videos" || category === "web-design") return { size: 3 };
  return { size: 2 };
}

function sizeTile(tile, image) {
  if (!image.naturalWidth || !image.naturalHeight) return;
  const ratio = image.naturalWidth / image.naturalHeight;
  const spec = getTileSpec(tile.dataset.title, tile.dataset.category, ratio);
  tile.dataset.size = spec.size;
}

function createTile(item, category, index, position) {
  const [title, source, videoId, externalUrl] = item;
  const tile = document.createElement(externalUrl ? "a" : "button");
  const image = document.createElement("img");
  const kind = category === "pixel-art" ? "pixel" : category === "models" ? "model" : category === "textures" ? "texture" : "image";
  tile.className = `tile is-${kind}`;
  if (videoId) tile.classList.add("is-video");
  if (!externalUrl) tile.type = "button";
  if (externalUrl) {
    tile.href = externalUrl;
    tile.target = "_blank";
    tile.rel = "noreferrer";
  }
  tile.dataset.category = category;
  tile.dataset.title = title;
  tile.dataset.index = index;
  tile.setAttribute("aria-label", `${externalUrl ? "Visit" : videoId ? "Play" : "View"} ${title}`);
  if (index === 0) {
    tile.id = category;
  }

  image.src = source;
  image.alt = title;
  image.loading = position < 12 ? "eager" : "lazy";
  image.decoding = "async";
  image.addEventListener("load", () => sizeTile(tile, image));
  tile.append(image);

  if (videoId || externalUrl) {
    const control = document.createElement("span");
    control.className = `play-icon${externalUrl ? " is-external" : ""}`;
    control.setAttribute("aria-hidden", "true");
    control.innerHTML = externalUrl
      ? '<img src="assets/external-link-pixel.svg" alt=""/>'
      : "<span>▶</span>";
    tile.append(control);
  }

  if (!externalUrl) tile.addEventListener("click", () => openLightbox(category, index));
  return tile;
}

let position = 0;
const portfolioTiles = Object.entries(portfolio).map(([category, items]) => [category, items.map((item, index) => createTile(item, category, index, position++))]);
let renderedColumns = 0;

function getColumnCount() {
  if (window.innerWidth <= 800) return 2;
  if (window.innerWidth <= 1100) return 3;
  return 4;
}

function renderMasonry() {
  const columnCount = getColumnCount();
  const columns = Array.from({ length: columnCount }, () => {
    const column = document.createElement("div");
    column.className = "gallery-column";
    return column;
  });
  const heights = Array(columnCount).fill(0);

  portfolioTiles.forEach(([, tiles]) => {
    tiles.forEach((tile) => {
      const image = tile.querySelector("img");
      const ratio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 1;
      const column = heights.indexOf(Math.min(...heights));
      columns[column].append(tile);
      heights[column] += 1 / Math.min(Math.max(ratio, 0.65), 2.5);
    });
  });

  gallery.replaceChildren(...columns);
  renderedColumns = columnCount;
}

renderMasonry();

function sizeAllTiles() { gallery.querySelectorAll(".tile img").forEach((image) => sizeTile(image.closest(".tile"), image)); }
function openLightbox(category, index) {
  activeGallery = portfolioItems;
  activeIndex = activeGallery.findIndex((entry) => entry.category === category && entry.index === index);
  renderLightbox();
  lightbox.showModal();
}

function renderLightbox() {
  const { category, index, item } = activeGallery[activeIndex];
  const [title, source, videoId] = item;
  lightboxStage.replaceChildren();
  if (videoId) {
    const frame = document.createElement("iframe");
    frame.style.aspectRatio = "16 / 9";
    frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    frame.title = title;
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    lightboxStage.append(frame);
  } else {
    const image = document.createElement("img");
    image.src = source;
    image.alt = title;
    if (category === "pixel-art" || category === "models" || category === "textures") image.classList.add("is-pixel");
    lightboxStage.append(image);
  }
  lightbox.dataset.category = category;
  lightbox.dataset.index = index;
  lightboxTitle.textContent = title;
  lightboxCount.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(activeGallery.length).padStart(2, "0")}`;
}

function changeLightbox(direction) { activeIndex = (activeIndex + direction + activeGallery.length) % activeGallery.length; renderLightbox(); }
function closeLightbox() { lightbox.close(); lightboxStage.replaceChildren(); }

function setActiveNav(activeLink) {
  navLinks.forEach((link) => link.classList.toggle("is-active", link === activeLink));
  const navBounds = nav.getBoundingClientRect();
  const linkBounds = activeLink.getBoundingClientRect();
  navIndicator.style.width = `${linkBounds.width}px`;
  navIndicator.style.transform = `translateX(${linkBounds.left - navBounds.left + nav.scrollLeft}px)`;
  nav.scrollTo({ left: activeLink.offsetLeft - nav.clientWidth / 2 + activeLink.offsetWidth / 2, behavior: "smooth" });
}

document.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
document.querySelector("[data-lightbox-prev]").addEventListener("click", () => changeLightbox(-1));
document.querySelector("[data-lightbox-next]").addEventListener("click", () => changeLightbox(1));
lightbox.addEventListener("click", (event) => { if (event.target === lightbox || event.target === lightboxStage) closeLightbox(); });
lightbox.addEventListener("cancel", (event) => { event.preventDefault(); closeLightbox(); });
document.addEventListener("keydown", (event) => { if (!lightbox.open) return; if (event.key === "ArrowLeft") changeLightbox(-1); if (event.key === "ArrowRight") changeLightbox(1); });
navLinks.forEach((link) => link.addEventListener("click", () => setActiveNav(link)));
window.addEventListener("resize", () => {
  if (renderedColumns !== getColumnCount()) renderMasonry();
  setActiveNav(nav.querySelector(".is-active") || navLinks[0]);
});

const markers = navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const activeLink = navLinks.find((link) => link.hash === `#${visible.target.id}`);
  if (activeLink) setActiveNav(activeLink);
}, { rootMargin: "-16% 0px -72%", threshold: [0, 0.12, 0.4] });

markers.forEach((marker) => sectionObserver.observe(marker));
requestAnimationFrame(() => setActiveNav(navLinks[0]));
