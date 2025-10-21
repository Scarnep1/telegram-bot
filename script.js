// Telegram Web App initialization
let tg = window.Telegram.WebApp;

// Initialize the app
tg.expand();
tg.enableClosingConfirmation();
tg.MainButton.setText("Открыть игры");
tg.MainButton.show();

// User data
let userData = {
    id: tg.initDataUnsafe?.user?.id || Math.random().toString(36).substr(2, 9),
    name: tg.initDataUnsafe?.user?.first_name || "Игрок",
    coins: 0,
    referralCode: generateReferralCode()
};

// Games data with referral links
const games = [
    {
        id: 1,
        name: "Hamster Combat",
        icon: "🐹",
        description: "Бой хомяков в Telegram",
        referralLink: "https://t.me/hamster_combat_bot/start?startapp=ref_" + userData.referralCode,
        coinReward: 10
    },
    {
        id: 2,
        name: "Crypto Whales",
        icon: "🐋",
        description: "Зарабатывай китами",
        referralLink: "https://t.me/cryptowhalesbot/start?startapp=ref_" + userData.referralCode,
        coinReward: 15
    },
    {
        id: 3,
        name: "Coin Puzzle",
        icon: "🧩",
        description: "Головоломки с криптой",
        referralLink: "https://t.me/coinpuzzlebot/start?startapp=ref_" + userData.referralCode,
        coinReward: 8
    },
    {
        id: 4,
        name: "Tower Defense",
        icon: "🏰",
        description: "Защищай башню",
        referralLink: "https://t.me/towerdefensebot/start?startapp=ref_" + userData.referralCode,
        coinReward: 12
    },
    {
        id: 5,
        name: "Crypto Rally",
        icon: "🏎️",
        description: "Гонки за криптой",
        referralLink: "https://t.me/cryptorallybot/start?startapp=ref_" + userData.referralCode,
        coinReward: 20
    },
    {
        id: 6,
        name: "Memes Battle",
        icon: "😂",
        description: "Битва мемов",
        referralLink: "https://t.me/memesbattlebot/start?startapp=ref_" + userData.referralCode,
        coinReward: 5
    }
];

// Crypto exchanges with referral links
const cryptoExchanges = {
    binance: {
        link: "https://accounts.binance.com/register?ref=" + userData.referralCode + "B",
        coinReward: 50
    },
    bybit: {
        link: "https://www.bybit.com/register?ref=" + userData.referralCode + "Y",
        coinReward: 75
    },
    okx: {
        link: "https://www.okx.com/join/" + userData.referralCode + "X",
        coinReward: 60
    }
};

// Initialize the app
function initApp() {
    updateUserInfo();
    loadGames();
    loadUserData();
    
    // Add Telegram event listeners
    tg.MainButton.onClick(() => {
        showSection('games');
    });
}

// Generate random referral code
function generateReferralCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Update user info in UI
function updateUserInfo() {
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-coins').textContent = userData.coins;
}

// Load games into the grid
function loadGames() {
    const gamesGrid = document.getElementById('games-grid');
    gamesGrid.innerHTML = '';

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.onclick = () => openGame(game);
        
        gameCard.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <h4>${game.name}</h4>
            <p>${game.description}</p>
            <span class="coin-reward">+${game.coinReward} 🪙</span>
        `;
        
        gamesGrid.appendChild(gameCard);
    });
}

// Open game with referral link
function openGame(game) {
    // Add coins to user
    userData.coins += game.coinReward;
    updateUserInfo();
    saveUserData();
    
    // Open game in Telegram
    tg.openTelegramLink(game.referralLink);
    
    // Show success message
    tg.showPopup({
        title: '🎉 Отлично!',
        message: `Вы получили ${game.coinReward} монет за запуск игры!`,
        buttons: [{ type: 'ok' }]
    });
}

// Open crypto exchange
function openCrypto(exchange) {
    const cryptoData = cryptoExchanges[exchange];
    
    if (cryptoData) {
        // Add coins to user
        userData.coins += cryptoData.coinReward;
        updateUserInfo();
        saveUserData();
        
        // Open exchange
        tg.openLink(cryptoData.link);
        
        // Show success message
        tg.showPopup({
            title: '💎 Бонус получен!',
            message: `Вы получили ${cryptoData.coinReward} монет за регистрацию!`,
            buttons: [{ type: 'ok' }]
        });
    }
}

// Copy referral link
function copyReferralLink() {
    const referralLink = `https://t.me/your_bot_username?start=${userData.referralCode}`;
    
    // In real app, you would copy to clipboard
    tg.showPopup({
        title: '📋 Реферальная ссылка',
        message: `Ваша ссылка: t.me/your_bot?start=${userData.referralCode}\n\nПоделитесь с друзьями и получайте бонусы!`,
        buttons: [{ type: 'ok' }]
    });
}

// Show different sections
function showSection(section) {
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // In a real app, you would show/hide different sections
    tg.showPopup({
        title: '🔧 В разработке',
        message: `Раздел "${section}" скоро будет доступен!`,
        buttons: [{ type: 'ok' }]
    });
}

// Save user data (in real app - to backend)
function saveUserData() {
    localStorage.setItem('gamehub_user', JSON.stringify(userData));
}

// Load user data
function loadUserData() {
    const saved = localStorage.getItem('gamehub_user');
    if (saved) {
        userData = { ...userData, ...JSON.parse(saved) };
        updateUserInfo();
    }
}

// Copy referral function (simplified)
function copyReferral() {
    copyReferralLink();
}

// Initialize app when loaded
document.addEventListener('DOMContentLoaded', initApp);
