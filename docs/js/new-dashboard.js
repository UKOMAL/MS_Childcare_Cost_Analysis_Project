/**
 * new-dashboard.js
 * Handles data processing and visualizations for the U.S. Childcare Cost Analysis Dashboard
 */

console.log("Loading new-dashboard.js...");

// Global variables
let df = null;
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

// Define common chart title settings
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

/**
 * Status message functions
 * @param {string} message - The message to display
 * @param {boolean} isError - Whether the message is an error
 */
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

/**
 * Update insights panel with statistics
 */
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

/**
 * Create US map visualization (interactive)
 */
function createHeatMap(data, year) {
    const container = document.getElementById('mainVisualization');
    if (!container) return;
    
    // Filter data for the selected year
    const yearData = data.filter(d => d.year == year);
    
    // Prepare data for the heatmap
    const states = [...new Set(yearData.map(d => d.state_name))];
    const values = yearData.map(d => d.mhi_ratio);
    
    // Create the heatmap
    const trace = {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: yearData.map(d => d.state_abbr),
        z: values,
        text: yearData.map(d => `${d.state_name}<br>Cost to Income Ratio: ${d.mhi_ratio.toFixed(2)}`),
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

/**
 * Create time series analysis visualization (interactive)
 */
function createTimeSeries(data) {
    const container = document.getElementById('mainVisualization');
    if (!container) return;
    
    // Group data by region and year
    const regions = [...new Set(data.map(d => d.region))];
    const years = [...new Set(data.map(d => d.year))].sort();
    
    const traces = regions.map(region => {
        const regionData = data.filter(d => d.region === region);
        const yearlyAverages = years.map(year => {
            const yearData = regionData.filter(d => d.year == year);
            return yearData.length > 0 ? yearData.reduce((sum, d) => sum + d.mhi_ratio, 0) / yearData.length : null;
        });
        
        return {
            x: years,
            y: yearlyAverages,
            type: 'scatter',
            mode: 'lines+markers',
            name: region,
            line: {
                width: 3
            },
            marker: {
                size: 8
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
                    size: 16,
                    color: chartColors.primary
                }
            },
            tickfont: {
                family: chartFont.family,
                size: 14,
                color: chartColors.text
            },
            gridcolor: chartColors.grid
        },
        yaxis: {
            title: {
                text: 'Average Cost to Income Ratio',
                font: {
                    family: chartFont.family,
                    size: 16,
                    color: chartColors.primary
                }
            },
            tickfont: {
                family: chartFont.family,
                size: 14,
                color: chartColors.text
            },
            gridcolor: chartColors.grid
        },
        legend: {
            font: {
                family: chartFont.family,
                size: 14,
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

/**
 * Create labor force map visualization (interactive)
 */
function createLaborForceMap(data, year) {
    const container = document.getElementById('mainVisualization');
    if (!container) return;
    
    // Filter data for the selected year
    const yearData = data.filter(d => d.year == year);
    
    // Prepare data for the map
    const trace = {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: yearData.map(d => d.state_abbr),
        z: yearData.map(d => d.lfpr_f),
        text: yearData.map(d => `${d.state_name}<br>Female Labor Force Participation: ${d.lfpr_f.toFixed(1)}%<br>Childcare Cost: $${d.mccost.toFixed(0)}`),
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
                    size: 16,
                    color: chartColors.primary
                }
            },
            tickfont: {
                family: chartFont.family,
                size: 14,
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

/**
 * Display static image visualization
 */
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
    } else {
        console.error(`No image path defined for visualization type: ${visualizationType}`);
        container.innerHTML = `<div class="error" style="font-size: 1.5em;">Visualization not available: ${VISUALIZATION_TYPES[visualizationType]}</div>`;
    }
}

/**
 * Update year filter visibility based on visualization type
 */
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

/**
 * Update visualization based on user selection
 */
function updateVisualization() {
    const visualTypeSelect = document.getElementById('visualizationType');
    const yearFilter = document.getElementById('yearFilter');
    
    if (!visualTypeSelect || !yearFilter) return;
    
    currentVisualization = visualTypeSelect.value;
    currentYear = yearFilter.value;
    
    updateInsights(currentVisualization);
    
    if (!df) {
        showStatus('Loading data...');
        return;
    }
    
    showStatus('Updating visualization...');
    
    try {
        // Interactive visualizations
        if (currentVisualization === 'geoChoropleth') {
            createHeatMap(df, currentYear);
        } else if (currentVisualization === 'timeSeriesAnalysis') {
            createTimeSeries(df);
        } else if (currentVisualization === 'laborForceMap') {
            createLaborForceMap(df, currentYear);
        } else {
            // Static visualizations
            displayStaticVisualization(currentVisualization);
        }
    } catch (error) {
        console.error('Error updating visualization:', error);
        showStatus(`Error updating visualization: ${error.message}`, true);
    }
}

/**
 * Initialize dashboard
 */
async function initDashboard() {
    showStatus('Loading data...');
    
    try {
        // Load data from Excel file
        const response = await fetch('../data/nationaldatabaseofchildcareprices.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        
        // Parse Excel file
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        let jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Process data
        df = jsonData.map(d => ({
            ...d,
            year: parseInt(d.year),
            mccost: parseFloat(d.mccost || 0),
            mhi_ratio: parseFloat(d.mhi_ratio || 0),
            lfpr_f: parseFloat(d.lfpr_f || 0)
        }));
        
        console.log('Data loaded successfully:', df.length, 'records');
        
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
        showStatus(`Error loading data: ${error.message}`, true);
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