const products = [
  {
    name: 'EaseBuy Zero Clone',
    description: 'Mid-slow control surface with micro-adjusted humidity seal for consistent glide.',
    feel: 'Control / Microtexture',
    price: 54,
    image: 'assets/pad-1.svg',
    cta: 'https://discord.gg/easebuypads'
  },
  {
    name: 'EaseBuy Raiden Clone',
    description: 'Ultra-smooth hybrid cloth for flexible flicks without sacrificing stopping power.',
    feel: 'Hybrid / Speed cloth',
    price: 58,
    image: 'assets/pad-2.svg',
    cta: 'mailto:easebuypads@gmail.com'
  },
  {
    name: 'EaseBuy Ember Edition',
    description: 'Textured base layer and low-profile embossing keeps the pad planted on glass desks.',
    feel: 'Balanced / Textured',
    price: 62,
    image: 'assets/pad-3.svg',
    cta: 'https://discord.gg/easebuypads'
  }
];

const grid = document.getElementById('product-grid');

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card reveal';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name} mousepad" loading="lazy" />
    <div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    </div>
    <div class="product-meta">
      <span>${product.feel}</span>
      <span class="price">$${product.price}</span>
    </div>
    <a class="buy-btn" href="${product.cta}" target="_blank" rel="noreferrer">
      Buy / Contact
    </a>
  `;
  return card;
}

if (grid) {
  products.forEach((product) => {
    grid.appendChild(createProductCard(product));
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = () => document.querySelectorAll('.reveal');

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements().forEach((el) => observer.observe(el));
} else {
  revealElements().forEach((el) => el.classList.add('in-view'));
}

const localLinks = document.querySelectorAll('a[href^="#"]');
localLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
});
