// Sample data for Lenz prediction markets
const trendsData = {
    fashion: [
        {
            id: 1,
            title: "Y2K Fashion Comeback",
            description: "Low-rise jeans and butterfly clips making a major return",
            category: "fashion",
            probability: 78,
            volume: "$2.4K",
            traders: 156,
            trend: "up",
            changePercent: 12,
            deadline: "March 2026"
        },
        {
            id: 2,
            title: "Sustainable Fashion Dominance",
            description: "Eco-friendly materials will become mainstream in luxury fashion",
            category: "fashion",
            probability: 85,
            volume: "$5.2K",
            traders: 234,
            trend: "up",
            changePercent: 8,
            deadline: "June 2026"
        },
        {
            id: 3,
            title: "Maximalist Jewelry Trend",
            description: "Bold, oversized jewelry pieces will dominate fashion runways",
            category: "fashion",
            probability: 62,
            volume: "$1.8K",
            traders: 98,
            trend: "up",
            changePercent: 15,
            deadline: "April 2026"
        },
        {
            id: 4,
            title: "Gender-Neutral Fashion",
            description: "Major brands will pivot to gender-neutral clothing lines",
            category: "fashion",
            probability: 71,
            volume: "$3.1K",
            traders: 187,
            trend: "up",
            changePercent: 6,
            deadline: "May 2026"
        }
    ],
    music: [
        {
            id: 5,
            title: "Hyperpop Goes Mainstream",
            description: "Hyperpop genre will dominate streaming charts in 2026",
            category: "music",
            probability: 68,
            volume: "$3.5K",
            traders: 198,
            trend: "up",
            changePercent: 18,
            deadline: "April 2026"
        },
        {
            id: 6,
            title: "Vinyl Sales Surge",
            description: "Vinyl record sales will surpass CD sales globally",
            category: "music",
            probability: 82,
            volume: "$4.2K",
            traders: 267,
            trend: "up",
            changePercent: 5,
            deadline: "July 2026"
        },
        {
            id: 7,
            title: "AI-Generated Music Charts",
            description: "AI-created songs will appear in top 100 charts",
            category: "music",
            probability: 55,
            volume: "$2.9K",
            traders: 142,
            trend: "up",
            changePercent: 22,
            deadline: "August 2026"
        },
        {
            id: 8,
            title: "K-Pop Global Expansion",
            description: "K-Pop will become the #1 genre in Western markets",
            category: "music",
            probability: 73,
            volume: "$5.8K",
            traders: 312,
            trend: "up",
            changePercent: 9,
            deadline: "June 2026"
        }
    ],
    other: [
        {
            id: 9,
            title: "Virtual Reality Social Spaces",
            description: "VR will become primary social platform for Gen Z",
            category: "tech",
            probability: 64,
            volume: "$4.5K",
            traders: 223,
            trend: "up",
            changePercent: 11,
            deadline: "September 2026"
        },
        {
            id: 10,
            title: "Plant-Based Diet Majority",
            description: "Plant-based diets will be adopted by 40%+ of US population",
            category: "lifestyle",
            probability: 58,
            volume: "$3.2K",
            traders: 176,
            trend: "up",
            changePercent: 14,
            deadline: "December 2026"
        },
        {
            id: 11,
            title: "Short-Form Video Dominance",
            description: "Short-form video will consume 80%+ of social media time",
            category: "culture",
            probability: 88,
            volume: "$6.1K",
            traders: 398,
            trend: "up",
            changePercent: 4,
            deadline: "May 2026"
        },
        {
            id: 12,
            title: "Remote Work Permanence",
            description: "50%+ of knowledge workers will remain fully remote",
            category: "lifestyle",
            probability: 76,
            volume: "$5.4K",
            traders: 289,
            trend: "up",
            changePercent: 7,
            deadline: "August 2026"
        }
    ]
};

// Get hot trends (highest probability across all categories)
function getHotTrends() {
    const allTrends = [...trendsData.fashion, ...trendsData.music, ...trendsData.other];
    return allTrends
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3);
}

// Get rising trends (highest change percent)
function getRisingTrends() {
    const allTrends = [...trendsData.fashion, ...trendsData.music, ...trendsData.other];
    return allTrends
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 3);
}
