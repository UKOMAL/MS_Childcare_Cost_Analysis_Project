// Initialize the map visualization
function initMap(data) {
    if (!data) {
        console.error('No data provided for map visualization');
        return;
    }

    try {
        const mapData = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: data.states,
            z: data.costs.infant,
            text: data.states.map((state, i) => 
                `State: ${state}<br>` +
                `Infant Care Cost: $${data.costs.infant[i].toFixed(2)}<br>` +
                `Cost Burden: ${data.metrics.cost_burden[i].toFixed(1)}%<br>` +
                `Working Parents: ${data.metrics.working_parent_ratio[i].toFixed(1)}%`
            ),
            colorscale: 'Viridis',
            colorbar: {
                title: 'Monthly Cost ($)',
                thickness: 20
            },
            hoverinfo: 'text'
        }];

        const layout = {
            title: 'Childcare Costs by State',
            geo: {
                scope: 'usa',
                showlakes: true,
                lakecolor: 'rgb(255,255,255)'
            },
            height: 600
        };

        Plotly.newPlot('mainViz', mapData, layout);
    } catch (error) {
        console.error('Error creating map visualization:', error);
        document.getElementById('mainViz').innerHTML = '<div class="alert alert-danger">Error creating map visualization</div>';
    }
}

// Update map based on filters
function updateMap(selectedState, costRange, data) {
    if (!data) return;

    try {
        const filteredData = filterMapData(data, selectedState, costRange);
        initMap(filteredData);
    } catch (error) {
        console.error('Error updating map:', error);
    }
}

// Filter map data based on selection
function filterMapData(data, selectedState, costRange) {
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

// Helper function to convert state names to abbreviations
function getStateAbbreviation(stateName) {
    const stateAbbreviations = {
        'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
        'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
        'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
        'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
        'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
        'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
        'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
        'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
        'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
        'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
        'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
        'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
        'Wisconsin': 'WI', 'Wyoming': 'WY'
    };
    
    return stateAbbreviations[stateName] || stateName;
}

// Create bubble overlay for cost burden
function createBubbleOverlay(data) {
    const bubbleData = {
        type: 'scattergeo',
        locationmode: 'USA-states',
        lon: data.longitudes,
        lat: data.latitudes,
        text: data.texts,
        marker: {
            size: data.sizes,
            color: data.colors,
            colorscale: 'RdYlBu',
            reversescale: true,
            colorbar: {
                title: 'Cost Burden (%)'
            }
        },
        name: 'Cost Burden'
    };

    Plotly.addTraces('mainViz', bubbleData);
} 