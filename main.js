// Mobile nav toggle
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.getElementById('primary-nav');
if (mobileToggle && primaryNav) {
  mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
  });
}

// Simple cart modal and state
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsEl = document.querySelector('.cart-items');
const cartTotalEl = document.getElementById('cart-total');
const closeCartBtn = document.querySelector('.close-cart');
const searchBtn = document.querySelector('.search-btn');
const searchModal = document.getElementById('search-modal');
const closeSearchBtn = document.querySelector('.close-search');
const searchInput = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.getElementById('login-modal');
const closeLoginBtn = document.querySelector('.close-login');

const cart = new Map();

// Reusable function to close modals with animation
function closeModal(modal) {
  if (!modal) return;
  modal.classList.add('closing');
  modal.addEventListener('animationend', () => {
    modal.classList.remove('closing');
    modal.close();
  }, { once: true });
}

function renderCart() {
  if (!cartItemsEl || !cartTotalEl) return;
  cartItemsEl.innerHTML = '';
  let total = 0;
  for (const [id, item] of cart.entries()) {
    const line = document.createElement('div');
    line.className = 'cart-line';
    const lineTotal = item.price * item.qty;
    total += lineTotal;
    line.innerHTML = `
      <div>
        <div style="font-weight:600">${item.name}</div>
        <div class="muted">₹${item.price.toLocaleString('en-IN')}</div>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <div class="qty">
          <button aria-label="Decrease" data-action="dec" data-id="${id}">-</button>
          <span aria-live="polite">${item.qty}</span>
          <button aria-label="Increase" data-action="inc" data-id="${id}">+</button>
        </div>
        <div style="min-width:70px; text-align:right; font-weight:600;">₹${lineTotal.toLocaleString('en-IN')}</div>
      </div>`;
    cartItemsEl.appendChild(line);
  }
  cartTotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
}

document.addEventListener('click', (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;
  // Add to cart
  if (target.matches('.add-to-cart')) {
    const data = target.getAttribute('data-product');
    if (!data) return;
    try {
      const product = JSON.parse(data);
      const existing = cart.get(product.id) || { ...product, qty: 0 };
      existing.qty += 1;
      cart.set(product.id, existing);
      renderCart();
      if (cartModal && typeof cartModal.showModal === 'function') cartModal.showModal();
    } catch (_) { /* noop */ }
  }
  // Qty controls
  if (target.matches('.qty button')) {
    const id = target.getAttribute('data-id');
    const action = target.getAttribute('data-action');
    if (!id || !action) return;
    const item = cart.get(id);
    if (!item) return;
    if (action === 'inc') item.qty += 1;
    if (action === 'dec') item.qty = Math.max(0, item.qty - 1);
    if (item.qty === 0) cart.delete(id); else cart.set(id, item);
    renderCart();
  }
});

if (cartBtn && cartModal) {
  cartBtn.addEventListener('click', () => cartModal.showModal());
}
if (closeCartBtn && cartModal) {
  closeCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(cartModal);
  });
}

