// Dashboard Test Script
// This script will be used to test if the dashboard is loading properly

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
        
        // Fetch the data
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data loaded successfully:', data);
        
        // Check data structure
        if (!data.states || !data.costs || !data.metrics) {
            throw new Error('Invalid data structure');
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
        console.error('Error loading data:', error);
        throw error;
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