/**
 * new-dashboard.js
 * Handles data processing and visualizations for the U.S. Childcare Cost Analysis Dashboard
 */

console.log("Loading new-dashboard.js...");

// Global variables
let currentYear = '2018';

// Define which visualizations should show the year filter
const timeBasedVisualizations = ['geoChoropleth', 'timeSeriesAnalysis', 'laborForceMap'];

// Define which visualizations are interactive vs static images
const staticVisualizations = ['violinPlot', 'correlation', 'costTrends', 'spiralPlot'];

// Map visualization types to their image files
const visualizationImages = {
    'violinPlot': '../images/urban_rural_comparison.png',
    'correlation': '../images/correlation.png',
    'costTrends': '../images/state_costs.png',
    'spiralPlot': '../images/spiral_plot.png',
    'socialMedia': '../images/cost_distribution.png'
};

/**
 * Status message functions
 * @param {string} message - The message to display
 * @param {string} type - The type of message (info, success, error, warning)
 */
function showStatus(message, type = 'info') {
    console.log(`Status: ${message} (${type})`);
    const statusElement = document.getElementById('statusMessage');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = 'status-message';
        
        switch(type) {
            case 'success':
                statusElement.classList.add('status-success');
                break;
            case 'error':
                statusElement.classList.add('status-error');
                break;
            case 'warning':
                statusElement.classList.add('status-warning');
                break;
            default:
                statusElement.classList.add('status-info');
        }
    }
}

/**
 * Update insights panel with statistics
 */
function updateInsights(visualType) {
    // Sample insights based on visualization type
    const insights = {
        'geoChoropleth': [
            'Highest childcare costs are in Northeast and West Coast states',
            'Rural states generally have lower childcare costs',
            'Cost variations can exceed 300% between states'
        ],
        'timeSeriesAnalysis': [
            'Childcare costs have risen 25% faster than inflation',
            'The steepest increases occurred between 2014-2016',
            'Regional cost differences have widened over time'
        ],
        'laborForceMap': [
            'States with higher childcare costs often have higher female labor participation',
            'Subsidized childcare correlates with 15% higher workforce participation',
            'Rural areas show lower participation rates on average'
        ],
        'default': [
            'Average families spend between $11,000 to $21,500 annually on childcare',
            'Northeast states show highest costs, averaging $18,000+ annually',
            'Annual costs increasing by 3.5-4.5% across regions'
        ]
    };
    
    // Get the insight cards
    const insightCards = document.querySelectorAll('.insight-card p');
    if (insightCards.length === 0) return;
    
    // Update with appropriate insights
    const selectedInsights = insights[visualType] || insights['default'];
    insightCards.forEach((card, index) => {
        if (index < selectedInsights.length) {
            card.textContent = selectedInsights[index];
        }
    });
}

/**
 * Create US map visualization (interactive)
 */
function createHeatMap(container, year, baseLayout) {
    // Sample data for demonstration
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"];
    
    // Get costs for the selected year (using sample data)
    const yearIndex = ['2018', '2017', '2016', '2015', '2014', '2012', '2010', '2008'].indexOf(year);
    const yearOffset = yearIndex >= 0 ? yearIndex * 0.05 : 0; // Decrease values for older years
    
    // Generate sample costs with variation by year
    const costs = states.map((state, i) => {
        const baseValue = 5000 + (i % 10) * 1000 + Math.random() * 2000;
        return Math.round(baseValue * (1 - yearOffset));
    });
    
    const text = states.map((state, i) => {
        return `<b>${state}</b><br>Annual Cost: $${costs[i].toLocaleString()}`;
    });
    
    const data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: states,
        z: costs,
        text: text,
        hoverinfo: 'text',
        colorscale: 'Viridis',
        colorbar: {
            title: 'Annual Cost ($)',
            thickness: 20,
            tickformat: '$,.0f'
        },
        marker: {
            line: {
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];
    
    const layout = {
        ...baseLayout,
        title: {
            text: `Average Childcare Costs by State (${year})`,
            font: { size: 24 }
        },
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)',
            projection: {
                type: 'albers usa'
            }
        },
        margin: {
            l: 0,
            r: 0,
            t: 50,
            b: 0
        }
    };
    
    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating heat map:', err);
            container.innerHTML = '<div class="error">Error creating heat map visualization</div>';
        });
}

/**
 * Create time series analysis visualization (interactive)
 */
