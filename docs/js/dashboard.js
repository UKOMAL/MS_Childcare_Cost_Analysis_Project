// Import visualization modules
import { initMap, updateMap } from './map.js';
import { initNetwork, updateNetwork } from './network.js';

let globalData = null;

// Dashboard initialization and control logic
async function initializeDashboard() {
    try {
        console.log('Starting dashboard initialization...');
        
        // Load data first
        const data = await loadData();
        if (!data) {
            throw new Error('Failed to load data: Data is null or undefined');
        }
        console.log('Data loaded successfully');
        
        // Store data globally
        globalData = data;
        
        // Initialize visualizations
        try {
            // Initialize map first
            console.log('Initializing map...');
            await initMap(data);
            console.log('Map initialized');

            // Initialize network
            console.log('Initializing network...');
            await initNetwork(data);
            console.log('Network initialized');
            
            // Load state data
            console.log('Loading state data...');
            loadStates(data.states);
            
            // Set initial cost range value
            const maxCost = Math.max(...data.costs.infant.filter(cost => !isNaN(cost)));
            const costRange = document.getElementById('costRange');
            if (costRange) {
                costRange.max = Math.ceil(maxCost);
                costRange.value = maxCost;
                document.getElementById('costRangeValue').textContent = `$0 - $${maxCost}`;
            }
            
            // Setup event listeners
            console.log('Setting up event listeners...');
            setupEventListeners();
            
            // Update initial visualizations
            console.log('Updating initial visualizations...');
            await updateVisualizations();
            
            console.log('Dashboard initialization complete');
            return true;
        } catch (vizError) {
            console.error('Error initializing visualizations:', vizError);
            throw new Error(`Visualization initialization failed: ${vizError.message}`);
        }
    } catch (error) {
        console.error('Error in dashboard initialization:', error);
        throw error;
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('stateSelect').addEventListener('change', () => {
        updateVisualizations();
    });
    
    document.getElementById('costRange').addEventListener('input', () => {
        updateVisualizations();
    });
    
    document.getElementById('vizType').addEventListener('change', () => {
        switchVisualization();
    });
}

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
async function updateVisualizations() {
    if (!globalData) {
        console.error('No data available for visualization update');
        return;
    }
    
    try {
        const selectedState = document.getElementById('stateSelect').value;
        const costRange = document.getElementById('costRange').value;
        const vizType = document.getElementById('vizType').value;
        
        // Update cost range value display
        document.getElementById('costRangeValue').textContent = 
            `$0 - $${costRange}`;
        
        // Update average metrics
        updateAverageMetrics(globalData);
        
        switch(vizType) {
            case 'map':
                await updateMap(selectedState, costRange, globalData);
                break;
            case 'network':
                await updateNetwork(selectedState, costRange, globalData);
                break;
            case 'sankey':
                await updateSankey(selectedState, costRange, globalData);
                break;
            case '3d':
                await update3DScatter(selectedState, costRange, globalData);
                break;
        }
    } catch (error) {
        console.error('Error updating visualizations:', error);
        showError('Error updating visualization. Please try again.');
    }
}

// Switch between different visualization types
function switchVisualization() {
    try {
        const vizType = document.getElementById('vizType').value;
        const mainViz = document.getElementById('mainViz');
        const supplementaryViz = document.getElementById('supplementaryViz');
        
        // Clear existing visualizations
        mainViz.innerHTML = '';
        supplementaryViz.innerHTML = '';
        
        switch(vizType) {
            case 'map':
                initMap(globalData);
                break;
            case 'network':
                initNetwork(globalData);
                break;
            case 'sankey':
                initSankey(globalData);
                break;
            case '3d':
                init3DScatter(globalData);
                break;
        }
        
        updateVisualizations();
    } catch (error) {
        console.error('Error switching visualization:', error);
        showError('Error switching visualization. Please try again.');
    }
}

// Load and process data
async function loadData() {
    console.log('Starting data loading process...');
    try {
        // Get the current URL
        const currentUrl = window.location.href;
        console.log('Current URL:', currentUrl);
        
        // Construct the data URL
        const dataUrl = new URL('./data/childcare_costs.json', currentUrl).href;
        console.log('Attempting to load data from:', dataUrl);
        
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data loaded successfully');
        
        // Validate data structure
        if (!data.states || !data.costs || !data.metrics) {
            throw new Error('Invalid data structure: missing required properties');
        }
        
        // Clean up data
        Object.keys(data.costs).forEach(key => {
            data.costs[key] = data.costs[key].map(val => 
                isNaN(val) ? null : parseFloat(val.toFixed(2))
            );
        });
        
        Object.keys(data.metrics).forEach(key => {
            data.metrics[key] = data.metrics[key].map(val => 
                isNaN(val) ? null : parseFloat(val.toFixed(2))
            );
        });
        
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        console.log('Current page URL:', window.location.href);
        throw new Error(`Failed to load data: ${error.message}`);
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
                <button class="btn btn-light mt-3" onclick="window.location.reload()">
                    <i class="fas fa-sync-alt"></i> Reload Dashboard
                </button>
            </div>
        `;
    }
}

// Create all visualizations with the loaded data
function createVisualizations(data) {
    try {
        initMap(data);
        initNetwork(data);
        updateVisualizations(data);
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

// Calculate and display average metrics
function updateAverageMetrics(data) {
    if (!data || !data.costs || !data.metrics) return;

    try {
        // Calculate averages
        const avgInfantCost = calculateAverage(data.costs.infant);
        const avgCostBurden = calculateAverage(data.metrics.cost_burden);
        const avgWorkingParents = calculateAverage(data.metrics.working_parent_ratio);

        // Update UI
        document.getElementById('avgInfantCost').textContent = 
            `$${avgInfantCost.toFixed(2)}`;
        document.getElementById('avgCostBurden').textContent = 
            `${avgCostBurden.toFixed(1)}%`;
        document.getElementById('avgWorkingParents').textContent = 
            `${avgWorkingParents.toFixed(1)}%`;
    } catch (error) {
        console.error('Error updating average metrics:', error);
    }
}

// Calculate average of array, excluding null/NaN values
function calculateAverage(array) {
    const validValues = array.filter(val => val !== null && !isNaN(val));
    return validValues.reduce((a, b) => a + b, 0) / validValues.length;
}

// Export necessary functions
export {
    initializeDashboard,
    loadData,
    updateVisualizations,
    switchVisualization,
    showError,
    updateAverageMetrics,
    calculateAverage
}; 