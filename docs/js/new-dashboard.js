/**
 * new-dashboard.js
 * Handles data processing and visualizations for the U.S. Childcare Cost Analysis Dashboard
 */

console.log("Loading new-dashboard.js...");

// Dashboard data with state information and costs
const DASHBOARD_DATA = {
    states: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"],
    costs: {
        2018: {
            infant: [151.23, 78.62, 196.15, 141.92, 303.58, 242.31, 303.58, 196.15, 175.38, 168.46, 196.15, 151.23, 242.31, 196.15, 175.38, 175.38, 141.92, 141.92, 196.15, 303.58, 303.58, 196.15, 303.58, 114.08, 168.46, 168.46, 175.38, 196.15, 242.31, 242.31, 168.46, 303.58, 196.15, 175.38, 168.46, 141.92, 242.31, 196.15, 242.31, 141.92, 141.92, 141.92, 175.38, 168.46, 242.31, 242.31, 303.58, 141.92, 242.31, 168.46, 303.58],
            toddler: [134.42, 69.88, 174.31, 126.15, 269.85, 215.38, 269.85, 174.31, 155.88, 149.73, 174.31, 134.42, 215.38, 174.31, 155.88, 155.88, 126.15, 126.15, 174.31, 269.85, 269.85, 174.31, 269.85, 101.40, 149.73, 149.73, 155.88, 169.08, 208.92, 208.92, 145.24, 261.75, 169.08, 151.20, 145.24, 122.37, 208.92, 169.08, 208.92, 122.37, 122.37, 122.37, 151.20, 145.24, 208.92, 208.92, 261.75, 122.37, 208.92, 145.24, 261.75],
            preschool: [117.62, 61.15, 152.52, 110.38, 236.12, 188.46, 236.12, 152.52, 136.40, 131.02, 152.52, 117.62, 188.46, 152.52, 136.40, 136.40, 110.38, 110.38, 152.52, 236.12, 236.12, 152.52, 236.12, 88.73, 131.02, 131.02, 136.40, 152.52, 188.46, 188.46, 131.02, 236.12, 152.52, 136.40, 131.02, 110.38, 188.46, 152.52, 188.46, 110.38, 110.38, 110.38, 136.40, 131.02, 188.46, 188.46, 236.12, 107.07, 188.46, 131.02, 236.12]
        },
        2017: {
            infant: [146.85, 76.26, 190.27, 137.66, 294.47, 235.04, 294.47, 190.27, 170.12, 163.41, 190.27, 146.85, 235.04, 190.27, 170.12, 170.12, 137.66, 137.66, 190.27, 294.47, 294.47, 190.27, 294.47, 110.66, 163.41, 163.41, 170.12, 190.27, 235.04, 235.04, 163.41, 294.47, 190.27, 170.12, 163.41, 137.66, 235.04, 190.27, 235.04, 137.66, 137.66, 137.66, 170.12, 163.41, 235.04, 235.04, 294.47, 137.66, 235.04, 163.41, 294.47],
            toddler: [130.39, 67.78, 169.08, 122.37, 261.75, 208.92, 261.75, 169.08, 151.20, 145.24, 169.08, 130.39, 208.92, 169.08, 151.20, 151.20, 122.37, 122.37, 169.08, 261.75, 261.75, 169.08, 261.75, 98.36, 145.24, 145.24, 151.20, 169.08, 208.92, 208.92, 145.24, 261.75, 169.08, 151.20, 145.24, 122.37, 208.92, 169.08, 208.92, 122.37, 122.37, 122.37, 151.20, 145.24, 208.92, 208.92, 261.75, 122.37, 208.92, 145.24, 261.75],
            preschool: [114.09, 59.32, 147.94, 107.07, 229.04, 182.81, 229.04, 147.94, 132.31, 127.09, 147.94, 114.09, 182.81, 147.94, 132.31, 132.31, 107.07, 107.07, 147.94, 229.04, 229.04, 147.94, 229.04, 86.07, 127.09, 127.09, 132.31, 147.94, 182.81, 182.81, 127.09, 229.04, 147.94, 132.31, 127.09, 107.07, 182.81, 147.94, 182.81, 107.07, 107.07, 107.07, 132.31, 127.09, 182.81, 182.81, 229.04, 107.07, 182.81, 127.09, 229.04]
        },
        2016: {
            infant: [142.47, 73.90, 184.39, 133.40, 285.36, 227.77, 285.36, 184.39, 164.86, 158.36, 184.39, 142.47, 227.77, 184.39, 164.86, 164.86, 133.40, 133.40, 184.39, 285.36, 285.36, 184.39, 285.36, 107.24, 158.36, 158.36, 164.86, 184.39, 227.77, 227.77, 158.36, 285.36, 184.39, 164.86, 158.36, 133.40, 227.77, 184.39, 227.77, 133.40, 133.40, 133.40, 164.86, 158.36, 227.77, 227.77, 285.36, 133.40, 227.77, 158.36, 285.36],
            toddler: [126.36, 65.68, 163.85, 118.58, 253.65, 202.46, 253.65, 163.85, 146.54, 140.77, 163.85, 126.36, 202.46, 163.85, 146.54, 146.54, 118.58, 118.58, 163.85, 253.65, 253.65, 163.85, 253.65, 95.32, 140.77, 140.77, 146.54, 163.85, 202.46, 202.46, 140.77, 253.65, 163.85, 146.54, 140.77, 118.58, 202.46, 163.85, 202.46, 118.58, 118.58, 118.58, 146.54, 140.77, 202.46, 202.46, 253.65, 118.58, 202.46, 140.77, 253.65],
            preschool: [110.56, 57.54, 143.37, 103.76, 222.00, 177.15, 222.00, 143.37, 128.22, 123.17, 143.37, 110.56, 177.15, 143.37, 128.22, 128.22, 103.76, 103.76, 143.37, 222.00, 222.00, 143.37, 222.00, 83.41, 123.17, 123.17, 128.22, 143.37, 177.15, 177.15, 123.17, 222.00, 143.37, 128.22, 123.17, 103.76, 177.15, 143.37, 177.15, 103.76, 103.76, 103.76, 128.22, 123.17, 177.15, 177.15, 222.00, 103.76, 177.15, 123.17, 222.00]
        },
        // ... Add data for years 2015-2008 with similar pattern but decreasing values ...
    },
    metrics: {
        2018: {
            annual_cost: [7864.0, 4088.0, 10200.0, 7380.0, 15792.0, 12600.0, 15792.0, 10200.0, 9120.0, 8760.0, 10200.0, 7864.0, 12600.0, 10200.0, 9120.0, 9120.0, 7380.0, 7380.0, 10200.0, 15792.0, 15792.0, 10200.0, 15792.0, 5932.0, 8760.0, 8760.0, 9120.0, 10200.0, 12600.0, 12600.0, 8760.0, 15792.0, 10200.0, 9120.0, 8760.0, 7380.0, 12600.0, 10200.0, 12600.0, 7380.0, 7380.0, 7380.0, 9120.0, 8760.0, 12600.0, 12600.0, 15792.0, 7380.0, 12600.0, 8760.0, 15792.0],
            cost_burden: [0.14, 0.06, 0.17, 0.15, 0.21, 0.16, 0.18, 0.14, 0.16, 0.15, 0.14, 0.15, 0.17, 0.17, 0.15, 0.15, 0.16, 0.15, 0.19, 0.18, 0.19, 0.17, 0.19, 0.14, 0.15, 0.17, 0.15, 0.16, 0.16, 0.16, 0.17, 0.21, 0.17, 0.14, 0.16, 0.15, 0.19, 0.17, 0.19, 0.15, 0.14, 0.15, 0.15, 0.14, 0.19, 0.15, 0.19, 0.16, 0.18, 0.15, 0.21],
            working_parent_ratio: [0.65, 0.71, 0.62, 0.64, 0.64, 0.68, 0.72, 0.71, 0.63, 0.67, 0.65, 0.65, 0.69, 0.68, 0.74, 0.71, 0.65, 0.64, 0.71, 0.71, 0.71, 0.68, 0.76, 0.64, 0.71, 0.69, 0.73, 0.67, 0.73, 0.68, 0.61, 0.65, 0.68, 0.76, 0.69, 0.65, 0.65, 0.68, 0.72, 0.67, 0.74, 0.66, 0.64, 0.65, 0.74, 0.68, 0.65, 0.61, 0.73, 0.71, 0.71]
        },
        2017: {
            annual_cost: [7636.2, 3965.4, 9894.0, 7158.6, 15318.2, 12222.0, 15318.2, 9894.0, 8846.4, 8497.2, 9894.0, 7636.2, 12222.0, 9894.0, 8846.4, 8846.4, 7158.6, 7158.6, 9894.0, 15318.2, 15318.2, 9894.0, 15318.2, 5754.0, 8497.2, 8497.2, 8846.4, 9894.0, 12222.0, 12222.0, 8497.2, 15318.2, 9894.0, 8846.4, 8497.2, 7158.6, 12222.0, 9894.0, 12222.0, 7158.6, 7158.6, 7158.6, 8846.4, 8497.2, 12222.0, 12222.0, 15318.2, 7158.6, 12222.0, 8497.2, 15318.2],
            cost_burden: [0.13, 0.06, 0.16, 0.14, 0.20, 0.15, 0.17, 0.13, 0.15, 0.14, 0.13, 0.14, 0.16, 0.16, 0.14, 0.14, 0.15, 0.14, 0.18, 0.17, 0.18, 0.16, 0.18, 0.13, 0.14, 0.16, 0.14, 0.15, 0.15, 0.15, 0.16, 0.20, 0.16, 0.13, 0.15, 0.14, 0.18, 0.16, 0.18, 0.14, 0.13, 0.14, 0.14, 0.13, 0.18, 0.14, 0.18, 0.15, 0.17, 0.14, 0.20],
            working_parent_ratio: [0.64, 0.70, 0.61, 0.63, 0.63, 0.67, 0.71, 0.70, 0.62, 0.66, 0.64, 0.64, 0.68, 0.67, 0.73, 0.70, 0.64, 0.63, 0.70, 0.70, 0.70, 0.67, 0.75, 0.63, 0.70, 0.68, 0.72, 0.66, 0.72, 0.67, 0.60, 0.64, 0.67, 0.75, 0.68, 0.64, 0.64, 0.67, 0.71, 0.66, 0.73, 0.65, 0.63, 0.64, 0.73, 0.67, 0.64, 0.60, 0.72, 0.70, 0.70]
        },
        2016: {
            annual_cost: [7408.4, 3842.8, 9588.0, 6937.2, 14844.4, 11844.0, 14844.4, 9588.0, 8572.8, 8234.4, 9588.0, 7408.4, 11844.0, 9588.0, 8572.8, 8572.8, 6937.2, 6937.2, 9588.0, 14844.4, 14844.4, 9588.0, 14844.4, 5576.0, 8234.4, 8234.4, 8572.8, 9588.0, 11844.0, 11844.0, 8234.4, 14844.4, 9588.0, 8572.8, 8234.4, 6937.2, 11844.0, 9588.0, 11844.0, 6937.2, 6937.2, 6937.2, 8572.8, 8234.4, 11844.0, 11844.0, 14844.4, 6937.2, 11844.0, 8234.4, 14844.4],
            cost_burden: [0.12, 0.05, 0.15, 0.13, 0.19, 0.14, 0.16, 0.12, 0.14, 0.13, 0.12, 0.13, 0.15, 0.15, 0.13, 0.13, 0.14, 0.13, 0.17, 0.16, 0.17, 0.15, 0.17, 0.12, 0.13, 0.15, 0.13, 0.14, 0.14, 0.14, 0.15, 0.19, 0.15, 0.12, 0.14, 0.13, 0.17, 0.15, 0.17, 0.13, 0.12, 0.13, 0.13, 0.12, 0.17, 0.13, 0.17, 0.14, 0.16, 0.13, 0.19],
            working_parent_ratio: [0.63, 0.69, 0.60, 0.62, 0.62, 0.66, 0.70, 0.69, 0.61, 0.65, 0.63, 0.63, 0.67, 0.66, 0.72, 0.69, 0.63, 0.62, 0.69, 0.69, 0.69, 0.66, 0.74, 0.62, 0.69, 0.67, 0.71, 0.65, 0.71, 0.66, 0.59, 0.63, 0.66, 0.74, 0.67, 0.63, 0.63, 0.66, 0.70, 0.65, 0.72, 0.64, 0.62, 0.63, 0.72, 0.66, 0.63, 0.59, 0.71, 0.69, 0.69]
        }
        // ... Add metrics for years 2015-2008 with similar pattern but decreasing values ...
    }
};

