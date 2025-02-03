// Dashboard initialization and control logic
document.addEventListener('DOMContentLoaded', async function() {
    try {
        console.log('Initializing dashboard...');
        
        // Load data first
        const data = await loadData();
        if (!data) {
            console.error('Failed to load data');
            document.getElementById('mainViz').innerHTML = '<div class="alert alert-danger">Error loading data. Please check the console for details.</div>';
            return;
        }
        console.log('Data loaded successfully:', data);
        
        // Initialize map visualization
        console.log('Initializing map...');
        initMap(data);
        
        // Initialize time series
        console.log('Initializing time series...');
        initTimeSeries(data);
        
        // Load state data
        console.log('Loading states...');
        loadStates(data.states);
        
        // Set initial cost range value
        const maxCost = Math.max(...data.costs.infant.filter(cost => !isNaN(cost)));
        const costRange = document.getElementById('costRange');
        costRange.max = Math.ceil(maxCost);
        costRange.value = maxCost;
        console.log('Cost range set:', maxCost);
        
        // Event listeners for controls
        console.log('Setting up event listeners...');
        document.getElementById('stateSelect').addEventListener('change', () => {
            console.log('State selected:', document.getElementById('stateSelect').value);
            updateVisualizations(data);
        });
        
        document.getElementById('costRange').addEventListener('input', () => {
            console.log('Cost range changed:', document.getElementById('costRange').value);
            updateVisualizations(data);
        });
        
        document.getElementById('vizType').addEventListener('change', () => {
            console.log('Visualization type changed:', document.getElementById('vizType').value);
            switchVisualization(data);
        });
        
        console.log('Dashboard initialization complete');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showError('Error initializing dashboard. Please check the console for details.');
    }
});

