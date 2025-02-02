// Initialize the time series visualization
function initTimeSeries() {
    // Sample time series data
    const years = ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
    const infantCosts = [12000, 12500, 13000, 13800, 14500, 15200, 16000, 17000, 18000, 19000, 20000];
    const toddlerCosts = [11000, 11400, 12000, 12600, 13200, 13800, 14500, 15300, 16200, 17000, 18000];
    const preschoolCosts = [10000, 10300, 10800, 11400, 12000, 12500, 13200, 14000, 14800, 15500, 16500];

    const data = [
        {
            x: years,
            y: infantCosts,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Infant Care',
            line: {
                width: 3,
                shape: 'spline'
            }
        },
        {
            x: years,
            y: toddlerCosts,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Toddler Care',
            line: {
                width: 3,
                shape: 'spline'
            }
        },
        {
            x: years,
            y: preschoolCosts,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Preschool',
            line: {
                width: 3,
                shape: 'spline'
            }
        }
    ];

    const layout = {
        title: 'Childcare Cost Trends (2008-2018)',
        xaxis: {
            title: 'Year',
            showgrid: true
        },
        yaxis: {
            title: 'Annual Cost ($)',
            showgrid: true
        },
        height: 400,
        showlegend: true,
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1
        }
    };

    Plotly.newPlot('timeSeriesViz', data, layout);
}

// Update time series based on filters
function updateTimeSeries(selectedState, costRange) {
    // In a real implementation, this would filter the time series data based on selection
    const layout = {
        title: `Childcare Cost Trends (2008-2018) - ${selectedState === 'all' ? 'All States' : selectedState}`
    };

    Plotly.relayout('timeSeriesViz', layout);
}

// Add cost burden overlay
function addCostBurdenOverlay(data) {
    const trace = {
        x: data.years,
        y: data.costBurden,
        type: 'scatter',
        mode: 'lines',
        name: 'Cost Burden (%)',
        yaxis: 'y2',
        line: {
            color: 'red',
            width: 2
        }
    };

    const layout = {
        yaxis2: {
            title: 'Cost Burden (%)',
            overlaying: 'y',
            side: 'right',
            showgrid: false
        }
    };

    Plotly.update('timeSeriesViz', {}, layout);
    Plotly.addTraces('timeSeriesViz', trace);
}

// Create state comparison
function createStateComparison(states, years, costs) {
    const traces = states.map(state => ({
        x: years,
        y: costs[state],
        type: 'scatter',
        mode: 'lines+markers',
        name: state,
        line: {
            width: 2
        }
    }));

    const layout = {
        title: 'State-by-State Cost Comparison',
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Annual Cost ($)'
        },
        height: 400,
        showlegend: true
    };

    Plotly.newPlot('supplementaryViz', traces, layout);
} 