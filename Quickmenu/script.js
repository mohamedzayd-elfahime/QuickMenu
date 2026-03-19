document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    // Wait 2.5 seconds before transitioning to the menu
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
        
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'flex';
        }, 500); // Wait for the fade out animation
    }, 2500);

    // 2. Data
    const categories = ['Sandwich', 'Tacos', 'Pizza', 'Buger', 'ftour'];
    const menuData = {
        'Sandwich': [
            { name: 'sandwich dinde :', price: '15 dh', image: 'asset/sandx-poulet-removebg-preview.png' },
            { name: 'sandwich viande hashé :', price: '15 dh', image: 'asset/sandx-poulet-removebg-preview.png' },
            { name: 'sandwich ma39ouda :', price: '7 dh', image: 'asset/sandx-poulet-removebg-preview.png' },
            { name: 'sandwich ma39ouda + oeuf', price: '9 dh', image: 'asset/sandx-poulet-removebg-preview.png' },
            { name: 'sandwich ma39ouda + oeuf + lanchon:', price: '12 dh', image: 'asset/sandx-poulet-removebg-preview.png' },
            { name: 'sandwich mixte :', price: '20 dh', image: 'asset/sandx-poulet-removebg-preview.png' },
            { name: 'frite', price: '5 dh', image: 'asset/download__1_-removebg-preview.png' }
        ],
        'Tacos': [
            { name: 'Tacos poulet :', price: '15 dh', image: 'asset/i146583-tacos-poulet-curry-removebg-preview.png' },
            { name: 'Tacos viande hashé :', price: '15 dh', image: 'asset/Tacos-viande-hachee-removebg-preview.png' },
            { name: 'Tacos thon :', price: '15 dh', image: 'asset/Tacos-viande-hachee-removebg-preview.png' }, // Add proper images if found
            { name: 'Tacos mixte :', price: '20 dh', image: 'asset/Tacos-viande-hachee-removebg-preview.png' },
            { name: 'Tacos nugget :', price: '20 dh', image: 'asset/Tacos-viande-hachee-removebg-preview.png' },
            { name: 'frite', price: '5 dh', image: 'asset/download__1_-removebg-preview.png' }
        ],
        'Pizza': [
            { name: 'pizza margareta :', price: '20 dh', image: 'asset/Page_2___Pizza_Images_-_Free_Download_on_Freepik-removebg-preview.png' },
            { name: 'pizza viande hashé :', price: '25 dh', image: 'asset/Page_2___Pizza_Images_-_Free_Download_on_Freepik-removebg-preview.png' },
            { name: 'pizza dende :', price: '25 dh', image: 'asset/Page_2___Pizza_Images_-_Free_Download_on_Freepik-removebg-preview.png' },
            { name: 'pizza fruit de mer', price: '30 dh', image: 'asset/Pizza_with_seafood_Stock_Photo_02_free_download-removebg-preview.png' },
            { name: 'pizza 4 saison', price: '30 dh', image: 'asset/Recipes_-_Quattro_Stagioni_Neapolitan-Style_Pizza___Breville-removebg-preview.png' }
        ],
        'Buger': [
            { name: 'Cheese burger', price: '20 dh', image: 'asset/Delicious_Burger-removebg-preview.png' },
            { name: 'Burger', price: '25 dh', image: 'asset/Hamburguer_com_queijo_e_bacon-removebg-preview.png' },
            { name: 'chicken burger', price: '25 dh', image: 'asset/Homemade_KFC-Style_Colonel_Burger-removebg-preview.png' },
            { name: 'double cheese burger', price: '30 dh', image: 'asset/crack_burgers_--removebg-preview.png' }
        ],
        'ftour': [
            { name: 'hrira', price: '5 dh', image: 'asset/Harira__Suppe_aus_Marokko-removebg-preview.png' },
            { name: '2 oeuf', price: '4 dh', image: 'asset/Jajka_na_twardo-removebg-preview.png' },
            { name: 'tamr', price: '3 dh', image: 'asset/Gâteau_de_dattes__Tunisie_-removebg-preview.png' },
            { name: 'Atay', price: '7 dh', image: 'asset/Traditional_Moroccan_Mint_Tea_with_Fresh_Mint-removebg-preview.png' }
        ]
    };

    let activeCategory = 'ftour';

    // 3. UI Elements
    const categoryTabsContainer = document.getElementById('category-tabs');
    const menuGrid = document.getElementById('menu-grid');
    const currentCategoryTitle = document.getElementById('current-category-title');

    // 4. Render Categories
    function renderCategories() {
        categoryTabsContainer.innerHTML = '';
        categories.forEach(cat => {
            const li = document.createElement('li');
            li.textContent = cat;
            li.className = `category-tab ${cat === activeCategory ? 'active' : ''}`;
            
            li.addEventListener('click', () => {
                // Update Active Tab
                document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
                li.classList.add('active');
                
                // Update Category State
                activeCategory = cat;
                renderMenu();
            });
            
            categoryTabsContainer.appendChild(li);
        });
        
        // Ensure active tab is visible (scroll right if necessary)
        const activeTabEl = document.querySelector('.category-tab.active');
        if(activeTabEl) {
            activeTabEl.parentElement.parentElement.scrollLeft = activeTabEl.offsetLeft - 20;
        }
    }

    // 5. Render Menu Items
    function renderMenu() {
        menuGrid.innerHTML = ''; // Clear existing
        currentCategoryTitle.textContent = activeCategory; // burger -> burger etc. Actually Buger -> Buger or Burger?
        if (activeCategory === 'Buger') {
            currentCategoryTitle.textContent = 'burger';
        } else {
            currentCategoryTitle.textContent = activeCategory;
        }

        const items = menuData[activeCategory] || [];
        
        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            // Stagger animation delay
            card.style.animationDelay = `${index * 0.05}s`;

            card.innerHTML = `
                <div class="card-img-container">
                    <img src="${item.image}" alt="${item.name}" class="card-img" onerror="this.src='asset/download-removebg-preview.png'">
                </div>
                <div class="card-info">
                    <div class="card-title">${item.name}</div>
                    <div class="card-price">${item.price}</div>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }

    // Initialize
    renderCategories();
    renderMenu();
});