// Checkout -> email handoff
if (cartModal) {
  cartModal.addEventListener('close', (e) => {
    // no-op
  });
  cartModal.addEventListener('submit', (e) => {
    // dialog confirm button clicked
    const lines = [];
    let total = 0;
    for (const [, item] of cart.entries()) {
      const lineTotal = item.price * item.qty;
      total += lineTotal;
      lines.push(`${item.name} x ${item.qty} = ₹${lineTotal.toLocaleString('en-IN')}`);
    }
    const subject = encodeURIComponent('MOKSH Order Enquiry');
    const body = encodeURIComponent(
      `Hello MOKSH,\n\nI would like to place an order with the following items:\n\n${lines.join('\n')}\n\nTotal: ₹${total.toLocaleString('en-IN')}\n\nPlease reply with payment and delivery details.\n\nThanks!`
    );
    const mailto = `mailto:mjscreation2002@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
}

// Basic client-side newsletter handler
const newsletter = document.querySelector('.newsletter');
if (newsletter) {
  newsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletter.querySelector('input[type="email"]');
    if (input && input.value) {
      alert('Thanks for subscribing!');
      input.value = '';
    }
  });
}

// Button spotlight follow
document.addEventListener('pointermove', (e) => {
  document.querySelectorAll('.btn-primary').forEach((btn) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
  });
});

// Reveal on scroll with stagger effect
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const children = Array.from(el.parentElement.children);
        const index = children.indexOf(el);
        const delay = Number(el.getAttribute('data-delay') || 0);
        
        el.style.transitionDelay = `${delay + index * 0.08}s`;
        el.classList.add('visible');

        io.unobserve(el);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach((el) => io.observe(el));
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Search functionality
function collectProducts() {
  return Array.from(document.querySelectorAll('.product-card')).map((card) => {
    const title = card.querySelector('.product-title')?.textContent?.trim() || '';
    const price = card.querySelector('.product-price')?.textContent?.trim() || '';
    return { card, title, price };
  });
}

function renderSearchResults(query) {
  if (!searchResults) return;
  const items = collectProducts();
  const q = query.trim().toLowerCase();
  const filtered = q ? items.filter((i) => i.title.toLowerCase().includes(q)) : items;
  searchResults.innerHTML = '';
  filtered.forEach((i) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'search-row';
    row.style.textAlign = 'left';
    row.style.padding = '10px';
    row.style.border = '1px solid var(--border)';
    row.style.borderRadius = '10px';
    row.innerHTML = `<div style="font-weight:600;">${i.title}</div><div class="muted">${i.price}</div>`;
    row.addEventListener('click', () => {
      i.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      closeModal(searchModal);
      i.card.classList.add('visible');
    });
    searchResults.appendChild(row);
  });
}

if (searchBtn && searchModal) {
  searchBtn.addEventListener('click', () => {
    searchModal.showModal();
    setTimeout(() => searchInput?.focus(), 50);
    renderSearchResults('');
  });
}
if (closeSearchBtn && searchModal) {
    closeSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(searchModal);
    });
}
if (searchInput) {
  searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
}

// Login modal (mock providers)
if (loginBtn && loginModal) loginBtn.addEventListener('click', () => loginModal.showModal());
if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
    });
}

// Firebase Google Sign-In (client-side)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { browserLocalPersistence, getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithPopup, signInWithRedirect, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-auth-domain-here",
  projectId: "your-project-id-here",
  appId: "your-app-id-here"
};

if (firebaseConfig.apiKey === "your-api-key-here") {
    console.warn("Firebase is not configured. Please add your project credentials in assets/js/main.js to enable authentication.");
}

let auth;
try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence).catch(() => {});
  auth.useDeviceLanguage();
} catch (e) {
  console.warn('Firebase initialization failed. Ensure your config in assets/js/main.js is correct.');
}

const googleBtn = document.querySelector('.google-login');
const signoutBtn = document.querySelector('.signout-btn');
const headerLoginBtn = document.querySelector('.login-btn');

if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    if (!auth || firebaseConfig.apiKey === "your-api-key-here") return alert('Please configure Firebase before using Google Sign-In.');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      closeModal(loginModal);
    } catch (err) {
      console.error('Google Sign-In error:', err);
      const code = err?.code || '';
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
        try {
          const provider = new GoogleAuthProvider();
          await signInWithRedirect(auth, provider);
          return;
        } catch (e2) {
          console.error('Redirect fallback failed:', e2);
        }
      }
      alert('Sign-in failed. Ensure you are serving over http(s), Google provider is enabled, and this domain is authorized in Firebase. See console for details.');
    }
  });
}

if (signoutBtn) {
  signoutBtn.addEventListener('click', async () => {
    if (!auth) return;
    await signOut(auth);
  });
}

if (auth) {
  getRedirectResult(auth).catch((e) => console.warn('Redirect result error:', e?.code));
  onAuthStateChanged(auth, (user) => {
    if (user) {
      headerLoginBtn.textContent = user.displayName ? `Hi, ${user.displayName.split(' ')[0]}` : 'Account';
      signoutBtn.style.display = 'block';
    } else {
      headerLoginBtn.textContent = 'Login';
      signoutBtn.style.display = 'none';
    }
  });
}

document.querySelector('.apple-login')?.addEventListener('click', () => alert('Apple ID Sign-In to be integrated.'));