// Load state data
function loadStates(stateAbbreviations) {
    const stateNames = {
        'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
        'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
        'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
        'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
        'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
        'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
        'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
        'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
        'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
        'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
        'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
        'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
        'WI': 'Wisconsin', 'WY': 'Wyoming', 'DC': 'District of Columbia'
    };
    
    const stateSelect = document.getElementById('stateSelect');
    stateSelect.innerHTML = '<option value="all">All States</option>';
    
    stateAbbreviations.forEach(abbr => {
        if (stateNames[abbr]) {
            const option = document.createElement('option');
            option.value = abbr;
            option.textContent = stateNames[abbr];
            stateSelect.appendChild(option);
        }
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
        console.log('Fetching data from childcare_costs.json...');
        // Get the base URL for GitHub Pages
        const baseUrl = window.location.pathname.includes('MS_Childcare_Cost_Analysis_Project') 
            ? '/MS_Childcare_Cost_Analysis_Project'
            : '';
        
        const dataUrl = `${baseUrl}/data/childcare_costs.json`;
        console.log('Attempting to fetch data from:', dataUrl);
        
        const response = await fetch(dataUrl);
        if (!response.ok) {
            console.error('Failed to fetch data:', response.status, response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data loaded successfully:', data);
        
        // Validate data structure
        if (!data.states || !data.costs || !data.metrics) {
            console.error('Invalid data structure:', data);
            throw new Error('Invalid data structure: missing required fields');
        }
        
        // Clean up NaN values
        Object.keys(data.costs).forEach(key => {
            data.costs[key] = data.costs[key].map(val => isNaN(val) ? null : val);
        });
        
        Object.keys(data.metrics).forEach(key => {
            data.metrics[key] = data.metrics[key].map(val => isNaN(val) ? null : val);
        });
        
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        // Show error in the UI with more detailed information
        const mainViz = document.getElementById('mainViz');
        if (mainViz) {
            mainViz.innerHTML = `
                <div class="alert alert-danger">
                    <h4>Error Loading Data</h4>
                    <p>${error.message}</p>
                    <p>Please check the browser console for more details.</p>
                    <p><small>Current path: ${window.location.pathname}</small></p>
                    <p><small>Attempted to load data from: ${window.location.origin}${window.location.pathname.includes('MS_Childcare_Cost_Analysis_Project') ? '/MS_Childcare_Cost_Analysis_Project' : ''}/data/childcare_costs.json</small></p>
                </div>
            `;
        }
        return null;
    }
}

// Show error message with details
function showError(message, details = '') {
    console.error(message, details);
    const mainViz = document.getElementById('mainViz');
    if (mainViz) {
        mainViz.innerHTML = `
            <div class="alert alert-danger">
                <h4>Error</h4>
                <p>${message}</p>
                ${details ? `<p><small>${details}</small></p>` : ''}
            </div>
        `;
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
    try {
        createMap(data);
        createNetwork(data);
        createTimeSeries(data);
    } catch (error) {
        console.error('Error creating visualizations:', error);
        showError('Error creating visualizations. Please try again.');
    }
}

// Initialize Sankey diagram
function initSankey(data) {
    if (!data) return;
    
    try {
        const sankeyData = prepareSankeyData(data);
        Plotly.newPlot('mainViz', sankeyData.data, sankeyData.layout);
    } catch (error) {
        console.error('Error initializing Sankey diagram:', error);
        showError('Error creating Sankey visualization');
    }
}

// Initialize 3D scatter plot
function init3DScatter(data) {
    if (!data) return;
    
    try {
        const scatterData = prepare3DData(data);
        Plotly.newPlot('mainViz', scatterData.data, scatterData.layout);
    } catch (error) {
        console.error('Error initializing 3D scatter:', error);
        showError('Error creating 3D visualization');
    }
}

// Prepare Sankey data
function prepareSankeyData(data) {
    const nodes = [
        { label: 'Infant Care' },
        { label: 'Toddler Care' },
        { label: 'Preschool' },
        { label: 'Cost Burden' },
        { label: 'Working Parents' }
    ];

    const links = [
        { source: 0, target: 1, value: Math.abs(calculateCorrelation(data.costs.infant, data.costs.toddler)) * 100 },
        { source: 1, target: 2, value: Math.abs(calculateCorrelation(data.costs.toddler, data.costs.preschool)) * 100 },
        { source: 0, target: 3, value: Math.abs(calculateCorrelation(data.costs.infant, data.metrics.cost_burden)) * 100 },
        { source: 3, target: 4, value: Math.abs(calculateCorrelation(data.metrics.cost_burden, data.metrics.working_parent_ratio)) * 100 }
    ];

    return {
        data: [{
            type: 'sankey',
            orientation: 'h',
            node: {
                pad: 15,
                thickness: 30,
                line: { color: 'black', width: 0.5 },
                label: nodes.map(n => n.label),
                color: nodes.map(() => getRandomColor())
            },
            link: {
                source: links.map(l => l.source),
                target: links.map(l => l.target),
                value: links.map(l => l.value)
            }
        }],
        layout: {
            title: 'Childcare Cost Flow Analysis',
            font: { size: 12 },
            height: 600
        }
    };
}

// Prepare 3D scatter data
function prepare3DData(data) {
    return {
        data: [{
            type: 'scatter3d',
            mode: 'markers',
            x: data.costs.infant,
            y: data.metrics.cost_burden,
            z: data.metrics.working_parent_ratio,
            text: data.states,
            marker: {
                size: 8,
                color: data.metrics.cost_burden,
                colorscale: 'Viridis',
                opacity: 0.8
            },
            hovertemplate:
                '<b>%{text}</b><br>' +
                'Infant Cost: $%{x:.2f}<br>' +
                'Cost Burden: %{y:.1f}%<br>' +
                'Working Parents: %{z:.1f}%'
        }],
        layout: {
            title: '3D Analysis of Childcare Costs',
            scene: {
                xaxis: { title: 'Infant Care Cost ($)' },
                yaxis: { title: 'Cost Burden (%)' },
                zaxis: { title: 'Working Parents (%)' }
            },
            height: 600
        }
    };
}

// Calculate correlation between two arrays
function calculateCorrelation(array1, array2) {
    const n = array1.length;
    if (n !== array2.length || n === 0) return 0;

    const mean1 = array1.reduce((a, b) => a + b) / n;
    const mean2 = array2.reduce((a, b) => a + b) / n;

    const variance1 = array1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) / n;
    const variance2 = array2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0) / n;

    const covariance = array1.reduce((a, b, i) => a + (b - mean1) * (array2[i] - mean2), 0) / n;

    return covariance / Math.sqrt(variance1 * variance2);
}

// Get random color
function getRandomColor() {
    const colors = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
} 