/**
 * new-dashboard.js
 * Handles data processing and visualizations for the U.S. Childcare Cost Analysis Dashboard
 */

console.log("Loading new-dashboard.js...");

// Global variables
let currentVisualization = 'geoChoropleth';
let currentYear = '2018';

// Constants
const VISUALIZATION_TYPES = {
    'geoChoropleth': 'Cost Distribution Map',
    'laborForceMap': 'Female Labor Force Map',
    'timeSeriesAnalysis': 'Regional Cost Trends',
    'costTrends': 'State Cost Comparison',
    'violinPlot': 'Urban/Rural Cost Comparison',
    'correlation': 'Cost Correlation Analysis',
    'socialMedia': 'Cost Distribution',
    'spiralPlot': 'Cost Trends (Spiral View)'
};

const YEAR_FILTER_VISUALIZATIONS = ['geoChoropleth', 'laborForceMap'];

// Define which visualizations are interactive vs static images
const staticVisualizations = ['violinPlot', 'correlation', 'costTrends', 'spiralPlot', 'socialMedia'];

// Map visualization types to their image files
const visualizationImages = {
    'violinPlot': 'images/urban_rural_comparison.png',
    'correlation': 'images/correlation.png',
    'costTrends': 'images/state_costs.png',
    'spiralPlot': 'images/spiral_plot.png',
    'socialMedia': 'images/cost_distribution.png'
};

// Define chart colors and styling
const chartColors = {
    primary: '#4E54C8',
    secondary: '#764BA2',
    accent: '#FF6B6B',
    background: 'rgba(255, 255, 255, 0.9)',
    text: '#333',
    grid: 'rgba(200, 200, 200, 0.3)'
};

// Define common chart font settings
const chartFont = {
    family: 'Arial, sans-serif',
    size: 18,
    color: '#333'
};

const chartTitle = {
    font: {
        family: 'Arial, sans-serif',
        size: 26,
        color: '#4E54C8',
        weight: 'bold'
    },
    xref: 'paper',
    x: 0.5
};

// Helper functions
function showStatus(message, isError = false) {
    const container = document.getElementById('mainVisualization');
    if (!container) return;
    
    container.innerHTML = '';
    
    const statusElement = document.createElement('div');
    statusElement.className = isError ? 'error' : 'loading-spinner';
    statusElement.textContent = message;
    statusElement.style.fontSize = '1.5em';
    
    container.appendChild(statusElement);
}

function updateInsights(dataType) {
    const insightCards = document.querySelectorAll('.insight-card');
    
    if (dataType === 'geoChoropleth') {
        if (insightCards.length >= 1 && insightCards[0].querySelector('p')) {
            insightCards[0].querySelector('p').textContent = 'Average families spend between $11,000 to $21,500 annually on childcare';
        }
        if (insightCards.length >= 2 && insightCards[1].querySelector('p')) {
            insightCards[1].querySelector('p').textContent = 'Northeast states show highest costs, averaging $18,000+ annually';
        }
        if (insightCards.length >= 3 && insightCards[2].querySelector('p')) {
            insightCards[2].querySelector('p').textContent = 'Annual costs increasing by 3.5-4.5% across regions';
        }
    } else if (dataType === 'laborForceMap') {
        if (insightCards.length >= 1 && insightCards[0].querySelector('p')) {
            insightCards[0].querySelector('p').textContent = 'States with higher childcare costs show 5-8% lower female workforce participation';
        }
        if (insightCards.length >= 2 && insightCards[1].querySelector('p')) {
            insightCards[1].querySelector('p').textContent = 'Midwest states maintain higher female employment despite rising costs';
        }
        if (insightCards.length >= 3 && insightCards[2].querySelector('p')) {
            insightCards[2].querySelector('p').textContent = 'Urban areas show 12% higher female employment rates than rural areas';
        }
    } else if (dataType === 'timeSeriesAnalysis') {
        if (insightCards.length >= 1 && insightCards[0].querySelector('p')) {
            insightCards[0].querySelector('p').textContent = 'Costs have risen 23% on average since 2008 across all regions';
        }
        if (insightCards.length >= 2 && insightCards[1].querySelector('p')) {
            insightCards[1].querySelector('p').textContent = 'Western states experienced the fastest growth at 4.2% annually';
        }
        if (insightCards.length >= 3 && insightCards[2].querySelector('p')) {
            insightCards[2].querySelector('p').textContent = 'Economic downturns correlate with temporary plateaus in cost increases';
        }
    } else {
        // Default insights for other visualizations
        if (insightCards.length >= 1 && insightCards[0].querySelector('p')) {
            insightCards[0].querySelector('p').textContent = 'Average families spend between $11,000 to $21,500 annually on childcare';
        }
        if (insightCards.length >= 2 && insightCards[1].querySelector('p')) {
            insightCards[1].querySelector('p').textContent = 'Northeast states show highest costs, averaging $18,000+ annually';
        }
        if (insightCards.length >= 3 && insightCards[2].querySelector('p')) {
            insightCards[2].querySelector('p').textContent = 'Annual costs increasing by 3.5-4.5% across regions';
        }
    }
}

