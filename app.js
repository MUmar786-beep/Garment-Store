// const navbar = document.getElementById("navbar");
// let lastScroll = 0;

// // Hide/show on scroll
// window.addEventListener("scroll", () => {
//   const currentScroll = window.scrollY;

//   if (currentScroll > lastScroll) {
//     navbar.style.top = "-60px"; // Hide on scroll down
//   } else {
//     navbar.style.top = "0"; // Show on scroll up
//   }

//   lastScroll = currentScroll;
// });

// // Override scroll hide on hover
// navbar.addEventListener("mouseenter", () => {
//   navbar.style.top = "0";
// });

// navbar.addEventListener("mouseleave", () => {
//   if (window.scrollY > 100) { // Only hide if scrolled down
//     navbar.style.top = "-60px";
//   }
// });





document.addEventListener('DOMContentLoaded', function() {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navbar = document.getElementById('navbar');

  // Check if elements exist
  if (mobileMenuBtn && navbar) {
    mobileMenuBtn.addEventListener('click', function() {
      navbar.classList.toggle('active');
      this.textContent = navbar.classList.contains('active') ? '✕' : '☰';
    });
  } else {
    console.error('Mobile menu button or navbar not found in the DOM.');
  }
});

  // 2. Countdown Timer
  function updateCountdown() {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7); // Sale ends in 7 days
      
      const now = new Date().getTime();
      const distance = endDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      
      if (distance < 0) {
          clearInterval(countdownTimer);
          document.querySelector('.countdown-container').innerHTML = '<h3>Sale Has Ended</h3>';
      }
  }
  
  const countdownTimer = setInterval(updateCountdown, 1000);
  updateCountdown();

  // 3. Product Data
  const products = [
      {
          id: 1,
          name: "Stylish Zipper",
          category: "jackets",
          price: 1500,
          discountPrice: 1200,
          image: "images/Jackets/jacket1.jpg",
          badge: "40% OFF"
      },
      {
          id: 2,
          name: "Sleevless",
          category: "jackets",
          price: 2500,
          discountPrice: 2200,
          image: "images/Jackets/jacket13.jpg",
          badge: "12% OFF"
      },
      // Add all other products similarly
  ];

  // 4. Render Products
  function renderProducts(filteredProducts = products) {
      const productsContainer = document.getElementById('products-container');
      productsContainer.innerHTML = '';
      
      filteredProducts.forEach(product => {
          const discountPercent = Math.round(((product.price - product.discountPrice) / product.price) * 100);
          
          const productCard = document.createElement('div');
          productCard.className = 'product-card';
          productCard.dataset.category = product.category;
          productCard.dataset.price = product.discountPrice;
          
          productCard.innerHTML = `
              <div class="product-image">
                  <img src="${product.image}" alt="${product.name}">
                  ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
              </div>
              <div class="product-info">
                  <h3 class="product-title">${product.name}</h3>
                  <div class="product-price">
                      <span class="original-price">${product.price} RS</span>
                      <span class="discounted-price">${product.discountPrice} RS</span>
                  </div>
                  <div class="product-actions">
                      <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
                      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                  </div>
              </div>
          `;
          
          productsContainer.appendChild(productCard);
      });
      
      // Add event listeners to new buttons
      addProductEventListeners();
  }
  
  // Initial render
  renderProducts();

  // 5. Product Filtering
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const sortBy = document.getElementById('sort-by');
  
  function applyFilters() {
      const category = categoryFilter.value;
      const priceRange = priceFilter.value;
      const sort = sortBy.value;
      
      let filteredProducts = [...products];
      
      // Category filter
      if (category !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.category === category);
      }
      
      // Price filter
      if (priceRange !== 'all') {
          const [min, max] = priceRange.split('-').map(Number);
          
          filteredProducts = filteredProducts.filter(product => {
              if (priceRange.endsWith('+')) {
                  return product.discountPrice >= min;
              }
              return product.discountPrice >= min && product.discountPrice <= max;
          });
      }
      
      // Sorting
      if (sort === 'price-low') {
          filteredProducts.sort((a, b) => a.discountPrice - b.discountPrice);
      } else if (sort === 'price-high') {
          filteredProducts.sort((a, b) => b.discountPrice - a.discountPrice);
      } else if (sort === 'discount') {
          filteredProducts.sort((a, b) => {
              const discountA = ((a.price - a.discountPrice) / a.price) * 100;
              const discountB = ((b.price - b.discountPrice) / b.price) * 100;
              return discountB - discountA;
          });
      }
      
      renderProducts(filteredProducts);
  }
  
  categoryFilter.addEventListener('change', applyFilters);
  priceFilter.addEventListener('change', applyFilters);
  sortBy.addEventListener('change', applyFilters);

  // 6. Quick View Modal
  const modal = document.getElementById('quick-view-modal');
  const modalContent = document.querySelector('.modal-product-view');
  const closeModal = document.querySelector('.close-modal');
  
  function openQuickView(productId) {
      const product = products.find(p => p.id === productId);
      
      if (product) {
          const discountPercent = Math.round(((product.price - product.discountPrice) / product.price) * 100);
          
          modalContent.innerHTML = `
              <div class="modal-product">
                  <div class="modal-product-image">
                      <img src="${product.image}" alt="${product.name}">
                  </div>
                  <div class="modal-product-details">
                      <h2>${product.name}</h2>
                      <div class="modal-product-price">
                          <span class="original-price">${product.price} RS</span>
                          <span class="discounted-price">${product.discountPrice} RS</span>
                          <span class="discount-percent">${discountPercent}% OFF</span>
                      </div>
                      <p class="modal-product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <div class="modal-product-actions">
                          <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                      </div>
                  </div>
              </div>
          `;
          
          modal.style.display = 'block';
      }
  }
  
  closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  // 7. Shopping Cart Functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function updateCartCounter() {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      document.querySelector('.cart-counter').textContent = totalItems;
  }
  
  function addToCart(productId, quantity = 1) {
      const product = products.find(p => p.id === productId);
      
      if (product) {
          const existingItem = cart.find(item => item.id === productId);
          
          if (existingItem) {
              existingItem.quantity += quantity;
          } else {
              cart.push({
                  id: product.id,
                  name: product.name,
                  price: product.discountPrice,
                  image: product.image,
                  quantity: quantity
              });
          }
          
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCounter();
          showNotification(`${product.name} added to cart`);
      }
  }
  
  // 8. Cart Sidebar
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartItemsContainer = document.getElementById('cart-items');
  const closeSidebar = document.querySelector('.close-sidebar');
  const cartIcon = document.getElementById('cart');
  
  function openCartSidebar() {
      renderCartItems();
      cartSidebar.classList.add('show');
  }
  
  function closeCartSidebar() {
      cartSidebar.classList.remove('show');
  }
  
  function renderCartItems() {
      cartItemsContainer.innerHTML = '';
      
      if (cart.length === 0) {
          cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
          document.getElementById('cart-total-amount').textContent = '0 RS';
          return;
      }
      
      let total = 0;
      
      cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
          
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
              <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-item-details">
                  <h4 class="cart-item-title">${item.name}</h4>
                  <p class="cart-item-price">${item.price} RS</p>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn minus" data-id="${item.id}">-</button>
                      <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                      <button class="quantity-btn plus" data-id="${item.id}">+</button>
                  </div>
                  <p class="remove-item" data-id="${item.id}">Remove</p>
              </div>
          `;
          
          cartItemsContainer.appendChild(cartItem);
      });
      
      document.getElementById('cart-total-amount').textContent = `${total} RS`;
      
      // Add event listeners to quantity buttons
      document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
          btn.addEventListener('click', function() {
              const id = parseInt(this.dataset.id);
              updateCartItemQuantity(id, -1);
          });
      });
      
      document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
          btn.addEventListener('click', function() {
              const id = parseInt(this.dataset.id);
              updateCartItemQuantity(id, 1);
          });
      });
      
      document.querySelectorAll('.remove-item').forEach(btn => {
          btn.addEventListener('click', function() {
              const id = parseInt(this.dataset.id);
              removeFromCart(id);
          });
      });
  }
  
  function updateCartItemQuantity(productId, change) {
      const item = cart.find(item => item.id === productId);
      
      if (item) {
          item.quantity += change;
          
          if (item.quantity <= 0) {
              cart = cart.filter(item => item.id !== productId);
          }
          
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCounter();
          renderCartItems();
      }
  }
  
  function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCounter();
      renderCartItems();
      showNotification('Item removed from cart');
  }
  
  cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      openCartSidebar();
  });
  
  closeSidebar.addEventListener('click', closeCartSidebar);
  
  // 9. Checkout Button
  document.getElementById('checkout-btn').addEventListener('click', function() {
      if (cart.length === 0) {
          alert('Your cart is empty');
          return;
      }
      
      alert('Proceeding to checkout');
      // In a real app, redirect to checkout page
  });

  // 10. Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  
  newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input').value;
      
      if (!email.includes('@') || !email.includes('.')) {
          showNotification('Please enter a valid email address', 'error');
          return;
      }
      
      // In a real app, send to server
      showNotification('Thank you for subscribing!', 'success');
      this.reset();
  });

  // 11. Notification System
  function showNotification(message, type = 'success') {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
          notification.classList.add('fade-out');
          setTimeout(() => {
              notification.remove();
          }, 300);
      }, 3000);
  }

  // 1. Product Quick View Modal
function initQuickView() {
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');
  const quickViewModal = document.createElement('div');
  quickViewModal.id = 'quick-view-modal';
  quickViewModal.innerHTML = `
      <div class="quick-view-content">
          <span class="close-quick-view">&times;</span>
          <div class="quick-view-product"></div>
      </div>
  `;
  document.body.appendChild(quickViewModal);

  quickViewBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productName = productCard.querySelector('h5').textContent;
          const productImage = productCard.querySelector('img').src;
          const originalPrice = productCard.querySelector('.previous').textContent;
          const salePrice = productCard.querySelector('.new').textContent;
          
          document.querySelector('.quick-view-product').innerHTML = `
              <div class="quick-view-image">
                  <img src="${productImage}" alt="${productName}">
              </div>
              <div class="quick-view-details">
                  <h3>${productName}</h3>
                  <div class="quick-view-prices">
                      <span class="original-price">${originalPrice}</span>
                      <span class="sale-price">${salePrice}</span>
                  </div>
                  <button class="add-to-cart-from-quickview">Add to Cart</button>
              </div>
          `;
          
          quickViewModal.style.display = 'block';
      });
  });

  document.querySelector('.close-quick-view').addEventListener('click', () => {
      quickViewModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
          quickViewModal.style.display = 'none';
      }
  });
}

// 2. Add to Cart Functionality
function initAddToCart() {
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCounter = document.createElement('span');
  cartCounter.className = 'cart-counter';
  document.querySelector('#cart').parentNode.appendChild(cartCounter);

  addToCartBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productId = productCard.dataset.id || Date.now();
          const productName = productCard.querySelector('h5').textContent;
          const productPrice = productCard.querySelector('.new').textContent;
          const productImage = productCard.querySelector('img').src;

          // Check if item already in cart
          const existingItem = cartItems.find(item => item.id === productId);
          if (existingItem) {
              existingItem.quantity++;
          } else {
              cartItems.push({
                  id: productId,
                  name: productName,
                  price: productPrice,
                  image: productImage,
                  quantity: 1
              });
          }

          localStorage.setItem('cart', JSON.stringify(cartItems));
          updateCartCounter();
          showToast(`${productName} added to cart`);
      });
  });

  function updateCartCounter() {
      const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
      cartCounter.textContent = totalItems;
  }

  updateCartCounter();
}

// 3. Toast Notifications
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 4. Product Filtering
function initProductFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          const filterValue = this.dataset.filter;
          const productCards = document.querySelectorAll('.product-card');
          
          productCards.forEach(card => {
              if (filterValue === 'all' || card.dataset.category === filterValue) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
          
          // Update active filter button
          filterButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
      });
  });
}

// 5. Price Range Filter
function initPriceFilter() {
  const priceFilter = document.getElementById('price-filter');
  if (!priceFilter) return;
  
  priceFilter.addEventListener('change', function() {
      const value = this.value;
      const productCards = document.querySelectorAll('.product-card');
      
      productCards.forEach(card => {
          const priceText = card.querySelector('.new').textContent;
          const price = parseInt(priceText.replace(/[^0-9]/g, ''));
          
          let showProduct = true;
          
          if (value === '0-2000' && price > 2000) showProduct = false;
          if (value === '2000-5000' && (price <= 2000 || price > 5000)) showProduct = false;
          if (value === '5000+' && price <= 5000) showProduct = false;
          
          card.style.display = showProduct ? 'block' : 'none';
      });
  });
}

// 6. Product Search
function initProductSearch() {
  const searchInput = document.querySelector('#search-input');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const productCards = document.querySelectorAll('.product-card');
      
      productCards.forEach(card => {
          const productName = card.querySelector('h5').textContent.toLowerCase();
          if (productName.includes(searchTerm)) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  });
}

// 7. Wishlist Functionality
function initWishlist() {
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistCounter = document.createElement('span');
  wishlistCounter.className = 'wishlist-counter';
  document.querySelector('#wishlist').parentNode.appendChild(wishlistCounter);

  wishlistButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productId = productCard.dataset.id;
          
          const existingIndex = wishlistItems.findIndex(item => item === productId);
          if (existingIndex >= 0) {
              wishlistItems.splice(existingIndex, 1);
              this.classList.remove('active');
              showToast('Removed from wishlist');
          } else {
              wishlistItems.push(productId);
              this.classList.add('active');
              showToast('Added to wishlist');
          }
          
          localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
          updateWishlistCounter();
      });
  });

  function updateWishlistCounter() {
      wishlistCounter.textContent = wishlistItems.length;
  }

  updateWishlistCounter();
}

// 8. Newsletter Form Validation
function initNewsletterForm() {
  const newsletterForm = document.querySelector('#newsletter-form');
  if (!newsletterForm) return;
  
  newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      if (!email.includes('@') || !email.includes('.')) {
          showToast('Please enter a valid email address');
          return;
      }
      
      // In a real app, you would send this to your server
      showToast('Thank you for subscribing!');
      emailInput.value = '';
  });
}

// 9. Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (!mobileMenuBtn || !nav) return;
  
  mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.textContent = nav.classList.contains('active') ? '✕' : '☰';
  });
}

// 10. Image Zoom on Hover
function initImageZoom() {
  const productImages = document.querySelectorAll('.product-image img');
  
  productImages.forEach(img => {
      img.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.1)';
      });
      
      img.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
      });
  });
}

// 11. Product Rating System
function initProductRatings() {
  const ratingContainers = document.querySelectorAll('.product-rating');
  
  ratingContainers.forEach(container => {
      const stars = container.querySelectorAll('.star');
      let rating = container.dataset.rating || 0;
      
      stars.forEach((star, index) => {
          if (index < rating) {
              star.classList.add('active');
          }
          
          star.addEventListener('click', function() {
              rating = index + 1;
              stars.forEach((s, i) => {
                  if (i < rating) {
                      s.classList.add('active');
                  } else {
                      s.classList.remove('active');
                  }
              });
              
              // In a real app, you would save this rating
              showToast(`Rated ${rating} stars`);
          });
      });
  });
}

// 12. Countdown Timer for Sale
function initCountdownTimer() {
  const countdownContainer = document.createElement('div');
  countdownContainer.className = 'countdown-container';
  countdownContainer.innerHTML = `
      <p>Sale Ends In:</p>
      <div class="countdown">
          <span id="days">00</span>d 
          <span id="hours">00</span>h 
          <span id="minutes">00</span>m 
          <span id="seconds">00</span>s
      </div>
  `;
  document.querySelector('.poster').after(countdownContainer);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7); // Sale ends in 7 days
  
  function updateCountdown() {
      const now = new Date();
      const distance = endDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      
      if (distance < 0) {
          clearInterval(countdownInterval);
          countdownContainer.innerHTML = '<p>Sale Has Ended</p>';
      }
  }
  
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

// 13. Social Media Share Buttons
function initSocialSharing() {
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          const platform = this.dataset.platform;
          const url = encodeURIComponent(window.location.href);
          const title = encodeURIComponent(document.title);
          
          let shareUrl = '';
          
          switch(platform) {
              case 'facebook':
                  shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                  break;
              case 'twitter':
                  shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                  break;
              case 'pinterest':
                  shareUrl = `https://pinterest.com/pin/create/button/?url=${url}`;
                  break;
          }
          
          if (shareUrl) {
              window.open(shareUrl, '_blank', 'width=600,height=400');
          }
      });
  });
}

