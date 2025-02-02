// Initialize the map visualization
function initMap() {
    const data = {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: [],
        z: [],
        text: [],
        colorscale: 'Viridis',
        colorbar: {
            title: 'Average Annual Cost ($)',
            thickness: 20
        }
    };

    const layout = {
        title: 'Childcare Costs by State',
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
        },
        height: 600
    };

    Plotly.newPlot('mainViz', [data], layout);
}

// Update map based on filters
function updateMap(selectedState, costRange) {
    // Sample data structure
    const stateData = {
        locations: ['NY', 'CA', 'TX', 'FL', 'IL'],
        values: [24000, 22000, 18000, 19000, 20000],
        texts: [
            'New York: $24,000',
            'California: $22,000',
            'Texas: $18,000',
            'Florida: $19,000',
            'Illinois: $20,000'
        ]
    };

    // Filter data based on selected state and cost range
    let filteredData = filterMapData(stateData, selectedState, costRange);

    // Update the map
    Plotly.update('mainViz', {
        locations: [filteredData.locations],
        z: [filteredData.values],
        text: [filteredData.texts]
    });
}

// Filter map data based on selection
function filterMapData(data, selectedState, costRange) {
    if (selectedState === 'all') {
        return data;
    }

    // Convert state name to abbreviation
    const stateAbbr = getStateAbbreviation(selectedState);
    const index = data.locations.indexOf(stateAbbr);

    if (index === -1) {
        return data;
    }

    return {
        locations: [data.locations[index]],
        values: [data.values[index]],
        texts: [data.texts[index]]
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