// Interactive Visualization Functions
function createHeatMap(year) {
    const container = document.getElementById('mainVisualization');
    if (!container) return;
    
    // Sample data for demonstration
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    
    // Generate sample costs with variation by year
    const yearIndex = ['2018', '2017', '2016', '2015', '2014', '2012', '2010', '2008'].indexOf(year);
    const yearOffset = yearIndex >= 0 ? yearIndex * 0.05 : 0; // Decrease values for older years
    
    const costs = states.map((state, i) => {
        const baseValue = 0.15 + (i % 10) * 0.02 + Math.random() * 0.05;
        return baseValue * (1 - yearOffset);
    });
    
    const text = states.map((state, i) => {
        return `${state}<br>Cost to Income Ratio: ${costs[i].toFixed(2)}`;
    });
    
    // Create the heatmap
    const trace = {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: states,
        z: costs,
        text: text,
        colorscale: [
            [0, 'rgba(255, 255, 255, 0.8)'],
            [0.2, 'rgba(255, 235, 235, 0.8)'],
            [0.4, 'rgba(255, 205, 205, 0.8)'],
            [0.6, 'rgba(255, 175, 175, 0.8)'],
            [0.8, 'rgba(255, 145, 145, 0.8)'],
            [1, 'rgba(255, 115, 115, 0.8)']
        ],
        colorbar: {
            title: {
                text: 'Cost to Income Ratio',
                font: {
                    family: chartFont.family,
                    size: 20,
                    color: chartColors.primary
                }
            },
            tickfont: {
                family: chartFont.family,
                size: 18,
                color: chartColors.text
            }
        },
        hoverinfo: 'text'
    };
    
    const layout = {
        title: {
            text: `Childcare Cost Burden by State (${year})`,
            font: chartTitle.font,
            xref: chartTitle.xref,
            x: chartTitle.x
        },
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(240, 245, 255)',
            projection: {
                type: 'albers usa'
            },
            bgcolor: 'rgba(255, 255, 255, 0.0)'
        },
        margin: {
            l: 60,
            r: 60,
            t: 80,
            b: 60
        },
        paper_bgcolor: chartColors.background,
        plot_bgcolor: chartColors.background,
        font: chartFont
    };
    
    Plotly.newPlot(container, [trace], layout, {responsive: true});
}