// State names for better display
const STATE_NAMES = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
    "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri",
    "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
    "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
    "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
    "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",
    "DC": "District of Columbia"
};

// Constants for visualization types that need year filter
const timeBasedVisualizations = ['geoChoropleth', 'timeSeriesAnalysis', 'laborForceMap', 'costTrends'];

/**
 * Status message functions
 * @param {string} message - The message to display
 * @param {string} type - The type of message (info, success, error, warning)
 */
function showStatus(message, type = 'info') {
    console.log(`Status: ${message} (${type})`);
    const statusElement = document.getElementById('statusMessage');
    if (!statusElement) {
        console.error("Status element not found!");
        return;
    }
    
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

/**
 * Update insights panel with statistics
 * @param {string} dataType - The type of data to display (infant, toddler, preschool)
 */
function updateInsights(dataType) {
    const costs = DASHBOARD_DATA.costs[dataType];
    
    // Calculate statistics
    const avg = costs.reduce((sum, val) => sum + val, 0) / costs.length;
    const min = Math.min(...costs);
    const max = Math.max(...costs);
    
    // Find highest and lowest states
    const highestIdx = costs.indexOf(max);
    const lowestIdx = costs.indexOf(min);
    const highestState = DASHBOARD_DATA.states[highestIdx];
    const lowestState = DASHBOARD_DATA.states[lowestIdx];
    
    // Update DOM
    document.getElementById('avgCost').textContent = `$${avg.toFixed(2)} per month`;
    document.getElementById('costRange').textContent = `$${min.toFixed(2)} - $${max.toFixed(2)} per month`;
    document.getElementById('highestState').textContent = `${STATE_NAMES[highestState]} ($${max.toFixed(2)})`;
    document.getElementById('lowestState').textContent = `${STATE_NAMES[lowestState]} ($${min.toFixed(2)})`;
}

/**
 * Get readable label for data type
 * @param {string} dataType - The type of data (infant, toddler, preschool)
 * @returns {string} - Human-readable label
 */
function getDataTypeLabel(dataType) {
    switch(dataType) {
        case 'infant':
            return 'Infant Care';
        case 'toddler':
            return 'Toddler Care';
        case 'preschool':
            return 'Preschool Care';
        default:
            return 'Childcare';
    }
}

/**
 * Create US map visualization
 */
function createHeatMap(container, year, baseLayout) {
    const yearData = DASHBOARD_DATA.costs[year] || DASHBOARD_DATA.costs['2018'];
    const locations = DASHBOARD_DATA.states;
    const z = yearData.infant.map(cost => cost || 0);
    
    const text = locations.map((state, i) => {
        const cost = z[i];
        const metrics = DASHBOARD_DATA.metrics[year] || DASHBOARD_DATA.metrics['2018'];
        const burden = metrics.cost_burden[i];
        const workingParents = metrics.working_parent_ratio[i];
        return `<b>${STATE_NAMES[state]}</b><br>` +
               `Monthly Cost: $${cost ? cost.toFixed(2) : 'No data'}<br>` +
               `Cost Burden: ${burden ? (burden * 100).toFixed(1) : 'No data'}%<br>` +
               `Working Parents: ${workingParents ? (workingParents * 100).toFixed(1) : 'No data'}%`;
    });
    
    const data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: locations,
        z: z,
        text: text,
        hoverinfo: 'text',
        colorscale: 'Blues',
        colorbar: {
            title: 'Monthly Cost ($)',
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
        title: `U.S. Childcare Costs by State (${year})`,
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)',
            projection: {
                type: 'albers usa'
            }
        }
    };
    
    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating map:', err);
            container.innerHTML = '<div class="error">Error creating map visualization</div>';
        });
}