function createTimeSeries(container, year, baseLayout) {
    // Define regions and their states
    const regions = {
        'Northeast': ['CT', 'ME', 'MA', 'NH', 'RI', 'VT', 'NY', 'NJ', 'PA'],
        'Southeast': ['DE', 'FL', 'GA', 'MD', 'NC', 'SC', 'VA', 'WV', 'AL', 'KY', 'MS', 'TN', 'AR', 'LA'],
        'Midwest': ['IL', 'IN', 'MI', 'OH', 'WI', 'IA', 'KS', 'MN', 'MO', 'NE', 'ND', 'SD'],
        'Southwest': ['AZ', 'NM', 'OK', 'TX'],
        'West': ['AK', 'CA', 'HI', 'OR', 'WA', 'CO', 'ID', 'MT', 'NV', 'UT', 'WY']
    };

    // Colors for each region
    const regionColors = {
        'Northeast': '#1f77b4',
        'Southeast': '#ff7f0e',
        'Midwest': '#2ca02c',
        'Southwest': '#d62728',
        'West': '#9467bd'
    };

    // Years to analyze
    const years = [2008, 2010, 2012, 2014, 2015, 2016, 2017, 2018];

    // Generate sample data for each region
    const regionData = {};
    Object.keys(regions).forEach(region => {
        // Base values for each region
        let baseValue;
        switch(region) {
            case 'Northeast': baseValue = 15000; break;
            case 'West': baseValue = 14000; break;
            case 'Midwest': baseValue = 12000; break;
            case 'Southwest': baseValue = 11000; break;
            case 'Southeast': baseValue = 10000; break;
            default: baseValue = 12000;
        }
        
        // Generate yearly data with increasing trend
        regionData[region] = {
            x: years,
            y: years.map((year, i) => {
                // Increase by ~3% per year from 2008
                const yearFactor = 1 + (year - 2008) * 0.03;
                // Add some random variation
                const randomFactor = 0.95 + Math.random() * 0.1;
                return Math.round(baseValue * yearFactor * randomFactor);
            }),
            name: region,
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: regionColors[region],
                width: 3
            },
            marker: {
                size: 8,
                symbol: 'circle'
            },
            hovertemplate: '%{y:$,.0f}<br>%{x}<extra>%{name}</extra>'
        };
    });

    const layout = {
        ...baseLayout,
        title: {
            text: 'Regional Childcare Cost Trends (2008-2018)',
            font: {
                size: 24
            }
        },
        xaxis: {
            title: 'Year',
            tickmode: 'array',
            ticktext: years,
            tickvals: years,
            showgrid: true,
            gridwidth: 1,
            gridcolor: '#f0f0f0'
        },
        yaxis: {
            title: 'Annual Cost ($)',
            range: [8000, 20000],
            showgrid: true,
            gridwidth: 1,
            gridcolor: '#f0f0f0',
            tickformat: '$,.0f'
        },
        showlegend: true,
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1
        },
        hovermode: 'closest',
        plot_bgcolor: 'white',
        paper_bgcolor: 'white'
    };

    Plotly.newPlot(container.id, Object.values(regionData), layout, {responsive: true})
        .catch(err => {
            console.error('Error creating time series:', err);
            container.innerHTML = '<div class="error">Error creating time series visualization</div>';
        });
}

/**
 * Create labor force map visualization (interactive)
 */
function createLaborForceMap(container, year, baseLayout) {
    // Sample data for demonstration
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"];
    
    // Get labor force participation for the selected year (using sample data)
    const yearIndex = ['2018', '2017', '2016', '2015', '2014', '2012', '2010', '2008'].indexOf(year);
    const yearOffset = yearIndex >= 0 ? yearIndex * 0.01 : 0; // Decrease values for older years
    
    // Generate sample participation rates with variation by year
    const participationRates = states.map((state, i) => {
        const baseValue = 55 + (i % 15) * 1.5 + Math.random() * 5;
        return Math.round((baseValue * (1 - yearOffset)) * 10) / 10; // Round to 1 decimal place
    });
    
    const text = states.map((state, i) => {
        return `<b>${state}</b><br>Female Labor Participation: ${participationRates[i]}%`;
    });
    
    const data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: states,
        z: participationRates,
        text: text,
        hoverinfo: 'text',
        colorscale: 'Viridis',
        colorbar: {
            title: 'Participation (%)',
            thickness: 20
        },
        marker: {
            line: {
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];
    
    const layout = {
        ...baseLayout,
        title: {
            text: `Female Labor Force Participation by State (${year})`,
            font: { size: 24 }
        },
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)',
            projection: {
                type: 'albers usa'
            }
        },
        margin: {
            l: 0,
            r: 0,
            t: 50,
            b: 0
        }
    };
    
    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating labor force map:', err);
            container.innerHTML = '<div class="error">Error creating labor force map visualization</div>';
        });
}

