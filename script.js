// Initialize Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// User data
let userData = {
    id: tg.initDataUnsafe?.user?.id || '12345',
    name: tg.initDataUnsafe?.user?.first_name || 'Гость',
    balance: 150,
    invitedFriends: 3,
    gamesPlayed: 12,
    totalEarned: 450
};

// Games data with referral links
const games = [
    {
        id: 1,
        name: "Hamster Kombat",
        icon: "🐹",
        description: "Тапай и зарабатывай",
        referralLink: "https://t.me/hamster_kombat_bot?start=ref_gamehub",
        bonus: "+1000 монет"
    },
    {
        id: 2,
        name: "Notcoin",
        icon: "🪙",
        description: "Кликер с монетками",
        referralLink: "https://t.me/notcoin_bot?start=ref_gamehub",
        bonus: "+500 NOT"
    },
    {
        id: 3,
        name: "Blum",
        icon: "🌸",
        description: "Ферма токенов",
        referralLink: "https://t.me/blum_bot?start=ref_gamehub",
        bonus: "+1000 очков"
    },
    {
        id: 4,
        name: "Dotcoin",
        icon: "⚫",
        description: "Собирай точки",
        referralLink: "https://t.me/dotcoin_bot?start=ref_gamehub",
        bonus: "+500 точек"
    },
    {
        id: 5,
        name: "Catizen",
        icon: "🐱",
        description: "Кошачья ферма",
        referralLink: "https://t.me/catizen_bot?start=ref_gamehub",
        bonus: "+3 котика"
    },
    {
        id: 6,
        name: "Yescoin",
        icon: "👍",
        description: "Свайпай и зарабатывай",
        referralLink: "https://t.me/yescoin_bot?start=ref_gamehub",
        bonus: "+1000 YES"
    }
];

// Crypto exchanges data
const cryptoExchanges = [
    {
        id: 1,
        name: "Binance",
        icon: "🟡",
        description: "Крупнейшая биржа",
        referralLink: "https://accounts.binance.com/register?ref=GAMEHUB123",
        bonus: "10% скидка на комиссии"
    },
    {
        id: 2,
        name: "Bybit",
        icon: "🔵",
        description: "Торговая платформа",
        referralLink: "https://www.bybit.com/register?ref=GAMEHUB456",
        bonus: "$30 бонус"
    },
    {
        id: 3,
        name: "OKX",
        icon: "🟢",
        description: "Многофункциональная",
        referralLink: "https://www.okx.com/join/GAMEHUB789",
        bonus: "$50 приветственный"
    },
    {
        id: 4,
        name: "Gate.io",
        icon: "🚪",
        description: "Международная биржа",
        referralLink: "https://www.gate.io/signup/GAMEHUB012",
        bonus: "10% кэшбек"
    }
];

// Initialize app
function initApp() {
    updateUserInfo();
    loadGames();
    loadCryptoExchanges();
    updateStats();
    generateReferralLink();
}

// Update user information
function updateUserInfo() {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userBalance').textContent = userData.balance;
}

// Load games grid
function loadGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.onclick = () => openGame(game);
        
        gameCard.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="bonus-badge">${game.bonus}</div>
        `;
        
        gamesGrid.appendChild(gameCard);
    });
}

// Load crypto exchanges
function loadCryptoExchanges() {
    const cryptoGrid = document.getElementById('cryptoGrid');
    cryptoGrid.innerHTML = '';

    cryptoExchanges.forEach(exchange => {
        const cryptoCard = document.createElement('div');
        cryptoCard.className = 'crypto-card';
        cryptoCard.onclick = () => openCryptoExchange(exchange);
        
        cryptoCard.innerHTML = `
            <div class="crypto-icon">${exchange.icon}</div>
            <h3>${exchange.name}</h3>
            <p>${exchange.description}</p>
            <div class="bonus-badge">${exchange.bonus}</div>
        `;
        
        cryptoGrid.appendChild(cryptoCard);
    });
}

// Open game with referral
function openGame(game) {
    tg.showPopup({
        title: `Запуск ${game.name}`,
        message: `Вы получите бонус: ${game.bonus}. Перейти по реферальной ссылке?`,
        buttons: [
            {id: 'cancel', type: 'cancel', text: 'Отмена'},
            {id: 'open', type: 'default', text: 'Открыть игру'}
        ]
    }, (buttonId) => {
        if (buttonId === 'open') {
            // In real app, this would track the click
            trackReferralClick('game', game.id);
            window.open(game.referralLink, '_blank');
        }
    });
}

// Open crypto exchange
function openCryptoExchange(exchange) {
    tg.showPopup({
        title: `Регистрация на ${exchange.name}`,
        message: `Бонус при регистрации: ${exchange.bonus}. Перейти по реферальной ссылке?`,
        buttons: [
            {id: 'cancel', type: 'cancel', text: 'Отмена'},
            {id: 'open', type: 'default', text: 'Открыть'}
        ]
    }, (buttonId) => {
        if (buttonId === 'open') {
            trackReferralClick('crypto', exchange.id);
            window.open(exchange.referralLink, '_blank');
        }
    });
}

// Copy referral link
function copyReferralLink() {
    const link = document.getElementById('referralLink').textContent;
    navigator.clipboard.writeText(link).then(() => {
        tg.showPopup({
            title: 'Успешно!',
            message: 'Реферальная ссылка скопирована в буфер обмена'
        });
    });
}

// Generate referral link
function generateReferralLink() {
    const baseUrl = "https://t.me/gamehub_bot?start=ref_";
    const referralLink = baseUrl + userData.id;
    document.getElementById('referralLink').textContent = referralLink;
}

// Update statistics
function updateStats() {
    document.getElementById('invitedFriends').textContent = userData.invitedFriends;
    document.getElementById('gamesPlayed').textContent = userData.gamesPlayed;
    document.getElementById('totalEarned').textContent = userData.totalEarned + ' ₽';
}

// Track referral clicks (mock function)
function trackReferralClick(type, id) {
    console.log(`Tracked ${type} referral click for ID: ${id}`);
    // In real app, send to analytics
}

// Section navigation
function showSection(section) {
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // In real app, implement section switching
    tg.showPopup({
        title: 'Навигация',
        message: `Переход в раздел: ${section}`
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initApp);