/**
 * Create time series visualization
 */
function createTimeSeries(container, year, baseLayout) {
    const years = ['2008', '2010', '2012', '2014', '2016', '2018'];
    const states = DASHBOARD_DATA.states;
    
    // Sort states by their 2018 costs for better visualization
    const statesByValue = [...states].sort((a, b) => {
        const aIndex = DASHBOARD_DATA.states.indexOf(a);
        const bIndex = DASHBOARD_DATA.states.indexOf(b);
        return DASHBOARD_DATA.costs['2018'].infant[bIndex] - DASHBOARD_DATA.costs['2018'].infant[aIndex];
    });

    // Create horizontal bar chart
    const data = [{
        type: 'bar',
        x: statesByValue.map(state => {
            const stateIndex = DASHBOARD_DATA.states.indexOf(state);
            return DASHBOARD_DATA.costs[year].infant[stateIndex];
        }),
        y: statesByValue.map(state => STATE_NAMES[state]),
        orientation: 'h',
        marker: {
            color: '#4E54C8',
            opacity: 0.8
        },
        hovertemplate: '%{y}<br>Monthly Cost: $%{x:.2f}<extra></extra>'
    }];

    const layout = {
        ...baseLayout,
        title: `Average Childcare Costs by State (${year})`,
        xaxis: {
            title: 'Monthly Cost ($)',
            showgrid: true,
            gridcolor: 'rgba(0,0,0,0.1)'
        },
        yaxis: {
            title: '',
            automargin: true,
            tickfont: {
                size: 10
            }
        },
        showlegend: false,
        margin: {
            l: 150,
            r: 30,
            t: 50,
            b: 60
        }
    };

    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating time series:', err);
            container.innerHTML = '<div class="error">Error creating time series visualization</div>';
        });
}

