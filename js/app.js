// Main application logic

// Navigation handling
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding page
            const pageName = link.dataset.page;
            const page = document.getElementById(`${pageName}-page`);
            if (page) {
                page.classList.add('active');
            }
            
            // Load page content
            loadPageContent(pageName);
        });
    });
}

// Load content for each page
function loadPageContent(pageName) {
    switch(pageName) {
        case 'dashboard':
            renderTrends('hot-trends', getHotTrends());
            renderTrends('rising-trends', getRisingTrends());
            break;
        case 'fashion':
            renderTrends('fashion-trends', trendsData.fashion);
            break;
        case 'music':
            renderTrends('music-trends', trendsData.music);
            break;
        case 'other':
            renderTrends('other-trends', trendsData.other);
            break;
    }
}

// Initialize the app
function init() {
    console.log('Lenz UI Framework initialized');
    
    // Set up navigation
    initNavigation();
    
    // Load initial dashboard content
    loadPageContent('dashboard');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