/**
 * Display static image visualization
 */
function displayStaticVisualization(container, visualType) {
    // Clear the container
    container.innerHTML = '';
    
    // Create image element
    const img = document.createElement('img');
    img.src = visualizationImages[visualType];
    img.alt = `${visualType} Visualization`;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    img.style.margin = '0 auto';
    
    // Add image to container
    container.appendChild(img);
}

/**
 * Update year filter visibility based on visualization type
 */
function updateYearFilterVisibility() {
    const visualType = document.getElementById('visualizationType').value;
    const yearFilter = document.getElementById('yearFilter');
    
    if (timeBasedVisualizations.includes(visualType)) {
        yearFilter.classList.add('visible');
    } else {
        yearFilter.classList.remove('visible');
    }
}

/**
 * Update visualization based on user selection
 */
function updateVisualization() {
    const container = document.getElementById('mainVisualization');
    const visualType = document.getElementById('visualizationType').value;
    const yearFilter = document.getElementById('yearFilter');
    const selectedYear = yearFilter.value || '2018';
    
    currentYear = selectedYear;
    
    if (!container) {
        console.error('Visualization container not found!');
        return;
    }
    
    // Show loading state
    container.innerHTML = '<div class="loading-spinner"><p>Loading visualization...</p></div>';
    
    // Update insights based on visualization type
    updateInsights(visualType);
    
    // Calculate container dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const headerHeight = 120;
    const marginBottom = 20;
    const marginSides = 40;
    
    container.style.width = `${viewportWidth - marginSides}px`;
    container.style.height = `${Math.min(800, Math.max(400, viewportHeight - headerHeight - marginBottom))}px`;
    container.style.maxWidth = '2000px';
    container.style.margin = '0 auto';
    
    const baseLayout = {
        autosize: true,
        margin: {
            l: 60,
            r: 30,
            t: 50,
            b: 60,
            pad: 4
        },
        width: container.clientWidth,
        height: container.clientHeight,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            family: 'Arial, sans-serif'
        }
    };
    
    try {
        // Check if this is a static or interactive visualization
        if (staticVisualizations.includes(visualType) || visualType === 'socialMedia') {
            displayStaticVisualization(container, visualType);
        } else {
            // Interactive visualizations
            switch(visualType) {
                case 'geoChoropleth':
                    createHeatMap(container, selectedYear, baseLayout);
                    break;
                case 'timeSeriesAnalysis':
                    createTimeSeries(container, selectedYear, baseLayout);
                    break;
                case 'laborForceMap':
                    createLaborForceMap(container, selectedYear, baseLayout);
                    break;
                default:
                    container.innerHTML = '<div class="error">Invalid visualization type</div>';
            }
        }
    } catch (error) {
        console.error('Error updating visualization:', error);
        container.innerHTML = '<div class="error">Error creating visualization</div>';
    }
}

/**
 * Initialize dashboard
 */
function initDashboard() {
    console.log("Initializing dashboard...");
    
    // Check if Plotly is available
    if (typeof Plotly === 'undefined') {
        console.error("Plotly library not loaded!");
        showStatus('Error: Plotly library not loaded', 'error');
        return;
    }
    
    console.log("Plotly is available, setting up event listeners...");
    
    // Set up event listeners
    const visualTypeSelect = document.getElementById('visualizationType');
    const yearFilter = document.getElementById('yearFilter');
    
    if (visualTypeSelect) {
        visualTypeSelect.addEventListener('change', function() {
            updateYearFilterVisibility();
            updateVisualization();
        });
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', updateVisualization);
    }
    
    // Initial visualization
    console.log("Starting initial visualization...");
    updateYearFilterVisibility();
    updateVisualization();
    
    console.log("Dashboard initialization complete!");
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing dashboard...");
    try {
        initDashboard();
    } catch (error) {
        console.error("Error initializing dashboard:", error);
        showStatus('Error initializing dashboard: ' + error.message, 'error');
    }
});

// Update window resize handler
window.addEventListener('resize', () => {
    const container = document.getElementById('mainVisualization');
    if (container) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const headerHeight = 120;
        const marginBottom = 20;
        const marginSides = 40;
        
        container.style.width = `${viewportWidth - marginSides}px`;
        container.style.height = `${Math.min(800, Math.max(400, viewportHeight - headerHeight - marginBottom))}px`;
        container.style.maxWidth = '2000px';
        
        // Only resize Plotly plots, not static images
        const visualType = document.getElementById('visualizationType').value;
        if (!staticVisualizations.includes(visualType) && visualType !== 'socialMedia') {
            Plotly.Plots.resize(container);
        }
    }
}); 