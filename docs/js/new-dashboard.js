/**
 * new-dashboard.js
 * Handles data processing and visualizations for the U.S. Childcare Cost Analysis Dashboard
 */

console.log("Loading new-dashboard.js...");

// Dashboard data with state information and costs
const DASHBOARD_DATA = {
    states: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"],
    costs: {
        infant: [151.23, 78.62, 196.15, 141.92, 303.58, 242.31, 303.58, 196.15, 175.38, 168.46, 196.15, 151.23, 242.31, 196.15, 175.38, 175.38, 141.92, 141.92, 196.15, 303.58, 303.58, 196.15, 303.58, 114.08, 168.46, 168.46, 175.38, 196.15, 242.31, 242.31, 168.46, 303.58, 196.15, 175.38, 168.46, 141.92, 242.31, 196.15, 242.31, 141.92, 141.92, 141.92, 175.38, 168.46, 242.31, 242.31, 303.58, 141.92, 242.31, 168.46, 303.58],
        toddler: [134.42, 69.88, 174.31, 126.15, 269.85, 215.38, 269.85, 174.31, 155.88, 149.73, 174.31, 134.42, 215.38, 174.31, 155.88, 155.88, 126.15, 126.15, 174.31, 269.85, 269.85, 174.31, 269.85, 101.40, 149.73, 149.73, 155.88, 174.31, 215.38, 215.38, 149.73, 269.85, 174.31, 155.88, 149.73, 126.15, 215.38, 174.31, 215.38, 126.15, 126.15, 126.15, 155.88, 149.73, 215.38, 215.38, 269.85, 126.15, 215.38, 149.73, 269.85],
        preschool: [117.62, 61.15, 152.52, 110.38, 236.12, 188.46, 236.12, 152.52, 136.40, 131.02, 152.52, 117.62, 188.46, 152.52, 136.40, 136.40, 110.38, 110.38, 152.52, 236.12, 236.12, 152.52, 236.12, 88.73, 131.02, 131.02, 136.40, 152.52, 188.46, 188.46, 131.02, 236.12, 152.52, 136.40, 131.02, 110.38, 188.46, 152.52, 188.46, 110.38, 110.38, 110.38, 136.40, 131.02, 188.46, 188.46, 236.12, 110.38, 188.46, 131.02, 236.12]
    },
    metrics: {
        annual_cost: [7864.0, 4088.0, 10200.0, 7380.0, 15792.0, 12600.0, 15792.0, 10200.0, 9120.0, 8760.0, 10200.0, 7864.0, 12600.0, 10200.0, 9120.0, 9120.0, 7380.0, 7380.0, 10200.0, 15792.0, 15792.0, 10200.0, 15792.0, 5932.0, 8760.0, 8760.0, 9120.0, 10200.0, 12600.0, 12600.0, 8760.0, 15792.0, 10200.0, 9120.0, 8760.0, 7380.0, 12600.0, 10200.0, 12600.0, 7380.0, 7380.0, 7380.0, 9120.0, 8760.0, 12600.0, 12600.0, 15792.0, 7380.0, 12600.0, 8760.0, 15792.0],
        cost_burden: [0.14, 0.06, 0.17, 0.15, 0.21, 0.16, 0.18, 0.14, 0.16, 0.15, 0.14, 0.15, 0.17, 0.17, 0.15, 0.15, 0.16, 0.15, 0.19, 0.18, 0.19, 0.17, 0.19, 0.14, 0.15, 0.17, 0.15, 0.16, 0.16, 0.16, 0.17, 0.21, 0.17, 0.14, 0.16, 0.15, 0.19, 0.17, 0.19, 0.15, 0.14, 0.15, 0.15, 0.14, 0.19, 0.15, 0.19, 0.16, 0.18, 0.15, 0.21],
        working_parent_ratio: [0.65, 0.71, 0.62, 0.64, 0.64, 0.68, 0.72, 0.71, 0.63, 0.67, 0.65, 0.65, 0.69, 0.68, 0.74, 0.71, 0.65, 0.64, 0.71, 0.71, 0.71, 0.68, 0.76, 0.64, 0.71, 0.69, 0.73, 0.67, 0.73, 0.68, 0.61, 0.65, 0.68, 0.76, 0.69, 0.65, 0.65, 0.68, 0.72, 0.67, 0.74, 0.66, 0.64, 0.65, 0.74, 0.68, 0.65, 0.61, 0.73, 0.71, 0.71]
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
 * @param {string} dataType - The type of data to display (infant, toddler, preschool)
 */
function createMapVisualization(dataType) {
    const locations = DASHBOARD_DATA.states;
    const z = DASHBOARD_DATA.costs[dataType].map(cost => cost || 0);
    
    const text = locations.map((state, i) => {
        const cost = z[i];
        const burden = DASHBOARD_DATA.metrics.cost_burden[i];
        const workingParents = DASHBOARD_DATA.metrics.working_parent_ratio[i];
        return `<b>${STATE_NAMES[state]}</b><br>` +
               `Monthly Cost: $${cost ? cost.toFixed(2) : 'No data'}<br>` +
               `Cost Burden: ${burden ? (burden * 100).toFixed(1) : 'No data'}%<br>` +
               `Working Parents: ${workingParents ? (workingParents * 100).toFixed(1) : 'No data'}%`;
    });
    
    const mapData = [{
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
        title: `U.S. ${getDataTypeLabel(dataType)} Costs by State`,
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
            b: 0,
            t: 50,
            pad: 4
        }
    };
    
    Plotly.newPlot('mainViz', mapData, layout)
        .then(() => {
            showStatus('Map visualization created successfully', 'success');
        })
        .catch(err => {
            console.error('Error creating map:', err);
            showStatus('Error creating map visualization', 'error');
        });
}

/**
 * Create bar chart visualization
 * @param {string} dataType - The type of data to display (infant, toddler, preschool)
 */
function createBarVisualization(dataType) {
    const states = DASHBOARD_DATA.states;
    const costs = DASHBOARD_DATA.costs[dataType];
    
    // Sort states by cost
    const statesCosts = states.map((state, i) => ({ state, cost: costs[i] }));
    statesCosts.sort((a, b) => b.cost - a.cost);
    
    const top15States = statesCosts.slice(0, 15);
    
    const barData = [{
        x: top15States.map(item => item.state),
        y: top15States.map(item => item.cost),
        type: 'bar',
        marker: {
            color: 'rgba(52, 152, 219, 0.8)'
        },
        text: top15States.map(item => `$${item.cost.toFixed(2)}`),
        textposition: 'auto',
        hoverinfo: 'text',
        hovertext: top15States.map(item => `${STATE_NAMES[item.state]}: $${item.cost.toFixed(2)}`)
    }];
    
    const layout = {
        title: `Top 15 States by ${getDataTypeLabel(dataType)} Costs`,
        xaxis: {
            title: 'State',
            tickangle: -45
        },
        yaxis: {
            title: 'Monthly Cost ($)'
        },
        margin: {
            l: 50,
            r: 20,
            b: 80,
            t: 50,
            pad: 4
        }
    };
    
    Plotly.newPlot('mainViz', barData, layout)
        .then(() => {
            showStatus('Bar chart created successfully', 'success');
        })
        .catch(err => {
            console.error('Error creating bar chart:', err);
            showStatus('Error creating bar chart', 'error');
        });
}

/**
 * Create a line chart comparing costs across different care types
 */
function createComparisonVisualization() {
    const states = DASHBOARD_DATA.states;
    const infantCosts = DASHBOARD_DATA.costs.infant;
    const toddlerCosts = DASHBOARD_DATA.costs.toddler;
    const preschoolCosts = DASHBOARD_DATA.costs.preschool;
    
    // Sort states by infant cost
    const stateData = states.map((state, i) => ({
        state,
        infant: infantCosts[i],
        toddler: toddlerCosts[i],
        preschool: preschoolCosts[i]
    }));
    
    stateData.sort((a, b) => b.infant - a.infant);
    
    // Take top 10 states
    const top10States = stateData.slice(0, 10);
    
    const trace1 = {
        x: top10States.map(item => item.state),
        y: top10States.map(item => item.infant),
        name: 'Infant Care',
        type: 'bar',
        marker: {color: 'rgba(52, 152, 219, 0.8)'}
    };
    
    const trace2 = {
        x: top10States.map(item => item.state),
        y: top10States.map(item => item.toddler),
        name: 'Toddler Care',
        type: 'bar',
        marker: {color: 'rgba(46, 204, 113, 0.8)'}
    };
    
    const trace3 = {
        x: top10States.map(item => item.state),
        y: top10States.map(item => item.preschool),
        name: 'Preschool Care',
        type: 'bar',
        marker: {color: 'rgba(155, 89, 182, 0.8)'}
    };
    
    const data = [trace1, trace2, trace3];
    
    const layout = {
        title: 'Cost Comparison: Top 10 Most Expensive States',
        barmode: 'group',
        xaxis: {
            title: 'State',
            tickangle: -45
        },
        yaxis: {
            title: 'Monthly Cost ($)'
        },
        legend: {
            x: 0,
            y: 1.2,
            orientation: 'h'
        },
        margin: {
            l: 50,
            r: 20,
            b: 80,
            t: 50,
            pad: 4
        }
    };
    
    Plotly.newPlot('mainViz', data, layout)
        .then(() => {
            showStatus('Comparison chart created successfully', 'success');
        })
        .catch(err => {
            console.error('Error creating comparison chart:', err);
            showStatus('Error creating comparison chart', 'error');
        });
}

/**
 * Create a scatter plot of cost vs. burden
 * @param {string} dataType - The type of data to display (infant, toddler, preschool)
 */
function createScatterVisualization(dataType) {
    const states = DASHBOARD_DATA.states;
    const costs = DASHBOARD_DATA.costs[dataType];
    const burdens = DASHBOARD_DATA.metrics.cost_burden;
    
    const text = states.map((state, i) => {
        return `${STATE_NAMES[state]}<br>` +
               `Monthly Cost: $${costs[i].toFixed(2)}<br>` +
               `Cost Burden: ${(burdens[i] * 100).toFixed(1)}%`;
    });
    
    const data = [{
        x: costs,
        y: burdens.map(b => b * 100), // Convert to percentage
        mode: 'markers',
        type: 'scatter',
        text: text,
        hoverinfo: 'text',
        marker: {
            size: 12,
            color: costs,
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
                title: 'Monthly Cost ($)'
            }
        }
    }];
    
    const layout = {
        title: `${getDataTypeLabel(dataType)} Cost vs. Family Budget Burden`,
        xaxis: {
            title: 'Monthly Cost ($)'
        },
        yaxis: {
            title: 'Percentage of Family Budget (%)'
        },
        margin: {
            l: 60,
            r: 30,
            b: 60,
            t: 50,
            pad: 4
        }
    };
    
    Plotly.newPlot('mainViz', data, layout)
        .then(() => {
            showStatus('Scatter plot created successfully', 'success');
        })
        .catch(err => {
            console.error('Error creating scatter plot:', err);
            showStatus('Error creating scatter plot', 'error');
        });
}

/**
 * Update visualization based on user selection
 */
function updateVisualization() {
    const dataType = document.getElementById('dataType').value;
    const vizType = document.getElementById('vizType').value;
    
    try {
        switch(vizType) {
            case 'map':
                createMapVisualization(dataType);
                break;
            case 'bar':
                createBarVisualization(dataType);
                break;
            case 'comparison':
                createComparisonVisualization();
                break;
            case 'scatter':
                createScatterVisualization(dataType);
                break;
            default:
                createMapVisualization(dataType);
        }
        
        // Update insights
        updateInsights(dataType);
    } catch (error) {
        console.error('Error updating visualization:', error);
        showStatus('Error updating visualization: ' + error.message, 'error');
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