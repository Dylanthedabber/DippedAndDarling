// TODO: replace with your actual keys from emailjs.com
var EMAILJS_PUBLIC_KEY  = '1ri6tUtEiS3wAGSKE';
var EMAILJS_SERVICE_ID  = 'service_5fk7o5e';
var EMAILJS_TEMPLATE_ID = 'template_9im92xu';
emailjs.init(EMAILJS_PUBLIC_KEY);

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

      if (prevMouse.speed >= MIN_SPEED && speed < prevMouse.speed * DECEL_THRESHOLD && (now - lastTrailSpawn > TRAIL_COOLDOWN)) {
        spawnDirectionalParticles(x, y, prevMouse.vx, prevMouse.vy, 1);
        lastTrailSpawn = now;
      }

      prevMouse = { x: x, y: y, time: now, vx: dx / dt, vy: dy / dt, speed: speed };
    }
  } else {
    prevMouse = { x: x, y: y, time: now, vx: 0, vy: 0, speed: 0 };
  }
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

var lightboxZoomLens = document.getElementById('lightboxZoomLens');
var lightboxMenuZoom = document.getElementById('lightboxMenuZoom');

function closeLightbox() {
  lightbox.classList.remove('open', 'menu-open');
  document.body.style.overflow = '';
  document.getElementById('lightboxPrev').style.display = '';
  document.getElementById('lightboxNext').style.display = '';
  if (lightboxZoomLens) lightboxZoomLens.style.display = 'none';
  if (lightboxMenuZoom) lightboxMenuZoom.style.display = 'none';
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
    void lightboxContent.offsetWidth;
    lightboxContent.classList.add(direction === 'prev' ? 'slide-left' : 'slide-right');
  }
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) closeLightbox();
});
var MINI_GALLERY_COUNT = 6;

document.getElementById('lightboxPrev').addEventListener('click', function() {
  lightboxIndex = (lightboxIndex - 1 + MINI_GALLERY_COUNT) % MINI_GALLERY_COUNT;
  updateLightbox('prev');
});
document.getElementById('lightboxNext').addEventListener('click', function() {
  lightboxIndex = (lightboxIndex + 1) % MINI_GALLERY_COUNT;
  updateLightbox('next');
});
document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') {
    lightboxIndex = (lightboxIndex - 1 + MINI_GALLERY_COUNT) % MINI_GALLERY_COUNT;
    updateLightbox('prev');
  }
  if (e.key === 'ArrowRight') {
    lightboxIndex = (lightboxIndex + 1) % MINI_GALLERY_COUNT;
    updateLightbox('next');
  }
});

// === Menu image lightbox ===
var menuImgWrap = document.querySelector('.menu-image-wrap');
if (menuImgWrap) {
  menuImgWrap.addEventListener('click', function() {
    var img = this.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = '';
    lightboxDesc.textContent = '';
    lightboxContent.classList.remove('slide-left', 'slide-right');
    document.getElementById('lightboxPrev').style.display = 'none';
    document.getElementById('lightboxNext').style.display = 'none';
    lightbox.classList.add('open', 'menu-open');
    document.body.style.overflow = 'hidden';
  });
}

// === Specials image lightbox (same behavior as menu image) ===
var specialsImg = document.querySelector('.specials-image');
if (specialsImg) {
  specialsImg.addEventListener('click', function() {
    var img = this.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxTitle.textContent = '';
    lightboxDesc.textContent = '';
    lightboxContent.classList.remove('slide-left', 'slide-right');
    document.getElementById('lightboxPrev').style.display = 'none';
    document.getElementById('lightboxNext').style.display = 'none';
    lightbox.classList.add('open', 'menu-open');
    document.body.style.overflow = 'hidden';
  });
}

