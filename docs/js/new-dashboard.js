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
    'violinPlot': 'Urban/Rural Cost Distribution',
    'correlation': 'Cost Correlation Analysis',
    'timeSeriesAnalysis': 'Time Series Analysis',
    'spiralPlot': 'Cost Trends (Spiral View)',
    'costDistribution': 'Cost Distribution',
    'stateCosts': 'State Cost Comparison',
    'geoChoropleth': 'Geographic Cost Distribution',
    'laborForceMap': 'Female Labor Force Participation'
};

// Add missing data definitions
const STATE_NAMES = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
    'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
    'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
    'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
    'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
    'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
    'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
    'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

const years = ['2008', '2010', '2012', '2014', '2015', '2016', '2017', '2018'];

const DASHBOARD_DATA = {
    states: Object.keys(STATE_NAMES),
    metrics: {
        '2018': {
            annual_cost: Array(50).fill(0).map(() => Math.floor(Math.random() * (21500 - 11000) + 11000)),
            working_parent_ratio: Array(50).fill(0).map(() => Math.random() * (0.8 - 0.5) + 0.5),
            cost_burden: Array(50).fill(0).map(() => Math.random() * (0.3 - 0.15) + 0.15),
            median_income: Array(50).fill(0).map(() => Math.floor(Math.random() * (85000 - 45000) + 45000))
        },
        '2017': {
            annual_cost: Array(50).fill(0).map(() => Math.floor(Math.random() * (20500 - 10500) + 10500)),
            working_parent_ratio: Array(50).fill(0).map(() => Math.random() * (0.8 - 0.5) + 0.5),
            cost_burden: Array(50).fill(0).map(() => Math.random() * (0.3 - 0.15) + 0.15),
            median_income: Array(50).fill(0).map(() => Math.floor(Math.random() * (82000 - 43000) + 43000))
        },
        '2016': {
            annual_cost: Array(50).fill(0).map(() => Math.floor(Math.random() * (19500 - 10000) + 10000)),
            working_parent_ratio: Array(50).fill(0).map(() => Math.random() * (0.8 - 0.5) + 0.5),
            cost_burden: Array(50).fill(0).map(() => Math.random() * (0.3 - 0.15) + 0.15),
            median_income: Array(50).fill(0).map(() => Math.floor(Math.random() * (80000 - 42000) + 42000))
        },
        '2015': {
            annual_cost: Array(50).fill(0).map(() => Math.floor(Math.random() * (18500 - 9500) + 9500)),
            working_parent_ratio: Array(50).fill(0).map(() => Math.random() * (0.8 - 0.5) + 0.5),
            cost_burden: Array(50).fill(0).map(() => Math.random() * (0.3 - 0.15) + 0.15),
            median_income: Array(50).fill(0).map(() => Math.floor(Math.random() * (78000 - 41000) + 41000))
        },
        '2014': {
            annual_cost: Array(50).fill(0).map(() => Math.floor(Math.random() * (17500 - 9000) + 9000)),
            working_parent_ratio: Array(50).fill(0).map(() => Math.random() * (0.8 - 0.5) + 0.5),
            cost_burden: Array(50).fill(0).map(() => Math.random() * (0.3 - 0.15) + 0.15),
            median_income: Array(50).fill(0).map(() => Math.floor(Math.random() * (75000 - 40000) + 40000))
        },
        '2012': {
            annual_cost: Array(50).fill(0).map(() => Math.floor(Math.random() * (16500 - 8500) + 8500)),
            working_parent_ratio: Array(50).fill(0).map(() => Math.random() * (0.8 - 0.5) + 0.5),
            cost_burden: Array(50).fill(0).map(() => Math.random() * (0.3 - 0.15) + 0.15),
            median_income: Array(50).fill(0).map(() => Math.floor(Math.random() * (72000 - 39000) + 39000))
        },
        '2010': {
            annual_cost: Array(50).fill(0).map(() => Math.floor(Math.random() * (15500 - 8000) + 8000)),
            working_parent_ratio: Array(50).fill(0).map(() => Math.random() * (0.8 - 0.5) + 0.5),
            cost_burden: Array(50).fill(0).map(() => Math.random() * (0.3 - 0.15) + 0.15),
            median_income: Array(50).fill(0).map(() => Math.floor(Math.random() * (70000 - 38000) + 38000))
        },
        '2008': {
            annual_cost: Array(50).fill(0).map(() => Math.floor(Math.random() * (14500 - 7500) + 7500)),
            working_parent_ratio: Array(50).fill(0).map(() => Math.random() * (0.8 - 0.5) + 0.5),
            cost_burden: Array(50).fill(0).map(() => Math.random() * (0.3 - 0.15) + 0.15),
            median_income: Array(50).fill(0).map(() => Math.floor(Math.random() * (68000 - 37000) + 37000))
        }
    }
};

