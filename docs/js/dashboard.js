// Import visualization modules
import { initMap, updateMap } from './map.js';
import { initNetwork, updateNetwork } from './network.js';

let globalData = null;

/**
 * Dashboard initialization and control logic
 * Handles the loading of data and initialization of all visualizations
 * @returns {Promise<boolean>} Promise resolving to true if initialization was successful
 */
async function initializeDashboard() {
    try {
        console.log('Starting dashboard initialization...');
        
        // Show loading indicator
        document.getElementById('mainViz').innerHTML = 
            '<div class="text-center p-5"><i class="fas fa-spinner fa-spin fa-3x"></i><p class="mt-3">Loading dashboard data...</p></div>';
        
        // Load data first
        const data = await loadData();
        if (!data) {
            throw new Error('Failed to load data: Data is null or undefined');
        }
        console.log('Data loaded successfully:', data);
        
        // Store data globally
        globalData = data;
        
        // Initialize visualizations
        try {
            // Initialize map first
            console.log('Initializing map...');
            await initMap(data);
            console.log('Map initialized successfully');

            // Initialize network
            console.log('Initializing network...');
            await initNetwork(data);
            console.log('Network initialized successfully');
            
            // Load state data
            console.log('Loading state data...');
            loadStates(data.states);
            
            // Set initial cost range value
            const validCosts = data.costs.infant.filter(cost => !isNaN(cost) && cost !== null);
            const maxCost = validCosts.length > 0 ? Math.max(...validCosts) : 1000;
            const costRange = document.getElementById('costRange');
            if (costRange) {
                costRange.max = Math.ceil(maxCost);
                costRange.value = maxCost;
                document.getElementById('costRangeValue').textContent = `$0 - $${maxCost.toFixed(0)}`;
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
            showError('Visualization initialization failed', vizError.message);
            throw new Error(`Visualization initialization failed: ${vizError.message}`);
        }
    } catch (error) {
        console.error('Error in dashboard initialization:', error);
        showError('Dashboard initialization failed', error.message);
        throw error;
    }
}

/**
 * Setup event listeners for dashboard controls
 */
function setupEventListeners() {
    const stateSelect = document.getElementById('stateSelect');
    if (stateSelect) {
        stateSelect.addEventListener('change', () => {
            updateVisualizations();
        });
    }
    
    const costRange = document.getElementById('costRange');
    if (costRange) {
        costRange.addEventListener('input', (e) => {
            document.getElementById('costRangeValue').textContent = `$0 - $${e.target.value}`;
            updateVisualizations();
        });
    }
    
    const vizType = document.getElementById('vizType');
    if (vizType) {
        vizType.addEventListener('change', () => {
            switchVisualization();
        });
    }
}

/**
 * Load state data into the state selector dropdown
 * @param {Array} stateAbbreviations Array of state abbreviations
 */
function loadStates(stateAbbreviations) {
    if (!stateAbbreviations || !Array.isArray(stateAbbreviations)) {
        console.error('Invalid state abbreviations data');
        return;
    }
    
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
    if (!stateSelect) {
        console.error('State select element not found');
        return;
    }
    
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

/**
 * Update all visualizations based on current filters
 * @returns {Promise<void>}
 */
async function updateVisualizations() {
    if (!globalData) {
        console.error('No data available for visualization update');
        showError('Data error', 'No data available for visualization update');
        return;
    }
    
    try {
        const selectedState = document.getElementById('stateSelect')?.value || 'all';
        const costRange = parseFloat(document.getElementById('costRange')?.value || 0);
        const vizType = document.getElementById('vizType')?.value || 'map';
        
        console.log('Updating visualizations with filters:', { selectedState, costRange, vizType });
        
        // Update cost range value display
        const costRangeDisplay = document.getElementById('costRangeValue');
        if (costRangeDisplay) {
            costRangeDisplay.textContent = `$0 - $${costRange.toFixed(0)}`;
        }
        
        // Update average metrics
        updateAverageMetrics(globalData);
        
        // Update the active visualization based on selected type
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
            default:
                console.warn(`Unknown visualization type: ${vizType}, defaulting to map`);
                await updateMap(selectedState, costRange, globalData);
        }
        
        console.log('Visualizations updated successfully');
    } catch (error) {
        console.error('Error updating visualizations:', error);
        showError('Visualization update failed', error.message);
    }
}

/**
 * Switch between different visualization types
 */
function switchVisualization() {
    try {
        const vizType = document.getElementById('vizType')?.value || 'map';
        const mainViz = document.getElementById('mainViz');
        const supplementaryViz = document.getElementById('supplementaryViz');
        
        if (!mainViz) {
            console.error('Main visualization container not found');
            return;
        }
        
        console.log(`Switching to visualization type: ${vizType}`);
        
        // Show loading indicator
        mainViz.innerHTML = '<div class="text-center p-5"><i class="fas fa-spinner fa-spin fa-3x"></i><p class="mt-3">Loading visualization...</p></div>';
        if (supplementaryViz) {
            supplementaryViz.innerHTML = '';
        }
        
        // Initialize the selected visualization type
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
            default:
                console.warn(`Unknown visualization type: ${vizType}, defaulting to map`);
                initMap(globalData);
        }
        
        // Update visualizations with current filters
        updateVisualizations();
    } catch (error) {
        console.error('Error switching visualization:', error);
        showError('Error switching visualization', error.message);
    }
}