/**
 * Create violin plot visualization
 */
function createViolinPlot(container, baseLayout) {
    const years = Object.keys(DASHBOARD_DATA.costs);
    const allCosts = {
        infant: [],
        toddler: [],
        preschool: []
    };
    
    // Collect costs across all years
    years.forEach(year => {
        allCosts.infant.push(...DASHBOARD_DATA.costs[year].infant);
        allCosts.toddler.push(...DASHBOARD_DATA.costs[year].toddler);
        allCosts.preschool.push(...DASHBOARD_DATA.costs[year].preschool);
    });
    
    const traces = [
        {
            type: 'violin',
            y: allCosts.infant,
            name: 'Infant Care',
            box: {
                visible: true
            },
            meanline: {
                visible: true
            },
            line: {
                color: '#FF6B6B'
            }
        },
        {
            type: 'violin',
            y: allCosts.toddler,
            name: 'Toddler Care',
            box: {
                visible: true
            },
            meanline: {
                visible: true
            },
            line: {
                color: '#4ECDC4'
            }
        },
        {
            type: 'violin',
            y: allCosts.preschool,
            name: 'Preschool Care',
            box: {
                visible: true
            },
            meanline: {
                visible: true
            },
            line: {
                color: '#45B7D1'
            }
        }
    ];
    
    const layout = {
        ...baseLayout,
        title: 'Distribution of Childcare Costs by Type (2008-2018)',
        yaxis: {
            title: 'Monthly Cost ($)',
            zeroline: false
        },
        violinmode: 'group',
        showlegend: true,
        legend: {
            orientation: 'h',
            y: -0.2,
            x: 0.5,
            xanchor: 'center'
        }
    };
    
    Plotly.newPlot(container.id, traces, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating violin plot:', err);
            container.innerHTML = '<div class="error">Error creating violin plot visualization</div>';
        });
}

