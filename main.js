const goods = [
  { id: 1, name: 'Тюльпан', price: 450, img: 'tulpan.png' },
  { id: 2, name: 'Фикус', price: 530, img: 'fikus.png' },
  { id: 3, name: 'Роза', price: 660, img: 'rose.png' },
  { id: 4, name: 'Сансевиерия', price: 520, img: 'sansevieria.png' },
  { id: 5, name: 'Орхидея', price: 940, img: 'orhidea.png' },
  { id: 6, name: 'Фиалка', price: 760, img: 'fialca.png' }
];

function getSlidesToShow() {
    if (window.matchMedia("(min-width: 920px) and (orientation: landscape)").matches) {
        return 3;
  }
    else if (window.matchMedia("(min-width: 730px) and (orientation: landscape)").matches) {
        return 2;
    }
    return 1;
}

let start = 0;
let cart = [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem('cart') || '[]');
}

function addToCart(id) {
  loadCart();
  const item = goods.find(g => g.id === id);
  let found = cart.find(i => i.id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart();
  updateCartBadge();
}

function updateCartBadge() {
  loadCart();
  let cnt = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = cnt;
}

function renderCards() {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
  
  const SLIDE = getSlidesToShow();
  let onScreen = goods.slice(start, start + SLIDE);
  
  onScreen.forEach(item => {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="card-footer">
        <h2>${item.name}</h2>
        <button class="btn-add">В корзину</button>
      </div>
    `;

    let btn = card.querySelector('.btn-add');
    btn.onclick = function () {
      addToCart(item.id);
      btn.classList.add('flash');
      setTimeout(() => btn.classList.remove('flash'), 300);
    }
    cards.append(card);
  });
  
  document.getElementById('prev').disabled = (start === 0);
  document.getElementById('next').disabled = (start + SLIDE >= goods.length);
}

function handleOrientationChange() {
    start = 0;
    renderCards();
}

document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  updateCartBadge();
  renderCards();

  document.getElementById('prev').onclick = () => {
    const SLIDE = getSlidesToShow();
    start = Math.max(0, start - SLIDE);
    renderCards();
  }
  
  document.getElementById('next').onclick = () => {
    const SLIDE = getSlidesToShow();
    start = Math.min(goods.length - SLIDE, start + SLIDE);
    renderCards();
  }
  
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', handleOrientationChange);
});