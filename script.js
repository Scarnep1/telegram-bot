// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app');
    
    // Initialize Telegram WebApp data
    initTelegramData();
    
    // Setup all functionality
    setupMobileSupport();
    setupNavigation();
    setupGameCards();
    setupExchangeCards();
    setupReferralLink();
    setupBalanceRefresh();
    setupProfileActions();
    
    console.log('App initialized successfully');
}

// Initialize Telegram user data
function initTelegramData() {
    // Check if we're in Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        const webApp = Telegram.WebApp;
        
        // Expand the app to full height
        webApp.expand();
        
        // Get user data from Telegram
        const user = webApp.initDataUnsafe?.user;
        
        if (user) {
            // Update header avatar
            const userAvatar = document.getElementById('user-avatar');
            const profileAvatar = document.getElementById('profile-avatar');
            const profileName = document.getElementById('profile-name');
            const profileUsername = document.getElementById('profile-username');
            
            // Use first letter of first name or username
            let avatarText = 'U';
            if (user.first_name) {
                avatarText = user.first_name.charAt(0).toUpperCase();
            } else if (user.username) {
                avatarText = user.username.charAt(0).toUpperCase();
            }
            
            if (userAvatar) userAvatar.textContent = avatarText;
            if (profileAvatar) profileAvatar.textContent = avatarText;
            
            // Update profile information
            if (profileName) {
                profileName.textContent = user.first_name || user.username || 'Telegram User';
            }
            
            if (profileUsername) {
                profileUsername.textContent = user.username ? '@' + user.username : 'Telegram User';
            }
            
            console.log('Telegram user data loaded:', user);
        }
    } else {
        console.log('Running outside Telegram - using demo data');
        // You can set demo data here if needed
    }
}

function setupMobileSupport() {
    console.log('Setting up mobile support');
    
    // Add touch events for mobile devices
    const touchElements = document.querySelectorAll('.game-card, .exchange-card, .nav-item, #copy-btn, .action-card, .balance-refresh');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.classList.remove('touch-active');
            // Simulate click after touch end
            setTimeout(() => this.click(), 50);
        });
    });
}

function setupNavigation() {
    console.log('Setting up navigation');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    console.log('Found ' + navItems.length + ' nav items');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Nav item clicked:', this.getAttribute('data-section'));
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all nav items
            navItems.forEach(nav => {
                nav.classList.remove('active');
            });
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                console.log('Showing section: ' + targetSection);
            } else {
                console.error('Section not found: ' + targetSection);
            }
        });
    });
}

function setupGameCards() {
    console.log('Setting up game cards');
    const gameCards = document.querySelectorAll('.game-card');
    
    console.log('Found ' + gameCards.length + ' game cards');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const botUsername = this.getAttribute('data-bot');
            console.log('Game card clicked:', botUsername);
            
            if (botUsername) {
                if (window.Telegram && window.Telegram.WebApp) {
                    // Open in Telegram Mini App
                    Telegram.WebApp.openTelegramLink('https://t.me/' + botUsername);
                } else {
                    // Fallback for browser testing
                    showNotification('Opening: ' + botUsername);
                    setTimeout(() => {
                        window.open('https://t.me/' + botUsername, '_blank');
                    }, 500);
                }
            }
        });
    });
}

function setupExchangeCards() {
    console.log('Setting up exchange cards');
    const exchangeCards = document.querySelectorAll('.exchange-card');
    
    console.log('Found ' + exchangeCards.length + ' exchange cards');
    
    exchangeCards.forEach(card => {
        card.addEventListener('click', function() {
            const exchangeUrl = this.getAttribute('data-url');
            console.log('Exchange card clicked:', exchangeUrl);
            
            if (exchangeUrl) {
                if (window.Telegram && window.Telegram.WebApp) {
                    Telegram.WebApp.openLink(exchangeUrl);
                } else {
                    // Fallback for browser testing
                    showNotification('Opening exchange...');
                    setTimeout(() => {
                        window.open(exchangeUrl, '_blank');
                    }, 500);
                }
            }
        });
    });
}

function setupProfileActions() {
    console.log('Setting up profile actions');
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const actionText = this.querySelector('h3').textContent;
            console.log('Profile action clicked:', actionText);
            
            showNotification(actionText + ' - Coming soon!');
        });
    });
}

