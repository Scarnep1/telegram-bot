// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    initializeApp();
});

function initializeApp() {
    console.log('Setting up app functionality');
    
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
    
    // Show initial section
    showSection('games-section');
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    navItems.forEach(nav => {
        nav.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Activate corresponding nav item
    const activeNav = document.querySelector([data-section="${sectionId}"]);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    console.log('Navigation items found:', navItems.length);
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetSection = this.getAttribute('data-section');
            console.log('Navigation clicked:', targetSection);
            
            if (targetSection) {
                showSection(targetSection);
            }
        });
    });
}

function setupGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    console.log('Game cards found:', gameCards.length);
    
    gameCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const botUsername = this.getAttribute('data-bot');
            console.log('Game card clicked:', botUsername);
            
            if (botUsername) {
                if (window.Telegram && window.Telegram.WebApp) {
                    // Telegram Mini App environment
                    window.Telegram.WebApp.openTelegramLink(https://t.me/${botUsername});
                } else {
                    // Regular web environment
                    const confirmed = confirm(Open ${botUsername}?);
                    if (confirmed) {
                        window.open(https://t.me/${botUsername}, '_blank');
                    }
                }
            }
        });
    });
}

function setupExchangeCards() {
    const exchangeCards = document.querySelectorAll('.exchange-card');
    console.log('Exchange cards found:', exchangeCards.length);
    
    exchangeCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const exchangeUrl = this.getAttribute('data-url');
            console.log('Exchange card clicked:', exchangeUrl);
            
            if (exchangeUrl) {
                if (window.Telegram && window.Telegram.WebApp) {
                    window.Telegram.WebApp.openLink(exchangeUrl);
                } else {
                    const confirmed = confirm(Open ${exchangeUrl}?);
                    if (confirmed) {
                        window.open(exchangeUrl, '_blank');
                    }
                }
            }
        });
    });
}
function setupReferralLink() {
    const copyBtn = document.getElementById('copy-btn');
    const referralInput = document.getElementById('referral-input');
    const notification = document.getElementById('notification');
    
    if (copyBtn && referralInput && notification) {
        console.log('Referral link setup complete');
        
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Copy button clicked');
            
            // Select the text field
            referralInput.select();
            referralInput.setSelectionRange(0, 99999);
            
            // Copy using modern API with fallback
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(referralInput.value).then(function() {
                    showNotification('Link copied to clipboard!');
                }).catch(function(err) {
                    console.error('Clipboard API error:', err);
                    fallbackCopy();
                });
            } else {
                fallbackCopy();
            }
        });
        
        function fallbackCopy() {
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showNotification('Link copied to clipboard!');
                } else {
                    showNotification('Failed to copy link');
                }
            } catch (err) {
                console.error('Fallback copy error:', err);
                showNotification('Error copying link');
            }
        }
        
        function showNotification(message) {
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(function() {
                notification.classList.remove('show');
            }, 2000);
        }
    } else {
        console.warn('Referral elements not found');
    }
}

function setupBalanceRefresh() {
    const refreshBtn = document.querySelector('.balance-refresh');
    const balanceAmount = document.querySelector('.amount');
    
    if (refreshBtn && balanceAmount) {
        console.log('Balance refresh setup complete');
        
        refreshBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Balance refresh clicked');
            
            // Add rotation animation
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'rotate(360deg)';
            
            // Simulate API call
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
                
                const currentBalance = parseInt(balanceAmount.textContent.replace(',', '')) || 1540;
                const randomChange = Math.floor(Math.random() * 10) - 2; // -2 to +7
                const newBalance = Math.max(1000, currentBalance + randomChange);
                
                balanceAmount.textContent = newBalance.toLocaleString();
                
                const usdValue = (newBalance * 0.01).toFixed(2);
                const usdElement = document.querySelector('.balance-equivalent');
                if (usdElement) {
                    usdElement.textContent = ≈ $${usdValue};
                }
            }, 1000);
        });
    } else {
        console.warn('Balance refresh elements not found');
    }
}

// Enhanced Telegram Web App integration
function initTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        console.log('Telegram WebApp detected');
        
        // Expand the app to full height
  window.Telegram.WebApp.expand();
        
        // Set theme parameters
        const themeParams = window.Telegram.WebApp.themeParams;
        if (themeParams) {
            document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color || '#ffffff');
            document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color || '#000000');
            document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color || '#667eea');
            document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color || '#ffffff');
        }
        
        // Enable closing confirmation
        window.Telegram.WebApp.enableClosingConfirmation();
        
        // Back button handling
        window.Telegram.WebApp.BackButton.onClick(function() {
            window.Telegram.WebApp.close();
        });
    } else {
        console.log('Regular browser environment');
    }
}

// Initialize Telegram integration
initTelegramWebApp();

// Add hover effects for desktop
function addHoverEffects() {
    const cards = document.querySelectorAll('.game-card, .exchange-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize hover effects
addHoverEffects();

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

console.log('App setup completed successfully');
