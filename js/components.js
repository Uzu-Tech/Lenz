// Component functions for creating UI elements

function createTrendCard(trend) {
    const card = document.createElement('div');
    card.className = 'trend-card';
    
    const trendDirection = trend.trend === 'up' ? '↑' : trend.trend === 'down' ? '↓' : '→';
    const trendClass = trend.trend === 'up' ? 'trend-up' : trend.trend === 'down' ? 'trend-down' : 'trend-neutral';
    
    card.innerHTML = `
        <div class="trend-header">
            <span class="trend-category category-${trend.category}">${trend.category}</span>
            <span class="trend-indicator ${trendClass}">
                ${trendDirection} ${trend.changePercent}%
            </span>
        </div>
        <h4 class="trend-title">${trend.title}</h4>
        <p class="trend-description">${trend.description}</p>
        
        <div class="market-section">
            <div class="market-label">Market Probability</div>
            <div class="probability-bar">
                <div class="probability-fill" style="width: ${trend.probability}%"></div>
            </div>
            <div class="probability-value">${trend.probability}%</div>
            
            <div class="market-stats">
                <div class="market-stat">
                    <div class="market-stat-value">${trend.volume}</div>
                    <div class="market-stat-label">Volume</div>
                </div>
                <div class="market-stat">
                    <div class="market-stat-value">${trend.traders}</div>
                    <div class="market-stat-label">Traders</div>
                </div>
                <div class="market-stat">
                    <div class="market-stat-value">${trend.deadline}</div>
                    <div class="market-stat-label">Deadline</div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function renderTrends(container, trends) {
    const element = document.getElementById(container);
    if (!element) return;
    
    element.innerHTML = '';
    
    if (trends.length === 0) {
        element.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <div class="empty-state-text">No trends available at the moment</div>
            </div>
        `;
        return;
    }
    
    trends.forEach(trend => {
        const card = createTrendCard(trend);
        element.appendChild(card);
    });
}

function showLoading(container) {
    const element = document.getElementById(container);
    if (!element) return;
    
    element.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}