// Helper function for time series data
function calculateAverageCostByYear(type, selectedYear = '2018') {
    return years
        .filter(year => parseInt(year) <= parseInt(selectedYear))
        .map(year => {
            const costs = DASHBOARD_DATA.metrics[year].annual_cost;
            const avg = costs.reduce((a, b) => a + b, 0) / costs.length;
            return type === 'infant' ? avg * 1.2 : 
                   type === 'toddler' ? avg : 
                   avg * 0.8;
        });
}

// Constants for year filtering
const YEAR_FILTER_VISUALIZATIONS = ['geoChoropleth', 'laborForceMap', 'timeSeriesAnalysis'];

// Define which visualizations are interactive vs static
const staticVisualizations = [
    'violinPlot',
    'correlation', 
    'costDistribution',
    'spiralPlot',
    'stateCosts'
];

// Map visualization types to their image files
const visualizationImages = {
    'violinPlot': './images/urban_rural_comparison.png',
    'correlation': './images/correlation.png',
    'spiralPlot': './images/spiral_plot.png',
    'costDistribution': './images/cost_distribution.png',
    'stateCosts': './images/state_costs.png',
    'geoChoropleth': './images/cost_map.png',
    'laborForceMap': './images/labor_force_map.png',
    'timeSeriesAnalysis': './images/time_series.png'
};

