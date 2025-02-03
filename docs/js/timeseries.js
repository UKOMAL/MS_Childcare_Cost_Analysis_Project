// Initialize time series visualization
function initTimeSeries(data) {
    if (!data || !data.costs || !data.states) {
        console.error('Invalid data structure for time series visualization');
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

        Object.entries(costTypes).forEach(([label, costs]) => {
            traces.push({
                type: 'scatter',
                mode: 'lines+markers',
                name: label,
                x: states,
                y: costs,
                text: costs.map((cost, i) => 
                    `${states[i]}<br>${label}: $${cost ? cost.toFixed(2) : 'No data'}`
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
            title: 'Childcare Costs Comparison',
            xaxis: {
                title: 'States',
                tickangle: 45,
                automargin: true
            },
            yaxis: {
                title: 'Monthly Cost ($)',
                automargin: true
            },
            height: 500,
            margin: {
                l: 60,
                r: 30,
                b: 80,
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

        Plotly.newPlot('timeSeriesViz', traces, layout);
        console.log('Time series visualization created successfully');
    } catch (error) {
        console.error('Error creating time series visualization:', error);
        document.getElementById('timeSeriesViz').innerHTML = 
            '<div class="alert alert-danger">Error creating time series visualization. Please check the console for details.</div>';
    }
}

// Update time series based on filters
function updateTimeSeries(selectedState, costRange, data) {
    if (!data || !data.states) return;

    try {
        let filteredData = {...data};
        
        if (selectedState !== 'all') {
            const stateIndex = data.states.indexOf(selectedState);
            if (stateIndex !== -1) {
                filteredData = {
                    states: [data.states[stateIndex]],
                    costs: {
                        infant: [data.costs.infant[stateIndex]],
                        toddler: [data.costs.toddler[stateIndex]],
                        preschool: [data.costs.preschool[stateIndex]]
                    }
                };
            }
        }

        // Filter by cost range
        const maxCost = parseFloat(costRange);
        const validIndices = filteredData.states.map((_, i) => 
            !isNaN(filteredData.costs.infant[i]) && 
            filteredData.costs.infant[i] <= maxCost ? i : -1
        ).filter(i => i !== -1);

        filteredData = {
            states: validIndices.map(i => filteredData.states[i]),
            costs: {
                infant: validIndices.map(i => filteredData.costs.infant[i]),
                toddler: validIndices.map(i => filteredData.costs.toddler[i]),
                preschool: validIndices.map(i => filteredData.costs.preschool[i])
            }
        };

        initTimeSeries(filteredData);
    } catch (error) {
        console.error('Error updating time series:', error);
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