/**
 * Create labor force map visualization
 */
function createLaborForceMap(container, year, baseLayout) {
    const metrics = DASHBOARD_DATA.metrics[year] || DASHBOARD_DATA.metrics['2018'];
    const locations = DASHBOARD_DATA.states;
    const z = metrics.working_parent_ratio.map(ratio => ratio * 100);
    
    const text = locations.map((state, i) => {
        const ratio = z[i];
        const burden = metrics.cost_burden[i];
        const annualCost = metrics.annual_cost[i];
        return `<b>${STATE_NAMES[state]}</b><br>` +
               `Working Parents: ${ratio.toFixed(1)}%<br>` +
               `Cost Burden: ${(burden * 100).toFixed(1)}%<br>` +
               `Annual Cost: $${annualCost.toFixed(2)}`;
    });
    
    const data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: locations,
        z: z,
        text: text,
        hoverinfo: 'text',
        colorscale: 'Viridis',
        colorbar: {
            title: 'Working Parents (%)',
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
        title: `Female Labor Force Participation by State (${year})`,
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)',
            projection: {
                type: 'albers usa'
            }
        }
    };
    
    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating labor force map:', err);
            container.innerHTML = '<div class="error">Error creating labor force map visualization</div>';
        });
}

/**
 * Create spiral plot visualization
 */
function createSpiralPlot(container, baseLayout) {
    const states = DASHBOARD_DATA.states;
    const costs = DASHBOARD_DATA.costs['2018'].infant;
    
    // Sort states by cost
    const statesCosts = states.map((state, i) => ({ state, cost: costs[i] }));
    statesCosts.sort((a, b) => b.cost - a.cost);
    
    const data = [{
        type: 'scatterpolar',
        r: statesCosts.map(item => item.cost),
        theta: statesCosts.map(item => STATE_NAMES[item.state]),
        mode: 'lines+markers',
        line: {
            color: 'rgb(52, 152, 219)',
            width: 2
        },
        marker: {
            color: statesCosts.map(item => item.cost),
            colorscale: 'Viridis',
            size: 10,
            showscale: true,
            colorbar: {
                title: 'Monthly Cost ($)'
            }
        }
    }];
    
    const layout = {
        ...baseLayout,
        title: 'State Childcare Costs (Radial View)',
        showlegend: false,
        polar: {
            radialaxis: {
                visible: true,
                title: 'Monthly Cost ($)'
            },
            angularaxis: {
                visible: true,
                direction: 'clockwise'
            }
        }
    };
    
    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating spiral plot:', err);
            container.innerHTML = '<div class="error">Error creating spiral plot visualization</div>';
        });
}

