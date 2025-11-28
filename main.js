document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    function toggleMobileMenu() {
        const nav = document.getElementById('navbar');
        const btn = document.getElementById('mobile-menu-btn');
        
        btn.addEventListener('click', () => {
            nav.classList.toggle('active');
            btn.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Shopping cart counter
    function updateCartCounter() {
        let cartCount = 0;
        const cartIcon = document.getElementById('cart');
        
        if (!document.getElementById('cart-counter')) {
            const counter = document.createElement('span');
            counter.id = 'cart-counter';
            counter.className = 'cart-counter';
            cartIcon.parentNode.appendChild(counter);
        }
        
        document.getElementById('cart-counter').textContent = cartCount;
    }

    // Product image zoom
    function initImageZoom() {
        const images = document.querySelectorAll('.image img');
        
        images.forEach(img => {
            img.addEventListener('click', () => {
                const zoomDiv = document.createElement('div');
                zoomDiv.className = 'image-zoom';
                
                const zoomImg = document.createElement('img');
                zoomImg.src = img.src;
                
                zoomDiv.appendChild(zoomImg);
                document.body.appendChild(zoomDiv);
                
                zoomDiv.addEventListener('click', () => {
                    document.body.removeChild(zoomDiv);
                });
            });
        });
    }

    // Newsletter form validation
    function validateNewsletterForm() {
        const form = document.querySelector('footer section span');
        const input = document.getElementById('username');
        const button = form.querySelector('button');
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!input.value.includes('@') || !input.value.includes('.')) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert('Thank you for subscribing!');
            input.value = '';
        });
    }

    // Price filter
    function setupPriceFilter() {
        const filter = document.getElementById('price-filter');
        
        if (filter) {
            filter.addEventListener('change', () => {
                const value = filter.value;
                const products = document.querySelectorAll('.first > div');
                
                products.forEach(product => {
                    const priceText = product.querySelector('.new').textContent;
                    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                    
                    let showProduct = true;
                    
                    if (value === '0-2000' && price > 2000) showProduct = false;
                    if (value === '2000-5000' && (price <= 2000 || price > 5000)) showProduct = false;
                    if (value === '5000+' && price <= 5000) showProduct = false;
                    
                    product.style.display = showProduct ? 'block' : 'none';
                });
            });
        }
    }

    // Sticky navigation
    function makeNavSticky() {
        const nav = document.getElementById('navbar');
        const header = document.querySelector('header');
        const navOffset = header.offsetHeight;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > navOffset) {
                nav.classList.add('sticky');
            } else {
                nav.classList.remove('sticky');
            }
        });
    }

    // Add to cart functionality
    function setupAddToCart() {
        const products = document.querySelectorAll('.first > div');
        
        products.forEach(product => {
            const addButton = document.createElement('button');
            addButton.className = 'add-to-cart';
            addButton.textContent = 'Add to Cart';
            
            product.appendChild(addButton);
            
            addButton.addEventListener('click', () => {
                const productName = product.querySelector('h5').textContent;
                const price = product.querySelector('.new').textContent;
                
                alert(`Added ${productName} (${price}) to cart`);
                updateCartCounter();
            });
        });
    }

    // Collection filter
    function setupCollectionFilter() {
        const filterButtons = document.querySelectorAll('.collection-filter button');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const collection = button.dataset.collection;
                const cards = document.querySelectorAll('.card');
                
                cards.forEach(card => {
                    if (collection === 'all' || card.querySelector('h4').textContent.toLowerCase().includes(collection)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // FAQ accordion
    function setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = question.querySelector('span');
            
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                answer.style.display = isOpen ? 'none' : 'block';
                toggle.textContent = isOpen ? '+' : '-';
            });
        });
    }

    // Social media sharing
    function setupSocialSharing() {
        const socialLinks = document.querySelectorAll('footer ul:last-child li a');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.textContent.toLowerCase();
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent("Check out these amazing fashion items!");
                
                let shareUrl = '';
                
                if (platform.includes('facebook')) {
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                } else if (platform.includes('instagram')) {
                    alert('Instagram sharing requires the mobile app');
                    return;
                } else if (platform.includes('linkedin')) {
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
                } else if (platform.includes('tiktok')) {
                    shareUrl = `https://www.tiktok.com/share?url=${url}`;
                }
                
                if (shareUrl) window.open(shareUrl, '_blank');
            });
        });
    }

    // Initialize all functions
    toggleMobileMenu();
    updateCartCounter();
    initImageZoom();
    validateNewsletterForm();
    setupPriceFilter();
    makeNavSticky();
    setupAddToCart();
    setupCollectionFilter();
    setupFAQAccordion();
    setupSocialSharing();
});