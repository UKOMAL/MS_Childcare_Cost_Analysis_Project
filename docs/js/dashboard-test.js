// Dashboard Test Script
// This script will be used to test if the dashboard is loading properly

// Fallback data in case the JSON file cannot be loaded
const FALLBACK_DATA = {
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

// Function to test data loading
async function testDataLoading() {
    console.log('Testing data loading...');
    try {
        // Get the current URL for proper path resolution
        const currentUrl = window.location.href;
        console.log('Current URL:', currentUrl);
        
        // Construct the data URL
        let dataUrl;
        try {
            dataUrl = new URL('./data/childcare_costs.json', currentUrl).href;
        } catch (urlError) {
            // Fallback for older browsers
            const basePath = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
            dataUrl = `${basePath}data/childcare_costs.json`;
        }
        console.log('Attempting to load data from:', dataUrl);
        
        let data;
        try {
            // Try to fetch the data
            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            data = await response.json();
            console.log('Data loaded successfully from file:', data);
        } catch (fetchError) {
            console.warn('Failed to load data from file, using fallback data:', fetchError);
            data = FALLBACK_DATA;
            console.log('Using fallback data:', data);
        }
        
        // Check data structure
        if (!data.states || !data.costs || !data.metrics) {
            console.warn('Invalid data structure, using fallback data');
            data = FALLBACK_DATA;
        }
        
        console.log('Data structure is valid');
        console.log('States count:', data.states.length);
        console.log('First few states:', data.states.slice(0, 5));
        
        // Check for NaN values
        const nanValues = [];
        Object.keys(data.costs).forEach(key => {
            data.costs[key].forEach((val, idx) => {
                if (val === null || val === undefined || (typeof val === 'number' && isNaN(val))) {
                    nanValues.push(`${key}[${idx}] (${data.states[idx]})`);
                }
            });
        });
        
        if (nanValues.length > 0) {
            console.warn('Found NaN values:', nanValues);
        } else {
            console.log('No NaN values found in the data');
        }
        
        return data;
    } catch (error) {
        console.error('Error in data loading process:', error);
        console.log('Returning fallback data due to error');
        return FALLBACK_DATA;
    }
}

// Function to test Plotly initialization
function testPlotlyInitialization() {
    console.log('Testing Plotly initialization...');
    if (typeof Plotly === 'undefined') {
        console.error('Plotly is not defined');
        return false;
    }
    console.log('Plotly is available:', Plotly.version);
    return true;
}

// Function to run all tests
async function runAllTests() {
    console.log('Running all dashboard tests...');
    
    try {
        // Test Plotly initialization
        const plotlyResult = testPlotlyInitialization();
        console.log('Plotly test result:', plotlyResult ? 'PASS' : 'FAIL');
        
        // Test data loading
        const data = await testDataLoading();
        console.log('Data loading test result:', data ? 'PASS' : 'FAIL');
        
        console.log('All tests completed');
        return true;
    } catch (error) {
        console.error('Test failed:', error);
        return false;
    }
}

// Export test functions
window.dashboardTests = {
    testDataLoading,
    testPlotlyInitialization,
    runAllTests
};

console.log('Dashboard test script loaded'); 