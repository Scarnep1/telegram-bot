// Real-time chart variables
let priceChart;
let currentTimeframe = '5m';
let realTimeData = [];
let wsConnection = null;
const MAX_POINTS = 50;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app');
    
    initTelegramData();
    setupMobileSupport();
    setupNavigation();
    setupGameCards();
    setupExchangeCards();
    setupReferralLink();
    setupBalanceRefresh();
    setupProfileActions();
    
    // Initialize real-time chart
    initializeRealTimeChart();
    startRealTimeUpdates();
    
    console.log('App initialized successfully');
}

function initializeRealTimeChart() {
    console.log('Initializing real-time chart');
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Generate initial data for current timeframe
    generateInitialData();
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'HMSTR/USDT',
                data: realTimeData,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                segment: {
                    borderColor: ctx => {
                        const points = ctx.p0.parsed.y > ctx.p1.parsed.y ? 
                            { p0: ctx.p0, p1: ctx.p1 } : 
                            { p0: ctx.p1, p1: ctx.p0 };
                        
                        return points.p0.parsed.y > points.p1.parsed.y ? 
                            '#00c851' : '#ff4444';
                    }
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    callbacks: {
                        title: function(tooltipItems) {
                            return moment(tooltipItems[0].parsed.x).format('HH:mm:ss');
                        },
                        label: function(context) {
                            return `Price: $${context.parsed.y.toFixed(4)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'HH:mm'
                        }
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            size: 10
                        },
                        maxTicksLimit: 6
                    }
                },
                y: {
                    position: 'right',
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return '$' + value.toFixed(4);
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            elements: {
                line: {
                    borderWidth: 2
                }
            }
        }
    });
    
    setupChartInteractions();
}

function generateInitialData() {
    const basePrice = 0.0102;
    const now = Date.now();
    const interval = getTimeframeInterval();
    
    for (let i = MAX_POINTS - 1; i >= 0; i--) {
        const time = now - (i * interval);
        const volatility = (Math.random() - 0.5) * 0.0004;
        const price = basePrice + volatility;
        
        realTimeData.push({
            x: time,
            y: Number(price.toFixed(4))
        });
    }
}

function getTimeframeInterval() {
    switch(currentTimeframe) {
        case '5m': return 5 * 60 * 1000; // 5 minutes
        case '15m': return 15 * 60 * 1000; // 15 minutes
        case '1h': return 60 * 60 * 1000; // 1 hour
        case '4h': return 4 * 60 * 60 * 1000; // 4 hours
        default: return 5 * 60 * 1000;
    }
}

function setupChartInteractions() {
    // Timeframe buttons
    const timeframeBtns = document.querySelectorAll('.timeframe-btn');
    timeframeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const timeframe = this.getAttribute('data-timeframe');
            switchTimeframe(timeframe);
            
            timeframeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Balance action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            handleBalanceAction(action);
        });
    });
}

function switchTimeframe(timeframe) {
    console.log('Switching to timeframe:', timeframe);
    currentTimeframe = timeframe;
    
    // Regenerate data for new timeframe
    realTimeData = [];
    generateInitialData();
    
    // Update chart
    priceChart.data.datasets[0].data = realTimeData;
    priceChart.options.scales.x.time.unit = getTimeUnit(timeframe);
    priceChart.update();
}

function getTimeUnit(timeframe) {
    switch(timeframe) {
        case '5m': return 'minute';
        case '15m': return 'minute';
        case '1h': return 'hour';
        case '4h': return 'hour';
        default: return 'minute';
    }
}

function startRealTimeUpdates() {
    // Simulate real-time WebSocket updates
    setInterval(() => {
        if (priceChart && realTimeData.length > 0) {
            const lastPrice = realTimeData[realTimeData.length - 1].y;
            const change = (Math.random() - 0.5) * 0.0002; // Small random change
            const newPrice = Math.max(0.0001, lastPrice + change);
            const newTime = Date.now();
            
            // Add new data point
            realTimeData.push({
                x: newTime,
                y: Number(newPrice.toFixed(4))
            });
            
            // Remove oldest point if exceeds max
            if (realTimeData.length > MAX_POINTS) {
                realTimeData.shift();
            }
            
            // Update chart smoothly
            priceChart.update('none');
            
            // Update price display with animation
            updatePriceDisplay(newPrice, lastPrice);
        }
    }, 2000); // Update every 2 seconds for real-time feel
}

function updatePriceDisplay(newPrice, oldPrice) {
    const priceElement = document.getElementById('current-price');
    const changeElement = document.getElementById('price-change');
    
    if (!priceElement || !changeElement) return;
    
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    const changeValue = change.toFixed(2);
    
    // Update price with animation
    priceElement.textContent = '$' + newPrice.toFixed(4);
    priceElement.classList.remove('price-up', 'price-down');
    
    if (change > 0) {
        priceElement.classList.add('price-up');
        changeElement.textContent = '+' + changeValue + '%';
        changeElement.className = 'price-change positive';
    } else {
        priceElement.classList.add('price-down');
        changeElement.textContent = changeValue + '%';
        changeElement.className = 'price-change negative';
    }
    
    // Update balance equivalent
    updateBalanceEquivalent(newPrice);
}

function updateBalanceEquivalent(currentPrice) {
    const balanceAmount = document.querySelector('.amount');
    if (balanceAmount) {
        const balance = parseInt(balanceAmount.textContent);
        const usdValue = (balance * currentPrice).toFixed(2);
        const usdElement = document.querySelector('.balance-equivalent');
        if (usdElement) {
            usdElement.textContent = '≈ $' + usdValue;
        }
    }
}

function handleBalanceAction(action) {
    const exchanges = {
        'buy': 'https://www.binance.com/trade/HMSTR_USDT',
        'sell': 'https://www.bybit.com/trade-spot/HMSTR/USDT',
        'transfer': 'https://www.mexc.com/exchange/HMSTR_USDT'
    };
    
    if (exchanges[action]) {
        showNotification('🚀 Redirecting to exchange...');
        setTimeout(() => {
            if (window.Telegram && window.Telegram.WebApp) {
                Telegram.WebApp.openLink(exchanges[action]);
            } else {
                window.open(exchanges[action], '_blank');
            }
        }, 500);
    }
}

// Остальные функции остаются без изменений
function initTelegramData() {
    if (window.Telegram && window.Telegram.WebApp) {
        const webApp = Telegram.WebApp;
        webApp.expand();
        
        const user = webApp.initDataUnsafe?.user;
        if (user) {
            updateProfileData(user);
        }
    }
}

function updateProfileData(user) {
    const elements = {
        'user-avatar': user.first_name?.charAt(0) || 'U',
        'profile-avatar': user.first_name?.charAt(0) || 'U',
        'profile-name': user.first_name || 'Telegram User',
        'profile-username': user.username ? '@' + user.username : 'Telegram User'
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = elements[id];
    });
}

// ... остальные функции (setupMobileSupport, setupNavigation и т.д.) остаются без изменений
