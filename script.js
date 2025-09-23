// Real-time chart variables
let priceChart;
let liveUpdateInterval;
const LIVE_UPDATE_SPEED = 1000; // 1 second

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    
    setupNavigation();
    setupGameCards();
    setupExchangeCards();
    initializePriceChart();
    setupBalanceButtons();
    setupTimeframeButtons();
    
    // Start live updates
    startLiveUpdates();
    
    console.log('App initialized successfully');
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
        });
    });
}

// Games
function setupGameCards() {
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const bot = this.getAttribute('data-bot');
            showNotification(`Opening ${bot}...`);
        });
    });
}

// Exchanges
function setupExchangeCards() {
    document.querySelectorAll('.exchange-card').forEach(card => {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            showNotification('Opening exchange...');
            setTimeout(() => window.open(url, '_blank'), 500);
        });
    });
}

// Price Chart
function initializePriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Generate initial live data
    const initialData = generateLiveData(50);
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: initialData.labels,
            datasets: [{
                label: 'HMSTR/USDT',
                data: initialData.prices,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.1,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (ctx) => `$${ctx.parsed.y.toFixed(4)}`
                    }
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    position: 'right',
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: {
                        callback: (value) => `$${value.toFixed(3)}`
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function generateLiveData(points) {
    const prices = [];
    const labels = [];
    let currentPrice = 0.0102;
    
    const now = Date.now();
    for (let i = points - 1; i >= 0; i--) {
        const time = new Date(now - i * 2000); // 2 second intervals
        labels.push(time.getTime());
        
        // Realistic price movement
        const change = (Math.random() - 0.5) * 0.0004;
        currentPrice = Math.max(0.009, currentPrice + change);
        prices.push(Number(currentPrice.toFixed(4)));
    }
    
    return { prices, labels };
}

// Live updates
function startLiveUpdates() {
    liveUpdateInterval = setInterval(updateLiveChart, LIVE_UPDATE_SPEED);
}

function updateLiveChart() {
    if (!priceChart) return;
    
    const currentData = priceChart.data;
    const lastPrice = currentData.datasets[0].data[currentData.datasets[0].data.length - 1];
    
    // Realistic price change
    const change = (Math.random() - 0.48) * 0.0002; // Slight bullish bias
    const newPrice = Math.max(0.009, lastPrice + change);
    
    // Add new point
    currentData.labels.push(Date.now());
    currentData.datasets[0].data.push(Number(newPrice.toFixed(4)));
    
    // Remove old points (keep last 50)
    if (currentData.labels.length > 50) {
        currentData.labels.shift();
        currentData.datasets[0].data.shift();
    }
    
    // Update chart
    priceChart.update('none');
    
    // Update price display
    updatePriceDisplay(newPrice, lastPrice);
}

function updatePriceDisplay(newPrice, oldPrice) {
    const priceElement = document.getElementById('current-price');
    const changeElement = document.getElementById('price-change');
    
    if (!priceElement || !changeElement) return;
    
    const changePercent = ((newPrice - oldPrice) / oldPrice) * 100;
    
    // Update price
    priceElement.textContent = `$${newPrice.toFixed(4)}`;
    
    // Update change
    changeElement.textContent = `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`;
    changeElement.className = `price-change ${changePercent >= 0 ? 'positive' : 'negative'}`;
    
    // Update balance
    updateBalanceValue(newPrice);
}

function updateBalanceValue(price) {
    const hmstrAmount = 6; // Fixed for demo
    const usdValue = (hmstrAmount * price).toFixed(2);
    const usdElement = document.querySelector('.usd-amount');
    if (usdElement) {
        usdElement.textContent = `≈ $${usdValue}`;
    }
}

// Timeframe buttons
function setupTimeframeButtons() {
    document.querySelectorAll('.timeframe-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const timeframe = this.getAttribute('data-timeframe');
            
            // Update active button
            document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Handle timeframe change
            handleTimeframeChange(timeframe);
        });
    });
}

function handleTimeframeChange(timeframe) {
    if (timeframe === 'live') {
        // Restart live updates
        clearInterval(liveUpdateInterval);
        startLiveUpdates();
        showNotification('Live mode activated');
    } else {
        // Stop live updates for historical data
        clearInterval(liveUpdateInterval);
        showNotification(`Showing ${timeframe} data`);
        
        // Simulate historical data
        if (priceChart) {
            const historicalData = generateHistoricalData(timeframe);
            priceChart.data.labels = historicalData.labels;
            priceChart.data.datasets[0].data = historicalData.prices;
            priceChart.update();
            
            const currentPrice = historicalData.prices[historicalData.prices.length - 1];
            const previousPrice = historicalData.prices[historicalData.prices.length - 2];
            updatePriceDisplay(currentPrice, previousPrice);
        }
    }
}

function generateHistoricalData(timeframe) {
    let points, basePrice, volatility;
    
    switch(timeframe) {
        case '1h':
            points = 60;
            basePrice = 0.0100;
            volatility = 0.0003;
            break;
        case '24h':
            points = 24;
            basePrice = 0.0095;
            volatility = 0.001;
            break;
        default:
            points = 50;
            basePrice = 0.0102;
            volatility = 0.0002;
    }
    
    const prices = [basePrice];
    const labels = [];
    
    for (let i = 1; i < points; i++) {
        const change = (Math.random() - 0.5) * volatility;
        prices.push(Math.max(0.009, prices[i-1] + change));
        labels.push(i);
    }
    
    return { prices: prices.map(p => Number(p.toFixed(4))), labels };
}

// Balance buttons
function setupBalanceButtons() {
    document.querySelectorAll('.balance-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            showNotification(`${action} feature coming soon!`);
        });
    });
}

// Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    clearInterval(liveUpdateInterval);
});