function setupReferralLink() {
    console.log('Setting up referral link');
    const copyBtn = document.getElementById('copy-btn');
    const referralInput = document.getElementById('referral-input');
    
    if (!copyBtn || !referralInput) {
        console.error('Referral elements not found!');
        return;
    }
    
    console.log('Referral elements found');
    
    copyBtn.addEventListener('click', function() {
        console.log('Copy button clicked');
        
        // Select the text field
        referralInput.select();
        referralInput.setSelectionRange(0, 99999);
        
        // Copy the text
        navigator.clipboard.writeText(referralInput.value).then(function() {
            console.log('Text copied successfully');
            showNotification('🎉 Link copied to clipboard!');
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            try {
                document.execCommand('copy');
                console.log('Text copied using fallback method');
                showNotification('📋 Link copied to clipboard!');
            } catch (e) {
                console.error('Fallback copy failed: ', e);
                showNotification('❌ Failed to copy link');
            }
        });
    });
}

function setupBalanceRefresh() {
    console.log('Setting up balance refresh');
    const refreshBtn = document.querySelector('.balance-refresh');
    
    if (!refreshBtn) {
        console.error('Refresh button not found!');
        return;
    }
    
    console.log('Refresh button found');
    
    refreshBtn.addEventListener('click', function() {
        console.log('Refresh button clicked');
        const balanceAmount = document.querySelector('.amount');
        
        if (!balanceAmount) {
            console.error('Balance amount element not found!');
            return;
        }
        
        // Add rotation animation
        this.style.transition = 'transform 0.3s ease';
        this.style.transform = 'rotate(360deg)';
        
        // Simulate API call to refresh balance
        simulateBalanceUpdate(balanceAmount, this);
    });
}

function simulateBalanceUpdate(balanceAmount, refreshBtn) {
    // Simulate network delay
    setTimeout(() => {
        // Reset rotation
        refreshBtn.style.transform = 'rotate(0deg)';
        
        // Simulate balance change
        const currentBalance = parseInt(balanceAmount.textContent.replace(/,/g, ''));
        const randomChange = Math.floor(Math.random() * 20) + 1; // +1 to +20
        const newBalance = currentBalance + randomChange;
        
        balanceAmount.textContent = newBalance.toLocaleString();
        
        // Update equivalent USD value
        const usdValue = (newBalance * 0.01).toFixed(2);
        const usdElement = document.querySelector('.balance-equivalent');
        if (usdElement) {
            usdElement.textContent = '≈ $' + usdValue;
        }
        
        console.log('Balance updated to: ' + newBalance);
        showNotification('💫 Balance updated! +' + randomChange + ' HMSTR');
    }, 1000);
}

function showNotification(message) {
    console.log('Showing notification:', message);
    const notification = document.getElementById('notification');
    
    if (!notification) {
        console.error('Notification element not found!');
        return;
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(function() {
        notification.classList.remove('show');
    }, 3000);
}

// Simulate user activity for demo
function simulateUserActivity() {
    setInterval(() => {
        const balanceElement = document.querySelector('.amount');
        if (balanceElement && Math.random() > 0.7) { // 30% chance
            const currentBalance = parseInt(balanceElement.textContent.replace(/,/g, ''));
            const randomIncrease = Math.floor(Math.random() * 3) + 1; // 1 to 3
            const newBalance = currentBalance + randomIncrease;
            balanceElement.textContent = newBalance.toLocaleString();
            
            const usdValue = (newBalance * 0.01).toFixed(2);
            const usdElement = document.querySelector('.balance-equivalent');
            if (usdElement) {
                usdElement.textContent = '≈ $' + usdValue;
            }
        }
    }, 30000); // Every 30 seconds
}

// Start simulation after a delay
setTimeout(simulateUserActivity, 10000);

// Error handling for missing elements
setTimeout(function() {
    const requiredElements = [
        'games-section', 'wallet-section', 'profile-section',
        'referral-input', 'copy-btn', 'notification',
        'user-avatar', 'profile-avatar', 'profile-name', 'profile-username'
    ];
    
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.error('Element with id "' + id + '" not found!');
        }
    });
}, 100);
