// Initialize the map visualization
function initMap(data) {
    if (!data || !data.states || !data.costs || !data.costs.infant) {
        console.error('Invalid data structure for map visualization:', data);
        document.getElementById('mainViz').innerHTML = 
            '<div class="alert alert-danger">Error: Invalid or missing data for map visualization</div>';
        return;
    }

    try {
        console.log('Creating map with data:', data);
        const locations = data.states;
        const z = data.costs.infant.map(cost => cost || 0);
        const text = locations.map((state, i) => {
            const cost = z[i];
            const burden = data.metrics.cost_burden[i];
            const workingParents = data.metrics.working_parent_ratio[i];
            return `<b>${getStateName(state)}</b><br>` +
                   `Monthly Cost: $${cost ? cost.toFixed(2) : 'No data'}<br>` +
                   `Cost Burden: ${burden ? burden.toFixed(1) : 'No data'}%<br>` +
                   `Working Parents: ${workingParents ? workingParents.toFixed(1) : 'No data'}%`;
        });

        const mapData = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: locations,
            z: z,
            text: text,
            hoverinfo: 'text',
            colorscale: [
                [0, '#f7fbff'],
                [0.2, '#deebf7'],
                [0.4, '#c6dbef'],
                [0.6, '#9ecae1'],
                [0.8, '#6baed6'],
                [1, '#2171b5']
            ],
            colorbar: {
                title: 'Monthly Cost ($)',
                thickness: 20,
                len: 0.9,
                y: 0.5,
                yanchor: 'middle',
                outlinewidth: 0
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
                text: 'U.S. Childcare Costs by State',
                font: {
                    size: 24,
                    color: '#2c3e50'
                },
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
                countrycolor: 'rgb(204,204,204)',
                showcoastlines: true,
                coastlinecolor: 'rgb(204,204,204)',
                showsubunits: true,
                subunitcolor: 'rgb(255,255,255)'
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
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['lasso2d', 'select2d'],
            toImageButtonOptions: {
                format: 'png',
                filename: 'childcare_costs_map',
                height: 800,
                width: 1200,
                scale: 2
            }
        };

        console.log('Plotting map with data:', { mapData, layout });
        Plotly.newPlot('mainViz', mapData, layout, config).then(() => {
            console.log('Map plotted successfully');
        }).catch(err => {
            console.error('Error plotting map:', err);
            document.getElementById('mainViz').innerHTML = 
                '<div class="alert alert-danger">Error plotting map. Please check the console for details.</div>';
        });
    } catch (error) {
        console.error('Error creating map visualization:', error);
        document.getElementById('mainViz').innerHTML = 
            '<div class="alert alert-danger">Error creating map visualization. Please check the console for details.</div>';
    }
}

// Update map based on filters
function updateMap(selectedState, costRange, data) {
    if (!data || !data.states || !data.costs || !data.costs.infant) {
        console.error('Invalid data for map update');
        return;
    }
    
    try {
        // Update map visualization based on filters
        console.log('Updating map with:', { selectedState, costRange });
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

// Export the functions
export {
    initMap,
    updateMap,
    filterMapData,
    filterByCostRange,
    getStateName,
    createBubbleOverlay
}; 