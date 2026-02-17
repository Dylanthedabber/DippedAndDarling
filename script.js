// === Particle burst on click ===
var burstEmojis = ['\uD83C\uDF53', '\uD83C\uDF6B', '\uD83C\uDF70', '\uD83C\uDF69', '\uD83D\uDC96', '\uD83C\uDF52'];
function spawnBurst(x, y, count) {
  for (var i = 0; i < count; i++) {
    var el = document.createElement('span');
    el.className = 'particle-burst';
    el.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
    var angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5);
    var dist = 40 + Math.random() * 60;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--dx', (Math.cos(angle) * dist) + 'px');
    el.style.setProperty('--dy', (Math.sin(angle) * dist) + 'px');
    el.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
    el.style.fontSize = (0.7 + Math.random() * 0.8) + 'rem';
    document.body.appendChild(el);
    el.addEventListener('animationend', function() { this.remove(); });
  }
}

// Global variables for mouse velocity tracking
var prevMouse = null; // {x, y, time, vx, vy, speed}
var lastTrailSpawn = 0;
var TRAIL_COOLDOWN = 150; // ms between directional bursts
var DECEL_THRESHOLD = 0.3; // speed drop ratio (prev vs current) to trigger
var MIN_SPEED = 0.5; // minimum prev speed (px/ms) to care about
var PARTICLE_SPREAD = 40; // degrees of cone spread

// Function to spawn particles based on mouse direction
function spawnDirectionalParticles(x, y, baseDx, baseDy, count) {
  var dist = 50 + Math.random() * 40;
  for (var i = 0; i < count; i++) {
    var el = document.createElement('span');
    el.className = 'particle-burst';
    el.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];

    var spreadAngle = (Math.random() - 0.5) * (PARTICLE_SPREAD * Math.PI / 180);
    var baseAngle = Math.atan2(baseDy, baseDx);
    var angle = baseAngle + spreadAngle;
    var d = dist + Math.random() * 30;

    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--dx', (Math.cos(angle) * d) + 'px');
    el.style.setProperty('--dy', (Math.sin(angle) * d) + 'px');
    el.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
    el.style.fontSize = (0.7 + Math.random() * 0.8) + 'rem';
    document.body.appendChild(el);
    el.addEventListener('animationend', function() { this.remove(); });
  }
}


// Global click particles — small burst on any click, bigger on buttons
document.addEventListener('click', function(e) {
  var isQty = e.target.closest('.qty-btn');
  if (isQty) return; // qty buttons have their own burst
  var isButton = e.target.closest('button, a, .submit-btn, .treat-card, .specials-image');
  var count = isButton ? 5 : 2;
  spawnBurst(e.clientX, e.clientY, count);
});

document.addEventListener('mousemove', function(e) {
  var now = Date.now();
  var x = e.clientX;
  var y = e.clientY;

  if (prevMouse) {
    var dt = now - prevMouse.time;
    if (dt > 0) {
      var dx = x - prevMouse.x;
      var dy = y - prevMouse.y;
      var speed = Math.sqrt(dx * dx + dy * dy) / dt; // px/ms

      // Deceleration detection: previous speed was high, current speed dropped sharply
      if (prevMouse.speed >= MIN_SPEED && speed < prevMouse.speed * DECEL_THRESHOLD && (now - lastTrailSpawn > TRAIL_COOLDOWN)) {
        // Shoot particles in the direction mouse WAS traveling (previous velocity)
        spawnDirectionalParticles(x, y, prevMouse.vx, prevMouse.vy, 1);
        lastTrailSpawn = now;
      }

      prevMouse = { x: x, y: y, time: now, vx: dx / dt, vy: dy / dt, speed: speed };
    }
  } else {
    prevMouse = { x: x, y: y, time: now, vx: 0, vy: 0, speed: 0 };
  }
});


// === Gallery carousel ===
var ITEMS_PER_PAGE = 6;
var galleryPage = 0;
var galleryAnimating = false;