// === Amazon-style zoom inside menu lightbox ===
var lightboxImgWrap = document.getElementById('lightboxImgWrap');
if (lightboxImgWrap && lightboxZoomLens && lightboxMenuZoom) {
  var LIGHTBOX_ZOOM = 2.5;
  lightboxImg.addEventListener('mouseenter', function() {
    if (!lightbox.classList.contains('menu-open')) return;
    lightboxZoomLens.style.display = 'block';
    lightboxMenuZoom.style.display = 'block';
  });
  lightboxImg.addEventListener('mouseleave', function() {
    lightboxZoomLens.style.display = 'none';
    lightboxMenuZoom.style.display = 'none';
  });
  lightboxImg.addEventListener('mousemove', function(e) {
    if (!lightbox.classList.contains('menu-open')) return;
    var imgRect = lightboxImg.getBoundingClientRect();
    var wrapRect = lightboxImgWrap.getBoundingClientRect();
    var x = e.clientX - imgRect.left;
    var y = e.clientY - imgRect.top;
    var LENS_REDUCTION_FACTOR = 1.2; // Adjust this value to make the lens smaller or larger
    var effectiveLensZoom = LIGHTBOX_ZOOM * LENS_REDUCTION_FACTOR;
    var lensSize = Math.min(imgRect.width, imgRect.height) / effectiveLensZoom;
    lightboxZoomLens.style.width = lensSize + 'px';
    lightboxZoomLens.style.height = lensSize + 'px';
    var lensW = lightboxZoomLens.offsetWidth;
    var lensH = lightboxZoomLens.offsetHeight;
    var lensX = Math.max(0, Math.min(x - lensW / 2, imgRect.width - lensW));
    var lensY = Math.max(0, Math.min(y - lensH / 2, imgRect.height - lensH));
    var offsetLeft = imgRect.left - wrapRect.left;
    var offsetTop = imgRect.top - wrapRect.top;
    lightboxZoomLens.style.left = (offsetLeft + lensX) + 'px';
    lightboxZoomLens.style.top = (offsetTop + lensY) + 'px';
    lightboxMenuZoom.style.backgroundImage = 'url(' + lightboxImg.src + ')';
    lightboxMenuZoom.style.backgroundSize = (imgRect.width * LIGHTBOX_ZOOM) + 'px ' + (imgRect.height * LIGHTBOX_ZOOM) + 'px';
    lightboxMenuZoom.style.backgroundPosition = '-' + (lensX * LIGHTBOX_ZOOM) + 'px -' + (lensY * LIGHTBOX_ZOOM) + 'px';
  });
}

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
  if (!grid) return; // menu grid removed from page

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
        var valEl = ctrl.querySelector('.menu-qty-value');
        valEl.textContent = next;
        ctrl.classList.toggle('has-items', next > 0);
        valEl.classList.add('bump');
        setTimeout(function() { valEl.classList.remove('bump'); }, 200);
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

      deliveryToggle.querySelectorAll('.delivery-toggle-btn').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      deliveryMethod = btn.dataset.method;

      btn.classList.remove('jiggle');
      void btn.offsetWidth;
      btn.classList.add('jiggle');

      if (deliveryMethod === 'delivery') {
        addressGroup.classList.add('open');
      } else {
        addressGroup.classList.remove('open');
        var addressInput = document.getElementById('address');
        var addressError = document.getElementById('addressError');
        if (addressInput) addressInput.classList.remove('error');
        if (addressError) {
          addressError.style.display = 'none';
          addressError.textContent = '';
        }
      }
      saveFormData();
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
        '<span class="qty-value" id="qty' + i + '">0</span>' +
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
    var popClass = dir > 0 ? 'pop' : 'shrink';
    itemEl.classList.add(popClass);
    qtyEl.classList.add('bump');
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
    var cartErr = document.getElementById('cartError');
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
  summaryEl.classList.remove('jiggle');
  void summaryEl.offsetWidth;
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

function saveFormData() {
  var formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    eventDate: document.getElementById('eventDate').value,
    customDetails: document.getElementById('customDetails').value.trim(),
    address: document.getElementById('address').value.trim(),
    deliveryMethod: document.querySelector('.delivery-toggle-btn.active').dataset.method,
    cart: cart
  };
  localStorage.setItem('orderForm', JSON.stringify(formData));
}

function loadFormData() {
  var savedData = localStorage.getItem('orderForm');
  if (savedData) {
    var formData = JSON.parse(savedData);
    document.getElementById('name').value = formData.name || '';
    document.getElementById('email').value = formData.email || '';
    document.getElementById('eventDate').value = formData.eventDate || '';
    document.getElementById('customDetails').value = formData.customDetails || '';
    document.getElementById('address').value = formData.address || '';

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
        var addressInput = document.getElementById('address');
        var addressError = document.getElementById('addressError');
        if (addressInput) addressInput.classList.remove('error');
        if (addressError) {
          addressError.style.display = 'none';
          addressError.textContent = '';
        }
      }
      saveFormData();
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
    if (this.id === 'customDetails' && this.value.trim().length > 0) {
      document.getElementById('orderItems').classList.remove('error');
      document.getElementById('cartError').style.display = 'none';
    }
    saveFormData();
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

function handleFormSubmit(e) {
  e.preventDefault();

  var valid = true;
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var eventDate = document.getElementById('eventDate').value;
  var customDetails = document.getElementById('customDetails').value.trim();

  var deliveryMethod = document.querySelector('.delivery-toggle-btn.active').dataset.method;
  var address = '';
  if (deliveryMethod === 'delivery') {
    address = document.getElementById('address').value.trim();
  }

  if (!name) { showError('name', 'Name is required'); valid = false; }
  if (!email) { showError('email', 'Email is required'); valid = false; }
  if (!eventDate) { showError('eventDate', 'Event date is required'); valid = false; }
  if (deliveryMethod === 'delivery' && !address) { showError('address', 'Delivery address is required'); valid = false; }

  var cartKeys = Object.keys(cart);
  if (cartKeys.length === 0 && !customDetails) {
    var cartErr = document.getElementById('cartError');
    var orderItemsContainer = document.getElementById('orderItems');
    cartErr.textContent = 'Please select at least one item or describe your custom order below';
    cartErr.style.display = 'block';
    orderItemsContainer.classList.add('error');
    showToast('Order Selection Required', 'Please select at least one item or describe your custom order.', true);
    valid = false;
  }

  if (!valid) {
    showToast('Please check your form', 'Some required fields are missing or invalid.', true);
    return;
  }

  // Build order summary
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

  var submitBtn = document.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  var templateParams = {
    name: name,
    email: email,
    treats: orderLines || '(Custom order - see details)',
    delivery: deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery',
    address: address || 'N/A',
    date: eventDate,
    details: customDetails || 'None'
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams).then(function() {
    showToast('Order Sent!', 'Thank you! We\'ll be in touch soon.', false);
    document.getElementById('orderForm').reset();
    cart = {};
    renderOrderItems();
    updateOrderSummary();
    localStorage.removeItem('orderForm');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Order Request';
  }, function(error) {
    console.error('EmailJS error:', error);
    showToast('Send Failed', 'Something went wrong. Please call or text us directly at (940) 597-8453.', true);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Order Request';
  });
}