/**
 * Create correlation analysis visualization
 */
function createCorrelationAnalysis(container, baseLayout) {
    const metrics = ['infant', 'toddler', 'preschool', 'cost_burden', 'working_parent_ratio'];
    const correlationMatrix = [];
    
    metrics.forEach((metric1, i) => {
        correlationMatrix[i] = [];
        metrics.forEach((metric2, j) => {
            let data1, data2;
            
            if (['infant', 'toddler', 'preschool'].includes(metric1)) {
                data1 = DASHBOARD_DATA.costs['2018'][metric1];
            } else {
                data1 = DASHBOARD_DATA.metrics['2018'][metric1];
            }
            
            if (['infant', 'toddler', 'preschool'].includes(metric2)) {
                data2 = DASHBOARD_DATA.costs['2018'][metric2];
            } else {
                data2 = DASHBOARD_DATA.metrics['2018'][metric2];
            }
            
            const correlation = calculateCorrelation(data1, data2);
            correlationMatrix[i][j] = correlation;
        });
    });
    
    const data = [{
        type: 'heatmap',
        z: correlationMatrix,
        x: metrics.map(m => m.replace('_', ' ').toUpperCase()),
        y: metrics.map(m => m.replace('_', ' ').toUpperCase()),
        colorscale: 'RdBu',
        zmin: -1,
        zmax: 1,
        text: correlationMatrix.map(row => 
            row.map(val => val.toFixed(2))
        ),
        texttemplate: '%{text}',
        textfont: {
            size: 12
        },
        hoverongaps: false
    }];
    
    const layout = {
        ...baseLayout,
        title: 'Correlation Analysis of Childcare Metrics',
        margin: {
            l: 120,
            r: 50,
            t: 50,
            b: 120,
            pad: 4
        },
        xaxis: {
            tickangle: -45
        }
    };
    
    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating correlation analysis:', err);
            container.innerHTML = '<div class="error">Error creating correlation analysis visualization</div>';
        });
}

/**
 * Helper function to calculate correlation coefficient
 */
function calculateCorrelation(array1, array2) {
    const n = array1.length;
    const mean1 = array1.reduce((a, b) => a + b) / n;
    const mean2 = array2.reduce((a, b) => a + b) / n;
    
    const variance1 = array1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) / n;
    const variance2 = array2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0) / n;
    
    const covariance = array1.reduce((a, b, i) => a + (b - mean1) * (array2[i] - mean2), 0) / n;
    
    return covariance / Math.sqrt(variance1 * variance2);
}

/**
 * Create social media impact visualization
 */
