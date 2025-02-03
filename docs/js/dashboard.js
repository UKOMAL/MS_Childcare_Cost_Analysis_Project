// Dashboard initialization and control logic
document.addEventListener('DOMContentLoaded', async function() {
    // Load data first
    const data = await loadData();
    if (!data) {
        console.error('Failed to load data');
        document.getElementById('mainViz').innerHTML = '<p class="text-danger">Error loading data. Please try again later.</p>';
        return;
    }
    
    // Initialize visualizations with data
    initMap(data);
    initNetwork(data);
    initTimeSeries(data);
    
    // Load state data
    loadStates();
    
    // Event listeners for controls
    document.getElementById('stateSelect').addEventListener('change', () => updateVisualizations(data));
    document.getElementById('costRange').addEventListener('input', () => updateVisualizations(data));
    document.getElementById('vizType').addEventListener('change', () => switchVisualization(data));
});

// Load state data
function loadStates() {
    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
        "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
        "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
        "Wisconsin", "Wyoming"
    ];
    
    const stateSelect = document.getElementById('stateSelect');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

// Update all visualizations based on current filters
function updateVisualizations(data) {
    try {
        const selectedState = document.getElementById('stateSelect').value;
        const costRange = document.getElementById('costRange').value;
        const vizType = document.getElementById('vizType').value;
        
        switch(vizType) {
            case 'map':
                updateMap(selectedState, costRange, data);
                break;
            case 'network':
                updateNetwork(selectedState, costRange, data);
                break;
            case 'sankey':
                updateSankey(selectedState, costRange, data);
                break;
            case '3d':
                update3DScatter(selectedState, costRange, data);
                break;
        }
    } catch (error) {
        console.error('Error updating visualizations:', error);
        showError('Error updating visualization. Please try again.');
    }
}

// Switch between different visualization types
function switchVisualization(data) {
    try {
        const vizType = document.getElementById('vizType').value;
        const mainViz = document.getElementById('mainViz');
        const supplementaryViz = document.getElementById('supplementaryViz');
        
        // Clear existing visualizations
        mainViz.innerHTML = '';
        supplementaryViz.innerHTML = '';
        
        switch(vizType) {
            case 'map':
                initMap(data);
                break;
            case 'network':
                initNetwork(data);
                break;
            case 'sankey':
                initSankey(data);
                break;
            case '3d':
                init3DScatter(data);
                break;
        }
        
        updateVisualizations(data);
    } catch (error) {
        console.error('Error switching visualization:', error);
        showError('Error switching visualization. Please try again.');
    }
}

// Load and process data
async function loadData() {
    try {
        const response = await fetch('./data/childcare_costs.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Error loading data. Please check your connection and try again.');
        return null;
    }
}

// Show error message
function showError(message) {
    const mainViz = document.getElementById('mainViz');
    mainViz.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
}

// Initialize data and create visualizations
async function initializeDashboard() {
    const data = await loadData();
    if (data) {
        createVisualizations(data);
    }
}

// Create all visualizations with the loaded data
function createVisualizations(data) {
    try {
        createMap(data);
        createNetwork(data);
        createTimeSeries(data);
    } catch (error) {
        console.error('Error creating visualizations:', error);
        showError('Error creating visualizations. Please try again.');
    }
} 