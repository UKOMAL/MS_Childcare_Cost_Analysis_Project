// Dashboard state
let globalData = {
    costs: {
        infant: [1200, 1100, 900, 1500, 1300, 1000, 1400, 1600, 1250, 1350],
        toddler: [1000, 950, 800, 1300, 1100, 900, 1200, 1400, 1150, 1250],
        preschool: [800, 750, 600, 1100, 900, 700, 1000, 1200, 950, 1050]
    },
    states: ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI']
};

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

/**
 * Dashboard initialization and control logic
 */
async function initializeDashboard() {
    try {
        console.log('Starting dashboard initialization...');
        
        // Initialize visualizations
        updateMainVisualization();
        updateKeyInsights();
        
        // Setup event listeners
        setupEventListeners();
        
        // Hide loading overlay
        document.getElementById('pageLoadingOverlay').style.display = 'none';
        
        console.log('Dashboard initialization complete');
    } catch (error) {
        console.error('Error in dashboard initialization:', error);
        showError('Dashboard initialization failed', error.message);
    }
}

/**
 * Setup event listeners for dashboard controls
 */
function setupEventListeners() {
    // Data type selector
    document.getElementById('dataType').addEventListener('change', function() {
        updateMainVisualization();
        updateKeyInsights();
    });
    
    // Visualization type selector
    document.getElementById('vizType').addEventListener('change', function() {
        updateMainVisualization();
    });
    
    // Update button
    document.getElementById('updateViz').addEventListener('click', function() {
        updateMainVisualization();
        updateKeyInsights();
    });
    
    // Export button
    document.getElementById('exportData').addEventListener('click', exportToCSV);
}

/**
 * Update the main visualization based on selected options
 */
function updateMainVisualization() {
    const dataType = document.getElementById('dataType').value;
    const vizType = document.getElementById('vizType').value;
    const mainViz = document.getElementById('mainViz');
    
    // Clear previous visualization
    mainViz.innerHTML = '';
    
    // Get data for selected type
    const data = globalData.costs[dataType];
    const states = globalData.states;
    
    // Create visualization based on type
    switch(vizType) {
        case 'map':
            createMap(mainViz, data, states);
            break;
        case 'bar':
            createBarChart(mainViz, data, states);
            break;
        case 'comparison':
            createComparison(mainViz, data, states);
            break;
        case 'scatter':
            createScatter(mainViz, data, states);
            break;
    }
}

/**
 * Update key insights panel
 */
function updateKeyInsights() {
    const dataType = document.getElementById('dataType').value;
    const data = globalData.costs[dataType];
    
    // Calculate metrics
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const maxIndex = data.indexOf(max);
    const minIndex = data.indexOf(min);
    
    // Update display
    document.getElementById('avgCost').textContent = `$${avg.toFixed(2)}`;
    document.getElementById('costRange').textContent = `$${min.toFixed(2)} - $${max.toFixed(2)}`;
    document.getElementById('highestState').textContent = `${globalData.states[maxIndex]} ($${max.toFixed(2)})`;
    document.getElementById('lowestState').textContent = `${globalData.states[minIndex]} ($${min.toFixed(2)})`;
}

/**
 * Create a map visualization
 */
function createMap(container, data, states) {
    // Placeholder for map visualization
    container.innerHTML = `
        <div class="alert alert-info">
            <h4>Map Visualization</h4>
            <p>Data points: ${data.length}</p>
            <p>States: ${states.join(', ')}</p>
        </div>
    `;
}

/**
 * Create a bar chart visualization
 */
function createBarChart(container, data, states) {
    // Placeholder for bar chart
    container.innerHTML = `
        <div class="alert alert-info">
            <h4>Bar Chart</h4>
            <p>Data points: ${data.length}</p>
            <p>Average cost: $${(data.reduce((a, b) => a + b, 0) / data.length).toFixed(2)}</p>
        </div>
    `;
}

/**
 * Create a comparison visualization
 */
function createComparison(container, data, states) {
    // Placeholder for comparison
    container.innerHTML = `
        <div class="alert alert-info">
            <h4>Cost Comparison</h4>
            <p>Highest: $${Math.max(...data).toFixed(2)}</p>
            <p>Lowest: $${Math.min(...data).toFixed(2)}</p>
        </div>
    `;
}

/**
 * Create a scatter plot visualization
 */
function createScatter(container, data, states) {
    // Placeholder for scatter plot
    container.innerHTML = `
        <div class="alert alert-info">
            <h4>Cost vs. Burden</h4>
            <p>Data correlation analysis</p>
            <p>Sample size: ${data.length}</p>
        </div>
    `;
}

/**
 * Export data to CSV
 */
function exportToCSV() {
    const dataType = document.getElementById('dataType').value;
    const data = globalData.costs[dataType];
    const states = globalData.states;
    
    let csv = 'State,Cost\n';
    data.forEach((cost, index) => {
        csv += `${states[index]},${cost}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `childcare_costs_${dataType}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/**
 * Show error message
 */
function showError(title, message) {
    const statusMessage = document.getElementById('statusMessage');
    if (statusMessage) {
        statusMessage.innerHTML = `
            <div class="alert alert-danger">
                <h5>${title}</h5>
                <p>${message}</p>
            </div>
        `;
    }
} 