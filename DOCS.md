# Lenz UI Framework Documentation

## Overview
Lenz is a simple, easy-to-use UI skeleton framework that provides insights on fashion, music, and other trends for influencers and celebrities. It leverages prediction market concepts similar to Kalshi to show probabilities for future trends.

## Features

### 🎯 Core Components
- **Dashboard**: Overview of hot trends and rising predictions across all categories
- **Fashion Trends**: Prediction markets for fashion and style trends
- **Music Trends**: Prediction markets for music and artist trends
- **Other Trends**: Markets for culture, tech, and lifestyle trends

### 📊 Prediction Market Display
Each trend card displays:
- Market probability percentage
- Visual probability bar
- Trading volume
- Number of active traders
- Trend direction and change percentage
- Market deadline

### 🎨 Design Features
- Clean, modern interface
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Category-coded color system
- Intuitive navigation

## Getting Started

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Uzu-Tech/Lenz.git
cd Lenz
```

2. Install dependencies (optional, for development server):
```bash
npm install
```

### Running the Application

#### Option 1: Simple File Open
Simply open `index.html` in your web browser.

#### Option 2: Development Server
```bash
npm start
```
This will start a local server at `http://localhost:8080`

## File Structure
```
Lenz/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css           # Core styles and layout
│   └── components.css     # Component-specific styles
├── js/
│   ├── data.js           # Sample data and data functions
│   ├── components.js     # UI component creators
│   └── app.js            # Main application logic
├── package.json          # Project configuration
└── README.md             # Project overview
```

## Customization

### Adding New Trends
Edit `js/data.js` and add new trend objects to the appropriate category array:

```javascript
{
    id: 13,
    title: "Your Trend Title",
    description: "Trend description",
    category: "fashion", // or "music", "tech", "lifestyle", "culture"
    probability: 75,
    volume: "$3.5K",
    traders: 200,
    trend: "up", // or "down", "neutral"
    changePercent: 10,
    deadline: "June 2026"
}
```

### Styling
Customize colors and design in `styles/main.css` by modifying CSS variables:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... other variables */
}
```

### Adding New Categories
1. Add category data to `js/data.js`
2. Add navigation link in `index.html`
3. Create new page section in `index.html`
4. Add category color in `styles/components.css`
5. Update `loadPageContent()` in `js/app.js`

## UI Components

### Trend Card
Each trend is displayed as a card containing:
- Category badge
- Trend indicator (up/down/neutral)
- Title and description
- Market probability visualization
- Trading statistics

### Statistics Grid
The dashboard displays key metrics:
- Market accuracy
- Number of active trends
- Total market volume
- User confidence level

## Future Enhancements
- Real-time data integration
- User authentication
- Trading functionality
- Historical trend analysis
- Social sharing features
- Mobile app version
- API integration with actual prediction markets

## Technology Stack
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No framework dependencies for simplicity
- **Responsive Design**: Mobile-first approach

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
Feel free to submit issues and enhancement requests!

## License
MIT License - see LICENSE file for details