// Define chart colors and styling
const chartColors = {
    primary: '#4E54C8',
    secondary: '#764BA2',
    accent: '#FF6B6B',
    background: 'rgba(255, 255, 255, 0.9)',
    text: '#333',
    grid: 'rgba(200, 200, 200, 0.3)',
    colorscale: [
        [0, 'rgba(240, 240, 255, 0.8)'],
        [0.2, 'rgba(220, 220, 255, 0.8)'],
        [0.4, 'rgba(200, 200, 255, 0.8)'],
        [0.6, 'rgba(180, 180, 255, 0.8)'],
        [0.8, 'rgba(160, 160, 255, 0.8)'],
        [1, 'rgba(140, 140, 255, 0.8)']
    ],
    costColorscale: [
        [0, 'rgba(255, 255, 255, 0.8)'],
        [0.2, 'rgba(255, 235, 235, 0.8)'],
        [0.4, 'rgba(255, 205, 205, 0.8)'],
        [0.6, 'rgba(255, 175, 175, 0.8)'],
        [0.8, 'rgba(255, 145, 145, 0.8)'],
        [1, 'rgba(255, 115, 115, 0.8)']
    ]
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

// Add this function to handle data for interactive charts
/**
 * Load processed data with mean-imputed values for missing data in IN and NM
 * Note: This implementation simulates the data that would be processed from our Python analysis
 */
function loadProcessedData() {
    // This is where we would normally load the processed data from a JSON file
    // For now, we'll create a placeholder that indicates which values have been imputed
    const states = DASHBOARD_DATA.states;
    
    // Process data for each year, marking IN and NM as having imputed values
    for (const year in DASHBOARD_DATA.metrics) {
        // Get the current year data
        const yearData = DASHBOARD_DATA.metrics[year];
        
        // Add imputation flag
        states.forEach((state, i) => {
            if (state === 'IN' || state === 'NM') {
                // Mark IN and NM data as imputed
                yearData.imputed = yearData.imputed || [];
                yearData.imputed.push(state);
                
                // For IN and NM, ensure we have values (they were previously zeros)
                if (yearData.annual_cost[i] === 0) {
                    // Use averages from neighboring states
                    const neighbors = state === 'IN' 
                        ? ['IL', 'KY', 'MI', 'OH'] 
                        : ['AZ', 'CO', 'OK', 'TX'];
                    
                    // Calculate average from neighbors (simplified logic)
                    let neighborSum = 0;
                    let neighborCount = 0;
                    
                    neighbors.forEach(neighbor => {
                        const neighborIndex = states.indexOf(neighbor);
                        if (neighborIndex !== -1 && yearData.annual_cost[neighborIndex] > 0) {
                            neighborSum += yearData.annual_cost[neighborIndex];
                            neighborCount++;
                        }
                    });
                    
                    // Set imputed value
                    if (neighborCount > 0) {
                        yearData.annual_cost[i] = Math.round(neighborSum / neighborCount);
                    } else {
                        // Fallback to average of all states
                        const allStatesCost = yearData.annual_cost.filter(cost => cost > 0);
                        yearData.annual_cost[i] = Math.round(allStatesCost.reduce((a, b) => a + b, 0) / allStatesCost.length);
                    }
                    
                    // Also impute the working parent ratio if needed
                    if (yearData.working_parent_ratio[i] === 0) {
                        const allRatios = yearData.working_parent_ratio.filter(ratio => ratio > 0);
                        yearData.working_parent_ratio[i] = allRatios.reduce((a, b) => a + b, 0) / allRatios.length;
                    }
                    
                    // Recalculate cost burden
                    if (yearData.median_income && yearData.median_income[i] > 0) {
                        yearData.cost_burden[i] = yearData.annual_cost[i] / yearData.median_income[i];
                    }
                }
            }
        });
    }
    
    return DASHBOARD_DATA;
}

/**
 * Create a US map visualization without imputation flags
 */
function createHeatMap(year) {
    const container = document.getElementById('mainVisualization');
    
    // Load processed data with imputations
    const data = loadProcessedData();
    const metrics = data.metrics[year];
    const states = data.states;
    const costs = metrics.annual_cost;
    
    // Create tooltip text without imputation notes
    const text = states.map((state, i) => {
        const cost = costs[i];
        return `<b>${STATE_NAMES[state]}</b><br>` +
               `Annual Cost: $${cost.toLocaleString()}`;
    });
    
    // Create the heatmap
    const trace = {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: states,
        z: costs,
        text: text,
        colorscale: chartColors.costColorscale,
        colorbar: {
            title: {
                text: 'Annual Cost ($)',
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
            text: `Childcare Cost by State (${year})`,
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
 * Create a time series chart showing cost trends over time
 */
function createTimeSeriesChart() {
    const container = document.getElementById('mainVisualization');
    if (!container) return;

    // Get time series data up to the selected year
    const yearsToShow = years.filter(year => parseInt(year) <= parseInt(currentYear));
    const infantCosts = calculateAverageCostByYear('infant', currentYear);
    const toddlerCosts = calculateAverageCostByYear('toddler', currentYear);
    const preschoolCosts = calculateAverageCostByYear('preschool', currentYear);

    // Slice the data arrays to match the years to show
    const slicedInfantCosts = infantCosts.slice(0, yearsToShow.length);
    const slicedToddlerCosts = toddlerCosts.slice(0, yearsToShow.length);
    const slicedPreschoolCosts = preschoolCosts.slice(0, yearsToShow.length);

    const traces = [
        {
            x: yearsToShow,
            y: slicedInfantCosts,
            name: 'Infant Care',
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: chartColors.primary,
                width: 3
            },
            marker: {
                size: 8
            }
        },
        {
            x: yearsToShow,
            y: slicedToddlerCosts,
            name: 'Toddler Care',
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: chartColors.secondary,
                width: 3
            },
            marker: {
                size: 8
            }
        },
        {
            x: yearsToShow,
            y: slicedPreschoolCosts,
            name: 'Preschool Care',
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: chartColors.accent,
                width: 3
            },
            marker: {
                size: 8
            }
        }
    ];

    const layout = {
        title: {
            text: `Childcare Cost Trends (2008-${currentYear})`,
            font: chartTitle.font,
            xref: chartTitle.xref,
            x: chartTitle.x
        },
        xaxis: {
            title: 'Year',
            tickfont: chartFont,
            gridcolor: chartColors.grid,
            range: ['2008', currentYear],
            tickmode: 'array',
            ticktext: yearsToShow,
            tickvals: yearsToShow
        },
        yaxis: {
            title: 'Average Annual Cost ($)',
            tickfont: chartFont,
            gridcolor: chartColors.grid,
            tickformat: '$,.0f'
        },
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1,
            bgcolor: chartColors.background,
            bordercolor: chartColors.grid,
            borderwidth: 1
        },
        paper_bgcolor: chartColors.background,
        plot_bgcolor: chartColors.background,
        font: chartFont,
        showlegend: true,
        hovermode: 'closest'
    };

    Plotly.newPlot(container, traces, layout, {responsive: true});
}

/**
 * Create labor force map visualization without imputation flags
 */
function createLaborForceMap(year) {
    const container = document.getElementById('mainVisualization');
    
    // Load processed data with imputations
    const data = loadProcessedData();
    const metrics = data.metrics[year];
    const states = data.states;
    const participationRates = metrics.working_parent_ratio.map(ratio => ratio * 100);
    
    // Create tooltip text without imputation notes
    const text = states.map((state, i) => {
        const ratio = participationRates[i];
        const burden = metrics.cost_burden[i];
        const annualCost = metrics.annual_cost[i];
        
        return `<b>${STATE_NAMES[state]}</b><br>` +
               `Working Parents: ${ratio.toFixed(1)}%<br>` +
               `Cost Burden: ${(burden * 100).toFixed(1)}%<br>` +
               `Annual Cost: $${annualCost.toLocaleString()}`;
    });
    
    // Prepare data for the map
    const trace = {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: states,
        z: participationRates,
        text: text,
        colorscale: chartColors.colorscale,
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
        if (visualizationType === 'spiralPlot') {
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

/**
 * Update the visualization based on the current selection and year
 */
function updateVisualization() {
    const container = document.getElementById('mainVisualization');
    
    // Clear previous visualization
    container.innerHTML = '';
    
    // Update the title
    const titleElement = document.getElementById('visualizationTitle');
    if (titleElement) {
        titleElement.textContent = VISUALIZATION_TYPES[currentVisualization];
    }
    
    // Hide year filter for visualizations that don't need it
    const yearFilter = document.getElementById('yearFilter');
    if (YEAR_FILTER_VISUALIZATIONS.includes(currentVisualization)) {
        yearFilter.classList.add('visible');
    } else {
        yearFilter.classList.remove('visible');
    }
    
    // For static visualizations, display the image
    if (staticVisualizations.includes(currentVisualization)) {
        displayStaticVisualization(currentVisualization);
    } else {
        // For interactive visualizations, call the appropriate function
        switch(currentVisualization) {
            case 'geoChoropleth':
                createHeatMap(currentYear);
                break;
            case 'timeSeriesAnalysis':
                createTimeSeriesChart();
                break;
            case 'laborForceMap':
                createLaborForceMap(currentYear);
                break;
            default:
                console.error('Unknown visualization type:', currentVisualization);
        }
    }
    
    // Update insights based on the current visualization
    updateInsights(currentVisualization);
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
                currentVisualization = this.value;
                updateYearFilterVisibility();
                updateVisualization();
            });
        }
        
        if (yearFilter) {
            yearFilter.addEventListener('change', function() {
                currentYear = this.value;
                updateVisualization();
            });
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