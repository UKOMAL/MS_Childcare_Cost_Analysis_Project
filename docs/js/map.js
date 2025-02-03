// Initialize the map visualization
function initMap(data) {
    if (!data || !data.states || !data.costs || !data.costs.infant) {
        console.error('Invalid data structure for map visualization');
        return;
    }

    try {
        console.log('Creating map with data:', data);
        const locations = data.states;
        const z = data.costs.infant.map(cost => cost || 0); // Handle NaN values
        const text = locations.map((state, i) => 
            `${getStateName(state)}<br>Monthly Cost: $${z[i] ? z[i].toFixed(2) : 'No data'}`
        );

        const mapData = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: locations,
            z: z,
            text: text,
            hoverinfo: 'text',
            colorscale: 'Viridis',
            colorbar: {
                title: 'Monthly Cost ($)',
                thickness: 20,
                len: 0.9,
                y: 0.5,
                yanchor: 'middle'
            },
            marker: {
                line: {
                    color: 'rgb(255,255,255)',
                    width: 2
                }
            }
        }];

        const layout = {
            title: {
                text: 'Childcare Costs by State',
                y: 0.95
            },
            geo: {
                scope: 'usa',
                showlakes: true,
                lakecolor: 'rgb(255,255,255)',
                projection: {
                    type: 'albers usa'
                },
                showland: true,
                landcolor: 'rgb(250,250,250)',
                countrycolor: 'rgb(204,204,204)'
            },
            autosize: true,
            height: 550,
            margin: {
                l: 10,
                r: 10,
                b: 10,
                t: 40,
                pad: 0
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
        };

        const config = {
            responsive: true,
            displayModeBar: false
        };

        console.log('Plotting map with data:', { mapData, layout });
        Plotly.newPlot('mainViz', mapData, layout, config).then(() => {
            console.log('Map plotted successfully');
        }).catch(err => {
            console.error('Error plotting map:', err);
        });
    } catch (error) {
        console.error('Error creating map visualization:', error);
        document.getElementById('mainViz').innerHTML = 
            '<div class="alert alert-danger">Error creating map visualization. Please check the console for details.</div>';
    }
}

// Update map based on filters
function updateMap(selectedState, costRange, data) {
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
        filteredData.states = filteredData.states.filter((_, i) => 
            !isNaN(filteredData.costs.infant[i]) && 
            filteredData.costs.infant[i] <= maxCost
        );

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

// Helper function to get state name from abbreviation
function getStateName(abbr) {
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
    return stateNames[abbr] || abbr;
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