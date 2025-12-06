// burger.js
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burger-btn');
    const burgerNav = document.getElementById('burger-nav');
    const burgerOverlay = document.getElementById('burger-overlay');
    const burgerClose = document.getElementById('burger-close');
    
    // Переменная для отслеживания состояния
    let isMenuOpen = false;
    
    // Функция открытия меню
    function openMenu() {
        burgerNav.classList.add('active');
        burgerOverlay.classList.add('active');
        burgerBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
        isMenuOpen = true;
    }
    
    // Функция закрытия меню
    function closeMenu() {
        burgerNav.classList.remove('active');
        burgerOverlay.classList.remove('active');
        burgerBtn.classList.remove('active');
        document.body.style.overflow = '';
        isMenuOpen = false;
    }
    
    // Переключение меню по клику на бургер
    burgerBtn.addEventListener('click', function() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Закрытие меню через кнопку закрытия
    burgerClose.addEventListener('click', closeMenu);
    
    // Закрытие меню через клик по оверлею
    burgerOverlay.addEventListener('click', closeMenu);
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Закрытие меню при клике на ссылку (кроме якорных)
    document.querySelectorAll('.burger-nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (this.getAttribute('href') !== '#') {
                closeMenu();
            }
        });
    });
});