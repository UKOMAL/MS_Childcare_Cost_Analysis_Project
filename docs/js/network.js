// Initialize the network visualization
function initNetwork() {
    // Sample network data
    const nodes = [
        { id: 'infant_cost', label: 'Infant Care Cost', value: 30 },
        { id: 'toddler_cost', label: 'Toddler Care Cost', value: 25 },
        { id: 'preschool_cost', label: 'Preschool Cost', value: 20 },
        { id: 'household_income', label: 'Household Income', value: 35 },
        { id: 'population', label: 'Population', value: 15 }
    ];

    const edges = [
        { from: 'infant_cost', to: 'toddler_cost', value: 0.92 },
        { from: 'toddler_cost', to: 'preschool_cost', value: 0.88 },
        { from: 'infant_cost', to: 'preschool_cost', value: 0.85 },
        { from: 'household_income', to: 'infant_cost', value: 0.65 },
        { from: 'household_income', to: 'population', value: 0.45 }
    ];

    const data = [{
        type: 'sankey',
        orientation: 'h',
        node: {
            pad: 15,
            thickness: 30,
            line: {
                color: 'black',
                width: 0.5
            },
            label: nodes.map(n => n.label),
            color: 'blue'
        },
        link: {
            source: edges.map(e => nodes.findIndex(n => n.id === e.from)),
            target: edges.map(e => nodes.findIndex(n => n.id === e.to)),
            value: edges.map(e => e.value * 100)
        }
    }];

    const layout = {
        title: 'Childcare Cost Relationships Network',
        font: {
            size: 12
        },
        height: 600
    };

    Plotly.newPlot('mainViz', data, layout);
}

// Update network based on filters
function updateNetwork(selectedState, costRange) {
    // In a real implementation, this would filter the network data based on selection
    // For now, we'll just update the title to show the selection
    const layout = {
        title: `Childcare Cost Relationships - ${selectedState === 'all' ? 'All States' : selectedState}`
    };

    Plotly.relayout('mainViz', layout);
}

// Create force-directed graph
function createForceGraph(nodes, edges) {
    const trace = {
        x: nodes.map(n => n.x),
        y: nodes.map(n => n.y),
        mode: 'markers+text',
        type: 'scatter',
        name: 'Nodes',
        text: nodes.map(n => n.label),
        textposition: 'bottom center',
        marker: {
            size: nodes.map(n => n.value * 2),
            color: nodes.map(n => n.color || 'blue'),
            line: {
                width: 1
            }
        }
    };

    const layout = {
        title: 'Force-Directed Network Graph',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {
            showgrid: false,
            zeroline: false,
            showticklabels: false
        },
        yaxis: {
            showgrid: false,
            zeroline: false,
            showticklabels: false
        },
        height: 600
    };

    Plotly.newPlot('mainViz', [trace], layout);
}

// Calculate node positions using force-directed algorithm
function calculateNodePositions(nodes, edges) {
    // This is a simplified force-directed layout calculation
    // In a real implementation, you would use a proper force-directed algorithm
    nodes.forEach((node, i) => {
        const angle = (2 * Math.PI * i) / nodes.length;
        node.x = Math.cos(angle);
        node.y = Math.sin(angle);
    });

    return nodes;
}

// Add edge traces to the network visualization
function addEdgeTraces(nodes, edges) {
    edges.forEach(edge => {
        const source = nodes.find(n => n.id === edge.from);
        const target = nodes.find(n => n.id === edge.to);

        const trace = {
            x: [source.x, target.x],
            y: [source.y, target.y],
            mode: 'lines',
            line: {
                width: edge.value * 5,
                color: 'gray'
            },
            hoverinfo: 'text',
            text: `Correlation: ${edge.value.toFixed(2)}`,
            showlegend: false
        };

        Plotly.addTraces('mainViz', trace);
    });
} 