function createTimeSeries() {
    const container = document.getElementById('mainVisualization');
    if (!container) return;
    
    // Sample data for demonstration
    const regions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'];
    const years = [2008, 2010, 2012, 2014, 2015, 2016, 2017, 2018];
    
    const traces = regions.map((region, i) => {
        // Base values for each region
        let baseValue;
        switch(region) {
            case 'Northeast': baseValue = 0.25; break;
            case 'West': baseValue = 0.23; break;
            case 'Midwest': baseValue = 0.20; break;
            case 'Southwest': baseValue = 0.18; break;
            case 'Southeast': baseValue = 0.17; break;
            default: baseValue = 0.20;
        }
        
        // Generate yearly data with increasing trend
        const yearlyValues = years.map((year, j) => {
            // Increase by ~3% per year from 2008
            const yearFactor = 1 + (year - 2008) * 0.03;
            // Add some random variation
            const randomFactor = 0.95 + Math.random() * 0.1;
            return baseValue * yearFactor * randomFactor;
        });
        
        return {
            x: years,
            y: yearlyValues,
            type: 'scatter',
            mode: 'lines+markers',
            name: region,
            line: {
                width: 3
            },
            marker: {
                size: 10
            }
        };
    });
    
    const layout = {
        title: {
            text: 'Regional Childcare Cost Trends (2008-2018)',
            font: chartTitle.font,
            xref: chartTitle.xref,
            x: chartTitle.x
        },
        xaxis: {
            title: {
                text: 'Year',
                font: {
                    family: chartFont.family,
                    size: 20,
                    color: chartColors.primary
                }
            },
            tickfont: {
                family: chartFont.family,
                size: 18,
                color: chartColors.text
            },
            gridcolor: chartColors.grid
        },
        yaxis: {
            title: {
                text: 'Average Cost to Income Ratio',
                font: {
                    family: chartFont.family,
                    size: 20,
                    color: chartColors.primary
                }
            },
            tickfont: {
                family: chartFont.family,
                size: 18,
                color: chartColors.text
            },
            gridcolor: chartColors.grid
        },
        legend: {
            font: {
                family: chartFont.family,
                size: 18,
                color: chartColors.text
            },
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            bordercolor: 'rgba(200, 200, 200, 0.5)',
            borderwidth: 1
        },
        margin: {
            l: 80,
            r: 50,
            t: 80,
            b: 80
        },
        paper_bgcolor: chartColors.background,
        plot_bgcolor: chartColors.background,
        font: chartFont
    };
    
    Plotly.newPlot(container, traces, layout, {responsive: true});
}

function createLaborForceMap(year) {
    const container = document.getElementById('mainVisualization');
    if (!container) return;
    
    // Sample data for demonstration
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    
    // Generate sample participation rates with variation by year
    const yearIndex = ['2018', '2017', '2016', '2015', '2014', '2012', '2010', '2008'].indexOf(year);
    const yearOffset = yearIndex >= 0 ? yearIndex * 0.01 : 0; // Decrease values for older years
    
    const participationRates = states.map((state, i) => {
        const baseValue = 55 + (i % 15) * 1.5 + Math.random() * 5;
        return Math.round((baseValue * (1 - yearOffset)) * 10) / 10; // Round to 1 decimal place
    });
    
    const text = states.map((state, i) => {
        return `${state}<br>Female Labor Participation: ${participationRates[i]}%`;
    });
    
    // Prepare data for the map
    const trace = {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: states,
        z: participationRates,
        text: text,
        colorscale: [
            [0, 'rgba(240, 240, 255, 0.8)'],
            [0.2, 'rgba(220, 220, 255, 0.8)'],
            [0.4, 'rgba(200, 200, 255, 0.8)'],
            [0.6, 'rgba(180, 180, 255, 0.8)'],
            [0.8, 'rgba(160, 160, 255, 0.8)'],
            [1, 'rgba(140, 140, 255, 0.8)']
        ],
        colorbar: {
            title: {
                text: 'Female Labor Force Participation (%)',
                font: {
                    family: chartFont.family,
                    size: 20,
                    color: chartColors.primary
                }
            },
            tickfont: {
                family: chartFont.family,
                size: 18,
                color: chartColors.text
            }
        },
        hoverinfo: 'text'
    };
    
    const layout = {
        title: {
            text: `Female Labor Force Participation by State (${year})`,
            font: chartTitle.font,
            xref: chartTitle.xref,
            x: chartTitle.x
        },
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(240, 245, 255)',
            projection: {
                type: 'albers usa'
            },
            bgcolor: 'rgba(255, 255, 255, 0.0)'
        },
        margin: {
            l: 60,
            r: 60,
            t: 80,
            b: 60
        },
        paper_bgcolor: chartColors.background,
        plot_bgcolor: chartColors.background,
        font: chartFont
    };
    
    Plotly.newPlot(container, [trace], layout, {responsive: true});
}

