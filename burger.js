document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burger-btn');
    const burgerNav = document.getElementById('burger-nav');
    const burgerOverlay = document.getElementById('burger-overlay');
    const burgerClose = document.getElementById('burger-close');
    let isMenuOpen = false;
    
    function openMenu() {
        burgerNav.classList.add('active');
        burgerOverlay.classList.add('active');
        burgerBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
        isMenuOpen = true;
    }

    function closeMenu() {
        burgerNav.classList.remove('active');
        burgerOverlay.classList.remove('active');
        burgerBtn.classList.remove('active');
        document.body.style.overflow = '';
        isMenuOpen = false;
    }
    
    burgerBtn.addEventListener('click', function() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    burgerClose.addEventListener('click', closeMenu);
    
    burgerOverlay.addEventListener('click', closeMenu);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    document.querySelectorAll('.burger-nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (this.getAttribute('href') !== '#') {
                closeMenu();
            }
        });
    });
});