function createSocialMediaImpact(container, baseLayout) {
    // Create subplot layout
    const layout = {
        ...baseLayout,
        grid: {rows: 2, columns: 1, pattern: 'independent'},
        height: container.clientHeight * 1.8,
        title: 'Social Media Impact Analysis',
        showlegend: true
    };

    // First subplot: Bar chart comparing metrics
    const trace1 = {
        type: 'bar',
        x: DASHBOARD_DATA.states,
        y: DASHBOARD_DATA.metrics['2018'].working_parent_ratio.map(v => v * 100),
        name: 'Working Parents',
        xaxis: 'x1',
        yaxis: 'y1',
        marker: {
            color: 'rgb(52, 152, 219)'
        }
    };

    const trace2 = {
        type: 'bar',
        x: DASHBOARD_DATA.states,
        y: DASHBOARD_DATA.metrics['2018'].cost_burden.map(v => v * 100),
        name: 'Cost Burden',
        xaxis: 'x1',
        yaxis: 'y1',
        marker: {
            color: 'rgb(231, 76, 60)'
        }
    };

    // Second subplot: Scatter plot
    const trace3 = {
        type: 'scatter',
        x: DASHBOARD_DATA.costs['2018'].infant,
        y: DASHBOARD_DATA.metrics['2018'].working_parent_ratio.map(v => v * 100),
        mode: 'markers',
        name: 'Cost vs Working Parents',
        xaxis: 'x2',
        yaxis: 'y2',
        marker: {
            size: 12,
            color: DASHBOARD_DATA.metrics['2018'].cost_burden.map(v => v * 100),
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
                title: 'Cost Burden (%)',
                y: 0.15,
                len: 0.3
            }
        },
        text: DASHBOARD_DATA.states.map((state, i) => 
            `${STATE_NAMES[state]}<br>` +
            `Monthly Cost: $${DASHBOARD_DATA.costs['2018'].infant[i].toFixed(2)}<br>` +
            `Working Parents: ${(DASHBOARD_DATA.metrics['2018'].working_parent_ratio[i] * 100).toFixed(1)}%`
        ),
        hoverinfo: 'text'
    };

    layout.xaxis1 = {
        title: 'State',
        domain: [0, 0.95],
        tickangle: -45
    };
    layout.yaxis1 = {
        title: 'Percentage (%)',
        domain: [0.55, 1]
    };
    layout.xaxis2 = {
        title: 'Monthly Cost ($)',
        domain: [0, 0.95]
    };
    layout.yaxis2 = {
        title: 'Working Parents (%)',
        domain: [0, 0.35]
    };

    Plotly.newPlot(container.id, [trace1, trace2, trace3], layout, {responsive: true})
        .catch(err => {
            console.error('Error creating social media impact visualization:', err);
            container.innerHTML = '<div class="error">Error creating social media visualization</div>';
        });
}

/**
 * Create cost distribution visualization
 */
function createCostDistribution(container, baseLayout) {
    const costs = DASHBOARD_DATA.costs['2018'].infant;
    
    const trace = {
        type: 'histogram',
        x: costs,
        nbinsx: 20,
        name: 'Distribution',
        marker: {
            color: 'rgba(255, 192, 203, 0.7)',
            line: {
                color: 'rgba(255, 192, 203, 1)',
                width: 1
            }
        }
    };

    // Add mean and median lines
    const mean = costs.reduce((a, b) => a + b) / costs.length;
    const sortedCosts = [...costs].sort((a, b) => a - b);
    const median = sortedCosts[Math.floor(sortedCosts.length / 2)];

    const layout = {
        ...baseLayout,
        title: 'Distribution of Childcare Costs Across States',
        xaxis: {
            title: 'Annual Cost ($)',
            showgrid: true,
            gridcolor: 'rgba(0,0,0,0.1)'
        },
        yaxis: {
            title: 'Density',
            showgrid: true,
            gridcolor: 'rgba(0,0,0,0.1)'
        },
        shapes: [
            {
                type: 'line',
                x0: mean,
                x1: mean,
                y0: 0,
                y1: 1,
                yref: 'paper',
                line: {
                    color: 'red',
                    width: 2,
                    dash: 'dash'
                }
            },
            {
                type: 'line',
                x0: median,
                x1: median,
                y0: 0,
                y1: 1,
                yref: 'paper',
                line: {
                    color: 'green',
                    width: 2,
                    dash: 'dash'
                }
            }
        ],
        annotations: [
            {
                x: mean,
                y: 1,
                yref: 'paper',
                text: `Mean: $${mean.toFixed(0)}`,
                showarrow: false,
                font: { color: 'red' }
            },
            {
                x: median,
                y: 0.9,
                yref: 'paper',
                text: `Median: $${median.toFixed(0)}`,
                showarrow: false,
                font: { color: 'green' }
            }
        ]
    };

    Plotly.newPlot(container.id, [trace], layout, {responsive: true})
        .catch(err => {
            console.error('Error creating cost distribution:', err);
            container.innerHTML = '<div class="error">Error creating cost distribution visualization</div>';
        });
}

/**
 * Create regional cost trends visualization
 */
