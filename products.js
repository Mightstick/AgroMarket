/* ==========================================================================
   AGROMARKET DATABANK - products.js (Fully Fixed & Verified)
   ========================================================================== */

const mockProducts = [
    { id: 1, name: "Premium Tomatoes Basket", category: "vegetables", price: 15000, farmer: "Alhaji Musa", location: "Jos", rating: 4.8, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500", stock: 25, organic: true, description: "Freshly plucked red tomatoes from the valleys of Jos." },
    { id: 2, name: "Habanero Pepper (Rodo)", category: "vegetables", price: 8500, farmer: "Emeka Okafor", location: "Nsukka", rating: 4.5, image: "etienne-girardet-xT4M3mOcfeg-unsplash.jpg", stock: 14, organic: true },
    { id: 3, name: "Abakaliki Local Rice 50kg", category: "grains", price: 68000, farmer: "Nkechi Rice Mills", location: "Abakaliki", rating: 4.9, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500", stock: 8, organic: false },
    { id: 4, name: "Brown Honey Beans Oloyin", category: "grains", price: 42000, farmer: "Baba Gana", location: "Maiduguri", rating: 4.6, image: "daniela-paola-alchapar-AlqMN9ub3Aw-unsplash.jpg", stock: 19, organic: true },
    { id: 5, name: "Abuja Sweet Yam Tuber (Pack of 3)", category: "tubers", price: 12000, farmer: "Audu Maikano", location: "Abuja", rating: 4.7, image: "adam-berry-xTp3YB3_cCM-unsplash.jpg", stock: 50, organic: true },
    { id: 6, name: "Delta Cassava Roots Bunch", category: "tubers", price: 9000, farmer: "Fefe Prince", location: "Asaba", rating: 4.2, image: "daniel-dan-0_GtcvY4Mj4-unsplash.jpg", stock: 30, organic: true },
    { id: 7, name: "Agbagba Plantain Bunch (Unripe)", category: "fruits", price: 6500, farmer: "Akpan Sunshine", location: "Uyo", rating: 4.4, image: "https://images.unsplash.com/photo-1566393028639-d108a42c46a7?w=500", stock: 15, organic: true },
    { id: 8, name: "Cavendish Sweet Banana Bunch", category: "fruits", price: 3500, farmer: "Sani Orchard", location: "Zaria", rating: 4.3, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500", stock: 40, organic: true },
    { id: 9, name: "Sweet Orange Outspan (Crate)", category: "fruits", price: 8000, farmer: "Sani Orchard", location: "Zaria", rating: 4.6, image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500", stock: 22, organic: true },
    { id: 10, name: "Benue Juicy Mangoes (Crate)", category: "fruits", price: 7500, farmer: "Terna Farms", location: "Makurdi", rating: 4.9, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500", stock: 12, organic: true },
    { id: 11, name: "Irish Potatoes Clean Sack", category: "tubers", price: 28000, farmer: "Alhaji Musa", location: "Jos", rating: 4.7, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500", stock: 17, organic: false },
    { id: 12, name: "Alasa Purple Onions Bag", category: "vegetables", price: 34000, farmer: "Yusuf Agro", location: "Kano", rating: 4.5, image: "abhishek-hajare-D9h2-RxM1rE-unsplash.jpg", stock: 20, organic: false },
    { id: 13, name: "Organic Garlic Bulbs (1kg)", category: "vegetables", price: 5000, farmer: "YY Farms", location: "Kaduna", rating: 4.4, image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500", stock: 100, organic: true },
    { id: 14, name: "Golden Fresh Farm Eggs (3 Crates)", category: "poultry", price: 13500, farmer: "Olu Poultry", location: "Ibadan", rating: 4.8, image: "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=500", stock: 60, organic: true },
    { id: 15, name: "Live Broiler Chicken (Big Size)", category: "poultry", price: 9500, farmer: "Olu Poultry", location: "Ibadan", rating: 4.7, image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500", stock: 45, organic: false },
    { id: 16, name: "Fresh Catfish (Per KG)", category: "seafood", price: 4500, farmer: "Wale Aquaculture", location: "Epe", rating: 4.6, image: "Fishes.jpg", stock: 80, organic: true },
    { id: 17, name: "Frozen Local Turkey", category: "poultry", price: 32000, farmer: "Chioma Livestock", location: "Onitsha", rating: 4.3, image: "Angela.jpg", stock: 11, organic: false },
    { id: 18, name: "Organic Goat Meat Cutlets (5kg)", category: "livestock", price: 27000, farmer: "Malam Ibrahim", location: "Sokoto", rating: 4.9, image: "download.jpg", stock: 15, organic: true },
    { id: 19, name: "Pure Nsukka Palm Oil (25L)", category: "herbs", price: 38000, farmer: "Uche Agro-vantage", location: "Nsukka", rating: 4.9, image: "mybox.jpg", stock: 25, organic: true },
    { id: 20, name: "Unrefined Forest Honey (5L)", category: "herbs", price: 24000, farmer: "BeeKeepers Collective", location: "Mambilla", rating: 5.0, image: "honey.jpg", stock: 30, organic: true },
    { id: 21, name: "Raw Groundnut Kernels Bag", category: "seeds", price: 18500, farmer: "Danladi Seed Co", location: "Katsina", rating: 4.2, image: "nut.jpg", stock: 40, organic: false },
    { id: 22, name: "Crisp Green Cucumbers (Crate)", category: "vegetables", price: 7000, farmer: "Greenhouse Hub", location: "Epe", rating: 4.4, image: "kheera,, cucumber 🥒🥒.jpg", stock: 35, organic: true },
    { id: 23, name: "Large Watermelon (Pack of 5)", category: "fruits", price: 11000, farmer: "Terna Farms", location: "Makurdi", rating: 4.7, image: "watermelon.jpg", stock: 50, organic: true },
    { id: 24, name: "Fresh Cabbage Heads Flourish", category: "vegetables", price: 6000, farmer: "Alhaji Musa", location: "Jos", rating: 4.5, image: "cabbage.jpg", stock: 22, organic: true },
    { id: 25, name: "Organic Green Lettuce Bag", category: "vegetables", price: 4500, farmer: "Greenhouse Hub", location: "Epe", rating: 4.3, image: "Lettuce in Bloom.jpg", stock: 18, organic: true },
    { id: 26, name: "Zaria Orange Carrots Bag", category: "vegetables", price: 9500, farmer: "Yusuf Agro", location: "Kano", rating: 4.6, image: "carrot.jpg", stock: 20, organic: true },
    { id: 27, name: "Sweet Yellow Corn (100 Ears)", category: "grains", price: 14000, farmer: "Audu Maikano", location: "Abuja", rating: 4.5, image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500", stock: 12, organic: true },
    { id: 28, name: "Pearl Millet Grain Bag", category: "grains", price: 31000, farmer: "Baba Gana", location: "Maiduguri", rating: 4.1, image: "Graines de Petit mil.jpg", stock: 15, organic: false },
    { id: 29, name: "White Sorghum Bulk Pack", category: "grains", price: 33000, farmer: "Danladi Seed Co", location: "Katsina", rating: 4.3, image: " sorghum.jpg", stock: 16, organic: false },
    { id: 30, name: "Spicy Crushed Ginger Dry", category: "herbs", price: 12500, farmer: "YY Farms", location: "Kaduna", rating: 4.8, image: "🍠🍆🍅🌽.jpg", stock: 70, organic: true }
];