// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Инициализация навигации
    initNavigation();
    
    // Инициализация профиля пользователя
    initUserProfile();
    
    // Инициализация графика цены
    initPriceChart();
    
    // Загрузка данных о цене
    loadPriceData();
}

// Навигация между вкладками
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Обновляем активные элементы навигации
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем целевую вкладку
            tabContents.forEach(tab => tab.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
            
            // Если переходим на вкладку Price, обновляем данные
            if (targetTab === 'price') {
                loadPriceData();
            }
        });
    });
}

// Инициализация профиля пользователя
function initUserProfile() {
    // В реальном приложении здесь будет интеграция с Telegram WebApp
    const user = {
        name: 'Telegram User',
        avatar: 'https://via.placeholder.com/100'
    };
    
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userAvatar').src = user.avatar;
}

// Инициализация графика
function initPriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Создаем временные данные для демонстрации
    const labels = [];
    const data = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('ru-RU'));
        data.push(0.1 + Math.random() * 0.1); // Случайные данные
    }
    
    window.priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'HMSTR Price',
                data: data,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Загрузка данных о цене (заглушка - в реальном приложении будет API)
function loadPriceData() {
    // Имитация загрузки данных
    setTimeout(() => {
        const usdtPrice = (0.15 + Math.random() * 0.05).toFixed(4);
        const rubPrice = (usdtPrice * 90).toFixed(2); // Примерный курс
        const change = (Math.random() * 10 - 5).toFixed(2);
        
        document.getElementById('currentPriceUSDT').textContent = `$${usdtPrice}`;
        document.getElementById('currentPriceRUB').textContent = `${rubPrice} ₽`;
        
        const changeElement = document.getElementById('priceChange');
        changeElement.textContent = `${change > 0 ? '+' : ''}${change}%`;
        changeElement.className = `price-change ${change < 0 ? 'negative' : ''}`;
        
        // Обновляем рыночные данные
        document.getElementById('marketCap').textContent = `$${(usdtPrice * 1000000000).toLocaleString()}`;
        document.getElementById('totalSupply').textContent = '1,000,000,000 HMSTR';
        document.getElementById('volume24h').textContent = `$${(usdtPrice * 1000000).toLocaleString()}`;
    }, 500);
}

// Открытие игры в Telegram
function openGame(url) {
    // В реальном приложении будет использоваться Telegram WebApp API
    window.open(url, '_blank');
}

// Обработчики для кнопок временных интервалов
document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Здесь будет обновление данных графика по выбранному периоду
        const timeframe = this.getAttribute('data-time');
        updateChartTimeframe(timeframe);
    });
});

function updateChartTimeframe(timeframe) {
    // В реальном приложении здесь будет загрузка данных для выбранного периода
    console.log('Updating chart for timeframe:', timeframe);
}

// Интеграция с Telegram WebApp (раскомментировать при развертывании в Telegram)
/*
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Получение данных пользователя
const user = tg.initDataUnsafe?.user;
if (user) {
    document.getElementById('userName').textContent = user.first_name || 'Telegram User';
    if (user.photo_url) {
        document.getElementById('userAvatar').src = user.photo_url;
    }
}
*/