function totalGalleryPages() {
  return Math.ceil(galleryImages.length / ITEMS_PER_PAGE);
}

function renderGalleryPage(page, direction) {
  var grid = document.getElementById('galleryGrid');
  var prevBtn = document.getElementById('galleryPrev');
  var nextBtn = document.getElementById('galleryNext');
  var dotsContainer = document.getElementById('galleryDots');
  var pages = totalGalleryPages();
  var hasNav = pages > 1;

  // Show/hide nav
  prevBtn.classList.toggle('hidden', !hasNav);
  nextBtn.classList.toggle('hidden', !hasNav);
  dotsContainer.classList.toggle('hidden', !hasNav);

  // Build dots
  if (hasNav) {
    dotsContainer.innerHTML = '';
    for (var d = 0; d < pages; d++) {
      var dot = document.createElement('button');
      dot.className = 'gallery-dot' + (d === page ? ' active' : '');
      dot.setAttribute('aria-label', 'Page ' + (d + 1));
      dot.dataset.page = d;
      dot.addEventListener('click', function() {
        var target = parseInt(this.dataset.page);
        if (target !== galleryPage && !galleryAnimating) {
          var dir = target > galleryPage ? 'next' : 'prev';
          galleryPage = target;
          renderGalleryPage(galleryPage, dir);
        }
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Animate out existing cards
  var existingCards = grid.querySelectorAll('.treat-card');
  if (existingCards.length > 0 && direction) {
    galleryAnimating = true;
    existingCards.forEach(function(card) {
      card.classList.add('card-exit');
    });
    setTimeout(function() {
      buildCards(grid, page);
      galleryAnimating = false;
    }, 300);
  } else {
    buildCards(grid, page);
  }
}

var galleryFirstRender = true;

function buildCards(grid, page) {
  grid.innerHTML = '';
  var start = page * ITEMS_PER_PAGE;
  var end = Math.min(start + ITEMS_PER_PAGE, galleryImages.length);
  for (var i = start; i < end; i++) {
    var item = galleryImages[i];
    var delay = (i - start) + 1;
    var card = document.createElement('div');
    // Skip animation on first load to prevent flicker
    if (galleryFirstRender) {
      card.className = 'treat-card';
    } else {
      card.className = 'treat-card card-enter';
      card.style.animationDelay = (delay * 0.08) + 's';
    }
    card.innerHTML =
      '<div class="img-wrapper"><img src="' + item.src + '" alt="' + item.title + '" loading="lazy"></div>' +
      '<div class="card-overlay"><h3>' + item.title + '</h3><p>' + item.desc + '</p></div>';
    card.dataset.index = i;
    card.addEventListener('click', function() {
      openLightbox(parseInt(this.dataset.index));
    });
    grid.appendChild(card);
  }
  galleryFirstRender = false;
}

// Nav button listeners
document.getElementById('galleryPrev').addEventListener('click', function() {
  if (galleryAnimating) return;
  galleryPage = (galleryPage - 1 + totalGalleryPages()) % totalGalleryPages();
  renderGalleryPage(galleryPage, 'prev');
});
document.getElementById('galleryNext').addEventListener('click', function() {
  if (galleryAnimating) return;
  galleryPage = (galleryPage + 1) % totalGalleryPages();
  renderGalleryPage(galleryPage, 'next');
});

// Initial render — fade in after cards are built
renderGalleryPage(0, null);
var galleryGrid = document.getElementById('galleryGrid');
// Wait for images to start loading, then fade in
requestAnimationFrame(function() {
  galleryGrid.classList.add('loaded');
});

// === Lightbox ===
var lightboxIndex = 0;
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
var lightboxTitle = document.getElementById('lightboxTitle');
var lightboxDesc = document.getElementById('lightboxDesc');

function openLightbox(index) {
  lightboxIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

var lightboxContent = document.querySelector('.lightbox-content');

function updateLightbox(direction) {
  var item = galleryImages[lightboxIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.desc;
  if (direction) {
    lightboxContent.classList.remove('slide-left', 'slide-right');
    // Force reflow to restart animation
    void lightboxContent.offsetWidth;
    lightboxContent.classList.add(direction === 'prev' ? 'slide-left' : 'slide-right');
  }
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) closeLightbox();
});
document.getElementById('lightboxPrev').addEventListener('click', function() {
  lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightbox('prev');
});
document.getElementById('lightboxNext').addEventListener('click', function() {
  lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
  updateLightbox('next');
});
document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') {
    lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox('prev');
  }
  if (e.key === 'ArrowRight') {
    lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
    updateLightbox('next');
  }
});

// === Specials image lightbox ===
document.querySelector('.specials-image').addEventListener('click', function() {
  var img = this.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxTitle.textContent = "Valentine's Day Specials";
  lightboxDesc.textContent = 'Full menu with pricing details';
  lightboxContent.classList.remove('slide-left', 'slide-right');
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Hide nav arrows for single image
  document.getElementById('lightboxPrev').style.display = 'none';
  document.getElementById('lightboxNext').style.display = 'none';
});

var origCloseLightbox = closeLightbox;
closeLightbox = function() {
  origCloseLightbox();
  document.getElementById('lightboxPrev').style.display = '';
  document.getElementById('lightboxNext').style.display = '';
};

// === Header scroll effect ===
window.addEventListener('scroll', function() {
  var header = document.getElementById('siteHeader');
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// === Mobile menu ===
function toggleMobileMenu() {
  var menu = document.getElementById('mobileMenu');
  var menuIcon = document.getElementById('menuIcon');
  var closeIcon = document.getElementById('closeIcon');
  var isOpen = menu.classList.toggle('open');
  menuIcon.style.display = isOpen ? 'none' : 'block';
  closeIcon.style.display = isOpen ? 'block' : 'none';
}
function closeMobileMenu() {
  var menu = document.getElementById('mobileMenu');
  var menuIcon = document.getElementById('menuIcon');
  var closeIcon = document.getElementById('closeIcon');
  menu.classList.remove('open');
  menuIcon.style.display = 'block';
  closeIcon.style.display = 'none';
}

// === Scroll-triggered reveal animations ===
var revealElements = document.querySelectorAll('.reveal');
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(function(el) {
  observer.observe(el);
});

// === Menu renderer (reads menuData from menu.js) ===
(function() {
  var grid = document.getElementById('menuGrid');
  menuData.forEach(function(cat, i) {
    var card = document.createElement('div');
    card.className = 'menu-card reveal delay-' + ((i % 6) + 1);
    var html = '<h3>' + cat.name + '</h3>';
    cat.items.forEach(function(item) {
      var hasPrice = item.price && item.price.charAt(0) === '$';
      html += '<div class="menu-item">' +
        '<span class="menu-item-name">' + item.name + '</span>' +
        '<span class="menu-item-price">' + item.price + '</span>' +
        (hasPrice ? '<div class="menu-qty-controls" data-item="' + item.name.replace(/"/g, '&quot;') + '">' +
          '<button type="button" class="menu-qty-btn minus" data-dir="-1">−</button>' +
          '<span class="menu-qty-value">0</span>' +
          '<button type="button" class="menu-qty-btn plus" data-dir="1">+</button>' +
        '</div>' : '') +
        '</div>';
    });
    card.innerHTML = html;
    grid.appendChild(card);
  });
  // Sync menu qty controls with cart quantities
  window.syncMenuButtons = function() {
    grid.querySelectorAll('.menu-qty-controls').forEach(function(ctrl) {
      var itemName = ctrl.dataset.item;
      for (var j = 0; j < orderItems.length; j++) {
        if (orderItems[j].name === itemName) {
          var qty = cart[j] || 0;
          var valEl = ctrl.querySelector('.menu-qty-value');
          valEl.textContent = qty;
          ctrl.classList.toggle('has-items', qty > 0);
          break;
        }
      }
    });
  };

  // Handle +/- buttons on menu cards
  grid.addEventListener('click', function(e) {
    var btn = e.target.closest('.menu-qty-btn');
    if (!btn) return;
    var ctrl = btn.closest('.menu-qty-controls');
    var itemName = ctrl.dataset.item;
    var dir = parseInt(btn.dataset.dir);
    for (var j = 0; j < orderItems.length; j++) {
      if (orderItems[j].name === itemName) {
        var current = cart[j] || 0;
        var next = Math.max(0, current + dir);
        if (next === 0) {
          delete cart[j];
        } else {
          cart[j] = next;
        }
        // Update menu qty display
        var valEl = ctrl.querySelector('.menu-qty-value');
        valEl.textContent = next;
        ctrl.classList.toggle('has-items', next > 0);
        // Bump animation on value
        valEl.classList.add('bump');
        setTimeout(function() { valEl.classList.remove('bump'); }, 200);
        // Sync order section
        var qtyEl = document.getElementById('qty' + j);
        var itemEl = document.getElementById('orderItem' + j);
        if (qtyEl) qtyEl.textContent = next;
        if (itemEl) {
          itemEl.classList.toggle('active', next > 0);
          itemEl.classList.add(dir > 0 ? 'pop' : 'shrink');
          setTimeout(function() { itemEl.classList.remove('pop'); itemEl.classList.remove('shrink'); }, 200);
        }
        updateOrderSummary();
        saveFormData();
        // Clear cart error
        var cartErr = document.getElementById('cartError');
        if (Object.keys(cart).length > 0 && cartErr) {
          cartErr.style.display = 'none';
          cartErr.textContent = '';
        }
        break;
      }
    }
  });
  // Observe the new cards for scroll animation
  grid.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
})();

// === Cart & Form handling ===
var cart = {};
var orderItems = [];

// Build orderable items from menuData (only items with $ prices)
(function() {
  menuData.forEach(function(cat) {
    cat.items.forEach(function(item) {
      if (item.price && item.price.charAt(0) === '$') {
        orderItems.push({ category: cat.name, name: item.name, price: item.price });
      }
    });
  });
  renderOrderItems();
  loadFormData();
  if (window.syncMenuButtons) syncMenuButtons();
})();

// === Delivery method toggle ===
(function() {
  var deliveryToggle = document.getElementById('deliveryToggle');
  var addressGroup = document.getElementById('addressGroup');
  var deliveryMethod = 'pickup'; // Default

  if (deliveryToggle) {
    deliveryToggle.addEventListener('click', function(e) {
      var btn = e.target.closest('.delivery-toggle-btn');
      if (!btn) return;

      // Remove active from all and add to clicked
      deliveryToggle.querySelectorAll('.delivery-toggle-btn').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      deliveryMethod = btn.dataset.method;

      // Jiggle the active button
      btn.classList.remove('jiggle');
      void btn.offsetWidth;
      btn.classList.add('jiggle');

      if (deliveryMethod === 'delivery') {
        addressGroup.classList.add('open');
      } else {
        addressGroup.classList.remove('open');
        // Clear address error if switching to pickup
        var addressInput = document.getElementById('address');
        var addressError = document.getElementById('addressError');
        if (addressInput) addressInput.classList.remove('error');
        if (addressError) {
          addressError.style.display = 'none';
          addressError.textContent = '';
        }
      }
      saveFormData(); // Save data when delivery method changes
    });
  }
})();

function renderOrderItems() {
  var container = document.getElementById('orderItems');
  container.innerHTML = '';
  orderItems.forEach(function(item, i) {
    var div = document.createElement('div');
    div.className = 'order-item';
    div.id = 'orderItem' + i;
    div.innerHTML =
      '<div class="order-item-info">' +
        '<span class="order-item-name">' + item.name + '</span>' +
        '<span class="order-item-price">' + item.price + '</span>' +
      '</div>' +
      '<div class="qty-controls">' +
        '<button type="button" class="qty-btn" data-idx="' + i + '" data-dir="-1">−</button>' +
        '<span class="qty-value" id="qty' + i + '">0</span>' + // FIX: Removed extra + here
        '<button type="button" class="qty-btn" data-idx="' + i + '" data-dir="1">+</button>' +
      '</div>';
    container.appendChild(div);
  });
  container.addEventListener('click', function(e) {
    var btn = e.target.closest('.qty-btn');
    if (!btn) return;
    var idx = parseInt(btn.dataset.idx);
    var dir = parseInt(btn.dataset.dir);
    var current = cart[idx] || 0;
    var next = Math.max(0, current + dir);
    // Burst particles from button
    if (next !== current) {
      var rect = btn.getBoundingClientRect();
      spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, dir > 0 ? 8 : 4);
    }
    if (next === 0) {
      delete cart[idx];
    } else {
      cart[idx] = next;
    }
    var qtyEl = document.getElementById('qty' + idx);
    var itemEl = document.getElementById('orderItem' + idx);
    qtyEl.textContent = next;
    itemEl.classList.toggle('active', next > 0);
    // Pop animation
    var popClass = dir > 0 ? 'pop' : 'shrink';
    itemEl.classList.add(popClass);
    qtyEl.classList.add('bump');
    // Jiggle the item when it first activates or deactivates
    if ((current === 0 && next > 0) || (current > 0 && next === 0)) {
      itemEl.classList.remove('jiggle');
      void itemEl.offsetWidth;
      itemEl.classList.add('jiggle');
    }
    setTimeout(function() {
      itemEl.classList.remove(popClass);
      qtyEl.classList.remove('bump');
    }, 200);
    updateOrderSummary();
    saveFormData();
    if (window.syncMenuButtons) syncMenuButtons();
    // Clear cart error when items added
    var cartErr = document.getElementById('cartError');
    var orderItemsContainer = document.getElementById('orderItems');
    if (Object.keys(cart).length > 0) {
      cartErr.style.display = 'none';
      cartErr.textContent = '';
    }
  });
}

function updateOrderSummary() {
  var summaryEl = document.getElementById('orderSummary');
  var itemsEl = document.getElementById('orderSummaryItems');
  var totalEl = document.getElementById('orderTotal');
  var keys = Object.keys(cart);

  if (keys.length === 0) {
    summaryEl.classList.add('hidden');
    return;
  }

  summaryEl.classList.remove('hidden');
  // Jiggle the summary on update
  summaryEl.classList.remove('jiggle');
  void summaryEl.offsetWidth; // force reflow
  summaryEl.classList.add('jiggle');
  itemsEl.innerHTML = '';
  var total = 0;

  keys.forEach(function(idx) {
    var item = orderItems[idx];
    var qty = cart[idx];
    var price = parseFloat(item.price.replace('$', ''));
    var lineTotal = price * qty;
    total += lineTotal;

    var row = document.createElement('div');
    row.className = 'summary-item';
    row.innerHTML =
      '<span>' + item.name + ' <span class="summary-item-qty">x' + qty + '</span></span>' +
      '<span>$' + lineTotal.toFixed(0) + '</span>';
    itemsEl.appendChild(row);
  });

  totalEl.textContent = '$' + total.toFixed(0);
}

// Function to save form data to localStorage
function saveFormData() {
  var formData = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    eventDate: document.getElementById('eventDate').value,
    customDetails: document.getElementById('customDetails').value.trim(),
    address: document.getElementById('address').value.trim(),
    deliveryMethod: document.querySelector('.delivery-toggle-btn.active').dataset.method,
    cart: cart // Add cart to formData
  };
  localStorage.setItem('orderForm', JSON.stringify(formData));
}

// Function to load form data from localStorage
function loadFormData() {
  var savedData = localStorage.getItem('orderForm');
  if (savedData) {
    var formData = JSON.parse(savedData);
    document.getElementById('name').value = formData.name || '';
    document.getElementById('phone').value = formData.phone || '';
    document.getElementById('eventDate').value = formData.eventDate || '';
    document.getElementById('customDetails').value = formData.customDetails || '';
    document.getElementById('address').value = formData.address || '';

    // Restore delivery method
    var deliveryToggle = document.getElementById('deliveryToggle');
    var addressGroup = document.getElementById('addressGroup');
  if (deliveryToggle) {
      deliveryToggle.querySelectorAll('.delivery-toggle-btn').forEach(function(btn) {
        if (btn.dataset.method === formData.deliveryMethod) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      if (formData.deliveryMethod === 'delivery') {
        addressGroup.classList.add('open');
      } else {
        addressGroup.classList.remove('open');
        // Clear address error if switching to pickup
        var addressInput = document.getElementById('address');
        var addressError = document.getElementById('addressError');
        if (addressInput) addressInput.classList.remove('error');
        if (addressError) {
          addressError.style.display = 'none';
          addressError.textContent = '';
        }
      }
      saveFormData(); // Save data when delivery method changes
    }
  }
}

// Input error clearing
document.querySelectorAll('#orderForm input, #orderForm textarea').forEach(function(input) {
  input.addEventListener('input', function() {
    this.classList.remove('error');
    var errorEl = document.getElementById(this.name + 'Error');
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
    }
    // If customDetails is being typed, clear the orderItems error
    if (this.id === 'customDetails' && this.value.trim().length > 0) {
      document.getElementById('orderItems').classList.remove('error');
      document.getElementById('cartError').style.display = 'none';
    }
    saveFormData(); // Save data on input change
  });
});

function showError(fieldName, message) {
  var input = document.getElementById(fieldName);
  var errorEl = document.getElementById(fieldName + 'Error');
  if (input) input.classList.add('error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

// Function to format phone number as (XXX) XXX-XXXX
function formatPhoneNumber(value) {
  if (!value) return value;
  var phoneNumber = value.replace(/[^\d]/g, ''); // Remove non-digits
  var phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return '(' + phoneNumber.slice(0, 3) + ') ' + phoneNumber.slice(3);
  }
  return '(' + phoneNumber.slice(0, 3) + ') ' + phoneNumber.slice(3, 6) + '-' + phoneNumber.slice(6, 10);
}

// Attach formatting to phone input
document.getElementById('phone').addEventListener('input', function(e) {
  e.target.value = formatPhoneNumber(e.target.value);
});

// === Toast notifications ===
var toastTimeout;
function showToast(title, desc, isError) {

  var toast = document.getElementById('toast');
  var toastTitle = document.getElementById('toastTitle');
  var toastDesc = document.getElementById('toastDesc');
  toastTitle.textContent = title;
  toastDesc.textContent = desc;
  toast.classList.toggle('destructive', !!isError);
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(function() {
    toast.classList.remove('show');
  }, isError ? 3000 : 5000);
}

// Helper function to copy text to clipboard
function copyToClipboard(text, successMessage, errorMessage) {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // Avoid scrolling to bottom
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Copied to Clipboard!', successMessage, false);
    } catch (err) {
      showToast('Copy Failed', errorMessage, true);
    }
    document.body.removeChild(textArea);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    showToast('Copied to Clipboard!', successMessage, false);
  }, function(err) {
    showToast('Copy Failed', errorMessage, true);
  });
}

// Function to show the order confirmation modal
function showOrderModal(title, message, emailContent) {

  var modal = document.getElementById('orderModal');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  document.getElementById('modalEmailContent').value = emailContent;
  modal.classList.add('show');
  modal.style.display = 'flex'; // Aggressive force display
  document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

// Function to hide the order confirmation modal
function closeOrderModal() {
  var modal = document.getElementById('orderModal');
  modal.classList.remove('show');
  modal.style.display = 'none'; // Aggressive force hide
  document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners for modal buttons
document.getElementById('modalCloseBtn').addEventListener('click', closeOrderModal);

document.getElementById('modalCopyBtn').addEventListener('click', function() {
  var emailContent = document.getElementById('modalEmailContent').value;
  copyToClipboard(emailContent,
                  'Email content copied to clipboard!',
                  'Could not copy email content to clipboard.');
});

function handleFormSubmit(e) {
  e.preventDefault();

  var valid = true;
    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var eventDate = document.getElementById('eventDate').value;
    var customDetails = document.getElementById('customDetails').value.trim();
  
    var deliveryMethod = document.querySelector('.delivery-toggle-btn.active').dataset.method;
    var address = '';
    if (deliveryMethod === 'delivery') {
      address = document.getElementById('address').value.trim();
    }

  if (!name) { showError('name', 'Name is required'); valid = false; }

  if (!phone) { showError('phone', 'Phone number is required'); valid = false; }
  if (deliveryMethod === 'delivery' && !address) { showError('address', 'Delivery address is required'); valid = false; }


  var cartKeys = Object.keys(cart);
  if (cartKeys.length === 0 && !customDetails) {
    var cartErr = document.getElementById('cartError');
    var orderItemsContainer = document.getElementById('orderItems'); // Get the order items container
    cartErr.textContent = 'Please select at least one item or describe your custom order below';
    cartErr.style.display = 'block';
    orderItemsContainer.classList.add('error'); // Add error class
    showToast('Order Selection Required', 'Please select at least one item or describe your custom order.', true);
    valid = false;
  }

  if (valid) {
    // Build order lines from cart
    var orderLines = '';
    var total = 0;
    cartKeys.forEach(function(idx) {
      var item = orderItems[idx];
      var qty = cart[idx];
      var price = parseFloat(item.price.replace('$', ''));
      var lineTotal = price * qty;
      total += lineTotal;
      orderLines += item.name + ' x' + qty + ' - $' + lineTotal.toFixed(0) + '\n';
    });

    var subject = 'New Order Request - ' + name;
    var body = 'New Order Request from Dipped & Darling Website\n\n' +
      'Customer Details:\n----------------\n' +
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Delivery Method: ' + (deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery') + '\n' +
      (deliveryMethod === 'delivery' && address ? 'Delivery Address: ' + address + '\n' : '') +
      '\nOrder Details:\n-------------\n' +
      (orderLines || '(Custom order — see details below)\n') +
      (total > 0 ? 'Estimated Total: $' + total.toFixed(0) + '\n' : '') +
      '\nEvent Date: ' + (eventDate || 'Not specified') + '\n\n' +
      'Additional Details:\n------------------\n' +
      (customDetails || 'None');

    var encodedSubject = encodeURIComponent(subject);
    var encodedBody = encodeURIComponent(body);
    var mailtoUrl = 'mailto:dippedndarling@gmail.com?subject=' + encodedSubject + '&body=' + encodedBody;


    // Always copy to clipboard first
    var combinedContent = 'Subject: ' + subject + '\n\n' + body;
    copyToClipboard(combinedContent,
                    'The email subject and body have been copied to clipboard.',
                    'Could not copy email content to clipboard.');

    // Then attempt to open mailto if URL is not too long, or alert and rely on copy
    if (mailtoUrl.length > 2000) {
      showOrderModal('Order Details Too Long',
                     'The order details are too extensive for direct email. Please use the content below to manually send your email.',
                     combinedContent);
    } else {
      window.location.href = mailtoUrl; // Attempt to open mail client
      showOrderModal('Order Request Prepared!',
                     'Your email client should open shortly. If not, please use the content below to manually send your email.',
                     combinedContent);
    }
  } else {
    showToast('Please check your form', 'Some required fields are missing or invalid.', true);
  }
}