// Chart initialization
let priceChart;
let currentTimeframe = '1h';

function initializePriceChart() {
    console.log('Initializing price chart');
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Generate sample price data
    const data = generatePriceData(24, 0.01, 0.002); // 24 points, starting at $0.01
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'HMSTR Price',
                data: data.prices,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                    borderColor: '#667eea',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `Price: $${context.parsed.y.toFixed(4)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return '$' + value.toFixed(3);
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
    
    setupChartInteractions();
}

function generatePriceData(points, basePrice, volatility) {
    const prices = [basePrice];
    const labels = [];
    const now = new Date();
    
    for (let i = points - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3600000); // 1 hour intervals
        labels.push(time.getHours().toString().padStart(2, '0') + ':00');
    }
    
    for (let i = 1; i < points; i++) {
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = Math.max(0.0001, prices[i-1] + change);
        prices.push(Number(newPrice.toFixed(4)));
    }
    
    return { prices, labels };
}

function setupChartInteractions() {
    // Timeframe buttons
    const timeframeBtns = document.querySelectorAll('.timeframe-btn');
    timeframeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const timeframe = this.getAttribute('data-timeframe');
            switchTimeframe(timeframe);
            
            // Update active state
            timeframeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Balance action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            handleBalanceAction(action);
        });
    });
    
    // Quick action buttons
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span:last-child').textContent;
            showNotification(`${action} feature coming soon!`);
        });
    });
}

function switchTimeframe(timeframe) {
    console.log('Switching timeframe to:', timeframe);
    currentTimeframe = timeframe;
    
    let points, basePrice, volatility;
    
    switch(timeframe) {
        case '1h':
            points = 24;
            basePrice = 0.0102;
            volatility = 0.0002;
            break;
        case '24h':
            points = 24;
            basePrice = 0.0098;
            volatility = 0.0005;
            break;
        case '7d':
            points = 7;
            basePrice = 0.0095;
            volatility = 0.001;
            break;
        case '1m':
            points = 30;
            basePrice = 0.008;
            volatility = 0.002;
            break;
    }
    
    const newData = generatePriceData(points, basePrice, volatility);
    
    // Update chart
    priceChart.data.labels = newData.labels;
    priceChart.data.datasets[0].data = newData.prices;
    priceChart.update();
    
    // Update price display
    const currentPrice = newData.prices[newData.prices.length - 1];
    const previousPrice = newData.prices[newData.prices.length - 2];
    const change = ((currentPrice - previousPrice) / previousPrice) * 100;
    
    updatePriceDisplay(currentPrice, change);
}

function updatePriceDisplay(price, change) {
    const priceElement = document.querySelector('.current-price');
    const changeElement = document.querySelector('.price-change');
    
    if (priceElement) {
        priceElement.textContent = '$' + price.toFixed(4);
        priceElement.classList.add('price-update');
        setTimeout(() => priceElement.classList.remove('price-update'), 300);
    }
    
    if (changeElement) {
        changeElement.textContent = (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
        changeElement.className = 'price-change ' + (change >= 0 ? 'positive' : 'negative');
    }
    
    // Update balance equivalent
    const balanceAmount = document.querySelector('.amount');
    if (balanceAmount) {
        const balance = parseInt(balanceAmount.textContent.replace(/,/g, ''));
        const usdValue = (balance * price).toFixed(2);
        const usdElement = document.querySelector('.balance-equivalent');
        if (usdElement) {
            usdElement.textContent = '≈ $' + usdValue;
        }
    }
}

function handleBalanceAction(action) {
    switch(action) {
        case 'buy':
            showNotification('🚀 Redirecting to exchange...');
            setTimeout(() => {
                window.open('https://www.binance.com/trade/HMSTR_USDT', '_blank');
            }, 1000);
            break;
        case 'sell':
            showNotification('💸 Sell feature coming soon!');
            break;
        case 'transfer':
            showNotification('🔄 Transfer feature coming soon!');
            break;
    }
}

// Real-time price updates
function startPriceUpdates() {
    setInterval(() => {
        if (priceChart && priceChart.data.datasets[0].data.length > 0) {
            const currentData = priceChart.data.datasets[0].data;
            const lastPrice = currentData[currentData.length - 1];
            const change = (Math.random() - 0.5) * 0.0001;
            const newPrice = Math.max(0.0001, lastPrice + change);
            
            // Add new point and remove first point for real-time effect
            currentData.push(Number(newPrice.toFixed(4)));
            currentData.shift();
            
            // Update labels for real-time
            const now = new Date();
            const newLabel = now.getHours().toString().padStart(2, '0') + ':' + 
                           now.getMinutes().toString().padStart(2, '0');
            priceChart.data.labels.push(newLabel);
            priceChart.data.labels.shift();
            
            priceChart.update('none');
            
            // Update price display occasionally
            if (Math.random() > 0.7) {
                const previousPrice = currentData[currentData.length - 2];
                const priceChange = ((newPrice - previousPrice) / previousPrice) * 100;
                updatePriceDisplay(newPrice, priceChange);
            }
        }
    }, 5000); // Update every 5 seconds
}

// Update initializeApp function
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
    
    // Initialize chart
    setTimeout(() => {
        initializePriceChart();
        startPriceUpdates();
    }, 100);
    
    console.log('App initialized successfully');
}

// Add to existing mobile support
function setupMobileSupport() {
    console.log('Setting up mobile support');
    
    const touchElements = document.querySelectorAll(
        '.game-card, .exchange-card, .nav-item, #copy-btn, .action-card, .balance-refresh, .timeframe-btn, .quick-btn'
    );
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.classList.remove('touch-active');
            setTimeout(() => this.click(), 50);
        });
    });
}