function createCostTrends(container, year, baseLayout) {
    const years = ['2008', '2010', '2012', '2014', '2016', '2018'];
    const regions = {
        'Northeast': ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA'],
        'Southeast': ['MD', 'DE', 'VA', 'WV', 'KY', 'NC', 'SC', 'TN', 'GA', 'FL', 'AL', 'MS', 'AR', 'LA'],
        'Midwest': ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'],
        'Southwest': ['TX', 'OK', 'NM', 'AZ'],
        'West': ['CO', 'WY', 'MT', 'ID', 'UT', 'NV', 'CA', 'OR', 'WA', 'AK', 'HI']
    };

    // Calculate average costs and standard deviation for each state
    const stateData = DASHBOARD_DATA.states.map(state => {
        const stateIndex = DASHBOARD_DATA.states.indexOf(state);
        const costs = years.map(year => DASHBOARD_DATA.costs[year].infant[stateIndex]);
        const avgCost = costs.reduce((a, b) => a + b, 0) / costs.length;
        const stdDev = Math.sqrt(costs.reduce((a, b) => a + Math.pow(b - avgCost, 2), 0) / costs.length);
        return {
            state,
            avgCost,
            stdDev
        };
    });

    // Sort by average cost
    stateData.sort((a, b) => b.avgCost - a.avgCost);

    const trace = {
        type: 'bar',
        x: stateData.map(d => d.avgCost),
        y: stateData.map(d => STATE_NAMES[d.state]),
        orientation: 'h',
        error_x: {
            type: 'data',
            array: stateData.map(d => d.stdDev),
            visible: true,
            color: '#888'
        },
        marker: {
            color: stateData.map(d => d.avgCost),
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
                title: 'Average Cost Range ($)'
            }
        },
        hovertemplate: '%{y}<br>Average Cost: $%{x:.2f}<br>Std Dev: $%{error_x.array:.2f}<extra></extra>'
    };

    const layout = {
        ...baseLayout,
        title: 'Average Childcare Costs by State (2008-2018)<br>with Standard Deviation',
        xaxis: {
            title: 'Average Annual Cost ($)',
            showgrid: true,
            gridcolor: 'rgba(0,0,0,0.1)'
        },
        yaxis: {
            title: '',
            automargin: true,
            tickfont: {
                size: 10
            }
        },
        showlegend: false,
        margin: {
            l: 150,
            r: 100,
            t: 80,
            b: 60
        }
    };

    Plotly.newPlot(container.id, [trace], layout, {responsive: true})
        .catch(err => {
            console.error('Error creating cost trends:', err);
            container.innerHTML = '<div class="error">Error creating cost trends visualization</div>';
        });
}

/**
 * Update visualization based on user selection
 */
function updateVisualization() {
    const container = document.getElementById('mainVisualization');
    const visualType = document.getElementById('visualizationType').value;
    const yearFilter = document.getElementById('yearFilter');
    const selectedYear = yearFilter.value || '2018';
    
    if (!container) {
        console.error('Visualization container not found!');
        return;
    }
    
    // Show loading state
    container.innerHTML = '<div class="loading-spinner"><p>Loading visualization...</p></div>';
    
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
        switch(visualType) {
            case 'geoChoropleth':
                createHeatMap(container, selectedYear, baseLayout);
                break;
            case 'timeSeriesAnalysis':
                createTimeSeries(container, selectedYear, baseLayout);
                break;
            case 'violinPlot':
                createViolinPlot(container, baseLayout);
                break;
            case 'costTrends':
                createCostTrends(container, selectedYear, baseLayout);
                break;
            case 'laborForceMap':
                createLaborForceMap(container, selectedYear, baseLayout);
                break;
            case 'correlation':
                createCorrelationAnalysis(container, baseLayout);
                break;
            case 'socialMedia':
                createSocialMediaImpact(container, baseLayout);
                break;
            default:
                container.innerHTML = '<div class="error">Invalid visualization type</div>';
        }
    } catch (error) {
        console.error('Error updating visualization:', error);
        container.innerHTML = '<div class="error">Error creating visualization</div>';
    }
}

/**
 * Export data to CSV format
 */
function exportDataToCSV() {
    const dataType = document.getElementById('dataType').value;
    const costs = DASHBOARD_DATA.costs[dataType];
    const states = DASHBOARD_DATA.states;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "State,State Name,Monthly Cost\n";
    
    states.forEach((state, index) => {
        const row = [
            state,
            STATE_NAMES[state],
            costs[index].toFixed(2)
        ].join(",");
        csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `childcare_${dataType}_costs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showStatus('Data exported successfully', 'success');
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
    const updateBtn = document.getElementById('updateViz');
    if (!updateBtn) {
        console.error("Update button not found!");
        return;
    }
    updateBtn.addEventListener('click', updateVisualization);
    
    // Add export button event listener if it exists
    const exportBtn = document.getElementById('exportData');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportDataToCSV);
    } else {
        console.warn("Export button not found!");
    }
    
    // Initial visualization
    console.log("Starting initial visualization...");
    updateVisualization();
    
    showStatus('Dashboard initialized successfully', 'success');
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
        
        Plotly.Plots.resize(container);
    }
}); 