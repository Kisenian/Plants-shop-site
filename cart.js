// cart.js
const goods = [
  { id: 1, name: 'Сирень', price: 450, img: 'https://img.icons8.com/color/240/000000/potted-plant.png' },
  { id: 2, name: 'Фикус', price: 530, img: 'https://img.icons8.com/color/240/000000/plant-under-sun.png' },
  { id: 3, name: 'Роза', price: 660, img: 'https://img.icons8.com/color/240/000000/red-rose.png' },
  { id: 4, name: 'Сансевиерия', price: 520, img: 'https://img.icons8.com/color/240/000000/potted-plant--v2.png' },
  { id: 5, name: 'Орхидея', price: 940, img: 'https://img.icons8.com/color/240/000000/orchid.png' },
  { id: 6, name: 'Лаванда', price: 760, img: 'https://img.icons8.com/color/240/000000/lavender.png' }
]

let cart = [];

function loadCart() { 
  cart = JSON.parse(localStorage.getItem('cart') || '[]'); 
}

function saveCart() { 
  localStorage.setItem('cart', JSON.stringify(cart)); 
}

function updateQuantity(itemId, change) {
  loadCart();
  const item = cart.find(i => i.id === itemId);
  
  if (item) {
    if (change === -1 && item.qty === 1) {
      if (confirm('Удалить товар?')) {
        cart = cart.filter(i => i.id !== itemId);
      }
    } else {
      item.qty += change;
    }
    saveCart();
    renderCart();
    refreshSummary();
  }
}

function removeItem(itemId) {
  loadCart();
  cart = cart.filter(i => i.id !== itemId);
  saveCart();
  renderCart();
  refreshSummary();
}

function renderCart() {
  loadCart();
  const tbody = document.getElementById('cart-table-body');
  tbody.innerHTML = "";

  cart.forEach(item => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="cart-row-td">
        <div style="display:flex; align-items:center;">
          <div class="cart-thumb"><img src="${item.img}" alt=""></div>
          <span class="item-name">${item.name}</span>
        </div>
      </td>
      <td class="cart-row-td">
        <div class="qty-box">
          <button class="qty-btn minus" data-id="${item.id}">–</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn plus" data-id="${item.id}">+</button>
        </div>
      </td>
      <td class="cart-row-td">
        <span class="price-box">${item.price * item.qty} ₽</span>
        <button class="del-btn" data-id="${item.id}" title="Удалить">🗑</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Добавляем обработчики после создания всех элементов
  document.querySelectorAll('.minus').forEach(btn => {
    btn.onclick = (e) => {
      const itemId = parseInt(e.target.getAttribute('data-id'));
      updateQuantity(itemId, -1);
    }
  });

  document.querySelectorAll('.plus').forEach(btn => {
    btn.onclick = (e) => {
      const itemId = parseInt(e.target.getAttribute('data-id'));
      updateQuantity(itemId, 1);
    }
  });

  document.querySelectorAll('.del-btn').forEach(btn => {
    btn.onclick = (e) => {
      const itemId = parseInt(e.target.getAttribute('data-id'));
      removeItem(itemId);
    }
  });
}

function refreshSummary() {
  loadCart();
  let sum = cart.reduce((s, i) => s + i.qty * i.price, 0);
  let promo = document.getElementById('promo-input').value.trim();
  let discount = (promo === 'промо') ? Math.round(sum * 0.2) : 0;
  
  let deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo') || '{}');
  let deliveryRaw = deliveryInfo.cost || "0 ₽";
  let delivery = typeof deliveryRaw === "string" ? parseInt(deliveryRaw.replace(/[^\d]/g, "")) || 0 : 0;

  let total = Math.max(sum - discount + delivery, 0);

  document.getElementById('summary-sum').textContent = sum + ' ₽';
  document.getElementById('summary-discount').textContent = discount ? ('—' + discount + ' ₽') : '0 ₽';
  document.getElementById('summary-delivery').textContent = delivery + ' ₽';
  document.getElementById('summary-total').textContent = total + ' ₽';
}


// Инициализация
document.getElementById('promo-input').oninput = refreshSummary;
document.getElementById('agreement').onchange = function() {
  let btn = document.getElementById('pay-btn');
  btn.disabled = !this.checked;
  btn.classList.toggle('active', this.checked);
}
document.getElementById('pay-btn').onclick = function() {
  alert('Оплата произведена!');
  cart = [];
  saveCart();
  renderCart();
  refreshSummary();
}

renderCart();
refreshSummary();