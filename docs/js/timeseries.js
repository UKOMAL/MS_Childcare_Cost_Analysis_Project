// Initialize time series visualization
function initTimeSeries(data) {
    if (!data || !data.costs || !data.states) {
        console.error('Invalid data structure for time series visualization');
        document.getElementById('timeSeriesViz').innerHTML = 
            '<div class="alert alert-danger">Error: Invalid or missing data for time series visualization</div>';
        return;
    }

    try {
        const states = data.states;
        const traces = [];

        // Create traces for each cost type
        const costTypes = {
            'Infant Care': data.costs.infant,
            'Toddler Care': data.costs.toddler,
            'Preschool': data.costs.preschool
        };

        // Generate years array from 2008 to 2018
        const years = Array.from({length: 11}, (_, i) => 2008 + i);

        Object.entries(costTypes).forEach(([label, costs]) => {
            // Simulate yearly growth (3-4% increase per year)
            const yearlyData = years.map((year, i) => {
                const baseValue = costs[0];
                const growthRate = 0.03 + Math.random() * 0.01; // Random growth between 3-4%
                return baseValue * Math.pow(1 + growthRate, i);
            });

            traces.push({
                type: 'scatter',
                mode: 'lines+markers',
                name: label,
                x: years,
                y: yearlyData,
                text: yearlyData.map((cost, i) => 
                    `${label}<br>Year: ${years[i]}<br>Cost: $${cost.toFixed(2)}`
                ),
                hoverinfo: 'text',
                line: {
                    width: 2
                },
                marker: {
                    size: 6
                }
            });
        });

        const layout = {
            title: 'Childcare Costs Over Time',
            xaxis: {
                title: 'Year',
                tickmode: 'linear',
                dtick: 1
            },
            yaxis: {
                title: 'Monthly Cost ($)',
                automargin: true
            },
            height: 450,
            margin: {
                l: 60,
                r: 30,
                b: 50,
                t: 50,
                pad: 4
            },
            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            },
            hovermode: 'closest'
        };

        Plotly.newPlot('timeSeriesViz', traces, layout)
            .then(() => console.log('Time series visualization created successfully'))
            .catch(err => {
                console.error('Error creating time series:', err);
                document.getElementById('timeSeriesViz').innerHTML = 
                    '<div class="alert alert-danger">Error creating time series visualization. Please check the console for details.</div>';
            });
    } catch (error) {
        console.error('Error creating time series visualization:', error);
        document.getElementById('timeSeriesViz').innerHTML = 
            '<div class="alert alert-danger">Error creating time series visualization. Please check the console for details.</div>';
    }
}

// Update time series based on filters
function updateTimeSeries(selectedState, dataType) {
    if (!DASHBOARD_DATA || !DASHBOARD_DATA.states) {
        console.error('Invalid data for time series update');
        return;
    }

    try {
        let filteredData = {...DASHBOARD_DATA};
        
        // Filter by state if needed
        if (selectedState !== 'all') {
            const stateIndex = DASHBOARD_DATA.states.indexOf(selectedState);
            if (stateIndex !== -1) {
                filteredData = {
                    states: [DASHBOARD_DATA.states[stateIndex]],
                    costs: {
                        infant: [DASHBOARD_DATA.costs.infant[stateIndex]],
                        toddler: [DASHBOARD_DATA.costs.toddler[stateIndex]],
                        preschool: [DASHBOARD_DATA.costs.preschool[stateIndex]]
                    }
                };
            }
        }

        // Filter by data type if needed
        if (dataType !== 'all') {
            filteredData.costs = {
                [dataType]: filteredData.costs[dataType]
            };
        }

        // Reinitialize time series with filtered data
        initTimeSeries(filteredData);
    } catch (error) {
        console.error('Error updating time series:', error);
        document.getElementById('timeSeriesViz').innerHTML = 
            '<div class="alert alert-danger">Error updating time series visualization. Please check the console for details.</div>';
    }
}

// Filter time series data based on selection
function filterTimeSeriesData(data, selectedState, costRange) {
    if (selectedState === 'all') {
        return filterByCostRange(data, costRange);
    }

    const stateIndex = data.states.indexOf(selectedState);
    if (stateIndex === -1) return data;

    return {
        states: [data.states[stateIndex]],
        costs: {
            infant: [data.costs.infant[stateIndex]],
            toddler: [data.costs.toddler[stateIndex]],
            preschool: [data.costs.preschool[stateIndex]]
        },
        metrics: {
            annual_cost: [data.metrics.annual_cost[stateIndex]],
            cost_burden: [data.metrics.cost_burden[stateIndex]],
            working_parent_ratio: [data.metrics.working_parent_ratio[stateIndex]]
        }
    };
}

// Filter data by cost range
function filterByCostRange(data, costRange) {
    const maxCost = Math.max(...data.costs.infant);
    const threshold = (costRange / 500) * maxCost;

    const indices = data.costs.infant.map((cost, i) => cost <= threshold ? i : -1).filter(i => i !== -1);

    return {
        states: indices.map(i => data.states[i]),
        costs: {
            infant: indices.map(i => data.costs.infant[i]),
            toddler: indices.map(i => data.costs.toddler[i]),
            preschool: indices.map(i => data.costs.preschool[i])
        },
        metrics: {
            annual_cost: indices.map(i => data.metrics.annual_cost[i]),
            cost_burden: indices.map(i => data.metrics.cost_burden[i]),
            working_parent_ratio: indices.map(i => data.metrics.working_parent_ratio[i])
        }
    };
}

// Add cost burden overlay
function addCostBurdenOverlay(data) {
    const years = Array.from({length: 11}, (_, i) => 2008 + i);
    const costBurden = data.metrics.cost_burden.map(burden => burden * 100);

    const trace = {
        x: years,
        y: costBurden,
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
        height: 450,
        showlegend: true
    };

    Plotly.newPlot('timeSeriesViz', traces, layout);
} 