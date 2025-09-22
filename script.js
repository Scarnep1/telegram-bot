// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app');
    
    // Navigation functionality
    setupNavigation();
    
    // Game card clicks
    setupGameCards();
    
    // Exchange card clicks
    setupExchangeCards();
    
    // Copy referral link functionality
    setupReferralLink();
    
    // Balance refresh
    setupBalanceRefresh();
    
    console.log('App initialized successfully');
}

function setupNavigation() {
    console.log('Setting up navigation');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    console.log(Found ${navItems.length} nav items);
    
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
                console.log(Showing section: ${targetSection});
            } else {
                console.error(Section not found: ${targetSection});
            }
        });
    });
}

function setupGameCards() {
    console.log('Setting up game cards');
    const gameCards = document.querySelectorAll('.game-card');
    
    console.log(Found ${gameCards.length} game cards);
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const botUsername = this.getAttribute('data-bot');
            console.log('Game card clicked:', botUsername);
            
            if (botUsername) {
                // Simulate opening Telegram bot
                alert(Opening bot: ${botUsername}\n\nIn real Telegram Mini App, this would open the bot directly.);
                
                // For actual Telegram Mini App, use:
                // if (window.Telegram && window.Telegram.WebApp) {
                //     window.Telegram.WebApp.openTelegramLink(https://t.me/${botUsername});
                // }
            }
        });
    });
}

function setupExchangeCards() {
    console.log('Setting up exchange cards');
    const exchangeCards = document.querySelectorAll('.exchange-card');
    
    console.log(Found ${exchangeCards.length} exchange cards);
    
    exchangeCards.forEach(card => {
        card.addEventListener('click', function() {
            const exchangeUrl = this.getAttribute('data-url');
            console.log('Exchange card clicked:', exchangeUrl);
            
            if (exchangeUrl) {
                // Open exchange URL in new tab
                window.open(exchangeUrl, '_blank');
                
                // For Telegram Mini App, use:
                // if (window.Telegram && window.Telegram.WebApp) {
                //     window.Telegram.WebApp.openLink(exchangeUrl);
                // }
            }
        });
    });
}

function setupReferralLink() {
    console.log('Setting up referral link');
    const copyBtn = document.getElementById('copy-btn');
    const referralInput = document.getElementById('referral-input');
    if (!copyBtn) {
        console.error('Copy button not found!');
        return;
    }
    
    if (!referralInput) {
        console.error('Referral input not found!');
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
            showNotification('Link copied to clipboard!');
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            try {
                document.execCommand('copy');
                console.log('Text copied using fallback method');
                showNotification('Link copied to clipboard!');
            } catch (e) {
                console.error('Fallback copy failed: ', e);
                showNotification('Failed to copy link');
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
        
        // Simulate balance update
        setTimeout(() => {
            // Reset rotation
            this.style.transform = 'rotate(0deg)';
            
            // Simulate small balance change for demo
            const currentBalance = parseInt(balanceAmount.textContent.replace(',', ''));
            const randomChange = Math.floor(Math.random() * 10) - 2; // -2 to +7
            const newBalance = Math.max(0, currentBalance + randomChange);
            
            balanceAmount.textContent = newBalance.toLocaleString();
            
            // Update equivalent USD value
            const usdValue = (newBalance * 0.01).toFixed(2);
            const usdElement = document.querySelector('.balance-equivalent');
            if (usdElement) {
                usdElement.textContent = ≈ $${usdValue};
            }
            
            console.log(Balance updated to: ${newBalance});
        }, 1000);
    });
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
    }, 2000);
}

// Add error handling for missing elements
function checkElements() {
    const requiredElements = [
        'games-section', 'wallet-section', 'profile-section',
        'referral-input', 'copy-btn', 'notification'
    ];
    
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.error(Element with id '${id}' not found!);
        } else {
            console.log(Element '${id}' found);
        }
    });
}

// Check elements on load
setTimeout(checkElements, 100);
// Simulate user activity for demo
function simulateUserActivity() {
    setInterval(() => {
        const balanceElement = document.querySelector('.amount');
        if (balanceElement) {
            const currentBalance = parseInt(balanceElement.textContent.replace(',', ''));
            const randomIncrease = Math.floor(Math.random() * 2); // 0 or 1
            const newBalance = currentBalance + randomIncrease;
            balanceElement.textContent = newBalance.toLocaleString();
            
            const usdValue = (newBalance * 0.01).toFixed(2);
            const usdElement = document.querySelector('.balance-equivalent');
            if (usdElement) {
                usdElement.textContent = ≈ $${usdValue};
            }
        }
    }, 30000);
}

// Start simulation after a delay
setTimeout(simulateUserActivity, 5000);
