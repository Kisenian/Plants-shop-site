document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const userInput = document.getElementById('user');
    const pwInput = document.getElementById('pw');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (userInput.value.trim() && pwInput.value.trim()) {
            // Можно тут поставить флаг успешного входа, если хочешь
            // localStorage.setItem('isLoggedIn', 'true');
            window.location.href = "index.html"; // заменяй на своё имя главной страницы
        } else {
            // Покажем "мигающую" подсветку, либо alert:
            userInput.classList.add('login-error');
            pwInput.classList.add('login-error');
            setTimeout(() => {
                userInput.classList.remove('login-error');
                pwInput.classList.remove('login-error');
            }, 1000);
            // или alert('Введите имя и пароль!');
        }
    });
});
