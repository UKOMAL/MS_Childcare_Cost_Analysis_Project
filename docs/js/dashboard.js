// Dashboard initialization and control logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize visualizations
    initMap();
    initNetwork();
    initTimeSeries();
    
    // Load state data
    loadStates();
    
    // Event listeners for controls
    document.getElementById('stateSelect').addEventListener('change', updateVisualizations);
    document.getElementById('costRange').addEventListener('input', updateVisualizations);
    document.getElementById('vizType').addEventListener('change', switchVisualization);
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
function updateVisualizations() {
    const selectedState = document.getElementById('stateSelect').value;
    const costRange = document.getElementById('costRange').value;
    
    updateMap(selectedState, costRange);
    updateNetwork(selectedState, costRange);
    updateTimeSeries(selectedState, costRange);
}

// Switch between different visualization types
function switchVisualization() {
    const vizType = document.getElementById('vizType').value;
    const mainViz = document.getElementById('mainViz');
    const supplementaryViz = document.getElementById('supplementaryViz');
    
    // Clear existing visualizations
    mainViz.innerHTML = '';
    supplementaryViz.innerHTML = '';
    
    switch(vizType) {
        case 'map':
            initMap();
            break;
        case 'network':
            initNetwork();
            break;
        case 'sankey':
            initSankey();
            break;
        case '3d':
            init3DScatter();
            break;
    }
    
    updateVisualizations();
}

// Load and process data
async function loadData() {
    try {
        const response = await fetch('data/childcare_costs.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
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
    createMap(data);
    createNetwork(data);
    createTimeSeries(data);
} 