/**
 * Load and process data from JSON source
 * @returns {Promise<Object>} The processed data object
 */
async function loadData() {
    console.log('Starting data loading process...');
    try {
        // Get the current URL for proper path resolution
        const currentUrl = window.location.href;
        console.log('Current URL:', currentUrl);
        
        // Construct the data URL for both local and GitHub Pages environments
        let dataUrl;
        try {
            dataUrl = new URL('./data/childcare_costs.json', currentUrl).href;
        } catch (urlError) {
            // Fallback for older browsers or if URL construction fails
            const basePath = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
            dataUrl = `${basePath}data/childcare_costs.json`;
        }
        console.log('Attempting to load data from:', dataUrl);
        
        // Fetch the data
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data fetch completed');
        
        // Validate data structure
        if (!data.states || !Array.isArray(data.states) || data.states.length === 0) {
            throw new Error('Invalid data structure: missing or empty states array');
        }
        
        if (!data.costs || !data.costs.infant || !data.costs.toddler || !data.costs.preschool) {
            throw new Error('Invalid data structure: missing cost data');
        }
        
        if (!data.metrics || !data.metrics.cost_burden || !data.metrics.working_parent_ratio) {
            throw new Error('Invalid data structure: missing metrics data');
        }
        
        // Clean and normalize data
        Object.keys(data.costs).forEach(key => {
            data.costs[key] = data.costs[key].map(val => 
                isNaN(val) || val === null ? null : parseFloat(val.toFixed(2))
            );
        });
        
        Object.keys(data.metrics).forEach(key => {
            data.metrics[key] = data.metrics[key].map(val => 
                isNaN(val) || val === null ? null : parseFloat(val.toFixed(2))
            );
        });
        
        console.log('Data processed successfully');
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        console.log('Current page URL:', window.location.href);
        showError('Data loading failed', `Failed to load data: ${error.message}. Check console for details.`);
        throw new Error(`Failed to load data: ${error.message}`);
    }
}

/**
 * Show error message with details
 * @param {string} message The main error message
 * @param {string} details Optional additional error details
 */
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

/**
 * Create all visualizations with the loaded data
 * @param {Object} data The data object
 */
function createVisualizations(data) {
    if (!data) {
        console.error('No data available for visualization creation');
        return;
    }
    
    try {
        console.log('Creating all visualizations');
        initMap(data);
        initNetwork(data);
        updateVisualizations();
    } catch (error) {
        console.error('Error creating visualizations:', error);
        showError('Error creating visualizations', error.message);
    }
}

