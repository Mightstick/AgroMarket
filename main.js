/* ==========================================================================
   AGROMARKET SYSTEM FRAMEWORK MAIN THREAD - main.js
   ========================================================================== */

window.Toast = {
    show(message, type = 'success') {
        let container = document.getElementById('toast-container');
        if(!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'error' : ''}`;
        toast.innerHTML = `<span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }
};

const UIController = {
    initGlobalFeatures() {
        this.setupThemeToggle();
        this.setupBackToTop();
        this.setupModals();
        this.setupFAQ();
    },
    setupThemeToggle() {
        const toggle = document.querySelector('.theme-toggle');
        if(!toggle) return;
        toggle.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', activeTheme);
            localStorage.setItem('agro_theme', activeTheme);
        });
        if(localStorage.getItem('agro_theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    },
    setupBackToTop() {
        const btn = document.querySelector('.back-to-top');
        if(!btn) return;
        window.addEventListener('scroll', () => {
            if(window.scrollY > 300) btn.classList.add('show');
            else btn.classList.remove('show');
        });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },
    setupModals() {
        document.querySelectorAll('.close-modal').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        });
    },
    setupFAQ() {
        document.querySelectorAll('.faq-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const parent = trigger.parentElement;
                parent.classList.toggle('active');
            });
        });
    },
    openQuickView(productId) {
        const product = mockProducts.find(p => p.id === productId);
        if(!product) return;
        const modal = document.getElementById('quickview-modal');
        if(!modal) return;
        modal.querySelector('.qv-title').textContent = product.name;
        modal.querySelector('.qv-img').src = product.image;
        modal.querySelector('.qv-price').textContent = `₦${product.price.toLocaleString()}`;
        modal.querySelector('.qv-desc').textContent = product.description || "Premium organic product cultivated straight from high yield agricultural grids.";
        modal.querySelector('.qv-cta').onclick = () => { CartEngine.addItem(product.id); modal.classList.remove('active'); };
        modal.classList.add('active');
    },
    buildProductCardHtml(p) {
        return `
            <div class="product-card animate-fade">
                ${p.organic ? `<span class="product-badge">ORGANIC</span>` : ''}
                <button class="wishlist-btn" onclick="window.Toast.show('Added to wish list!')">❤</button>
                <div class="product-img-wrapper">
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-cat">${p.category}</span>
                    <h3 class="product-title"><a href="product-details.html?id=${p.id}">${p.name}</a></h3>
                    <div class="product-meta">🧑‍🌾 ${p.farmer} • 📍 ${p.location}</div>
                    <div style="color:var(--accent-yellow);font-size:0.9rem;margin-bottom:10px;">★ ${p.rating || 4.5}</div>
                    <div class="product-pricing-row">
                        <span class="product-price">₦${p.price.toLocaleString()}</span>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="CartEngine.addItem(${p.id})" style="padding:8px 12px;font-size:0.85rem;">Add to Cart</button>
                    <button class="btn btn-outline" onclick="UIController.openQuickView(${p.id})" style="padding:8px 12px;font-size:0.85rem;">Quick View</button>
                </div>
            </div>
        `;
    },
    renderGrid(targetId, dataset) {
        const container = document.getElementById(targetId);
        if(!container) return;
        container.innerHTML = dataset.map(p => this.buildProductCardHtml(p)).join('');
    },
    runCatalogSearchAndFilters() {
        const query = document.getElementById('catalog-search-input')?.value.toLowerCase() || '';
        const catFilter = document.getElementById('filter-category')?.value || 'all';
        const locFilter = document.getElementById('filter-location')?.value || 'all';
        const sortVal = document.getElementById('filter-sort')?.value || 'default';

        let output = mockProducts.filter(p => {
            const matchesQuery = p.name.toLowerCase().includes(query) || p.farmer.toLowerCase().includes(query);
            const matchesCat = catFilter === 'all' || p.category === catFilter;
            const matchesLoc = locFilter === 'all' || p.location.toLowerCase() === locFilter.toLowerCase();
            return matchesQuery && matchesCat && matchesLoc;
        });

        if(sortVal === 'price-asc') output.sort((a,b) => a.price - b.price);
        if(sortVal === 'price-desc') output.sort((a,b) => b.price - a.price);
        if(sortVal === 'rating') output.sort((a,b) => b.rating - a.rating);

        this.renderGrid('catalog-grid-target', output);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    UIController.initGlobalFeatures();
    // Auto detection profiles
    if(document.getElementById('featured-products-target')) {
        UIController.renderGrid('featured-products-target', mockProducts.slice(0, 8));
    }
    if(document.getElementById('catalog-grid-target')) {
        UIController.renderGrid('catalog-grid-target', mockProducts);
    }
});