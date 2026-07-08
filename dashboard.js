/* ==========================================================================
   AGROMARKET ADMINISTRATIVE CONTROL FRAMEWORK - dashboard.js
   ========================================================================= */

const DashboardManager = {
    init() {
        this.renderProductsTable();
        this.setupModalHandlers();
        this.animateCounters();
    },
    renderProductsTable() {
        const target = document.getElementById('farmer-product-table-body');
        if(!target) return;
        
        target.innerHTML = mockProducts.slice(0, 5).map(p => `
            <tr>
                <td><strong>#00${p.id}</strong></td>
                <td><img src="${p.image}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;margin-right:10px;vertical-align:middle;">${p.name}</td>
                <td>₦${p.price.toLocaleString()}</td>
                <td>${p.stock} Units</td>
                <td><span class="badge-status status-success">Active</span></td>
                <td>
                    <button style="background:none;border:none;color:var(--primary-green);cursor:pointer;margin-right:10px;" onclick="window.Toast.show('Edit action triggered')">Edit</button>
                    <button style="background:none;border:none;color:var(--error);cursor:pointer;" onclick="window.Toast.show('Item deleted from catalog','error')">Delete</button>
                </td>
            </tr>
        `).join('');
    },
    setupModalHandlers() {
        const openBtn = document.getElementById('open-add-product-modal');
        const modal = document.getElementById('add-product-modal');
        if(openBtn && modal) {
            openBtn.addEventListener('click', () => modal.classList.add('active'));
        }
        const form = document.getElementById('add-product-form');
        if(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                window.Toast.show("Product listed successfully into the marketplace aggregate!");
                modal.classList.remove('active');
                form.reset();
            });
        }
    },
    animateCounters() {
        document.querySelectorAll('.stat-val').forEach(counter => {
            const targetVal = parseInt(counter.getAttribute('data-target') || "0");
            if(!targetVal) return;
            let current = 0;
            const step = Math.ceil(targetVal / 50);
            const timer = setInterval(() => {
                current += step;
                if(current >= targetVal) {
                    current = targetVal;
                    clearInterval(timer);
                }
                counter.textContent = counter.textContent.startsWith('₦') ? `₦${current.toLocaleString()}` : current.toLocaleString();
            }, 20);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => DashboardManager.init());