/**
 * Initialize Sankey diagram
 * @param {Object} data The data object
 */
function initSankey(data) {
    if (!data) {
        console.error('No data available for Sankey diagram');
        return;
    }
    
    try {
        console.log('Initializing Sankey diagram');
        const sankeyData = prepareSankeyData(data);
        
        const layout = {
            title: {
                text: 'Childcare Cost Flow Analysis',
                font: { size: 24, color: '#2c3e50' }
            },
            font: { size: 12 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 600,
            margin: { t: 50, l: 50, r: 50, b: 50 }
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            toImageButtonOptions: {
                format: 'png',
                filename: 'childcare_sankey_analysis',
                height: 800,
                width: 1200,
                scale: 2
            }
        };
        
        Plotly.newPlot('mainViz', sankeyData.data, layout, config)
            .then(() => console.log('Sankey diagram created successfully'))
            .catch(err => {
                console.error('Error plotting Sankey diagram:', err);
                showError('Error creating Sankey diagram', err.message);
            });
    } catch (error) {
        console.error('Error initializing Sankey diagram:', error);
        showError('Error creating Sankey visualization', error.message);
    }
}

/**
 * Initialize 3D scatter plot
 * @param {Object} data The data object
 */
function init3DScatter(data) {
    if (!data) {
        console.error('No data available for 3D scatter plot');
        return;
    }
    
    try {
        console.log('Initializing 3D scatter plot');
        const scatterData = prepare3DData(data);
        
        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            toImageButtonOptions: {
                format: 'png',
                filename: 'childcare_3d_analysis',
                height: 800,
                width: 1200,
                scale: 2
            }
        };
        
        Plotly.newPlot('mainViz', scatterData.data, scatterData.layout, config)
            .then(() => console.log('3D scatter plot created successfully'))
            .catch(err => {
                console.error('Error plotting 3D scatter:', err);
                showError('Error creating 3D visualization', err.message);
            });
    } catch (error) {
        console.error('Error initializing 3D scatter:', error);
        showError('Error creating 3D visualization', error.message);
    }
}

/**
 * Prepare Sankey data
 * @param {Object} data The data object
 * @returns {Object} Sankey diagram data and layout
 */
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

    // Ensure minimum value for links to be visible
    links.forEach(link => {
        link.value = Math.max(5, link.value);
    });

    return {
        data: [{
            type: 'sankey',
            orientation: 'h',
            node: {
                pad: 15,
                thickness: 30,
                line: { color: 'black', width: 0.5 },
                label: nodes.map(n => n.label),
                color: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
            },
            link: {
                source: links.map(l => l.source),
                target: links.map(l => l.target),
                value: links.map(l => l.value),
                color: links.map(l => `rgba(150,150,150,${Math.min(0.8, l.value/100)})`)
            }
        }],
        layout: {
            title: 'Childcare Cost Flow Analysis',
            font: { size: 12 },
            height: 600
        }
    };
}

/**
 * Prepare 3D scatter data
 * @param {Object} data The data object
 * @returns {Object} 3D scatter plot data and layout
 */
