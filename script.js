// Telegram WebApp initialization and configuration
let tg = window.Telegram.WebApp;
let currentCurrency = 'usdt';
let currentTimeframe = '1m';

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing Hamster Verse app...');
    
    // Expand the WebApp to full height
    tg.expand();
    
    setupTelegramUser();
    setupNavigation();
    setupGameCards();
    setupCurrencyToggle();
    setupTimeframeButtons();
    initializePriceChart();
    setupProfileActions();
    
    console.log('App initialized successfully');
}

// Telegram User Data
function setupTelegramUser() {
    const user = tg.initDataUnsafe?.user;
    
    if (user) {
        // Update header avatar
        const headerAvatar = document.getElementById('user-avatar');
        if (user.first_name) {
            headerAvatar.textContent = user.first_name[0].toUpperCase();
        }
        
        // Update profile section
        updateProfileSection(user);
    }
}

function updateProfileSection(user) {
    const profileAvatar = document.getElementById('profile-avatar');
    const avatarImg = document.getElementById('avatar-img');
    const avatarFallback = document.getElementById('avatar-fallback');
    const profileName = document.getElementById('profile-name');
    const profileUsername = document.getElementById('profile-username');
    
    // Set name
    if (user.first_name || user.last_name) {
        const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ');
        profileName.textContent = fullName;
    }
    
    // Set username
    if (user.username) {
        profileUsername.textContent = `@${user.username}`;
    } else {
        profileUsername.textContent = 'Telegram User';
    }
    
    // Set avatar
    if (user.photo_url) {
        avatarImg.src = user.photo_url;
        avatarImg.style.display = 'block';
        avatarFallback.style.display = 'none';
    } else {
        avatarFallback.textContent = user.first_name ? user.first_name[0].toUpperCase() : 'U';
    }
}

// Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update nav
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update sections
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
            
            // If switching to price section, update chart
            if (targetSection === 'price-section') {
                updateChartData(currentTimeframe, currentCurrency);
            }
        });
    });
}

// Games
function setupGameCards() {
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameUrl = this.getAttribute('data-url');
            showNotification('Opening game...');
            
            // Open game in Telegram
            tg.openTelegramLink(gameUrl);
        });
    });
}

// Currency Toggle
function setupCurrencyToggle() {
    document.querySelectorAll('.currency-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const currency = this.getAttribute('data-currency');
            
            // Update active button
            document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentCurrency = currency;
            updateChartData(currentTimeframe, currency);
            showNotification(`Switched to ${currency.toUpperCase()}`);
        });
    });
}

// Price Chart
let priceChart;

function initializePriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'HMSTR/USDT',
                data: [],
                borderColor: '#FF6B35',
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (ctx) => {
                            const prefix = currentCurrency === 'rub' ? '₽' : '$';
                            return `${prefix}${ctx.parsed.y.toFixed(4)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: { display: false },
                    ticks: {
                        maxTicksLimit: 6,
                        callback: function(value, index, values) {
                            if (currentTimeframe === '24h') {
                                return new Date(value).getHours() + ':00';
                            } else if (currentTimeframe === '7d') {
                                return new Date(value).toLocaleDateString('ru', { day: 'numeric', month: 'short' });
                            } else {
                                return new Date(value).toLocaleDateString('ru', { month: 'short', year: '2-digit' });
                            }
                        }
                    }
                },
                y: {
                    position: 'right',
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: {
                        callback: function(value) {
                            const prefix = currentCurrency === 'rub' ? '₽' : '$';
                            return `${prefix}${value.toFixed(3)}`;
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
    
    // Load initial data
    updateChartData(currentTimeframe, currentCurrency);
}

function updateChartData(timeframe, currency) {
    if (!priceChart) return;
    
    const data = generatePriceData(timeframe, currency);
    
    priceChart.data.labels = data.labels;
    priceChart.data.datasets[0].data = data.prices;
    priceChart.data.datasets[0].label = `HMSTR/${currency.toUpperCase()}`;
    priceChart.update();
    
    updatePriceDisplay(data.prices, currency);
    updateMarketStats(data.marketStats);
}

function generatePriceData(timeframe, currency) {
    const now = Date.now();
    let points, days, basePrice, usdToRub = 90; // Примерный курс
    
    switch(timeframe) {
        case '24h':
            points = 24;
            days = 1;
            break;
        case '7d':
            points = 7;
            days = 7;
            break;
        case '1m':
            points = 30;
            days = 30;
            break;
        case '3m':
            points = 12;
            days = 90;
            break;
        case 'max':
            points = 24;
            days = 365;
            break;
        default:
            points = 30;
            days = 30;
    }
    
    const prices = [];
    const labels = [];
    let currentPrice = currency === 'rub' ? 0.0102 * usdToRub : 0.0102;
    
    // Генерация реалистичных данных
    for (let i = points - 1; i >= 0; i--) {
        const time = new Date(now - (i * (days * 24 * 60 * 60 * 1000)) / points);
        labels.push(time.getTime());
        
        // Реалистичное движение цены с трендом
        const volatility = 0.02; // 2% волатильность
        const trend = 0.001; // Небольшой восходящий тренд
        
        const change = (Math.random() - 0.5) * volatility + trend;
        currentPrice = Math.max(0.005, currentPrice * (1 + change));
        
        if (currency === 'rub') {
            prices.push(Number((currentPrice * usdToRub).toFixed(4)));
        } else {
            prices.push(Number(currentPrice.toFixed(4)));
        }
    }
    
    // Генерация рыночной статистики
    const marketStats = {
        marketCap: (currentPrice * 10000000000).toFixed(1) + 'B', // 10B supply
        totalSupply: '10B',
        volume24h: (currentPrice * 500000000).toFixed(1) + 'M' // 500M volume
    };
    
    return { prices, labels, marketStats };
}

function updatePriceDisplay(prices, currency) {
    const currentPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2];
    const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
    
    const priceElement = document.getElementById('current-price');
    const changeElement = document.getElementById('price-change');
    
    const prefix = currency === 'rub' ? '₽' : '$';
    priceElement.textContent = `${prefix}${currentPrice.toFixed(4)}`;
    
    changeElement.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
    changeElement.className = `price-change ${changePercent >= 0 ? 'positive' : 'negative'}`;
}

function updateMarketStats(stats) {
    document.getElementById('market-cap').textContent = `$${stats.marketCap}`;
    document.getElementById('total-supply').textContent = stats.totalSupply;
    document.getElementById('volume-24h').textContent = `$${stats.volume24h}`;
}

// Timeframe buttons
function setupTimeframeButtons() {
    document.querySelectorAll('.timeframe-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const timeframe = this.getAttribute('data-timeframe');
            
            // Update active button
            document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentTimeframe = timeframe;
            updateChartData(timeframe, currentCurrency);
        });
    });
}

// Profile Actions
function setupProfileActions() {
    document.getElementById('invite-btn').addEventListener('click', function() {
        const inviteText = "Join Hamster Verse - awesome games and HMSTR token!";
        tg.shareUrl(inviteText, "https://t.me/your_bot_link");
        showNotification('Invite link copied!');
    });
    
    document.getElementById('settings-btn').addEventListener('click', function() {
        showNotification('Settings coming soon!');
    });
}

// Notification System
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Handle WebApp events
tg.onEvent('viewportChanged', (event) => {
    console.log('Viewport changed:', event);
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showNotification('Something went wrong!');
});
