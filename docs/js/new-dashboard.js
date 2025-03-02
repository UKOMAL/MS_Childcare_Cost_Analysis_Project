/**
 * new-dashboard.js
 * Handles data processing and visualizations for the U.S. Childcare Cost Analysis Dashboard
 */

console.log("Loading new-dashboard.js...");

// Function to load visualization images
function loadVisualization(type) {
    const container = document.getElementById('mainVisualization');
    container.innerHTML = '<div class="loading-spinner">Loading visualization...</div>';

    try {
        const imagePath = getImagePath(type);
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${type} visualization`;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        
        // Clear container and add image
        container.innerHTML = '';
        container.appendChild(img);
    } catch (error) {
        console.error('Error loading visualization:', error);
        container.innerHTML = '<div class="error">Error loading visualization. Please try again.</div>';
    }
}

// Function to get image path based on visualization type
function getImagePath(type) {
    const imageMap = {
        'timeSeriesAnalysis': '../output/images/time_series.png',
        'urbanRuralComparison': '../output/images/urban_rural_comparison.png',
        'costDistribution': '../output/images/cost_distribution.png',
        'stateCosts': '../output/images/state_costs.png',
        'costMap': '../output/images/childcare_costs_map.png',
        'laborForceMap': '../output/images/female_labor_force.png',
        'correlation': '../output/images/correlation.png',
        'spiralPlot': '../output/images/spiral_plot.png'
    };
    return imageMap[type] || imageMap['timeSeriesAnalysis'];
}

// Function to update visualization based on selection
function updateVisualization() {
    const visualType = document.getElementById('visualizationType').value;
    loadVisualization(visualType);
}

// Function to update year filter visibility
function updateYearFilterVisibility() {
    const yearFilter = document.getElementById('yearFilter');
    // Hide year filter as all visualizations now show full range 2008-2018
    yearFilter.classList.remove('visible');
}

// Initialize visualization when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateVisualization();
    updateYearFilterVisibility();
});