function prepare3DData(data) {
    // Filter out null/NaN values while keeping indices aligned
    const validIndices = [];
    for (let i = 0; i < data.states.length; i++) {
        if (!isNaN(data.costs.infant[i]) && 
            !isNaN(data.metrics.cost_burden[i]) && 
            !isNaN(data.metrics.working_parent_ratio[i])) {
            validIndices.push(i);
        }
    }
    
    const x = validIndices.map(i => data.costs.infant[i]);
    const y = validIndices.map(i => data.metrics.cost_burden[i]);
    const z = validIndices.map(i => data.metrics.working_parent_ratio[i]);
    const text = validIndices.map(i => data.states[i]);
    
    return {
        data: [{
            type: 'scatter3d',
            mode: 'markers',
            x: x,
            y: y,
            z: z,
            text: text,
            marker: {
                size: 8,
                color: y,
                colorscale: 'Viridis',
                opacity: 0.8,
                colorbar: {
                    title: 'Cost Burden (%)'
                }
            },
            hovertemplate:
                '<b>%{text}</b><br>' +
                'Infant Cost: $%{x:.2f}<br>' +
                'Cost Burden: %{y:.1f}%<br>' +
                'Working Parents: %{z:.1f}%'
        }],
        layout: {
            title: {
                text: '3D Analysis of Childcare Costs',
                font: { size: 24, color: '#2c3e50' }
            },
            scene: {
                xaxis: { title: 'Infant Care Cost ($)' },
                yaxis: { title: 'Cost Burden (%)' },
                zaxis: { title: 'Working Parents (%)' }
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 600,
            margin: { t: 50, l: 0, r: 0, b: 0 }
        }
    };
}

/**
 * Calculate correlation between two arrays
 * @param {Array} array1 First array of numbers
 * @param {Array} array2 Second array of numbers
 * @returns {number} Correlation coefficient
 */
function calculateCorrelation(array1, array2) {
    // Filter out NaN values
    const validPairs = [];
    for (let i = 0; i < array1.length; i++) {
        if (!isNaN(array1[i]) && !isNaN(array2[i]) && 
            array1[i] !== null && array2[i] !== null) {
            validPairs.push([array1[i], array2[i]]);
        }
    }
    
    if (validPairs.length < 3) return 0.5; // Not enough data for meaningful correlation
    
    const x = validPairs.map(pair => pair[0]);
    const y = validPairs.map(pair => pair[1]);
    
    const n = x.length;
    const mean1 = x.reduce((a, b) => a + b, 0) / n;
    const mean2 = y.reduce((a, b) => a + b, 0) / n;
    
    const variance1 = x.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) / n;
    const variance2 = y.reduce((a, b) => a + Math.pow(b - mean2, 2), 0) / n;
    
    if (variance1 === 0 || variance2 === 0) return 0.5; // Avoid division by zero
    
    const covariance = x.reduce((a, b, i) => a + (b - mean1) * (y[i] - mean2), 0) / n;
    const correlation = covariance / Math.sqrt(variance1 * variance2);
    
    // Handle NaN result (can happen with certain data patterns)
    return isNaN(correlation) ? 0.5 : correlation;
}

/**
 * Get random color from a predefined palette
 * @returns {string} Hex color code
 */
function getRandomColor() {
    const colors = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
        '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Calculate and display average metrics
 * @param {Object} data The data object
 */
function updateAverageMetrics(data) {
    if (!data || !data.costs || !data.metrics) {
        console.error('Invalid data for average metrics calculation');
        return;
    }

    try {
        // Calculate averages
        const avgInfantCost = calculateAverage(data.costs.infant);
        const avgCostBurden = calculateAverage(data.metrics.cost_burden);
        const avgWorkingParents = calculateAverage(data.metrics.working_parent_ratio);

        // Update UI if elements exist
        const infantCostElement = document.getElementById('avgInfantCost');
        if (infantCostElement) {
            infantCostElement.textContent = `$${avgInfantCost.toFixed(2)}`;
        }
        
        const costBurdenElement = document.getElementById('avgCostBurden');
        if (costBurdenElement) {
            costBurdenElement.textContent = `${avgCostBurden.toFixed(1)}%`;
        }
        
        const workingParentsElement = document.getElementById('avgWorkingParents');
        if (workingParentsElement) {
            workingParentsElement.textContent = `${avgWorkingParents.toFixed(1)}%`;
        }
    } catch (error) {
        console.error('Error updating average metrics:', error);
    }
}

/**
 * Calculate average of array, excluding null/NaN values
 * @param {Array} array Array of numbers
 * @returns {number} Average value
 */
function calculateAverage(array) {
    if (!array || !Array.isArray(array)) return 0;
    
    const validValues = array.filter(val => val !== null && !isNaN(val));
    if (validValues.length === 0) return 0;
    
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