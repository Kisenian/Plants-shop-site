// delivery.js
document.addEventListener('DOMContentLoaded', function() {
    // Данные для адресов доставки
    const deliveryData = {
        '1': { address: 'ул. Тверская, д. 10', cost: '250 ₽', time: '1.5 часа' },
        '2': { address: 'ул. Арбат, д. 25', cost: '300 ₽', time: '2 часа' },
        '3': { address: 'пр. Мира, д. 15', cost: '350 ₽', time: '2.5 часа' },
        '4': { address: 'ул. Новый Арбат, д. 30', cost: '300 ₽', time: '2 часа' },
        '5': { address: 'Ленинский проспект, д. 45', cost: '400 ₽', time: '3 часа' }
    };

    // Элементы DOM
    const addressSelect = document.getElementById('address-select');
    const deliveryCost = document.getElementById('delivery-cost');
    const deliveryEta = document.getElementById('delivery-eta');
    const confirmBtn = document.getElementById('confirm-delivery');
    const streetInput = document.getElementById('street');
    const mapInfo = document.querySelector('.map-info');
    const deliveryPoints = document.querySelectorAll('.delivery-point');

    // Выбор адреса
    function selectAddress(addressId) {
        const data = deliveryData[addressId];
        if (!data) return;

        // Устанавливаем значения
        addressSelect.value = addressId;
        deliveryCost.textContent = data.cost;
        deliveryEta.textContent = data.time;

        // Выделяем точку
        selectPoint(addressId);

        // Обновляем информацию
        updateMapInfo(data);
        updateConfirmButton();  
    }

    

    // Выделение точки на карте
    function selectPoint(pointId) {
        deliveryPoints.forEach(point => {
            point.classList.remove('selected');
        });
        
        const selectedPoint = document.querySelector(`.delivery-point[data-id="${pointId}"]`);
        if (selectedPoint) {
            selectedPoint.classList.add('selected');
        }
    }

    // Обновление информации под картой
    function updateMapInfo(data) {
        if (mapInfo) {
            mapInfo.innerHTML = `
                <p>📍 <strong>Выбранный адрес:</strong> ${data.address}</p>
                <p>💰 <strong>Стоимость доставки:</strong> ${data.cost}</p>
                <p>⏰ <strong>Примерное время:</strong> ${data.time}</p>
                <p>🏪 <strong>От нашего магазина:</strong> ул. Тверская, д. 10</p>
            `;
        }
    }

    // Сброс информации
    function resetMapInfo() {
        if (mapInfo) {
            mapInfo.innerHTML = `
                <p>📍 <strong>Наш магазин:</strong> ул. Тверская, д. 10</p>
                <p>🚗 <strong>Бесплатная доставка</strong> от 3000 ₽</p>
                <p>⏰ <strong>Время доставки:</strong> 2-4 часа</p>
                <p>🗺️ <strong>Зона доставки:</strong> в пределах 3 км от магазина</p>
            `;
        }
    }

    // Обновление кнопки
    function updateConfirmButton() {
        const hasAddress = addressSelect.value || streetInput.value.trim();
        confirmBtn.disabled = !hasAddress;
    }

    // Обработка кликов по точкам
    deliveryPoints.forEach(point => {
        point.addEventListener('click', function() {
            selectAddress(this.getAttribute('data-id'));
        });
    });

    // Обработка выбора в списке
    addressSelect.addEventListener('change', function() {
        if (this.value) {
            selectAddress(this.value);
        } else {
            deliveryPoints.forEach(point => point.classList.remove('selected'));
            resetMapInfo();
            updateConfirmButton();
        }
    });

    // Обработка ввода адреса
    streetInput.addEventListener('input', function() {
        if (this.value.trim()) {
            deliveryPoints.forEach(point => point.classList.remove('selected'));
            addressSelect.value = '';
            resetMapInfo();
            deliveryCost.textContent = '350 ₽';
            deliveryEta.textContent = '2.5 часа';
        }
        updateConfirmButton();
    });

    // Подтверждение доставки
    confirmBtn.addEventListener('click', function() {
        const street = streetInput.value.trim();
        const apartment = document.getElementById('apartment').value;
        const time = document.getElementById('delivery-time').options[document.getElementById('delivery-time').selectedIndex].text;
        const comment = document.getElementById('comment').value;
        
        let selectedAddress;
        
        if (addressSelect.value) {
            selectedAddress = deliveryData[addressSelect.value].address;
        } else if (street) {
            selectedAddress = street;
        } else {
            alert('Пожалуйста, выберите или введите адрес доставки');
            return;
        }

        // Сохраняем данные
        const deliveryInfo = {
            address: selectedAddress,
            apartment: apartment,
            time: time,
            cost: deliveryCost.textContent,
            eta: deliveryEta.textContent,
            comment: comment
        };
        
        localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
        alert('Адрес доставки сохранен! Возвращаемся в корзину...');
        
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 1500);
    });

    // Загрузка сохранённого адреса
    function loadSavedAddress() {
        const savedInfo = localStorage.getItem('deliveryInfo');
        if (savedInfo) {
            try {
                const info = JSON.parse(savedInfo);
                const addressId = Object.keys(deliveryData).find(id => 
                    deliveryData[id].address === info.address
                );
                
                if (addressId) {
                    addressSelect.value = addressId;
                    selectAddress(addressId);
                } else if (info.address) {
                    streetInput.value = info.address;
                    document.getElementById('apartment').value = info.apartment || '';
                    document.getElementById('comment').value = info.comment || '';
                    updateConfirmButton();
                }
            } catch (e) {
                console.error('Error loading saved address:', e);
            }
        }
    }

    // Обновление счётчика корзины
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }
    
    // Инициализация
    updateCartCount();
    loadSavedAddress();
    updateConfirmButton();
});