// 14. Product Comparison Feature
function initProductComparison() {
  const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
  let comparisonProducts = [];
  
  compareCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          const productId = this.dataset.id;
          
          if (this.checked) {
              if (comparisonProducts.length < 3) {
                  comparisonProducts.push(productId);
              } else {
                  this.checked = false;
                  showToast('Maximum 3 products can be compared');
              }
          } else {
              comparisonProducts = comparisonProducts.filter(id => id !== productId);
          }
          
          updateComparisonButton();
      });
  });
  
  function updateComparisonButton() {
      const compareBtn = document.querySelector('#compare-btn');
      if (comparisonProducts.length > 1) {
          compareBtn.style.display = 'block';
          compareBtn.textContent = `Compare (${comparisonProducts.length})`;
      } else {
          compareBtn.style.display = 'none';
      }
  }
}

// 15. Recently Viewed Products
function trackRecentlyViewed() {
  const productIds = Array.from(document.querySelectorAll('.product-card')).map(card => card.dataset.id);
  let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  
  productIds.forEach(id => {
      if (!recentlyViewed.includes(id)) {
          recentlyViewed.unshift(id);
          if (recentlyViewed.length > 5) {
              recentlyViewed.pop();
          }
      }
  });
  
  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initQuickView();
  initAddToCart();
  initProductFilters();
  initPriceFilter();
  initProductSearch();
  initWishlist();
  initNewsletterForm();
  initMobileMenu();
  initImageZoom();
  initProductRatings();
  initCountdownTimer();
  initSocialSharing();
  initProductComparison();
  trackRecentlyViewed();
});