// Static Visualization Functions
function displayStaticVisualization(visualizationType) {
    const container = document.getElementById('mainVisualization');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Use the visualizationImages object for consistency
    const imagePath = visualizationImages[visualizationType];
    
    if (imagePath) {
        console.log(`Loading static image: ${imagePath}`);
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = VISUALIZATION_TYPES[visualizationType];
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        img.onerror = function() {
            console.error(`Failed to load image: ${imagePath}`);
            container.innerHTML = `<div class="error" style="font-size: 1.5em;">Failed to load visualization image: ${VISUALIZATION_TYPES[visualizationType]}</div>`;
        };
        container.appendChild(img);
        
        // Add a note for the state costs visualization about NaN values
        if (visualizationType === 'costTrends') {
            const noteDiv = document.createElement('div');
            noteDiv.style.textAlign = 'center';
            noteDiv.style.marginTop = '15px';
            noteDiv.style.padding = '10px';
            noteDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            noteDiv.style.borderRadius = '8px';
            noteDiv.style.fontSize = '1.2em';
            noteDiv.style.color = '#666';
            noteDiv.innerHTML = '<strong>Note:</strong> Some states (DC, CO) have missing data in the dataset. "NaN" values indicate data points that could not be calculated.';
            container.appendChild(noteDiv);
        }
    } else {
        console.error(`No image path defined for visualization type: ${visualizationType}`);
        container.innerHTML = `<div class="error" style="font-size: 1.5em;">Visualization not available: ${VISUALIZATION_TYPES[visualizationType]}</div>`;
    }
}

// Update year filter visibility based on visualization type
function updateYearFilterVisibility() {
    const visualTypeSelect = document.getElementById('visualizationType');
    const yearFilter = document.getElementById('yearFilter');
    
    if (!visualTypeSelect || !yearFilter) return;
    
    if (YEAR_FILTER_VISUALIZATIONS.includes(visualTypeSelect.value)) {
        yearFilter.classList.add('visible');
    } else {
        yearFilter.classList.remove('visible');
    }
}

// Main update function
function updateVisualization() {
    const visualTypeSelect = document.getElementById('visualizationType');
    const yearFilter = document.getElementById('yearFilter');
    
    if (!visualTypeSelect || !yearFilter) return;
    
    currentVisualization = visualTypeSelect.value;
    currentYear = yearFilter.value;
    
    updateInsights(currentVisualization);
    
    showStatus('Updating visualization...');
    
    try {
        // Interactive visualizations
        if (currentVisualization === 'geoChoropleth') {
            createHeatMap(currentYear);
        } else if (currentVisualization === 'timeSeriesAnalysis') {
            createTimeSeries();
        } else if (currentVisualization === 'laborForceMap') {
            createLaborForceMap(currentYear);
        } else {
            // Static visualizations
            displayStaticVisualization(currentVisualization);
        }
    } catch (error) {
        console.error('Error updating visualization:', error);
        showStatus(`Error updating visualization: ${error.message}`, true);
    }
}

// Initialize dashboard
function initDashboard() {
    console.log("Initializing dashboard...");
    
    try {
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
        
        // Initial setup
        updateYearFilterVisibility();
        updateVisualization();
        
        // Add ResizeObserver to handle container resizing
        const container = document.getElementById('mainVisualization');
        if (container) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    if (entry.target === container && document.querySelector('.js-plotly-plot')) {
                        Plotly.Plots.resize(container);
                    }
                }
            });
            resizeObserver.observe(container);
        }
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showStatus(`Error initializing dashboard: ${error.message}`, true);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);

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
        if (!staticVisualizations.includes(visualType)) {
            Plotly.Plots.resize(container);
        }
    }
}); 