/* ==========================================================================
   AGROMARKET CORE TRANSACTIONAL OPERATIONS ENGINE - cart.js
   ========================================================================== */

const CartEngine = {
    getStorage() {
        return JSON.parse(localStorage.getItem('agro_cart')) || [];
    },
    setStorage(data) {
        localStorage.setItem('agro_cart', JSON.stringify(data));
        this.syncBadges();
    },
    addItem(productId, qty = 1) {
        let current = this.getStorage();
        let match = current.find(item => item.id === productId);
        if(match) {
            match.quantity += qty;
        } else {
            current.push({ id: productId, quantity: qty });
        }
        this.setStorage(current);
        window.Toast?.show("Product successfully provisioned to cart!");
    },
    removeItem(productId) {
        let current = this.getStorage().filter(item => item.id !== productId);
        this.setStorage(current);
        this.renderCartPage();
    },
    updateQuantity(productId, updateValue) {
        let current = this.getStorage();
        let match = current.find(item => item.id === productId);
        if(match) {
            match.quantity = parseInt(updateValue);
            if(match.quantity <= 0) return this.removeItem(productId);
        }
        this.setStorage(current);
        this.renderCartPage();
    },
    syncBadges() {
        const count = this.getStorage().reduce((acc, item) => acc + item.quantity, 0);
        document.querySelectorAll('.cart-badge').forEach(badge => badge.textContent = count);
    },
    renderCartPage() {
        const wrapper = document.getElementById('cart-page-injection-target');
        if(!wrapper) return;
        const current = this.getStorage();
        if(current.length === 0) {
            wrapper.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px;">Your cart is empty. <a href="products.html" style="color:var(--primary-green);font-weight:bold;">Shop Now</a></td></tr>`;
            this.updateSummary(0);
            return;
        }
        let rows = '';
        let runningSubtotal = 0;
        current.forEach(cartItem => {
            const fullRef = mockProducts.find(p => p.id === cartItem.id);
            if(fullRef) {
                const rowTotal = fullRef.price * cartItem.quantity;
                runningSubtotal += rowTotal;
                rows += `
                    <tr>
                        <td>
                            <div style="display:flex;align-items:center;gap:15px;">
                                <img src="${fullRef.image}" style="width:60px;height:60px;object-fit:cover;border-radius:4px;">
                                <div>
                                    <h4>${fullRef.name}</h4>
                                    <small style="color:var(--text-muted)">Farmer: ${fullRef.farmer}</small>
                                </div>
                            </div>
                        </td>
                        <td>₦${fullRef.price.toLocaleString()}</td>
                        <td>
                            <input type="number" min="1" value="${cartItem.quantity}" onchange="CartEngine.updateQuantity(${fullRef.id}, this.value)" style="width:60px;padding:5px;border-radius:4px;border:1px solid var(--border-color)">
                        </td>
                        <td>₦${rowTotal.toLocaleString()}</td>
                        <td><button onclick="CartEngine.removeItem(${fullRef.id})" style="background:none;border:none;color:var(--error);cursor:pointer;">Remove</button></td>
                    </tr>
                `;
            }
        });
        wrapper.innerHTML = rows;
        this.updateSummary(runningSubtotal);
    },
    updateSummary(subtotal) {
        const shipFee = subtotal > 0 ? 3500 : 0;
        const finalTotal = subtotal + shipFee;
        if(document.getElementById('cart-subtotal')) document.getElementById('cart-subtotal').textContent = `₦${subtotal.toLocaleString()}`;
        if(document.getElementById('cart-shipping')) document.getElementById('cart-shipping').textContent = `₦${shipFee.toLocaleString()}`;
        if(document.getElementById('cart-total')) document.getElementById('cart-total').textContent = `₦${finalTotal.toLocaleString()}`;
    }
};

document.addEventListener('DOMContentLoaded', () => CartEngine.syncBadges());